from fastapi import FastAPI

from app.features import register_routers

app = FastAPI()

register_routers(app)

@app.get("/")
def read_root():
    return {"message": "Ping!"}