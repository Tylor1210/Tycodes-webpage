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

  // Value-Based Commission Fields
  base_setup_fee: number;
  performance_commission: number;
  annual_savings_total: number;
  payback_months: number | string;
  raw_markdown?: string;
}

function generateAuditPricing(analysis: any, userPlatform: string): FlatAuditData {
    const revenue = analysis.estimated_revenue || 0;
    
    // 1. Headless Shopify Detection
    // If user claims Shopify, or AI found it in stack, it's Shopify.
    const hasShopifyDna = analysis.detected_stack.some((s: string) => 
        s.toLowerCase().includes("shopify") || s.toLowerCase().includes("headless shopify")
    );
    const finalPlatform = (userPlatform === "shopify" || hasShopifyDna) ? "shopify" : (userPlatform === "wix" ? "wix" : "other");

    // 2. Service Menu Tiering (Strictly Revenue-Based)
    let projectTier = "Digital Presence";
    if (revenue >= 100000) projectTier = "Enterprise Contract";
    else if (revenue >= 15000) projectTier = "High-Velocity E-com";
    else if (revenue > 0) projectTier = "Vite-com";
    
    // If the site has absolutely no E-com markers and 0 revenue, it's Digital Presence
    if (revenue === 0 && analysis.project_tier === "Digital Presence") {
        projectTier = "Digital Presence";
    }

    const tierPricing = TYCODES_TIERS[projectTier] || TYCODES_TIERS["Digital Presence"];
    const baseFee = tierPricing.min_upfront;
    const tycodesMgmt = tierPricing.monthly;

    // 3. The "Sweet Spot" Math
    // Current Monthly Leakage: (Revenue * 0.02) + (App Fees)
    let platformTax = 0;
    if (finalPlatform === "shopify") platformTax = revenue * 0.02;
    else if (finalPlatform === "wix") platformTax = revenue * 0.029;
    
    const currentMonthlyLeakage = platformTax + analysis.app_fees;
    
    // Annual Savings: (Current Leakage - Tycodes Monthly Management) * 12
    const annualSavings = Math.max(0, (currentMonthlyLeakage - tycodesMgmt) * 12);
    
    // Performance Commission: 20% of the Projected Annual Savings
    const performanceCommission = Math.max(0, annualSavings * 0.20);
    const totalSetupFee = baseFee + performanceCommission;
    
    // 4. Payback Period
    const monthlySavings = (analysis.estimated_monthly_total + platformTax) - (tycodesMgmt + (analysis.app_fees * 0.2));
    const paybackMonths = monthlySavings > 0 ? (totalSetupFee / monthlySavings).toFixed(1) : "Strategic Investment";

    const isEnterprise = projectTier === "Enterprise Contract";
    const needsConsultation = annualSavings > 15000 || isEnterprise;
    const isEstimated = annualSavings < 2000;

    return {
        base_subscription: analysis.base_subscription,
        app_fees: analysis.app_fees,
        platform_transaction_fee: platformTax,
        hosting_cost: analysis.hosting_cost,
        estimated_monthly_total: analysis.estimated_monthly_total + platformTax,
        detected_stack: analysis.detected_stack,
        recommended_tycodes_components: analysis.recommended_tycodes_components,
        estimated_revenue: revenue,
        
        base_setup_fee: baseFee,
        performance_commission: performanceCommission,
        annual_savings_total: annualSavings,
        payback_months: paybackMonths,
        
        tycodes_estimated_cost: totalSetupFee,
        tycodes_payment_plan: isEnterprise ? "Custom payment schedule to be determined during consultation." : `$[Base] Setup + $[Efficiency Fee] Efficiency Fee`,
        is_enterprise: isEnterprise,
        setup_fee: totalSetupFee,
        mgmt_fee: tycodesMgmt,
        savings_1_yr: annualSavings,
        savings_3_yr: annualSavings * 3,
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
            
        const pricingResult = generateAuditPricing(analysis, (analysis as any).platform || "other");
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
