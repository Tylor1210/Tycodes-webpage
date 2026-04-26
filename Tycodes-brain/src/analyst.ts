export interface AuditResult {
    base_subscription: number;
    app_fees: number;
    platform_transaction_fee: number;
    hosting_cost: number;
    estimated_monthly_total: number;
    detected_stack: string[];
    project_tier: string;
    recommended_tycodes_components: string[];
}

export async function analyzeWebsite(
    markdownContent: string, 
    apiKey: string, 
    userContext: { revenue: number, app_fees: number, platform: string }
): Promise<AuditResult> {
    if (!apiKey) {
        throw new Error("OPENAI_API_KEY is not set in the environment");
    }

    const systemPrompt = `You are the lead AI Engineer at Tycodes LLC. Your goal is to act as an Agentic Auditor that analyzes website content to propose a custom high-performance Tycodes stack conversion.
Review the provided website markdown and deduce the current stack and estimated monthly costs.

User Inputs:
- Claimed Platform: ${userContext.platform}
- Provided Revenue: ${userContext.revenue > 0 ? `$${userContext.revenue}/mo` : "Not provided (You must estimate this)"}
- Provided App Fees: ${userContext.app_fees > 0 ? `$${userContext.app_fees}/mo` : "Not provided (You must estimate this)"}

Detection Rules:
- Headless Shopify Detection: High-end sites often use Shopify backends with custom React/Next.js frontends.
  - Scan all asset URLs, scripts, and image links for "cdn.shopify.com".
  - Look for clues like "window.Shopify" or shopify-specific app patterns (Recharge, Klaviyo, Yotpo).
  - If Shopify markers are found but the framework is Next.js/React, label the stack as ["Headless Shopify", "React"].
- Framework Detection: If you see 'Vite', 'React', 'Next.js', 'Cloudflare', or 'Tailwind', and NO mention of SaaS platforms, label the detected stack as 'High-Performance Custom Build'.
- Conflict Resolution: If the User Input says "Shopify" but your scan is unsure, default to the User's input to ensure the Platform Tax (2%) is calculated.

Revenue Guessing (If user revenue is 0):
- Scan for traffic markers: Social media followers, blog post frequency, complex catalog size, or "Enterprise" contact forms.
- Categorize into: 
  - Micro (<$10k/mo): Set base revenue to $5,000 for calculation.
  - Growth ($10k - $50k/mo): Set base revenue to $25,000 for calculation.
  - High-Velocity (>$50k/mo): Set base revenue to $75,000 for calculation.

Financial Logic (Itemized Cost Breakdown):
- Base Subscription: Shopify Basic ($29), Grow ($79), Advanced ($299). Assume $29 unless high complexity is detected.
- App Fees: Detect apps like Klaviyo, Yotpo, Recharge. Estimate monthly fees if not provided.
- Domain/Hosting: Assume a default of $2.00/mo for legacy hosting maintenance.
- Note: Return 0 for platform_transaction_fee; the system calculates the 2% tax externally.

Generate a JSON payload matching the required schema.`;

    const schema = {
        type: "object",
        properties: {
            base_subscription: { type: "number", description: "Monthly base plan (e.g., $29 or $39 for Shopify/Wix)" },
            app_fees: { type: "number", description: "Monthly cost for detected apps/plugins" },
            platform_transaction_fee: { type: "number", description: "ALWAYS return 0 here." },
            hosting_cost: { type: "number", description: "Monthly hosting fee (Note: We cut this, but don't delete the domain fee)" },
            estimated_monthly_total: { type: "number", description: "Sum of Sub + Apps + Hosting" },
            detected_stack: { type: "array", items: { type: "string" }, description: "Detected tech (e.g., ['Shopify', 'Klaviyo'])" },
            project_tier: { type: "string", description: "One of: 'Digital Presence', 'Vite-com', 'High-Velocity E-com', 'Enterprise Contract'" },
            recommended_tycodes_components: { type: "array", items: { type: "string" }, description: "List of Tycodes-equivalent replacements" },
            estimated_revenue: { type: "number", description: "The revenue you guessed or the user provided." }
        },
        required: [
            "base_subscription", "app_fees", "platform_transaction_fee", "hosting_cost", 
            "estimated_monthly_total", "detected_stack", "project_tier", "recommended_tycodes_components", "estimated_revenue"
        ],
        additionalProperties: false
    };

    const payload = {
        model: "gpt-4o-mini",
        messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: `Website Markdown content:\n\n${markdownContent}` }
        ],
        response_format: {
            type: "json_schema",
            json_schema: {
                name: "audit_result",
                schema: schema,
                strict: true
            }
        }
    };

    try {
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${apiKey}`
            },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            throw new Error(`OpenAI HTTP error! status: ${response.status}`);
        }

        const result: any = await response.json();
        const content = result.choices[0].message.content;
        return JSON.parse(content) as AuditResult;
    } catch (error: any) {
        console.error(`AI analysis failed: ${error.message}`);
        return {
            base_subscription: 29.0,
            app_fees: 0.0,
            platform_transaction_fee: 0.0,
            hosting_cost: 2.0,
            estimated_monthly_total: 31.0,
            detected_stack: ["Unknown"],
            project_tier: "Digital Presence",
            recommended_tycodes_components: ["Custom Vite + React architecture"],
            estimated_revenue: userContext.revenue || 5000
        } as any;
    }
}
