from datetime import date
from sqlalchemy import String, Integer, ForeignKey, Date
from sqlalchemy.orm import Mapped, mapped_column, relationship
from typing import Optional, TYPE_CHECKING
from app.db.base_class import Base

if TYPE_CHECKING:
    from app.models.user import User
    from app.models.course import Course

class Certification(Base):
    title: Mapped[str] = mapped_column(String(255), nullable=False)
    issue_date: Mapped[date] = mapped_column(Date, nullable=False)
    expiry_date: Mapped[Optional[date]] = mapped_column(Date, nullable=True)
    credential_number: Mapped[str] = mapped_column(String(100), unique=True, index=True, nullable=False)
    
    # Path/URL to the PDF cert stored in object storage (MinIO)
    certificate_pdf_url: Mapped[Optional[str]] = mapped_column(String(500), nullable=True)
    
    user_id: Mapped[int] = mapped_column(Integer, ForeignKey("user.id", ondelete="CASCADE"), nullable=False)
    course_id: Mapped[int] = mapped_column(Integer, ForeignKey("course.id", ondelete="CASCADE"), nullable=False)

    # Relationships
    user: Mapped["User"] = relationship("User", back_populates="certifications")
    course: Mapped["Course"] = relationship("Course", back_populates="certifications")
