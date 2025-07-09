from pydantic import BaseModel

class GA4DailyData(BaseModel):
    date: str
    new_users: int
    active_users: int
    total_users: int
    sessions: int
    engaged_sessions: int
    engagement_rate: float
