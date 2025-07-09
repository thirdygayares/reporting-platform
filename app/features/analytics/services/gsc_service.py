from datetime import datetime, timedelta
from google.oauth2 import service_account
from googleapiclient.discovery import build
from typing import List

from app.core.settings import settings
from app.features.analytics.schema.gsc_data import GSCData

SCOPES = ['https://www.googleapis.com/auth/webmasters.readonly']
SITE_URL = 'sc-domain:thirdygayares.com'

credentials = service_account.Credentials.from_service_account_file(
    settings.SERVICE_ACCOUNT_FILE, scopes=SCOPES
)

def fetch_gsc_data(days: int = 30) -> List[GSCData]:
    service = build('searchconsole', 'v1', credentials=credentials)
    end_date = datetime.today().date()
    start_date = end_date - timedelta(days=days)

    request = {
        'startDate': str(start_date),
        'endDate': str(end_date),
        'dimensions': ['date'],
        'rowLimit': 1000
    }

    response = service.searchanalytics().query(siteUrl=SITE_URL, body=request).execute()

    result = []
    for row in response.get('rows', []):
        result.append(GSCData(
            date=row['keys'][0],
            clicks=row['clicks'],
            impressions=row['impressions'],
            ctr=row['ctr'],
            position=row['position']
        ))

    return result
