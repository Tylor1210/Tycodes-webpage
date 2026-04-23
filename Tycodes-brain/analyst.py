import os
from typing import List
from pydantic import BaseModel, Field
from dotenv import load_dotenv
from openai import OpenAI

load_dotenv()

class AuditResult(BaseModel):
    # ITEMIZATION
    base_subscription: float = Field(description="Monthly base plan (e.g., $29 or $39 for Shopify/Wix)")
    app_fees: float = Field(description="Monthly cost for detected apps/plugins (e.g., $150)")
    platform_transaction_fee: float = Field(description="The EXTRA 0.5% to 2% 'Tax' platforms charge for not using their bank")
    hosting_cost: float = Field(description="Monthly hosting fee (Note: We cut this, but don't delete the domain fee)")
    
    # TOTALS
    estimated_monthly_total: float = Field(description="Sum of Sub + Apps + Tax + Hosting")
    
    # SPECS & TIER
    detected_stack: List[str] = Field(description="Detected tech (e.g., ['Shopify', 'Klaviyo'])")
    project_tier: str = Field(description="One of: 'Digital Presence', 'Vite-Ecom', 'High-Velocity E-com', 'Enterprise'")
    recommended_tycodes_components: List[str] = Field(description="List of Tycodes-equivalent replacements")
def analyze_website(markdown_content: str) -> AuditResult:
    """
    Analyzes the markdown content of a website using an LLM to deduce monthly costs,
    detect the tech stack, and recommend a Tycodes Rebuild.
    """
    api_key = os.getenv("OPENAI_API_KEY")
    if not api_key:
        raise ValueError("OPENAI_API_KEY is not set in the environment")

    client = OpenAI(api_key=api_key)

    system_prompt = (
        "You are the lead AI Engineer at Tycodes LLC. Your goal is to act as an Agentic Auditor "
        "that analyzes website content to propose a custom high-performance Tycodes stack conversion.\n"
        "Review the provided website markdown and deduce the current stack, estimated monthly costs, and Tycodes Pricing Tier.\n\n"
        "Detection Rules:\n"
        "- Constraint: Never assume a site is Shopify, Wix, or Squarespace unless you see clear evidence (e.g., 'myshopify.com' links or specific app names).\n"
        "- Rule: If you see 'Vite', 'React', 'Next.js', 'Cloudflare', or 'Tailwind', and NO mention of SaaS platforms like Shopify/Wix, label the detected stack as 'High-Performance Custom Build'.\n\n"
        "Financial Logic (Itemized Cost Breakdown):\n"
        "- Base Subscription: Shopify Basic ($29), Grow ($79), Advanced ($299). Assume $29 unless high complexity is detected.\n"
        "- App Fees: Detect apps like Klaviyo, Yotpo, Recharge. Estimate monthly fees (e.g., $150).\n"
        "- The 'Platform Tax': For Shopify/Wix sites, assume a 2% 'Platform Transaction Tax' on estimated revenue.\n"
        "- Domain/Hosting: Assume a default of $2.00/mo for legacy hosting maintenance.\n"
        "- Total Monthly Cost: Sum of Base Sub + App Fees + Platform Tax + Hosting.\n\n"
        "Tycodes Pricing Tier Selection:\n"
        "- 'Digital Presence': No E-commerce or payment processing detected.\n"
        "- 'Vite-Ecom': Basic E-commerce, carts, or payment processing detected. Minimum tier if payment/cart exists.\n"
        "- 'High-Velocity E-com': High traffic, complexity, or multiple apps detected.\n"
        "- 'Enterprise Contract': Highly complex features (Internationalization, thousands of products, custom APIs).\n\n"
        "Generate a JSON payload matching the required schema."
    )

    try:
        response = client.beta.chat.completions.parse(
            model="gpt-4o-mini",
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": f"Website Markdown content:\n\n{markdown_content}"}
            ],
            response_format=AuditResult,
        )
        
        return response.choices[0].message.parsed
    except Exception as e:
        print(f"AI analysis failed: {str(e)}")
        # Return a default AuditResult if the AI fails
        return AuditResult(
            base_subscription=29.0,
            app_fees=0.0,
            platform_transaction_fee=0.0,
            hosting_cost=2.0,
            estimated_monthly_total=31.0,
            detected_stack=["Unknown"],
            project_tier="Digital Presence",
            recommended_tycodes_components=["Custom Vite + React architecture"]
        )
