import os
from firecrawl import FirecrawlApp
from dotenv import load_dotenv

load_dotenv()

app = FirecrawlApp(api_key=os.getenv("FIRECRAWL_API_KEY"))

def get_website_markdown(url: str):
    print(f"--- Attempting to scrape: {url} ---")
    try:
        # The latest SDK version uses 'scrape_url'
        result = app.scrape_url(url, params={'formats': ['markdown']})
        return result['markdown']
    except Exception as e:
        print(f"Scrape failed: {str(e)}")
        return f"Error: {str(e)}"