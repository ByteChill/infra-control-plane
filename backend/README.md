# Backend

FastAPI service for the Infra Control Plane.

## Local development

```bash
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -e '.[dev]'
uvicorn app.main:app --reload
```

The current implementation is intentionally a thin skeleton. Persistence, authentication, workflow orchestration, and integrations will be added behind the documented boundaries.
