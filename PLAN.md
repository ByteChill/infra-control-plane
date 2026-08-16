# Implementation Plan

## 1. Purpose

Build an agent-native Infrastructure Control Plane that provides:

- a normalized Asset model
- multi-provider Resource inventory
- asynchronous Workflow execution
- Road integration for AWS deployment workflows
- GitHub integration
- operational visibility through a polished React UI
- durable execution history and external-system correlation

The implementation must preserve the domain boundaries documented in `docs/domain-model.md`.

---

## 2. Architectural principles

### Domain first

Implement and validate the domain model before building large feature surfaces.

### Async by default for long operations

Anything involving multiple external APIs, polling, retries, long execution time, or dynamic logs must be represented by a Workflow Execution.

### Provider isolation

AWS, GCP, Ali, and IKP integrations remain behind provider-specific adapters.

### Road boundary

Road is an external platform. We integrate with its APIs and consume its state; we do not implement Road internals.

### Normalized persistence

Do not create large denormalized tables. Platform-owned entities have stable internal IDs and relationships. External IDs are stored for correlation.

### Agent-native development

Agents must read `AGENTS.md` and relevant documents before making changes. Changes should be small, testable, and reflected in documentation.

---

## 3. Implementation phases

### Phase 0 — Repository foundation

Goal: establish a clean engineering baseline.

Deliverables:

- frontend/backend build setup
- lint/test tooling
- environment configuration
- local PostgreSQL
- CI checks
- basic observability conventions
- API error contract

Exit criteria:

- frontend builds
- backend starts
- tests run
- lint runs
- CI validates pull requests

---

### Phase 1 — Identity, authentication, and authorization

Goal: establish the security boundary.

Deliverables:

- internal identity integration
- GitHub OAuth/App relationship where appropriate
- user model
- role/permission model
- authenticated FastAPI requests
- frontend session state
- authorization dependency/service

Important:

AWS credential acquisition must follow the organization's internal AD/FA/SAML/service-account mechanism. Do not invent a parallel AWS credential system.

Exit criteria:

- authenticated user can access the UI
- unauthorized users cannot access protected APIs
- domain operations can identify the acting user

---

### Phase 2 — Core Asset domain

Goal: implement the canonical Asset graph.

Order:

```text
EIM
  ↓
Tenant
  ↓
Instance
  ↓
Component
  ↓
Deployment
  ├── Road Repo
  ├── Road Pipeline
  └── Execution
```

Deliverables:

- SQLAlchemy models
- Alembic migrations
- repositories
- application services
- API schemas
- CRUD/read APIs
- relationship APIs
- audit fields

Important invariants:

- EIM ID is unique and 8 digits
- AWS Tenant EnvSet contains dev/preprod/prod
- Deployment targets the EnvSet
- Instance is regional/business-oriented
- every Road-backed Deployment has exactly one Road Repo

Exit criteria:

- Asset graph can be created and queried
- relationships are represented by IDs
- duplicate external data is avoided

---

### Phase 3 — Asset UI

Goal: make the domain understandable to users.

Pages:

```text
Dashboard
EIM list/detail
Tenant list/detail
Instance detail
Component detail
Deployment detail
Road Repo detail
Road Pipeline detail
Execution detail
```

UX priorities:

- business names first
- IDs available but secondary
- relationship navigation
- useful filters
- deep links
- clear status
- compact but readable tables

Use the established React/TanStack/shadcn/Beautiful UI stack.

---

### Phase 4 — Workflow foundation

Goal: create the generic asynchronous operation engine.

Deliverables:

- Workflow definition
- Workflow Execution
- Workflow Step Execution
- state transitions
- idempotency key
- retry metadata
- external execution correlation
- structured logs
- timestamps/duration
- error information
- Step Functions integration
- execution status API
- SSE/live updates

Conceptual model:

```text
Workflow
   ↓
Workflow Execution
   ↓
Step Execution × N
   ↓
External IDs / logs / result
```

