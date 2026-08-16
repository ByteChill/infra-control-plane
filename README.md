# Infra Control Plane

An agent-native internal platform for managing infrastructure assets, discovered resources, and long-running operational workflows across AWS, GCP, Ali, and internal Kubernetes (IKP).

## Project execution

- [`PLAN.md`](PLAN.md) — phased implementation plan and exit criteria.
- [`TODO.md`](TODO.md) — actionable implementation checklist.
- [`docs/development.md`](docs/development.md) — development roadmap.

## Product shape

The platform has three primary domains:

- **Asset** — business and deployment topology: EIM, Tenant, Instance, Component, Deployment, Road Repo, Road Pipeline, and Execution.
- **Resource** — infrastructure and delivery resources discovered from providers: ECS, Lambda, RDS, CodePipeline, CodeBuild, GCP resources, Ali resources, IKP resources, and others.
- **Workflow** — asynchronous, multi-step operations that coordinate APIs, external systems, retries, approvals/external state, logs, and long-running executions.

Workflow is a platform capability, not a Road capability. Road is one external system used by some workflows.

## Technology baseline

### Frontend

- React
- TypeScript
- Vite
- Tailwind CSS
- shadcn/ui
- Beautiful UI
- TanStack Query
- TanStack Table
- TanStack Router
- React Hook Form
- Zod
- Zustand
- Framer Motion
- Lucide

**Next.js is intentionally not used.**

### Backend

- FastAPI
- SQLAlchemy
- Alembic
- PostgreSQL

### Runtime

Prefer AWS managed services where appropriate.

- React SPA → S3 + CloudFront
- FastAPI → ECS/Fargate
- Long-running workflows → AWS Step Functions
- Worker/integration tasks → Lambda and/or ECS
- Persistent data → PostgreSQL

## Domain vocabulary

The canonical model is documented in [`docs/domain-model.md`](docs/domain-model.md).

The most important distinctions are:

```text
EIM
└── Tenant
    ├── EnvSet
    ├── Instance
    │   └── Component
    │       └── Deployment
    │           ├── Road Repo
    │           ├── Road Pipeline
    │           └── Execution
    └── ...
```

This diagram is conceptual rather than a database schema. See the domain document for exact relationships.

## Road

Road is an existing internal AWS deployment platform. This project integrates with Road APIs and consumes Road results; it does not implement Road.

A Road-backed deployment has one Road Repo. Road Repo and Road Pipeline are asset concepts. A discovered generic CodePipeline is a Resource and should not automatically be modeled as a Road Pipeline.

## Agent-native development

Agents are first-class contributors to this repository.

Before making changes:

1. Read `AGENTS.md`.
2. Read the relevant domain/architecture document.
3. Identify invariants affected by the change.
4. Make the smallest coherent change.
5. Add tests.
6. Update documentation when behavior or architecture changes.
7. Review the final diff.

The repository documentation is intended to be usable by humans and coding agents.
