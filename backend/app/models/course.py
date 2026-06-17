from sqlalchemy import String, Text, Boolean
from sqlalchemy.orm import Mapped, mapped_column, relationship
from typing import List, TYPE_CHECKING
from app.db.base_class import Base

if TYPE_CHECKING:
    from app.models.batch import Batch
    from app.models.assessment import Assessment
    from app.models.certification import Certification

class Course(Base):
    title: Mapped[str] = mapped_column(String(255), index=True, nullable=False)
    description: Mapped[str] = mapped_column(Text, nullable=True)
    specialty: Mapped[str] = mapped_column(String(100), index=True, nullable=False) # e.g. Cardiology, Surgery, Pediatrics
    is_published: Mapped[bool] = mapped_column(Boolean, default=False, nullable=False)

    # Relationships
    batches: Mapped[List["Batch"]] = relationship(
        "Batch",
        back_populates="course",
        cascade="all, delete-orphan"
    )
    
    assessments: Mapped[List["Assessment"]] = relationship(
        "Assessment",
        back_populates="course",
        cascade="all, delete-orphan"
    )

    certifications: Mapped[List["Certification"]] = relationship(
        "Certification",
        back_populates="course",
        cascade="all, delete-orphan"
    )
