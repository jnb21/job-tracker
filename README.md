# Internship/Job Application Tracker

A CRUD API to track internship and job applications — companies, roles, application status, deadlines, and notes. Doubles as a real tool for tracking actual Summer 2027 applications while building it.

## Must understand before writing a line of code

### HTTP & REST basics

- The methods (GET, POST, PUT/PATCH, DELETE) and what "idempotent" means for each
- Status codes and what they signal (200 vs 201 vs 400 vs 401/403 vs 404 vs 500 — knowing the difference between 401 and 403 alone is a common interview question)
- Anatomy of a request/response: headers, body, path params vs query params
- REST conventions: resources as nouns in URLs (`/users/123/orders`, not `/getUserOrders`)

### Relational database fundamentals

- Tables, rows, primary keys, foreign keys
- Core SQL: SELECT/INSERT/UPDATE/DELETE, WHERE, JOIN (at least INNER and LEFT)
- Basic normalization — enough to avoid duplicating data across tables when you design your schema
- This matters even though you'll use an ORM — if you can't read the SQL your ORM generates, you can't debug it

### Layered architecture (this is where your OOP instincts pay off)

- Separating routes/controllers (handle HTTP) → services (business logic) → data access (talks to DB)
- Why: it's the difference between "code that works" and code an interviewer will actually respect. A single 300-line file that does everything is the #1 tell of a first backend project.

## Learn just-in-time, as you reach each piece

### Framework-specific (I'd lean FastAPI)

- Path operations / routing
- Pydantic models for request/response validation (this is FastAPI's biggest teaching value — it forces you to think in schemas)
- Dependency injection (FastAPI's `Depends`) — used for things like "give me the current authenticated user" or "give me a DB session"

### ORM + migrations

- SQLAlchemy models (Python classes mapping to tables)
- Sessions/transactions — when data actually commits
- Alembic for migrations — schema changes over time, not just `create_all()` once

### Auth

- Password hashing (bcrypt/argon2) — never store plaintext, and understand why
- JWTs or sessions — how the server knows who's asking on a stateless HTTP request
- Authentication (who are you) vs authorization (what are you allowed to do) — these are different concerns and get testable in system design interviews

### Testing

- pytest basics: fixtures, assertions
- Testing API endpoints against a test database (not your real one)
- Unit tests (a function in isolation) vs integration tests (a full request through the stack)

### Environment & secrets

- `.env` files and environment variables — never hardcode DB passwords/API keys
- Virtual environments (venv or poetry) so dependencies don't leak across projects

### Docker

- Image vs container
- Writing a Dockerfile for your app
- docker-compose to run your app + Postgres together locally

### Deployment

- What "deployed" actually means: a process running on a server, reachable by URL
- Environment variables in a hosting platform (Render/Railway/Fly.io)
- CORS — you'll hit this the moment you test from a browser or frontend
