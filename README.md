# PulseMed - Medical Training & Certification Management Platform
## Day 1–2 Foundation Setup & Developer Onboarding Guide

PulseMed is a state-of-the-art clinical learning ecosystem. This codebase contains the foundation architecture (FastAPI backend + React frontend + PostgreSQL/pgvector database + Redis + MinIO).

---

## 1. Project Directory Structure

```
medical-training-platform/
├── docker-compose.yml       # Production-ready PostgreSQL, Redis, MinIO, Backend & Frontend containers
├── README.md                # Development onboarding, branching policies, startup & testing manual
├── backend/
│   ├── Dockerfile           # Multi-stage python build supporting live hot-reloads
│   ├── requirements.txt     # Python pinned dependencies (FastAPI, SQLAlchemy Async, asyncpg, etc.)
│   ├── alembic.ini          # Alembic migrations configuration
│   ├── .env                 # Local variables file
│   ├── app/
│   │   ├── main.py          # FastAPI application initialization & middleware configurations
│   │   ├── core/
│   │   │   ├── config.py    # Pydantic Settings class loads environment variables
│   │   │   ├── security.py  # JWT encoding, decoding, and password encryption (bcrypt)
│   │   │   └── middleware.py# RBAC (Learner, Faculty, Admin) dependency guards
│   │   ├── db/
│   │   │   ├── database.py  # Async connection engine and AsyncSession Local factory
│   │   │   └── base_class.py# Custom declarative SQLAlchemy model base class
│   │   ├── models/          # SQLAlchemy Database Models (Declarative Map V2)
│   │   │   ├── __init__.py  # Models index for auto-detecting migrations
│   │   │   ├── user.py      # Users, active profiles, and roles (LEARNER, FACULTY, ADMIN)
│   │   │   ├── course.py    # Courses, categories, and module titles
│   │   │   ├── batch.py     # Course batches linking users in M2M relations
│   │   │   ├── assessment.py# Quizzes, OSCEs, and practical tests
│   │   │   ├── certification.py # Certifications & credentials tracking
│   │   │   └── simulation.py# VR scenario metadata & 1536-dim pgvector embeddings
│   │   ├── routes/          # FastAPI API Endpoints
│   │   │   ├── auth.py      # OAuth2 login token issuer, profile register, /me endpoint
│   │   │   ├── health.py    # Multi-system diagnostics checker (Postgres, Redis, MinIO)
│   │   │   └── users.py     # Admin user control endpoints
│   │   ├── schemas/         # Pydantic validation schemas
│   │   │   ├── user.py      # User requests and database serializations
│   │   │   └── token.py     # Token specifications
│   │   └── services/
│   │       └── minio_service.py # S3-compatible file storage connector (boto3)
│   └── alembic/             # Database migration configuration scripts
│       ├── env.py           # Sync/async DB connector configurations
│       ├── script.py.mako   # Migration generation template mapping pgvector
│       └── versions/        # Migration history
└── frontend/
    ├── Dockerfile           # Multi-stage Node build serving dev server / production Nginx
    ├── package.json         # React Vite package lock configurations
    ├── vite.config.js       # Vite server configurations & /api proxy routes
    ├── tailwind.config.js   # Tailored HSL clinical teal palette theme
    ├── postcss.config.js    # PostCSS configs
    ├── index.html           # Font pre-loader & entry DOM hook
    ├── nginx.conf           # Nginx single-page-app routing rule configs
    └── src/
        ├── main.jsx         # Root rendering script
        ├── index.css        # Tailwind classes & glassmorphism configurations
        ├── App.jsx          # Providers wrapper (AuthContext, QueryClient, React Router)
        ├── routes.jsx       # Route declarations
        ├── components/
        │   ├── ProtectedRoute.jsx # Checks token session active
        │   └── RoleGuard.jsx      # Guard enforcing Learner, Faculty, Admin roles
        ├── context/
        │   └── AuthContext.jsx    # Authentication caching & logins
        ├── hooks/
        │   └── useAuth.js         # Wrapper hook for AuthContext
        └── pages/
            ├── Login.jsx          # Login workspace with sandbox credentials injector
            └── Dashboard.jsx      # Role-based cockpit widgets (Learner, Faculty, Admin)
```

---

## 2. Git Branching & Collaboration Strategy for 4 Developers

To maintain code quality and fast delivery cycles, the team follows a **Trunk-Based Feature Branching** model.

### Branch Naming Conventions
- `main` is protected. No direct commits allowed. Represents production-ready code.
- Features: `feature/PM-<TicketNumber>-<short-description>` (e.g. `feature/PM-102-user-auth`)
- Hotfixes: `hotfix/PM-<TicketNumber>-<short-description>`
- Bugs: `bugfix/PM-<TicketNumber>-<short-description>`

### Pull Request & Code Quality Workflow
1. **Branch Creation**: Create a branch off the latest `main` branch.
2. **Commit Frequency**: Make small, incremental commits with descriptive messages.
3. **Pull Request Rules**:
   - Every PR requires at least **1 peer review approval** before merging.
   - All automated test suites (backend and frontend) must pass.
   - Static analysis lints must run without errors.
4. **Merge Strategy**: Use "Squash and Merge" to keep the git history clean.

---

## 3. Local Startup & Commands

### Option A: Complete Docker Compose Run (Recommended)
This fires up PostgreSQL (with pgvector), Redis, MinIO, backend, and frontend services in one command.

```bash
# Start all containers in the background
docker-compose up -d --build

# View active log streams
docker-compose logs -f

# Shut down and remove database volumes if resetting
docker-compose down -v
```

### Option B: Native Dev Startup (For rapid local debug)

#### 1. Database and Storage Infrastructure
Ensure Docker runs database infrastructure components:
```bash
# Start Postgres, Redis, and MinIO only
docker-compose up -d db redis minio
```

#### 2. Backend Server Setup
Ensure Python 3.11 is installed:
```bash
# Navigate to backend directory
cd backend

# Create virtual environment
python -m venv venv
venv\Scripts\activate   # On Windows
source venv/bin/activate # On Unix/macOS

# Install requirements
pip install -r requirements.txt

# Run migrations
alembic upgrade head

# Start development server with hot-reload
uvicorn app.main:app --reload
```

#### 3. Frontend App Setup
Ensure Node.js v20+ is installed:
```bash
# Navigate to frontend directory
cd frontend

# Install package dependencies
npm install

# Start Vite Development Server
npm run dev
```

---

## 4. Database Migrations (Alembic)

When editing SQLAlchemy schemas:
```bash
# 1. Generate new migration script automatically
alembic revision --autogenerate -m "describe_changes"

# 2. Review the generated file in backend/alembic/versions/

# 3. Apply the migration changes to database
alembic upgrade head

# 4. Rollback last migration if necessary
alembic downgrade -1
```

---

## 5. Testing & Verification

### Backend Tests
Pytest is used to run database and endpoint validations.
```bash
cd backend
# Run test suite
pytest -v
```

### Frontend Tests
Vitest or standard test scripts:
```bash
cd frontend
# Run lints
npm run lint
```
