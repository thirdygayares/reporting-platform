from typing import List

from fastapi import APIRouter, Query, HTTPException

from app.features.analytics.schema.facebook_ads_data import FacebookAdsData
from app.features.analytics.schema.ga4_data import GA4DailyData
from app.features.analytics.schema.gsc_data import GSCData
from app.features.analytics.services.facebook_service import fetch_facebook_ads_data
from app.features.analytics.services.ga4_service import fetch_ga4_data
from app.features.analytics.services.gsc_service import fetch_gsc_data

router = APIRouter(
    prefix="/api/analytics",
    tags=["analytics"]
)

@router.get("/gsc-data", response_model=List[GSCData])
def get_gsc_data(days: int = Query(30, ge=1, le=90)):
    """
    Get GSC data for the last N days.
    Default is 30. Max is 90.
    """
    return fetch_gsc_data(days)

@router.get("/ga4-data", response_model=List[GA4DailyData])
def get_ga4_data(days: int = Query(30, ge=1, le=90)):
    """
    Get GA4 data for the last N days.
    Default: 30, Max: 90
    """
    return fetch_ga4_data(days)


@router.get("/facebook-ads", response_model=FacebookAdsData)
def get_facebook_ads_data():
    try:
        return fetch_facebook_ads_data()
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))