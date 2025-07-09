from pydantic import BaseModel

class GSCData(BaseModel):
    date: str
    clicks: int
    impressions: int
    ctr: float
    position: float