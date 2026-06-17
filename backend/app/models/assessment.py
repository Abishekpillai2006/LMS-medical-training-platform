import enum
from sqlalchemy import String, Integer, Enum, ForeignKey, Float
from sqlalchemy.orm import Mapped, mapped_column, relationship
from typing import List, TYPE_CHECKING
from app.db.base_class import Base

if TYPE_CHECKING:
    from app.models.course import Course
    from app.models.user import User

class AssessmentType(str, enum.Enum):
    QUIZ = "QUIZ"
    PRACTICAL = "PRACTICAL"
    OSCE = "OSCE" # Objective Structured Clinical Examination

class Assessment(Base):
    title: Mapped[str] = mapped_column(String(255), nullable=False)
    type: Mapped[AssessmentType] = mapped_column(
        Enum(AssessmentType, name="assessment_type", create_type=True),
        nullable=False
    )
    max_score: Mapped[int] = mapped_column(Integer, default=100, nullable=False)
    passing_score: Mapped[int] = mapped_column(Integer, default=70, nullable=False)
    course_id: Mapped[int] = mapped_column(Integer, ForeignKey("course.id", ondelete="CASCADE"), nullable=False)

    # Relationships
    course: Mapped["Course"] = relationship("Course", back_populates="assessments")
    results: Mapped[List["AssessmentResult"]] = relationship(
        "AssessmentResult",
        back_populates="assessment",
        cascade="all, delete-orphan"
    )

class AssessmentResult(Base):
    __tablename__ = "assessment_result"

    score: Mapped[float] = mapped_column(Float, nullable=False)
    is_passed: Mapped[bool] = mapped_column(nullable=False, default=False)
    user_id: Mapped[int] = mapped_column(Integer, ForeignKey("user.id", ondelete="CASCADE"), nullable=False)
    assessment_id: Mapped[int] = mapped_column(Integer, ForeignKey("assessment.id", ondelete="CASCADE"), nullable=False)

    # Relationships
    assessment: Mapped["Assessment"] = relationship("Assessment", back_populates="results")
    # We don't necessarily need back_populates on User unless explicitly required, but we can access user via relationship.
    user: Mapped["User"] = relationship("User")
