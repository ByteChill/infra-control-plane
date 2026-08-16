# Architecture

## Goals

The platform is a provider-aware internal control plane with three major responsibilities:

1. Maintain a coherent Asset model.
2. Maintain a continuously refreshed Resource inventory.
3. Execute long-running asynchronous Workflows.

It is not itself the implementation of Road.

## High-level architecture

```text
┌──────────────────────────────────────────────┐
│                 React SPA                    │
│                                              │
│ Asset │ Resource │ Workflow │ Dashboard      │
└──────────────────────┬───────────────────────┘
                       │ HTTPS / SSE
                       ▼
┌──────────────────────────────────────────────┐
│                   FastAPI                    │
│                                              │
│ API / Auth / RBAC / Domain Services          │
└──────────────┬───────────────┬───────────────┘
               │               │
               ▼               ▼
        PostgreSQL        Workflow Service
                              │
                              ▼
                       AWS Step Functions
                              │
             ┌────────────────┼─────────────────┐
             ▼                ▼                 ▼
           Lambda            ECS           integrations
```

## Frontend

The frontend is a React SPA.

It does not use Next.js.

Deployment target:

```text
React/Vite build
    ↓
S3
    ↓
CloudFront
```

The browser talks to FastAPI for APIs and uses SSE for live workflow/execution updates where appropriate.

## Backend

FastAPI owns:

- authentication/session handling
- authorization/RBAC
- REST APIs
- domain application services
- workflow creation/query APIs
- resource inventory APIs
- integration boundaries

Route handlers should remain thin. Domain/application services should own business behavior.

## Workflow architecture

HTTP requests should not wait for long-running operations.

Instead:

```text
POST /workflows
       │
       ▼
create workflow execution
       │
       ▼
Step Functions
       │
       ├── step
       ├── external API
       ├── retry
       ├── wait
       ├── step
       └── result
       │
       ▼
persist execution state
```

The frontend receives an execution ID and observes it asynchronously.

## Resource discovery

Resource inventory is refreshed periodically by provider-specific discovery workflows.

Conceptually:

```text
EventBridge / scheduler
        ↓
discovery workflow
        ↓
provider adapters
        ↓
normalize
        ↓
PostgreSQL
```

The discovery layer should be idempotent and should retain enough provider identity to correlate resources back to the provider.

## Provider boundary

The system supports:

- AWS
- GCP
- Ali
- IKP

Provider-specific APIs and authentication must stay behind explicit adapters.

Do not make the core domain depend directly on an AWS SDK type.

## AWS authentication

AWS authentication follows the organization's internal AD/FA/SAML/service-account mechanism.

The application should consume the approved internal authentication flow rather than inventing an independent credential model.

Exact implementation belongs in the integration/authentication module.

## GitHub

The platform has a GitHub App for repository operations.

GitHub integration can support:

- repository discovery/scanning
- fork
- branch
- file changes
- commits
- pull requests
- check runs
- webhooks

GitHub identifiers should be persisted where needed for correlation.

## Road

Road is an external AWS deployment platform.

The platform calls Road APIs for Road-backed workflows and stores returned identifiers/results.

Road internals are outside this system boundary.

## Data principles

PostgreSQL is the source of truth for platform-owned metadata and execution history.

Do not use a single large denormalized table.

Prefer stable IDs and relationships.

External API responses can be stored in dedicated integration/state tables when durable raw data is useful, but the core domain model should remain normalized.
