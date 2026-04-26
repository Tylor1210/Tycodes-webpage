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

export async function analyzeWebsite(markdownContent: string, apiKey: string): Promise<AuditResult> {
    if (!apiKey) {
        throw new Error("OPENAI_API_KEY is not set in the environment");
    }

    const systemPrompt = `You are the lead AI Engineer at Tycodes LLC. Your goal is to act as an Agentic Auditor that analyzes website content to propose a custom high-performance Tycodes stack conversion.
Review the provided website markdown and deduce the current stack, estimated monthly costs, and Tycodes Pricing Tier.

Detection Rules:
- Constraint: Never assume a site is Shopify, Wix, or Squarespace unless you see clear evidence (e.g., 'myshopify.com' links or specific app names).
- Rule: If you see 'Vite', 'React', 'Next.js', 'Cloudflare', or 'Tailwind', and NO mention of SaaS platforms like Shopify/Wix, label the detected stack as 'High-Performance Custom Build'.

Financial Logic (Itemized Cost Breakdown):
- Base Subscription: Shopify Basic ($29), Grow ($79), Advanced ($299). Assume $29 unless high complexity is detected.
- App Fees: Detect apps like Klaviyo, Yotpo, Recharge. Estimate monthly fees (e.g., $150).
- The 'Platform Tax': For Shopify/Wix sites, assume a 2% 'Platform Transaction Tax' on estimated revenue.
- Domain/Hosting: Assume a default of $2.00/mo for legacy hosting maintenance.
- Total Monthly Cost: Sum of Base Sub + App Fees + Platform Tax + Hosting.

Tycodes Pricing Tier Selection:
- 'Digital Presence': No E-commerce or payment processing detected.
- 'Vite-Ecom': Basic E-commerce, carts, or payment processing detected. Minimum tier if payment/cart exists.
- 'High-Velocity E-com': High traffic, complexity, or multiple apps detected.
- 'Enterprise Contract': Highly complex features (Internationalization, thousands of products, custom APIs).

Generate a JSON payload matching the required schema.`;

    const schema = {
        type: "object",
        properties: {
            base_subscription: { type: "number", description: "Monthly base plan (e.g., $29 or $39 for Shopify/Wix)" },
            app_fees: { type: "number", description: "Monthly cost for detected apps/plugins (e.g., $150)" },
            platform_transaction_fee: { type: "number", description: "The EXTRA 0.5% to 2% 'Tax' platforms charge for not using their bank" },
            hosting_cost: { type: "number", description: "Monthly hosting fee (Note: We cut this, but don't delete the domain fee)" },
            estimated_monthly_total: { type: "number", description: "Sum of Sub + Apps + Tax + Hosting" },
            detected_stack: { type: "array", items: { type: "string" }, description: "Detected tech (e.g., ['Shopify', 'Klaviyo'])" },
            project_tier: { type: "string", description: "One of: 'Digital Presence', 'Vite-Ecom', 'High-Velocity E-com', 'Enterprise'" },
            recommended_tycodes_components: { type: "array", items: { type: "string" }, description: "List of Tycodes-equivalent replacements" }
        },
        required: [
            "base_subscription", "app_fees", "platform_transaction_fee", "hosting_cost", 
            "estimated_monthly_total", "detected_stack", "project_tier", "recommended_tycodes_components"
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
        // Return a default AuditResult if the AI fails
        return {
            base_subscription: 29.0,
            app_fees: 0.0,
            platform_transaction_fee: 0.0,
            hosting_cost: 2.0,
            estimated_monthly_total: 31.0,
            detected_stack: ["Unknown"],
            project_tier: "Digital Presence",
            recommended_tycodes_components: ["Custom Vite + React architecture"]
        };
    }
}
