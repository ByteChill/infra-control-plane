from enum import StrEnum


class Provider(StrEnum):
    AWS = "aws"
    GCP = "gcp"
    ALI = "ali"
    IKP = "ikp"


class WorkflowStatus(StrEnum):
    PENDING = "pending"
    RUNNING = "running"
    WAITING = "waiting"
    SUCCEEDED = "succeeded"
    FAILED = "failed"
    CANCELLED = "cancelled"
