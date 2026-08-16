from uuid import UUID, uuid4

from fastapi import APIRouter, status
from pydantic import BaseModel, Field

router = APIRouter(prefix="/workflows", tags=["workflows"])


class WorkflowCreate(BaseModel):
    workflow_type: str = Field(min_length=1)
    input: dict = Field(default_factory=dict)


class WorkflowAccepted(BaseModel):
    execution_id: UUID
    status: str


@router.post("", response_model=WorkflowAccepted, status_code=status.HTTP_202_ACCEPTED)
def create_workflow(command: WorkflowCreate) -> WorkflowAccepted:
    # Initial API contract only. Durable orchestration will be implemented
    # behind this boundary using Step Functions.
    return WorkflowAccepted(execution_id=uuid4(), status="PENDING")
