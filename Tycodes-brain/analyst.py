import os
from typing import List
from pydantic import BaseModel, Field
from dotenv import load_dotenv
from openai import OpenAI

load_dotenv()

class AuditResult(BaseModel):
    estimated_monthly_cost: float = Field(description="Estimated current monthly cost of the stack in USD (Shopify/Wix plans + apps)")
    detected_stack: List[str] = Field(description="Detected technologies, CMS, or platforms (e.g., ['Shopify', 'React'])")
    recommended_tycodes_components: List[str] = Field(description="Recommended Tycodes components for rebuild (e.g., ['Tycodes Landing Page', 'Tycodes Cart API'])")
    project_tier: str = Field(description="One of: 'Digital Presence', 'Vite-Ecom', 'High-Velocity E-com', 'Enterprise'")

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
        "Financial Logic:\n"
        "- If Custom Build: Estimate estimated_monthly_cost as $10 - $30 (Domain + Basic API costs).\n"
        "- If SaaS (Shopify/Wix): Estimate higher costs ($29 - $300+ based on apps).\n"
        "- 'Steve Madden' Rule: For sites with custom carts and extremely high complexity, estimate estimated_monthly_cost to reflect Developer Salaries + Enterprise Servers ($10000-$50000/mo).\n\n"
        "Tycodes Pricing Tier Selection:\n"
        "- 'Digital Presence': No E-commerce or payment processing detected.\n"
        "- 'Vite-Ecom': Basic E-commerce, carts, or payment processing detected. Minimum tier if payment/cart exists.\n"
        "- 'High-Velocity E-com': High traffic, complexity, or multiple apps detected.\n"
        "- 'Enterprise Contract': Highly complex features (Internationalization, thousands of products, custom APIs).\n\n"
        "The Tycodes Pitch:\n"
        "- For Custom sites: Recommend components that focus on Automation and Scale (e.g., 'Tycodes Content CMS', 'Agentic SEO').\n"
        "- For SaaS sites: Recommend components that focus on Cost Savings, Code Ownership, and Speed.\n\n"
        "Generate a JSON payload matching the required schema describing the detected stack, cost, recommended components, and project_tier."
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
            estimated_monthly_cost=29.0,
            detected_stack=["Unknown"],
            recommended_tycodes_components=["Custom Vite + React architecture"],
            project_tier="Digital Presence"
        )
