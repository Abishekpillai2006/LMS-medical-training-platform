import boto3
from botocore.config import Config
from botocore.exceptions import ClientError
from typing import Optional
from app.core.config import settings

class MinioService:
    def __init__(self):
        self.endpoint = settings.MINIO_ENDPOINT
        self.access_key = settings.MINIO_ACCESS_KEY
        self.secret_key = settings.MINIO_SECRET_KEY
        self.secure = settings.MINIO_SECURE
        self.bucket_name = settings.MINIO_BUCKET_NAME
        
        # Configure client connection
        # If running inside docker, MINIO_ENDPOINT is 'minio:9000'.
        # S3 expects HTTP/HTTPS protocol prefixes.
        url_protocol = "https" if self.secure else "http"
        endpoint_url = f"{url_protocol}://{self.endpoint}" if not self.endpoint.startswith("http") else self.endpoint
        
        self.client = boto3.client(
            "s3",
            endpoint_url=endpoint_url,
            aws_access_key_id=self.access_key,
            aws_secret_access_key=self.secret_key,
            config=Config(signature_version="s3v4"),
            region_name="us-east-1"  # Default region dummy value
        )
        
    def create_bucket_if_not_exists(self, bucket: str = None) -> None:
        bucket_to_check = bucket or self.bucket_name
        try:
            self.client.head_bucket(Bucket=bucket_to_check)
        except ClientError:
            # Bucket does not exist, creating it
            self.client.create_bucket(Bucket=bucket_to_check)

    def upload_file(self, file_content: bytes, object_name: str, content_type: str = "application/octet-stream") -> str:
        """
        Uploads a raw file (bytes) to the specified object key and returns the object name.
        """
        self.create_bucket_if_not_exists()
        
        self.client.put_object(
            Bucket=self.bucket_name,
            Key=object_name,
            Body=file_content,
            ContentType=content_type
        )
        return object_name

    def generate_presigned_download_url(self, object_name: str, expires_in_seconds: int = 3600) -> Optional[str]:
        """
        Generates a secure presigned GET URL for retrieving documents like certificates and telemetry logs.
        """
        try:
            url = self.client.generate_presigned_url(
                "get_object",
                Params={"Bucket": self.bucket_name, "Key": object_name},
                ExpiresIn=expires_in_seconds
            )
            return url
        except ClientError as e:
            # Handle potential errors or log
            print(f"Error generating presigned url: {e}")
            return None

minio_service = MinioService()
