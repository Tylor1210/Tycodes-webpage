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

// Define the Tycodes Pricing mapping (replicating Python logic)
const TYCODES_TIERS: Record<string, { upfront: number, monthly: number }> = {
    "Digital Presence": { upfront: 1500, monthly: 50 },
    "Vite-Ecom": { upfront: 3000, monthly: 150 },
    "High-Velocity E-com": { upfront: 5500, monthly: 250 },
    "Enterprise Contract": { upfront: 10000, monthly: 500 }
};

interface PricingResult {
    analysis: AuditResult;
    tycodes_pricing: {
        recommended_tier: string;
        estimated_upfront_cost: number;
        estimated_monthly_maintenance: number;
        twelve_month_savings: number;
    };
    raw_markdown: string;
}

function generateAuditPricing(analysis: AuditResult): PricingResult {
    // Look up the pricing tier, default to 'Digital Presence' if not found
    const tierPricing = TYCODES_TIERS[analysis.project_tier] || TYCODES_TIERS["Digital Presence"];
    const upfront = tierPricing.upfront;
    const tycodesMonthly = tierPricing.monthly;
    
    // Calculate 12 month costs
    const current12MoCost = analysis.estimated_monthly_total * 12;
    const tycodes12MoCost = upfront + (tycodesMonthly * 12);
    
    // Calculate total savings
    const savings = current12MoCost - tycodes12MoCost;
    
    return {
        analysis: analysis,
        tycodes_pricing: {
            recommended_tier: analysis.project_tier,
            estimated_upfront_cost: upfront,
            estimated_monthly_maintenance: tycodesMonthly,
            twelve_month_savings: savings
        },
        raw_markdown: ""
    };
}

// 1. Full AI Audit Route (Scrape + Analyze + Price)
app.post('/audit', async (c) => {
    try {
        const body = await c.req.json();
        const url = body.url;
        
        if (!url) {
            return c.json({ detail: "URL is required" }, 400);
        }

        const markdown = await getWebsiteMarkdown(url, c.env.FIRECRAWL_API_KEY);
        
        if (markdown.startsWith("Error:")) {
            return c.json({ detail: `Scraping failed: ${markdown}` }, 500);
        }

        const analysis = await analyzeWebsite(markdown, c.env.OPENAI_API_KEY);
        const fullResult = generateAuditPricing(analysis);
        
        // Append raw markdown (optional, can be large so we might truncate)
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
