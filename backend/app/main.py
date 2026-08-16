from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.health import router as health_router
from app.api.workflows import router as workflow_router

app = FastAPI(
    title="Infra Control Plane API",
    version="0.1.0",
    description="Agent-native infrastructure control plane",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(health_router, prefix="/api")
app.include_router(workflow_router, prefix="/api")


@app.get("/api")
def api_root() -> dict[str, str]:
    return {"service": "infra-control-plane-api", "version": "0.1.0"}
