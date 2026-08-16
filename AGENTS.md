# Agent Instructions

## Mission

`infra-control-plane` is an agent-native internal control plane for infrastructure assets, resources, and asynchronous operational workflows.

Read `README.md` and the relevant documents under `docs/` before changing code or architecture.

## Source of truth

- `README.md` — product overview and fixed technology baseline.
- `docs/domain-model.md` — canonical domain vocabulary and relationships.
- `docs/architecture.md` — system boundaries and runtime architecture.
- `docs/workflows.md` — workflow semantics and Road lifecycle.
- `docs/frontend.md` — frontend stack and UX conventions.
- `docs/backend.md` — backend conventions.
- `docs/integrations.md` — external-system boundaries.

If implementation and documentation disagree, determine which is stale and update it deliberately. Do not silently invent a third interpretation.

## Fixed decisions

- Frontend: React + TypeScript + Vite. **Do not introduce Next.js.**
- UI: Tailwind CSS, shadcn/ui, and Beautiful UI where appropriate.
- Server state: TanStack Query. Tables: TanStack Table.
- Routing: TanStack Router.
- Forms: React Hook Form + Zod.
- UI-only state: Zustand.
- Animation: lightweight Framer Motion.
- Backend: FastAPI + SQLAlchemy + Alembic + PostgreSQL.
- Long-running, retryable, asynchronous operations are Workflow executions and must not block HTTP requests.
- Prefer AWS managed services where appropriate; Step Functions is the baseline orchestration service.
- Road is an external AWS deployment platform. Do not reimplement Road internals.
- Workflow is provider-agnostic and is not synonymous with Road.
- The platform supports AWS, GCP, Ali, and IKP through provider-specific integrations.

## Domain rules

- EIM is an internal unique 8-digit entity identifier.
- Tenant is the EIM + provider + EnvSet + tenant metadata boundary.
- An AWS Tenant EnvSet has exactly `dev`, `preprod`, and `prod` target accounts.
- Deployment targets the EnvSet, not a single environment account.
- Instance is a business-oriented regional concept under Tenant. `market` is Instance metadata and is not a general-purpose platform concept.
- Every Road-backed Deployment has exactly one Road Repo.
- Road Repo and Road Pipeline are Asset concepts. Generic discovered pipelines are Resources and are not automatically Road Pipelines.
- Execution correlates concrete runs with version, Git tag, commit SHA, GitHub Check Run, and CodePipeline execution IDs where applicable.
- CR Change Request is managed by an external system. This project consumes its API; it does not implement CR approval or scheduling.
- Avoid duplicating external entities across tables. Prefer stable IDs and explicit relationships.

## Coding rules

1. Keep business/domain logic out of HTTP route handlers where practical.
2. Keep provider-specific code behind explicit integration/adaptor boundaries.
3. Treat external API failures, timeouts, retries, and idempotency as first-class concerns.
4. Persist workflow/execution state so process restarts do not erase operational history.
5. Make operations idempotent where external APIs may be called more than once.
6. Never hard-code credentials, tokens, account IDs, repository secrets, or environment-specific secrets.
7. Prefer explicit typed contracts over unstructured dictionaries at domain boundaries.
8. Test domain rules and workflow transitions, not only HTTP endpoints.
9. Avoid dependencies that do not materially improve the architecture.
10. Update documentation when a product or architecture decision changes.

## UI rules

- Design for operators and platform engineers, not database administrators.
- Prefer business relationships and meaningful labels over raw IDs.
- Workflow pages expose step status, timing, external execution IDs, errors, and live logs.
- Long-running operations return an execution ID and are observed asynchronously.
- Use Diff/Change Preview before mutations when users can reasonably review generated changes.
- Keep animations subtle and purposeful.
- Reuse the established component system instead of inventing one-off visual patterns.

## Agent workflow

1. Read relevant docs before editing.
2. Identify the domain invariant affected by the change.
3. Make the smallest coherent change.
4. Add or update tests.
5. Update docs when behavior or architecture changes.
6. Review the diff for accidental scope expansion.
7. Never claim an external operation succeeded without a confirmed result.

## Agent skills

### Issue tracker

Issues are tracked as local Markdown files under `.scratch/`. See `docs/agents/issue-tracker.md`.

### Triage labels

The default triage label vocabulary is used. See `docs/agents/triage-labels.md`.

### Domain docs

Domain documentation uses a single-context layout. See `docs/agents/domain.md`.
