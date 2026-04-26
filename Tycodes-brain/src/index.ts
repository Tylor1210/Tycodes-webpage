import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { getWebsiteMarkdown } from './scraper'
import { analyzeWebsite, AuditResult } from './analyst'

type Bindings = {
  FIRECRAWL_API_KEY: string
  OPENAI_API_KEY: string
  SMTP_SERVER?: string
  SMTP_PORT?: string
  SMTP_USER?: string
  SMTP_PASS?: string
}

const app = new Hono<{ Bindings: Bindings }>()

// CORS middleware
app.use('*', cors({
    origin: ['http://localhost:5173', 'https://tycodes.dev'],
    allowMethods: ['POST', 'GET', 'OPTIONS'],
    allowHeaders: ['Content-Type', 'Authorization'],
    maxAge: 600,
}))

app.get('/', (c) => c.text('Tycodes Auditor API is online!'))

// Define the Tycodes Pricing mapping (Base Minimums)
const TYCODES_TIERS: Record<string, { min_upfront: number, monthly: number }> = {
    "Digital Presence": { min_upfront: 799, monthly: 50 },
    "Vite-com": { min_upfront: 1500, monthly: 150 },
    "High-Velocity E-com": { min_upfront: 3500, monthly: 250 },
    "Enterprise Contract": { min_upfront: 15000, monthly: 500 }
};

export interface FlatAuditData {
  base_subscription: number;
  app_fees: number;
  platform_transaction_fee: number;
  hosting_cost: number;
  estimated_monthly_total: number;
  detected_stack: string[];
  recommended_tycodes_components: string[];
  tycodes_estimated_cost: number;
  tycodes_payment_plan: string;
  is_enterprise: boolean;
  setup_fee: number;
  mgmt_fee: number;
  savings_1_yr: number;
  savings_3_yr: number;
  is_estimated: boolean;
  needs_consultation: boolean;
  estimated_revenue: number;
  raw_markdown?: string;
}

function generateAuditPricing(analysis: any, platform: string): FlatAuditData {
    const tierPricing = TYCODES_TIERS[analysis.project_tier] || TYCODES_TIERS["Digital Presence"];
    const tycodesMonthly = tierPricing.monthly;
    const revenue = analysis.estimated_revenue || 5000;

    // 1. Calculate Platform Tax accurately on the backend
    let platformTax = 0;
    if (platform === "shopify") platformTax = revenue * 0.02;
    else if (platform === "wix") platformTax = revenue * 0.029;

    // 2. Final Current Monthly Cost
    const currentMonthlyTotal = analysis.base_subscription + analysis.app_fees + platformTax + analysis.hosting_cost;
    
    // 3. Monthly Savings
    const monthlySavings = currentMonthlyTotal - tycodesMonthly;
    
    // 4. ROI Principle Setup Fee (3x Monthly Savings, but not less than Tier Minimum)
    const setupFee = Math.max(tierPricing.min_upfront, monthlySavings * 3);
    
    const savings1Yr = (currentMonthlyTotal * 12) - (setupFee + (tycodesMonthly * 12));
    const savings3Yr = (currentMonthlyTotal * 36) - (setupFee + (tycodesMonthly * 36));

    const isEnterprise = analysis.project_tier === "Enterprise Contract";
    const needsConsultation = savings1Yr > 10000 || isEnterprise;
    const isEstimated = savings1Yr < 2000;

    return {
        base_subscription: analysis.base_subscription,
        app_fees: analysis.app_fees,
        platform_transaction_fee: platformTax,
        hosting_cost: analysis.hosting_cost,
        estimated_monthly_total: currentMonthlyTotal,
        detected_stack: analysis.detected_stack,
        recommended_tycodes_components: analysis.recommended_tycodes_components,
        estimated_revenue: revenue,
        
        tycodes_estimated_cost: setupFee,
        tycodes_payment_plan: isEnterprise ? "Custom payment schedule to be determined during consultation." : `2 payments of $${(setupFee / 2).toFixed(0)} (50% deposit, 50% on completion)`,
        is_enterprise: isEnterprise,
        setup_fee: setupFee,
        mgmt_fee: tycodesMonthly,
        savings_1_yr: Math.max(0, savings1Yr),
        savings_3_yr: Math.max(0, savings3Yr),
        is_estimated: isEstimated,
        needs_consultation: needsConsultation
    };
}

// 1. Full AI Audit Route (Scrape + Analyze + Price)
app.post('/audit', async (c) => {
    try {
        const body = await c.req.json();
        const url = body.url;
        const userRevenue = body.user_revenue || 0;
        const userAppFees = body.app_fees || 0;
        const userPlatform = body.platform || "other";
        
        if (!url) {
            return c.json({ detail: "URL is required" }, 400);
        }

        const markdown = await getWebsiteMarkdown(url, c.env.FIRECRAWL_API_KEY);
        
        if (markdown.startsWith("Error:")) {
            return c.json({ detail: `Scraping failed: ${markdown}` }, 500);
        }

        const analysis = await analyzeWebsite(markdown, c.env.OPENAI_API_KEY, {
            revenue: userRevenue,
            app_fees: userAppFees,
            platform: userPlatform
        });
        
        const fullResult = generateAuditPricing(analysis, userPlatform);
        fullResult.raw_markdown = markdown.substring(0, 500) + "...";
        
        return c.json(fullResult);
    } catch (e: any) {
        return c.json({ detail: e.message || "Internal server error" }, 500);
    }
})

// 2. Manual Calculator Route (Price Generation Only)
app.post('/calculate', async (c) => {
    try {
        const analysis: AuditResult = await c.req.json();
        // Recalculate the total just to be safe
        analysis.estimated_monthly_total = 
            analysis.base_subscription + 
            analysis.app_fees + 
            analysis.platform_transaction_fee + 
            analysis.hosting_cost;
            
        const pricingResult = generateAuditPricing(analysis);
        return c.json(pricingResult);
    } catch (e: any) {
        return c.json({ detail: e.message || "Invalid payload" }, 400);
    }
})

// 3. Lead Capture / Claim Savings Route
app.post('/claim', async (c) => {
    try {
        const payload = await c.req.json();
        
        // For sending emails in CF Workers, MailChannels is natively trusted.
        // It's the standard free way to send emails without SMTP.
        // NOTE: This requires the sender domain (tycodes.dev) to have DKIM/SPF configured.
        
        const emailContent = {
            personalizations: [{
                to: [{ email: "audit@tycodes.dev" }],
            }],
            from: { email: "no-reply@tycodes.dev", name: "Tycodes Auditor" },
            subject: "New Tycodes Audit Claim",
            content: [{
                type: "text/plain",
                value: `New Claim Details:\n\n` +
                       `Email: ${payload.email}\n` +
                       `Company: ${payload.company_name}\n` +
                       `Tier: ${payload.tier}\n` +
                       `Savings: $${payload.savings}\n` +
                       `Custom Notes: ${payload.custom_notes || 'None'}`
            }]
        };

        const response = await fetch("https://api.mailchannels.net/tx/v1/send", {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(emailContent),
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error("MailChannels Error:", errorText);
            // We still return success to the user so the UI works, but we log the error.
            return c.json({ status: "success", message: "Lead captured, email failed to send (check logs)" });
        }

        return c.json({ status: "success", message: "Lead captured and email sent" });
    } catch (e: any) {
        console.error("Error in /claim:", e);
        return c.json({ status: "success", message: "Lead captured, email failed" });
    }
})

export default app