Exit criteria:

- API starts a workflow and immediately returns an execution ID
- Step Functions owns long-running orchestration
- execution survives API process restarts
- UI can observe progress and logs

---

### Phase 5 — GitHub integration

Goal: provide safe repository operations.

Capabilities:

- GitHub App authentication
- repository discovery
- repository template lookup
- fork
- branch creation
- file read/write
- commit
- PR creation
- Check Run lookup
- webhook support

Mutation UX:

```text
Generate
  ↓
Diff Preview
  ↓
User confirmation
  ↓
Commit / PR
```

Do not expose raw GitHub implementation details in the core domain.

---

### Phase 6 — Road workflows

Goal: implement the initial business workflow discussed for Road.

Workflow family:

```text
Road Repository Setup
Road Deployment Setup
Pipeline Manager Terraform Generation
```

Expected high-level flow:

```text
select EIM
  ↓
select Tenant / Instance / Component
  ↓
select template
  ↓
generate repository changes
  ↓
Diff Preview
  ↓
fork / branch / commit / PR
  ↓
Road onboard
  ↓
generate pipeline-manager Terraform
  ↓
create branch
  ↓
generate folder + tf code
  ↓
run validation/check
  ↓
observe GitHub Check Run
  ↓
correlate CodePipeline execution ID
  ↓
persist result
```

The exact Road API contract should be captured in an integration adapter and contract tests.

---

### Phase 7 — Road CI/CD execution correlation

Goal: make versions and executions navigable.

Persist relationships between:

```text
version
git_tag
commit_sha
github_check_run_id
codepipeline_execution_id
```

UI should allow:

```text
Deployment
  → Version
  → Git tag
  → Commit
  → Check Run
  → CodePipeline execution
```

Production CR Change Request remains external.

---

### Phase 8 — Resource inventory

Goal: discover infrastructure independently from Assets.

Provider adapters:

```text
AWS
GCP
Ali
IKP
```

AWS initial resources:

```text
ECS
Lambda
RDS
CodePipeline
CodeBuild
```

Deliverables:

- provider resource model
- normalized resource identity
- provider-specific attributes
- periodic discovery
- reconciliation
- stale resource handling
- discovery execution history

Discovery must be idempotent.

---

### Phase 9 — Generic Resource Workflows

Goal: turn discovered operational resources into executable actions.

Initial workflow:

```text
CodePipeline Runner
CodeBuild Runner
```

UI flow:

```text
Resource detail
  ↓
Run
  ↓
collect/validate parameters
  ↓
create Workflow Execution
  ↓
invoke external API
  ↓
live logs
  ↓
external execution ID
  ↓
poll/callback
  ↓
final result
```

This demonstrates that Workflow is a generic platform capability rather than a Road-only feature.

---

### Phase 10 — Production hardening

Deliverables:

- audit trail
- structured logging
- metrics
- distributed tracing
- alerting
- rate-limit handling
- retry policies
- reconciliation jobs
- dead-letter/error handling
- integration contract tests
- security review
- backup/restore
- deployment automation

---

## 4. AWS runtime target

Preferred baseline:

```text
CloudFront
    ↓
S3
    ↓
React SPA

ALB / API Gateway
    ↓
ECS/Fargate
    ↓
FastAPI

FastAPI
    ↓
Step Functions
    ↓
Lambda / ECS workers
    ↓
External integrations

PostgreSQL
    ↑
application + workflow state
```

Use AWS managed services where they materially reduce operational complexity.

---

## 5. Definition of done

A feature is not complete merely because the API works.

A feature is complete when:

- domain invariants are enforced
- persistence is correct
- API contract exists
- frontend flow exists where applicable
- loading/error/empty states exist
- long operations are asynchronous
- logs/status are observable
- retries/idempotency are considered
- tests exist
- documentation is updated
- agent instructions remain accurate
- final diff contains no unrelated scope
