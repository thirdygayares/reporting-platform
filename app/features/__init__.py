from fastapi import FastAPI

from .analytics import router as analytics_router

def register_routers(app: FastAPI):
    app.include_router(analytics_router.router)
