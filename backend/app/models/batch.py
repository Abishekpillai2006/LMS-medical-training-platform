from datetime import date
from sqlalchemy import Table, Column, Integer, ForeignKey, String, Date
from sqlalchemy.orm import Mapped, mapped_column, relationship
from typing import List, TYPE_CHECKING
from app.db.base_class import Base

if TYPE_CHECKING:
    from app.models.user import User
    from app.models.course import Course

# Many-to-Many Association Table between User and Batch
user_batch = Table(
    "user_batch",
    Base.metadata,
    Column("user_id", Integer, ForeignKey("user.id", ondelete="CASCADE"), primary_key=True),
    Column("batch_id", Integer, ForeignKey("batch.id", ondelete="CASCADE"), primary_key=True)
)

class Batch(Base):
    name: Mapped[str] = mapped_column(String(100), nullable=False)
    start_date: Mapped[date] = mapped_column(Date, nullable=False)
    end_date: Mapped[date] = mapped_column(Date, nullable=False)
    course_id: Mapped[int] = mapped_column(Integer, ForeignKey("course.id", ondelete="CASCADE"), nullable=False)

    # Relationships
    course: Mapped["Course"] = relationship("Course", back_populates="batches")
    users: Mapped[List["User"]] = relationship(
        "User",
        secondary=user_batch,
        back_populates="batches"
    )
