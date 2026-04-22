import os
from dotenv import load_dotenv
from firecrawl import FirecrawlApp

load_dotenv()

def scrape_website(url: str) -> str:
    """
    Scrapes the given URL using Firecrawl and returns the cleaned Markdown content.
    """
    api_key = os.getenv("FIRECRAWL_API_KEY")
    if not api_key:
        raise ValueError("FIRECRAWL_API_KEY is not set in the environment")

    app = FirecrawlApp(api_key=api_key)
    # The new firecrawl-py sdk uses `formats=['markdown']` as scrape options
    scrape_result = app.scrape_url(url, params={'formats': ['markdown']})
    
    if isinstance(scrape_result, dict) and 'markdown' in scrape_result:
        return scrape_result['markdown']
    
    return str(scrape_result)
