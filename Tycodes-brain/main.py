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
    app_fees: float = 0.0
    uses_ecom: bool = True

def generate_audit_pricing(tier: str, request_revenue: float, uses_ecom: bool, app_fees: float, audit_result_dump: dict) -> FinalAuditResult:
    if not uses_ecom:
        tier = "Digital Presence"
        
    setup_fee = 799
    mgmt_fee = 0
    
    is_enterprise = request_revenue >= 20000 or tier == "Enterprise Contract" or tier == "Enterprise"
    
    if is_enterprise:
        setup_fee = 25000
        mgmt_fee = 2500
        tycodes_cost_1yr = setup_fee + (mgmt_fee * 12)
        tycodes_cost_3yr = setup_fee + (mgmt_fee * 36)
        
        # Enterprise TCO estimate is usually complex, but we'll use a high baseline
        competitor_annual_cost = (request_revenue * 0.02 * 12) + (app_fees * 12) + (299 * 12) # Enterprise base sub
        
        savings_1_yr = competitor_annual_cost - tycodes_cost_1yr
        savings_3_yr = (competitor_annual_cost * 3) - tycodes_cost_3yr
        
        payment_plan = "Due to your high revenue volume, a custom ROI analysis is required to identify potential 6-figure savings in processing fees and technical overhead."
    else:
        if tier == "Vite-Ecom":
            setup_fee = 1500
        elif tier == "High-Velocity E-com":
            setup_fee = 3500
            mgmt_fee = 199
            
        tycodes_cost_1yr = setup_fee + (mgmt_fee * 12)
        tycodes_cost_3yr = setup_fee + (mgmt_fee * 36)
        
        # Competitor Annual Cost: Base_Sub ($29*12) + App_Fees*12 + Transaction_Tax (Revenue*0.02*12)
        tax_tax = request_revenue * 0.02 * 12
        competitor_annual_cost = (29 * 12) + (app_fees * 12) + tax_tax
        
        savings_1_yr = competitor_annual_cost - tycodes_cost_1yr
        savings_3_yr = (competitor_annual_cost * 3) - tycodes_cost_3yr
        
        if savings_3_yr <= 0:
            payment_plan = "Performance & Ownership over legacy SaaS constraints."
            savings_3_yr = 0
            savings_1_yr = max(0, savings_1_yr)
        else:
            payment_plan = f"Over 3 years, you will save roughly ${savings_3_yr:,.0f} by switching to Tycodes."
            
    competitor_monthly_cost = competitor_annual_cost / 12
            
    # Prepare result dictionary to avoid duplicate keyword arguments
    result_data = audit_result_dump.copy()
    result_data.update({
        "estimated_monthly_cost": competitor_monthly_cost,
        "tycodes_estimated_cost": tycodes_cost_1yr,
        "tycodes_payment_plan": payment_plan,
        "is_enterprise": is_enterprise,
        "setup_fee": setup_fee,
        "mgmt_fee": mgmt_fee,
        "savings_1_yr": savings_1_yr,
        "savings_3_yr": savings_3_yr
    })
    
    return FinalAuditResult(**result_data)

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
        # Use either AI detected app fees or user provided app fees
        final_app_fees = max(audit_result.detected_app_fees, request.app_fees)
        
        return generate_audit_pricing(
            audit_result.project_tier, 
            request.user_revenue, 
            request.uses_ecom, 
            final_app_fees, 
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
    tier = "Vite-Ecom" if request.uses_ecom else "Digital Presence"
    
    mock_audit = {
        "estimated_monthly_cost": 0, # Calculated inside generate_audit_pricing now
        "detected_app_fees": request.app_fees,
        "detected_stack": [request.platform],
        "recommended_tycodes_components": ["Tycodes Custom Engine", "Stripe API Integration"],
        "project_tier": tier
    }
    
    return generate_audit_pricing(tier, request.revenue, request.uses_ecom, request.app_fees, mock_audit)

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
