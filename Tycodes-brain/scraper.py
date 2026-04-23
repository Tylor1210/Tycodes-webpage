import os
from firecrawl import FirecrawlApp
from dotenv import load_dotenv

load_dotenv()

app = FirecrawlApp(api_key=os.getenv("FIRECRAWL_API_KEY"))

def get_website_markdown(url: str):
    print(f"--- Attempting to scrape: {url} ---")
    try:
        # Use .scrape() since your library doesn't recognize .scrape_url()
        result = app.scrape(url)
        
        # Access using dot notation because 'result' is a Document object
        if hasattr(result, 'markdown') and result.markdown:
            print(f"--- Scrape Successful for {url} ---")
            return result.markdown
        
        # Fallback if it's a dictionary or object without .markdown
        return str(result)
        
    except Exception as e:
        print(f"Scrape failed: {str(e)}")
        return f"Error: {str(e)}"