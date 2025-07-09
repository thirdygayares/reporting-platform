from pydantic_settings import BaseSettings

class Settings(BaseSettings):

    SERVICE_ACCOUNT_FILE: str
    META_ACCESS_TOKEN: str
    AD_ACCOUNT_ID: str

    class Config:
        env_file = ".env"
        extra = "allow"

settings = Settings()
