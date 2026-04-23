import os
from scraper import get_website_markdown
from dotenv import load_dotenv

load_dotenv()

urls = ["tycodes.dev", "https://tycodes.dev", "www.tycodes.dev"]

for url in urls:
    print(f"\nTesting URL: {url}")
    result = get_website_markdown(url)
    if "Error" in result:
        print(f"FAILED: {result}")
    else:
        print(f"SUCCESS: Markdown length: {len(result)}")
        # print(result[:200]) # Print first 200 chars
