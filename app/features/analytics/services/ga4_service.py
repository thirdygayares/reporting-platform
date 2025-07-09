from google.analytics.data_v1beta import BetaAnalyticsDataClient
from google.analytics.data_v1beta.types import RunReportRequest, DateRange, Dimension, Metric
from google.oauth2 import service_account
from datetime import datetime, timedelta
from typing import List

from app.features.analytics.schema.ga4_data import GA4DailyData

KEY_PATH = "thirdygayares2-21175b35d9f4.json"
PROPERTY_ID = "472091369"

credentials = service_account.Credentials.from_service_account_file(KEY_PATH)
client = BetaAnalyticsDataClient(credentials=credentials)

def fetch_ga4_data(days: int = 30) -> List[GA4DailyData]:
    end_date = datetime.today()
    start_date = end_date - timedelta(days=days)

    request = RunReportRequest(
        property=f"properties/{PROPERTY_ID}",
        dimensions=[Dimension(name="date")],
        metrics=[
            Metric(name="newUsers"),
            Metric(name="activeUsers"),
            Metric(name="totalUsers"),
            Metric(name="sessions"),
            Metric(name="engagedSessions"),
            Metric(name="engagementRate"),
        ],
        date_ranges=[DateRange(start_date=start_date.strftime('%Y-%m-%d'),
                               end_date=end_date.strftime('%Y-%m-%d'))],
    )

    response = client.run_report(request)

    result = []
    for row in response.rows:
        result.append(GA4DailyData(
            date=row.dimension_values[0].value,
            new_users=int(row.metric_values[0].value),
            active_users=int(row.metric_values[1].value),
            total_users=int(row.metric_values[2].value),
            sessions=int(row.metric_values[3].value),
            engaged_sessions=int(row.metric_values[4].value),
            engagement_rate=float(row.metric_values[5].value),
        ))

    result.sort(key=lambda x: x.date)
    return result