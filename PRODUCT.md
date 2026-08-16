# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary users are platform engineers, infrastructure operators, and internal developers who need to manage infrastructure asset topology, discovered provider resources, and long-running operational workflows from one internal control plane.

They work in situations where cloud/provider records, deployment systems, GitHub activity, change requests, and workflow execution state must be correlated without forcing users to reason from raw IDs alone.

## Product Purpose

Infra Control Plane is an agent-native internal platform for managing infrastructure assets, provider-discovered resources, and asynchronous operational workflows across AWS, GCP, Ali, and IKP.

Success means users can understand business deployment topology, inspect resource inventory, initiate or observe durable workflow executions, and navigate from business concepts to concrete external runs and identifiers.

## Positioning

The product connects three views that neighboring tools usually keep separate: business asset topology, provider-discovered resource inventory, and durable async workflow execution history.

It is not a replacement for Road, cloud consoles, GitHub, CR Change Request, or provider APIs. It integrates with those systems and preserves explicit correlations so operators can move between business context and external execution evidence.

## Operating Context

The platform is used around internal infrastructure operations, deployment setup, resource discovery, workflow execution, and production-release context.

Core operating concepts include EIM, Tenant, EnvSet, Instance, Component, Deployment, Road Repo, Road Pipeline, Execution, Resource, Workflow, and CR Change Request.

Long-running operations return execution IDs and are observed asynchronously. Workflow pages should expose step state, timing, external IDs, retries, errors, logs, inputs, outputs, and related assets or resources.

When generated changes are material and reviewable, users should see a Diff or Change Preview before mutation.

## Capabilities and Constraints

The fixed frontend baseline is React, TypeScript, Vite, Tailwind CSS, shadcn/ui, Beautiful UI, TanStack Query, TanStack Table, TanStack Router, React Hook Form, Zod, Zustand for UI-only state, Framer Motion, Lucide, and SSE. Next.js is intentionally excluded.

The fixed backend baseline is FastAPI, SQLAlchemy, Alembic, and PostgreSQL. Runtime architecture prefers AWS managed services where appropriate, including S3 and CloudFront for the SPA, ECS/Fargate for FastAPI, Step Functions for long-running workflows, Lambda or ECS for worker and integration tasks, and PostgreSQL for persistent state.

The platform supports AWS, GCP, Ali, and IKP through provider-specific integrations. Provider-specific APIs, authentication, and semantics must stay behind explicit adapters.

Road is an external AWS deployment platform. This project calls Road APIs and consumes Road results, but does not implement Road internals.

CR Change Request is an externally managed system. This project consumes CR APIs and correlates CR context, but does not implement CR approval rules, approval groups, or production scheduling.

AWS Tenant EnvSets have exactly `dev`, `preprod`, and `prod` target accounts. GCP and other providers may have different target-set semantics.

Open product decisions: exact authorization model details, product-specific accessibility standard, proof assets, and any formal brand or voice constraints beyond the existing product name and internal operator audience.

## Brand Commitments

The product name is Infra Control Plane. Existing repo copy presents it as an internal platform for platform operations, with a pragmatic operator-facing tone and domain language grounded in infrastructure relationships rather than marketing claims.

No durable visual identity, logo system, customer proof, benchmark, or external-facing brand narrative is currently confirmed.

## Evidence on Hand

Repository documentation provides the product overview, fixed technology baseline, domain model, architecture, frontend conventions, backend conventions, workflow semantics, and integration boundaries:

- `README.md`
- `docs/domain-model.md`
- `docs/architecture.md`
- `docs/frontend.md`
- `docs/backend.md`
- `docs/workflows.md`
- `docs/integrations.md`
- `frontend/README.md`

The current frontend scaffold demonstrates an early dashboard shell with navigation for Dashboard, Assets, Resources, and Workflows, plus example workflow execution and deployment summaries. It is evidence of product direction, not a confirmed visual system.

No real testimonials, production metrics, press, customer logos, compliance claims, or proof assets are present in the repository. Future work must not fabricate them.

## Product Principles

Keep business relationships visible before raw external identifiers.

Separate platform-owned domain state from external-system internals.

Make long-running operations durable, observable, and resumable.

Treat provider differences as integration concerns instead of flattening them into one cloud model.

Use reviewable previews before mutations that create or change material external artifacts.

## Accessibility & Inclusion

Interactive workflow state must remain understandable without animation or color alone.

No product-specific accessibility standard is confirmed yet.
