from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from pydantic import BaseModel
from scraper import get_website_markdown
from analyst import analyze_website, AuditResult

app = FastAPI(
    title="Tycodes Auditor",
    description="Agentic Auditor that analyzes websites and proposes Tycodes stack conversions.",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "https://tycodes.dev"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    
)

class FinalAuditResult(AuditResult):
    tycodes_estimated_cost: float
    tycodes_payment_plan: str
    is_enterprise: bool
    setup_fee: float
    mgmt_fee: float
    savings_1_yr: float = 0.0
    savings_3_yr: float = 0.0

class AuditRequest(BaseModel):
    url: str
    user_revenue: float = 0.0
    uses_ecom: bool = True

def generate_audit_pricing(tier: str, request_revenue: float, uses_ecom: bool, estimated_monthly_cost: float, audit_result_dump: dict) -> FinalAuditResult:
    if not uses_ecom:
        tier = "Digital Presence"
        
    setup_fee = 799
    mgmt_fee = 0
    
    is_enterprise = request_revenue >= 20000 or tier == "Enterprise Contract" or tier == "Enterprise"
    
    if is_enterprise:
        setup_fee = 25000
        mgmt_fee = 2500
        tycodes_cost = setup_fee + (mgmt_fee * 12)
        savings_1_yr = (estimated_monthly_cost * 12) - tycodes_cost
        savings_3_yr = (estimated_monthly_cost * 36) - (setup_fee + (mgmt_fee * 36))
        payment_plan = "Due to your high revenue volume, a custom ROI analysis is required to identify potential 6-figure savings in processing fees and technical overhead."
    else:
        if tier == "Vite-Ecom":
            setup_fee = 1500
        elif tier == "High-Velocity E-com":
            setup_fee = 3500
            mgmt_fee = 199
            
        tycodes_cost = setup_fee + (mgmt_fee * 12)
        
        annual_competitor_cost = estimated_monthly_cost * 12
        savings_1_yr = annual_competitor_cost - tycodes_cost
        savings_3_yr = (estimated_monthly_cost * 36) - (setup_fee + (mgmt_fee * 36))
        
        if annual_competitor_cost > 0:
            percentage = (tycodes_cost / annual_competitor_cost) * 100
            if percentage > 120:
                payment_plan = f"Your platform fees are draining your margins. Over 3 years, you will save roughly ${savings_3_yr:,.0f} by owning your own infrastructure."
            else:
                percentage_text = f"roughly {percentage:,.0f}%"
                payment_plan = f"For {percentage_text} of what you pay annually for a platform you don't own, you can own your infrastructure forever."
        else:
            payment_plan = "For a fraction of what you pay annually for a platform you don't own, you can own your infrastructure forever."
            
    return FinalAuditResult(
        **audit_result_dump,
        tycodes_estimated_cost=tycodes_cost,
        tycodes_payment_plan=payment_plan,
        is_enterprise=is_enterprise,
        setup_fee=setup_fee,
        mgmt_fee=mgmt_fee,
        savings_1_yr=savings_1_yr,
        savings_3_yr=savings_3_yr
    )

@app.post("/audit", response_model=FinalAuditResult)
def audit_website(request: AuditRequest):
    try:
        markdown_content = get_website_markdown(request.url)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to scrape website: {str(e)}")

    if not markdown_content:
        raise HTTPException(status_code=500, detail="Scraping succeeded but returned no markdown content")

    try:
        audit_result = analyze_website(markdown_content)
        return generate_audit_pricing(
            audit_result.project_tier, 
            request.user_revenue, 
            request.uses_ecom, 
            audit_result.estimated_monthly_cost, 
            audit_result.model_dump()
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to analyze website: {str(e)}")

class CalculateRequest(BaseModel):
    revenue: float
    app_fees: float
    uses_ecom: bool
    platform: str

@app.post("/calculate", response_model=FinalAuditResult)
def calculate_audit(request: CalculateRequest):
    tax_rate = 0.02 if request.platform.lower() == "shopify" else 0.015
    if not request.uses_ecom:
        tax_rate = 0.0
    
    competitor_monthly_cost = (request.revenue * tax_rate) + request.app_fees
    tier = "Vite-Ecom" if request.uses_ecom else "Digital Presence"
    
    mock_audit = {
        "estimated_monthly_cost": competitor_monthly_cost,
        "detected_stack": [request.platform],
        "recommended_tycodes_components": ["Tycodes Custom Engine", "Stripe API Integration"],
        "project_tier": tier
    }
    
    return generate_audit_pricing(tier, request.revenue, request.uses_ecom, competitor_monthly_cost, mock_audit)

class ClaimRequest(BaseModel):
    email: str
    phone: str = ""
    domain: str
    platform: str = "Unknown"
    revenue: float = 0.0
    app_fees: float = 0.0
    audit_data: dict

@app.post("/claim")
def claim_margins(request: ClaimRequest):
    try:
        smtp_server = os.getenv("SMTP_SERVER", "smtp.gmail.com")
        smtp_port = int(os.getenv("SMTP_PORT", 587))
        smtp_user = os.getenv("SMTP_USER")
        smtp_pass = os.getenv("SMTP_PASS")
        recipient = "audit@tycodes.dev"

        if not smtp_user or not smtp_pass:
            # If no SMTP set, print to console for dev
            print(f"🚨 NEW LEAD: {request.domain} | Email: {request.email} | Phone: {request.phone}")
            return {"status": "success", "message": "Lead captured (No SMTP configured)"}

        msg = MIMEMultipart()
        msg['From'] = smtp_user
        msg['To'] = recipient
        msg['Subject'] = f"🚨 NEW LEAD: Audit for {request.domain}"

        body = f"New Lead Captured!\n\nTarget Specs:\nDomain: {request.domain}\nPlatform: {request.platform}\nRevenue: ${request.revenue:,.2f}/mo\nApp Fees: ${request.app_fees:,.2f}/mo\n\nContact Info:\nEmail: {request.email}\nPhone: {request.phone}\n\nAudit Results:\n{request.audit_data}"
        msg.attach(MIMEText(body, 'plain'))

        server = smtplib.SMTP(smtp_server, smtp_port)
        server.starttls()
        server.login(smtp_user, smtp_pass)
        server.send_message(msg)
        server.quit()
        
        return {"status": "success"}
    except Exception as e:
        print(f"Failed to send email: {e}")
        return {"status": "success", "message": "Lead captured, email failed"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
