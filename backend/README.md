# Backend

FastAPI service for the Infra Control Plane. It runs on ECS/Fargate in
production and exposes the synchronous API boundary for the React SPA.

## Architecture

```text
React SPA
    │ HTTPS / SSE
    ▼
FastAPI
    ├── PostgreSQL
    ├── AWS Step Functions → Lambda / ECS workers
    └── GitHub, Road, AWS, GCP, Ali, and IKP integrations
```

The backend uses Python, FastAPI, SQLAlchemy, Alembic, and PostgreSQL. Keep
route handlers thin and follow this layering:

```text
API → application services → domain → repositories/persistence → integrations
```

Long-running operations must be launched as Workflow executions and return an
execution ID immediately; FastAPI must not wait for them to finish. Step
Functions orchestrates the work, while the API exposes persisted status, logs,
and results to the frontend.

Provider-specific SDKs, authentication, retries, and error mapping stay behind
explicit integration adapters. See [`../docs/backend.md`](../docs/backend.md),
[`../docs/architecture.md`](../docs/architecture.md), and
[`../docs/integrations.md`](../docs/integrations.md) for the specifications.

## Local development

```bash
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -e '.[dev]'
uvicorn app.main:app --reload
```

The current implementation is intentionally a thin skeleton. Persistence,
authentication, workflow orchestration, and integrations will be added behind
the documented boundaries.
