"""initial_migration

Revision ID: 202606171400
Revises: 
Create Date: 2026-06-17 14:00:00.000000

"""
from typing import Sequence, Union
from alembic import op
import sqlalchemy as sa
import pgvector
from pgvector.sqlalchemy import Vector

# revision identifiers, used by Alembic.
revision: str = '202606171400'
down_revision: Union[str, None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # 0. Enable pgvector extension
    op.execute("CREATE EXTENSION IF NOT EXISTS vector")

    # 1. Create User table
    op.create_table(
        'user',
        sa.Column('id', sa.Integer(), autoincrement=True, nullable=False),
        sa.Column('email', sa.String(length=255), nullable=False),
        sa.Column('hashed_password', sa.String(length=255), nullable=False),
        sa.Column('first_name', sa.String(length=100), nullable=False),
        sa.Column('last_name', sa.String(length=100), nullable=False),
        sa.Column('is_active', sa.Boolean(), nullable=False),
        sa.Column('role', sa.Enum('LEARNER', 'FACULTY', 'ADMIN', name='user_role'), nullable=False),
        sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=False),
        sa.Column('updated_at', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=False),
        sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_user_email'), 'user', ['email'], unique=True)
    op.create_index(op.f('ix_user_id'), 'user', ['id'], unique=False)

    # 2. Create Course table
    op.create_table(
        'course',
        sa.Column('id', sa.Integer(), autoincrement=True, nullable=False),
        sa.Column('title', sa.String(length=255), nullable=False),
        sa.Column('description', sa.Text(), nullable=True),
        sa.Column('specialty', sa.String(length=100), nullable=False),
        sa.Column('is_published', sa.Boolean(), nullable=False),
        sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=False),
        sa.Column('updated_at', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=False),
        sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_course_id'), 'course', ['id'], unique=False)
    op.create_index(op.f('ix_course_specialty'), 'course', ['specialty'], unique=False)
    op.create_index(op.f('ix_course_title'), 'course', ['title'], unique=False)

    # 3. Create Batch table
    op.create_table(
        'batch',
        sa.Column('id', sa.Integer(), autoincrement=True, nullable=False),
        sa.Column('name', sa.String(length=100), nullable=False),
        sa.Column('start_date', sa.Date(), nullable=False),
        sa.Column('end_date', sa.Date(), nullable=False),
        sa.Column('course_id', sa.Integer(), nullable=False),
        sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=False),
        sa.Column('updated_at', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=False),
        sa.ForeignKeyConstraint(['course_id'], ['course.id'], ondelete='CASCADE'),
        sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_batch_id'), 'batch', ['id'], unique=False)

    # 4. Create User Batch Many-to-Many Association Table
    op.create_table(
        'user_batch',
        sa.Column('user_id', sa.Integer(), nullable=False),
        sa.Column('batch_id', sa.Integer(), nullable=False),
        sa.ForeignKeyConstraint(['batch_id'], ['batch.id'], ondelete='CASCADE'),
        sa.ForeignKeyConstraint(['user_id'], ['user.id'], ondelete='CASCADE'),
        sa.PrimaryKeyConstraint('user_id', 'batch_id')
    )

    # 5. Create Assessment table
    op.create_table(
        'assessment',
        sa.Column('id', sa.Integer(), autoincrement=True, nullable=False),
        sa.Column('title', sa.String(length=255), nullable=False),
        sa.Column('type', sa.Enum('QUIZ', 'PRACTICAL', 'OSCE', name='assessment_type'), nullable=False),
        sa.Column('max_score', sa.Integer(), nullable=False),
        sa.Column('passing_score', sa.Integer(), nullable=False),
        sa.Column('course_id', sa.Integer(), nullable=False),
        sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=False),
        sa.Column('updated_at', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=False),
        sa.ForeignKeyConstraint(['course_id'], ['course.id'], ondelete='CASCADE'),
        sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_assessment_id'), 'assessment', ['id'], unique=False)

    # 6. Create Assessment Result table
    op.create_table(
        'assessment_result',
        sa.Column('id', sa.Integer(), autoincrement=True, nullable=False),
        sa.Column('score', sa.Float(), nullable=False),
        sa.Column('is_passed', sa.Boolean(), nullable=False),
        sa.Column('user_id', sa.Integer(), nullable=False),
        sa.Column('assessment_id', sa.Integer(), nullable=False),
        sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=False),
        sa.Column('updated_at', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=False),
        sa.ForeignKeyConstraint(['assessment_id'], ['assessment.id'], ondelete='CASCADE'),
        sa.ForeignKeyConstraint(['user_id'], ['user.id'], ondelete='CASCADE'),
        sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_assessment_result_id'), 'assessment_result', ['id'], unique=False)

    # 7. Create Certification table
    op.create_table(
        'certification',
        sa.Column('id', sa.Integer(), autoincrement=True, nullable=False),
        sa.Column('title', sa.String(length=255), nullable=False),
        sa.Column('issue_date', sa.Date(), nullable=False),
        sa.Column('expiry_date', sa.Date(), nullable=True),
        sa.Column('credential_number', sa.String(length=100), nullable=False),
        sa.Column('certificate_pdf_url', sa.String(length=500), nullable=True),
        sa.Column('user_id', sa.Integer(), nullable=False),
        sa.Column('course_id', sa.Integer(), nullable=False),
        sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=False),
        sa.Column('updated_at', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=False),
        sa.ForeignKeyConstraint(['course_id'], ['course.id'], ondelete='CASCADE'),
        sa.ForeignKeyConstraint(['user_id'], ['user.id'], ondelete='CASCADE'),
        sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_certification_credential_number'), 'certification', ['credential_number'], unique=True)
    op.create_index(op.f('ix_certification_id'), 'certification', ['id'], unique=False)

    # 8. Create Simulation table
    op.create_table(
        'simulation',
        sa.Column('id', sa.Integer(), autoincrement=True, nullable=False),
        sa.Column('name', sa.String(length=255), nullable=False),
        sa.Column('description', sa.Text(), nullable=True),
        sa.Column('scenario_code', sa.String(length=100), nullable=False),
        sa.Column('difficulty_level', sa.String(length=50), nullable=False),
        sa.Column('embedding', Vector(dim=1536), nullable=True),
        sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=False),
        sa.Column('updated_at', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=False),
        sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_simulation_id'), 'simulation', ['id'], unique=False)
    op.create_index(op.f('ix_simulation_scenario_code'), 'simulation', ['scenario_code'], unique=True)

    # 9. Create Simulation Attempt table
    op.create_table(
        'simulation_attempt',
        sa.Column('id', sa.Integer(), autoincrement=True, nullable=False),
        sa.Column('score', sa.Float(), nullable=False),
        sa.Column('telemetry_logs', sa.JSON(), nullable=True),
        sa.Column('completed_at', sa.DateTime(timezone=True), nullable=False),
        sa.Column('user_id', sa.Integer(), nullable=False),
        sa.Column('simulation_id', sa.Integer(), nullable=False),
        sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=False),
        sa.Column('updated_at', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=False),
        sa.ForeignKeyConstraint(['simulation_id'], ['simulation.id'], ondelete='CASCADE'),
        sa.ForeignKeyConstraint(['user_id'], ['user.id'], ondelete='CASCADE'),
        sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_simulation_attempt_id'), 'simulation_attempt', ['id'], unique=False)


def downgrade() -> None:
    op.drop_index(op.f('ix_simulation_attempt_id'), table_name='simulation_attempt')
    op.drop_table('simulation_attempt')
    op.drop_index(op.f('ix_simulation_scenario_code'), table_name='simulation')
    op.drop_index(op.f('ix_simulation_id'), table_name='simulation')
    op.drop_table('simulation')
    op.drop_index(op.f('ix_certification_id'), table_name='certification')
    op.drop_index(op.f('ix_certification_credential_number'), table_name='certification')
    op.drop_table('certification')
    op.drop_index(op.f('ix_assessment_result_id'), table_name='assessment_result')
    op.drop_table('assessment_result')
    op.drop_index(op.f('ix_assessment_id'), table_name='assessment')
    op.drop_table('assessment')
    op.drop_table('user_batch')
    op.drop_index(op.f('ix_batch_id'), table_name='batch')
    op.drop_table('batch')
    op.drop_index(op.f('ix_course_title'), table_name='course')
    op.drop_index(op.f('ix_course_specialty'), table_name='course')
    op.drop_index(op.f('ix_course_id'), table_name='course')
    op.drop_table('course')
    op.drop_index(op.f('ix_user_id'), table_name='user')
    op.drop_index(op.f('ix_user_email'), table_name='user')
    op.drop_table('user')
    
    # Drop Enums
    op.execute("DROP TYPE user_role")
    op.execute("DROP TYPE assessment_type")
    
    # Disable vector extension
    op.execute("DROP EXTENSION IF EXISTS vector")
