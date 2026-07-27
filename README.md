# Internship/Job Application Tracker

A full-stack CRUD application for tracking internship and job applications — companies, roles, application status, deadlines, interviews, and notes. Doubles as a real tool for tracking actual Summer 2027 applications while being built.

## Table of contents

- [Features](#features)
- [Tech stack](#tech-stack)
- [Project structure](#project-structure)
- [Getting started](#getting-started)
- [Environment variables](#environment-variables)
- [Running with Docker](#running-with-docker)
- [Database migrations](#database-migrations)
- [API overview](#api-overview)
- [Testing](#testing)
- [Roadmap](#roadmap)
- [License](#license)

## Features

- Track applications with company, position, status, dates, and notes
- Move applications through stages: Saved → Applied → Interview → Offer / Rejected
- Log interviews per application
- User authentication (JWT-based)
- REST API consumed by a React frontend

## Tech stack

- **Frontend:** React
- **Backend:** FastAPI (Python)
- **Database:** PostgreSQL/MySQL via SQLAlchemy
- **Migrations:** Alembic
- **Auth:** JWT
- **Testing:** pytest
- **Containerization:** Docker / docker-compose

## Project structure

```
job-tracker/
├── app/
│   ├── main.py         # FastAPI app instance, mounts routers
│   ├── config.py        # settings loaded from env vars
│   ├── database.py      # DB engine, session, get_db() dependency
│   ├── models/           # SQLAlchemy ORM models
│   ├── schemas/           # Pydantic request/response shapes
│   ├── routers/            # route handlers, one file per resource
│   ├── services/             # business logic, called by routers
│   ├── core/                  # security (JWT/hashing), dependencies
│   └── tests/
├── alembic/               # migration scripts
├── frontend/               # React app
├── .env.example
├── requirements.txt
├── Dockerfile
└── docker-compose.yml
```

See `Notes.md` (untracked, local-only) for the full architecture writeup and learning notes behind these decisions.

## Getting started

### Prerequisites

- Python 3.11+
- Node.js 18+
- PostgreSQL/MySQL (or use Docker, see below)

### Backend setup

```bash
cd app
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
cp .env.example .env   # fill in your local values
alembic upgrade head
uvicorn app.main:app --reload
```

### Frontend setup

```bash
cd frontend
npm install
npm run dev
```

## Environment variables

Copy `.env.example` to `.env` and fill in:

| Variable | Description |
| --- | --- |
| `DATABASE_URL` | Connection string for the database |
| `SECRET_KEY` | Secret used to sign JWTs |
| `ACCESS_TOKEN_EXPIRE_MINUTES` | JWT expiry window |

## Running with Docker

```bash
docker-compose up --build
```

This starts the API and database together for local development.

## Database migrations

```bash
alembic revision --autogenerate -m "description of change"
alembic upgrade head
```

## API overview

| Method | Endpoint | Description |
| --- | --- | --- |
| POST | `/auth/register` | Create a user account |
| POST | `/auth/login` | Authenticate and receive a JWT |
| GET | `/applications` | List the current user's applications |
| POST | `/applications` | Create a new application |
| GET | `/applications/{id}` | Get a single application |
| PATCH | `/applications/{id}` | Update an application |
| DELETE | `/applications/{id}` | Delete an application |

## Testing

```bash
pytest
```

## Roadmap

- [ ] Email reminders before deadlines
- [ ] Resume tracking per application
- [ ] AI job description analysis
- [ ] Dashboard analytics

## License

MIT
