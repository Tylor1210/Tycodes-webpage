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
    is_estimated: bool = False        # True when savings < $2k — price is a starting point
    needs_consultation: bool = False  # True when savings > $10k — push to founder call

class AuditRequest(BaseModel):
    url: str
    user_revenue: float = 0.0
    app_fees: float = 0.0
    uses_ecom: bool = True

def generate_audit_pricing(tier: str, request_revenue: float, uses_ecom: bool, app_fees: float, audit_result_dump: dict) -> FinalAuditResult:
    if not uses_ecom:
        tier = "Digital Presence"

    mgmt_fee = 0
    is_enterprise = request_revenue >= 20000 or tier == "Enterprise Contract" or tier == "Enterprise"

    # Platform Tax: 2% of revenue for Shopify/Wix
    platform_tax = request_revenue * 0.02
    hosting_cost = 2.0
    base_sub = audit_result_dump.get("base_subscription", 29.0)

    if is_enterprise:
        setup_fee = 25000
        mgmt_fee = 2500
        base_sub = 299.0

        monthly_total = base_sub + app_fees + platform_tax + hosting_cost
        savings_3_yr = (monthly_total * 36) - (setup_fee + (mgmt_fee * 36))
        savings_1_yr = 0.0
        is_estimated = False
        needs_consultation = True
        payment_plan = "Due to your high revenue volume, a custom ROI analysis is required to identify potential 6-figure savings in processing fees and technical overhead."
    else:
        # Base setup for tier
        if tier == "Vite-Ecom":
            base_setup = 1500
        elif tier == "High-Velocity E-com":
            base_setup = 3500
            mgmt_fee = 199
        else:
            base_setup = 799

        monthly_total = base_sub + app_fees + platform_tax + hosting_cost

        # --- Calculate raw savings first using base setup ---
        tycodes_3yr_cost_base = base_setup + (hosting_cost * 36) + (mgmt_fee * 36)
        competitor_3yr_cost = monthly_total * 36
        savings_3_yr = max(0, competitor_3yr_cost - tycodes_3yr_cost_base)
        savings_1_yr = max(0, (monthly_total * 12) - (base_setup + (mgmt_fee * 12)))

        # --- Dynamic pricing tier based on Year-1 savings ---
        is_estimated = False
        needs_consultation = False

        if savings_1_yr > 10000:
            # Savings too high for fixed pricing — route to founder consultation
            setup_fee = base_setup
            needs_consultation = True
            payment_plan = f"Over 3 years, you will save roughly ${savings_3_yr:,.0f} by switching to Tycodes."
        elif savings_1_yr >= 2000:
            # Mid-tier: base setup + 10% of year-1 savings (shown as one clean number)
            setup_fee = round(base_setup + (savings_1_yr * 0.10))
            # Recalculate savings with updated setup fee
            tycodes_3yr_cost = setup_fee + (hosting_cost * 36) + (mgmt_fee * 36)
            savings_3_yr = max(0, competitor_3yr_cost - tycodes_3yr_cost)
            savings_1_yr = max(0, (monthly_total * 12) - (setup_fee + (mgmt_fee * 12)))
            payment_plan = f"Over 3 years, you will save roughly ${savings_3_yr:,.0f} by switching to Tycodes."
        else:
            # Low savings — flat $1,500, mark as estimated
            setup_fee = 1500
            is_estimated = True
            payment_plan = "Performance & Ownership over legacy SaaS constraints."

    # Prepare result dictionary to avoid duplicate keyword arguments
    result_data = audit_result_dump.copy()
    result_data.update({
        "base_subscription": base_sub,
        "app_fees": app_fees,
        "platform_transaction_fee": platform_tax,
        "hosting_cost": hosting_cost,
        "estimated_monthly_total": monthly_total,
        "tycodes_estimated_cost": setup_fee + (mgmt_fee * 12),
        "tycodes_payment_plan": payment_plan,
        "is_enterprise": is_enterprise,
        "setup_fee": setup_fee,
        "mgmt_fee": mgmt_fee,
        "savings_1_yr": savings_1_yr,
        "savings_3_yr": savings_3_yr,
        "is_estimated": is_estimated,
        "needs_consultation": needs_consultation
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
        final_app_fees = max(audit_result.app_fees, request.app_fees)
        
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
        "base_subscription": 29.0,
        "app_fees": request.app_fees,
        "platform_transaction_fee": request.revenue * 0.02,
        "hosting_cost": 2.0,
        "estimated_monthly_total": 0, # Calculated inside generate_audit_pricing
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
