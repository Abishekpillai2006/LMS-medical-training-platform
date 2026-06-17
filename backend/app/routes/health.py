from fastapi import APIRouter, Depends, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import text
from redis import Redis
import boto3
from botocore.config import Config
from app.db.database import get_db
from app.core.config import settings

router = APIRouter()

@router.get("/health", status_code=status.HTTP_200_OK)
async def health_check(db: AsyncSession = Depends(get_db)):
    health_status = {
        "status": "healthy",
        "services": {
            "database": "unhealthy",
            "redis": "unhealthy",
            "minio": "unhealthy"
        }
    }
    
    # 1. Database Health Check
    try:
        await db.execute(text("SELECT 1"))
        health_status["services"]["database"] = "healthy"
    except Exception as e:
        health_status["status"] = "degraded"
        health_status["services"]["database"] = f"error: {str(e)}"

    # 2. Redis Health Check
    try:
        r = Redis.from_url(settings.REDIS_URL, socket_connect_timeout=2)
        if r.ping():
            health_status["services"]["redis"] = "healthy"
    except Exception as e:
        health_status["status"] = "degraded"
        health_status["services"]["redis"] = f"error: {str(e)}"

    # 3. MinIO Health Check
    try:
        s3 = boto3.client(
            "s3",
            endpoint_url=f"http://{settings.MINIO_ENDPOINT}" if not settings.MINIO_ENDPOINT.startswith("http") else settings.MINIO_ENDPOINT,
            aws_access_key_id=settings.MINIO_ACCESS_KEY,
            aws_secret_access_key=settings.MINIO_SECRET_KEY,
            config=Config(signature_version="s3v4"),
            region_name="us-east-1"
        )
        # Just check if we can list buckets or connection is open
        s3.list_buckets()
        health_status["services"]["minio"] = "healthy"
    except Exception as e:
        health_status["status"] = "degraded"
        health_status["services"]["minio"] = f"error: {str(e)}"

    return health_status
