from datetime import datetime
from sqlalchemy import DateTime, func
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, declared_attr

class Base(DeclarativeBase):
    # Automatically generate __tablename__ based on class name in lowercase
    @declared_attr.directive
    def __tablename__(cls) -> str:
        return cls.__name__.lower()

    # Base columns inherited by all tables
    id: Mapped[int] = mapped_column(primary_key=True, index=True, autoincrement=True)
    
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), 
        server_default=func.now(), 
        nullable=False
    )
    
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), 
        server_default=func.now(), 
        onupdate=func.now(), 
        nullable=False
    )
