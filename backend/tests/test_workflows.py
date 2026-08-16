from fastapi.testclient import TestClient

from app.main import app


client = TestClient(app)


def test_create_workflow_returns_execution_id() -> None:
    response = client.post(
        "/api/workflows",
        json={"workflow_type": "codepipeline-runner", "input": {"pipeline_id": "example"}},
    )

    assert response.status_code == 202
    body = response.json()
    assert body["status"] == "PENDING"
    assert body["execution_id"]
