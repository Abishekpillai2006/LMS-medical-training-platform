import enum
from sqlalchemy import String, Enum, Boolean
from sqlalchemy.orm import Mapped, mapped_column, relationship
from typing import List, TYPE_CHECKING
from app.db.base_class import Base

if TYPE_CHECKING:
    from app.models.batch import Batch
    from app.models.certification import Certification
    from app.models.simulation import SimulationAttempt

class UserRole(str, enum.Enum):
    LEARNER = "LEARNER"
    FACULTY = "FACULTY"
    ADMIN = "ADMIN"

class User(Base):
    email: Mapped[str] = mapped_column(String(255), unique=True, index=True, nullable=False)
    hashed_password: Mapped[str] = mapped_column(String(255), nullable=False)
    first_name: Mapped[str] = mapped_column(String(100), nullable=False)
    last_name: Mapped[str] = mapped_column(String(100), nullable=False)
    is_active: Mapped[bool] = mapped_column(Boolean, default=True, nullable=False)
    role: Mapped[UserRole] = mapped_column(
        Enum(UserRole, name="user_role", create_type=True),
        default=UserRole.LEARNER,
        nullable=False
    )

    # Relationships
    batches: Mapped[List["Batch"]] = relationship(
        "Batch",
        secondary="user_batch",
        back_populates="users"
    )
    
    certifications: Mapped[List["Certification"]] = relationship(
        "Certification",
        back_populates="user",
        cascade="all, delete-orphan"
    )

    simulation_attempts: Mapped[List["SimulationAttempt"]] = relationship(
        "SimulationAttempt",
        back_populates="user",
        cascade="all, delete-orphan"
    )
