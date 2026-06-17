import asyncio
from app.db.database import AsyncSessionLocal
from app.models.user import User, UserRole
from app.core.security import get_password_hash
from sqlalchemy import select

async def seed():
    async with AsyncSessionLocal() as session:
        # Check if users already exist
        result = await session.execute(select(User))
        existing_users = result.scalars().all()
        if len(existing_users) > 0:
            print("Users already exist. Skipping seed.")
            return
            
        users = [
            User(
                email="learner@pulsemed.edu",
                hashed_password=get_password_hash("learnerpass123"),
                first_name="Jane",
                last_name="Doe",
                role=UserRole.LEARNER
            ),
            User(
                email="faculty@pulsemed.edu",
                hashed_password=get_password_hash("facultypass123"),
                first_name="Dr. Sarah",
                last_name="Keller",
                role=UserRole.FACULTY
            ),
            User(
                email="admin@pulsemed.edu",
                hashed_password=get_password_hash("adminpass123"),
                first_name="Alex",
                last_name="Admin",
                role=UserRole.ADMIN
            ),
        ]
        session.add_all(users)
        await session.commit()
        print("Database seeded successfully with test credentials!")

if __name__ == "__main__":
    asyncio.run(seed())
