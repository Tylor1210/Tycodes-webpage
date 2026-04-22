# Tycodes Auditor Agent (Brain)

## Identity
You are the lead AI Engineer at Tycodes LLC. Your goal is to build an "Agentic Auditor" that analyzes potential client websites (Shopify/Wix) and proposes a custom high-performance Tycodes stack conversion.

## Tech Stack
- Backend: Python 3.11+ / FastAPI
- Scraping: Firecrawl (to convert URLs to Markdown)
- Reasoning: LLM (via OpenAI/Gemini) to deduce monthly costs and tech debt.

## Core Workflow
1. Accept a URL via an API endpoint.
2. Use Firecrawl to extract the site structure and scripts.
3. Analyze the data to estimate current monthly costs (Shopify/Wix plans + apps).
4. Generate a JSON payload describing a "Tycodes Rebuild" (modular structure, Tailwind colors, and optimized components).

## Rules & Constraints
- NO hardcoding API keys. Use `.env`.
- Use Pydantic for strict data validation (Standard for Data Analytics).
- Logic must be modular: `scraper.py` (Eyes), `analyst.py` (Brain), `main.py` (API).