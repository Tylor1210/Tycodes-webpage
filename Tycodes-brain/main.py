from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from scraper import get_website_markdown
from analyst import analyze_website, AuditResult

app = FastAPI(
    title="Tycodes Auditor",
    description="Agentic Auditor that analyzes websites and proposes Tycodes stack conversions.",
    version="1.0.0",
)

class FinalAuditResult(AuditResult):
    tycodes_estimated_cost: float
    tycodes_payment_plan: str

class AuditRequest(BaseModel):
    url: str

@app.post("/audit", response_model=FinalAuditResult)
def audit_website(request: AuditRequest):
    try:
        # Step 1: Scrape the website
        markdown_content = get_website_markdown(request.url)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to scrape website: {str(e)}")

    if not markdown_content:
        raise HTTPException(status_code=500, detail="Scraping succeeded but returned no markdown content")

    try:
        # Step 2: Analyze the content
        audit_result = analyze_website(markdown_content)
        
        # Calculate Tycodes estimated cost (1.25 years of their cost)
        tycodes_cost = audit_result.estimated_monthly_cost * 12 * 1.25
        payment_plan = f"2 payments of ${tycodes_cost / 2:,.2f} (1 to start, 1 on completion)"
        
        return FinalAuditResult(
            **audit_result.model_dump(),
            tycodes_estimated_cost=tycodes_cost,
            tycodes_payment_plan=payment_plan
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to analyze website: {str(e)}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
