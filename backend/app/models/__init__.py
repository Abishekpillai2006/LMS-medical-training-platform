from app.db.base_class import Base
from app.models.user import User, UserRole
from app.models.course import Course
from app.models.batch import Batch, user_batch
from app.models.assessment import Assessment, AssessmentResult, AssessmentType
from app.models.certification import Certification
from app.models.simulation import Simulation, SimulationAttempt

# Expose Base and all models for Alembic auto-discovery
__all__ = [
    "Base",
    "User",
    "UserRole",
    "Course",
    "Batch",
    "user_batch",
    "Assessment",
    "AssessmentResult",
    "AssessmentType",
    "Certification",
    "Simulation",
    "SimulationAttempt"
]
