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
        "Review the provided website markdown. Deduce the current stack (e.g., Shopify, Wix, WordPress) "
        "and estimate the current monthly costs (base plan + apps).\n"
        "Generate a JSON payload describing a 'Tycodes Rebuild' that recommends Tycodes components (modular structure, Tailwind colors, optimized components)."
    )

    response = client.beta.chat.completions.parse(
        model="gpt-4o-mini",
        messages=[
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": f"Website Markdown content:\n\n{markdown_content}"}
        ],
        response_format=AuditResult,
    )
    
    return response.choices[0].message.parsed
