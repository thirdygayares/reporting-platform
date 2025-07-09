import requests

from app.core.settings import settings
from app.features.analytics.schema.facebook_ads_data import FacebookAdsData


def fetch_facebook_ads_data() -> FacebookAdsData:
    # Get account info (name + currency)
    account_url = f"https://graph.facebook.com/v19.0/act_{settings.AD_ACCOUNT_ID}"
    account_params = {
        'access_token': settings.META_ACCESS_TOKEN,
        'fields': 'name,currency'
    }
    account_resp = requests.get(account_url, params=account_params)
    account_resp.raise_for_status()
    account_data = account_resp.json()

    # Get insights
    insights_url = f"https://graph.facebook.com/v19.0/act_{settings.AD_ACCOUNT_ID}/insights"
    insights_params = {
        'access_token': settings.META_ACCESS_TOKEN,
        'fields': 'impressions,reach,frequency,spend',
        'level': 'account',
        'date_preset': 'last_30d'
    }
    insights_resp = requests.get(insights_url, params=insights_params)
    insights_resp.raise_for_status()
    insights_data = insights_resp.json().get("data", [])

    if not insights_data:
        raise Exception("No insights data found")

    row = insights_data[0]

    return FacebookAdsData(
        account_name=account_data.get("name"),
        account_currency=account_data.get("currency"),
        reach=row.get("reach"),
        impressions=row.get("impressions"),
        frequency=row.get("frequency"),
        spend=row.get("spend")
    )
