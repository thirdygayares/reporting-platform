from pydantic import BaseModel

class FacebookAdsData(BaseModel):
    account_name: str
    account_currency: str
    reach: str
    impressions: str
    frequency: str
    spend: str
