# Backend Architecture

## Stack

- Python
- FastAPI
- SQLAlchemy
- Alembic
- PostgreSQL

## Layering

Prefer:

```text
API
 ↓
Application services
 ↓
Domain
 ↓
Repositories / persistence
 ↓
Integrations
```

The exact package structure can evolve, but domain behavior should not be buried inside HTTP route handlers.

## API style

APIs should expose stable domain concepts rather than leaking provider SDK models.

For long-running operations:

```text
POST /workflows/...
    ↓
202 Accepted
{
  "execution_id": "..."
}
```

The client then queries/subscribes to execution state.

## Persistence

PostgreSQL stores:

- asset metadata
- relationships
- resource inventory
- workflow definitions/configuration
- workflow executions
- step state
- external execution correlations
- audit-relevant operational history

Do not build one giant table containing every external field.

## IDs and relationships

Use stable internal IDs for platform-owned entities.

Store external IDs separately when needed:

```text
internal execution ID
github check run ID
codepipeline execution ID
road execution ID
```

Do not use a display name as a relational key.

## External API reliability

Every integration must consider:

- timeout
- retry
- backoff
- rate limits
- idempotency
- partial failure
- duplicate requests
- external state reconciliation

A successful HTTP request does not necessarily mean the external operation succeeded.

Persist enough state to resume or reconcile.

## Transactions

Use database transactions around domain state changes.

Do not hold database transactions open while waiting on slow external APIs.

Prefer:

```text
persist intent
commit
call external service
persist result
```

with idempotency/reconciliation where required.

## Authentication and authorization

Authentication follows the organization's approved identity integrations.

Authorization is application-owned and backed by the user/role model.

AWS credential acquisition follows the organization's internal AD/FA/SAML/service-account mechanism.

Never persist raw access tokens unless explicitly required by the approved security design.

## Testing

Prioritize:

- domain invariant tests
- workflow transition tests
- integration contract tests
- repository/persistence tests
- API tests

External integrations should be mocked or contract-tested in unit/integration test suites.
