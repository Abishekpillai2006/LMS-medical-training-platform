from datetime import datetime
from sqlalchemy import String, Text, Integer, ForeignKey, Float, DateTime, JSON
from sqlalchemy.orm import Mapped, mapped_column, relationship
from typing import Optional, List, TYPE_CHECKING
from pgvector.sqlalchemy import Vector
from app.db.base_class import Base

if TYPE_CHECKING:
    from app.models.user import User

class Simulation(Base):
    name: Mapped[str] = mapped_column(String(255), nullable=False)
    description: Mapped[str] = mapped_column(Text, nullable=True)
    scenario_code: Mapped[str] = mapped_column(String(100), unique=True, index=True, nullable=False)
    difficulty_level: Mapped[str] = mapped_column(String(50), default="Intermediate", nullable=False)
    
    # 1536-dimensional scenario embedding for semantic recommendation
    embedding: Mapped[Optional[list]] = mapped_column(Vector(1536), nullable=True)

    # Relationships
    attempts: Mapped[List["SimulationAttempt"]] = relationship(
        "SimulationAttempt",
        back_populates="simulation",
        cascade="all, delete-orphan"
    )

class SimulationAttempt(Base):
    __tablename__ = "simulation_attempt"

    score: Mapped[float] = mapped_column(Float, nullable=False)
    telemetry_logs: Mapped[Optional[dict]] = mapped_column(JSON, nullable=True) # VR/AR telemetry data JSON
    completed_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=datetime.utcnow, nullable=False)
    
    user_id: Mapped[int] = mapped_column(Integer, ForeignKey("user.id", ondelete="CASCADE"), nullable=False)
    simulation_id: Mapped[int] = mapped_column(Integer, ForeignKey("simulation.id", ondelete="CASCADE"), nullable=False)

    # Relationships
    user: Mapped["User"] = relationship("User", back_populates="simulation_attempts")
    simulation: Mapped["Simulation"] = relationship("Simulation", back_populates="attempts")
