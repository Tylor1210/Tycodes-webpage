export async function getWebsiteMarkdown(url: string, apiKey: string): Promise<string> {
    if (!url.startsWith("http://") && !url.startsWith("https://")) {
        url = `https://${url}`;
    }

    console.log(`--- Attempting to scrape: ${url} ---`);
    if (!apiKey) {
        return "Error: FIRECRAWL_API_KEY not set";
    }

    try {
        const response = await fetch("https://api.firecrawl.dev/v1/scrape", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                url: url,
                formats: ["markdown"]
            })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result: any = await response.json();
        
        if (result.success && result.data && result.data.markdown) {
            console.log(`--- Scrape Successful for ${url} ---`);
            return result.data.markdown;
        }
        
        return JSON.stringify(result);
    } catch (error: any) {
        console.error(`Scrape failed: ${error.message}`);
        return `Error: ${error.message}`;
    }
}
