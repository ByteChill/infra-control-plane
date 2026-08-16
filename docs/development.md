# Development Roadmap

This is the initial implementation skeleton. The next implementation phases should be deliberate.

## Phase 1 — foundation

- [ ] PostgreSQL models and Alembic
- [ ] authentication and application RBAC
- [ ] frontend routing/layout
- [ ] TanStack Query API client
- [ ] shared UI component system
- [ ] workflow execution persistence

## Phase 2 — asset inventory

- [ ] EIM
- [ ] Tenant
- [ ] EnvSet
- [ ] Instance
- [ ] Component
- [ ] Deployment
- [ ] Road Repo
- [ ] Road Pipeline
- [ ] Execution

## Phase 3 — resource discovery

- [ ] AWS discovery
- [ ] GCP discovery
- [ ] Ali discovery
- [ ] IKP discovery
- [ ] resource normalization
- [ ] scheduled reconciliation

## Phase 4 — Road workflows

- [ ] GitHub repository template/fork workflow
- [ ] generated-file Diff preview
- [ ] repository onboarding
- [ ] pipeline-manager Terraform generation
- [ ] GitHub Check Run correlation
- [ ] CodePipeline execution correlation

## Phase 5 — generic runners

- [ ] CodePipeline Runner workflow
- [ ] CodeBuild Runner workflow
- [ ] dynamic logs
- [ ] retry/reconciliation
- [ ] resource-level Run actions

## Phase 6 — production hardening

- [ ] audit trail
- [ ] observability
- [ ] rate-limit handling
- [ ] integration contract tests
- [ ] deployment infrastructure
