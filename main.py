from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.core.cors import CORS_ALLOWED_ORIGINS
from app.features import register_routers

app = FastAPI()

register_routers(app)

app.add_middleware(
    CORSMiddleware,
    allow_origins=CORS_ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def read_root():
    return {"message": "Ping!"}