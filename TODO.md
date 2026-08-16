# TODO

Legend:

- [ ] Not started
- [~] In progress
- [x] Complete
- [!] Blocked / requires external contract

---

## P0 — Foundation

### Repository

- [x] Create agent instructions
- [x] Create architecture/domain documentation
- [x] Create frontend skeleton
- [x] Create FastAPI skeleton
- [x] Create local PostgreSQL compose setup
- [ ] Add root CI workflow
- [ ] Add frontend lint configuration
- [ ] Add backend lint/format configuration
- [ ] Add pre-commit or equivalent checks
- [ ] Add dependency update strategy

### API foundation

- [ ] Standard API error response
- [ ] Request correlation ID
- [ ] Pagination contract
- [ ] Filtering/sorting contract
- [ ] API versioning convention
- [ ] Health/readiness endpoints
- [ ] OpenAPI conventions

---

## P0 — Database / Asset Domain

### Database

- [ ] SQLAlchemy base configuration
- [ ] PostgreSQL settings
- [ ] Alembic setup
- [ ] migration CI check
- [ ] transaction/unit-of-work abstraction

### EIM

- [ ] EIM model
- [ ] 8-digit EIM validation
- [ ] EIM unique constraint
- [ ] EIM API
- [ ] EIM UI

### Tenant

- [ ] Tenant model
- [ ] provider field
- [ ] EnvSet relationship
- [ ] tenant metadata model
- [ ] AWS three-environment invariant
- [ ] Tenant API
- [ ] Tenant UI

### EnvSet

- [ ] EnvSet model
- [ ] provider-specific target representation
- [ ] AWS dev/preprod/prod validation
- [ ] target metadata
- [ ] EnvSet API
- [ ] EnvSet UI

### Instance

- [ ] Instance model
- [ ] target provider metadata
- [ ] region
- [ ] market metadata
- [ ] business identifier
- [ ] Instance API
- [ ] Instance UI

### Component

- [ ] Component model
- [ ] Component API
- [ ] Component UI
- [ ] Tenant/Instance relationships

### Deployment

- [ ] Deployment model
- [ ] target EnvSet relationship
- [ ] target Instance relationship
- [ ] Component relationship
- [ ] deployment type
- [ ] CI/CD classification
- [ ] Deployment API
- [ ] Deployment UI

### Road Repo

- [ ] Road Repo model
- [ ] Deployment one-to-one invariant
- [ ] GitHub repository identity
- [ ] Road repository identity
- [ ] Road Repo API
- [ ] Road Repo UI

### Road Pipeline

- [ ] Road Pipeline model
- [ ] Deployment relationship
- [ ] CI/CD classification
- [ ] Road pipeline identity
- [ ] Road Pipeline API
- [ ] Road Pipeline UI

### Execution

- [ ] Execution model
- [ ] Deployment relationship
- [ ] version
- [ ] git tag
- [ ] commit SHA
- [ ] GitHub Check Run ID
- [ ] CodePipeline execution ID
- [ ] Execution API
- [ ] Execution timeline UI

---

## P0 — Authentication / Authorization

- [ ] Internal user identity integration
- [ ] User model
- [ ] role model
- [ ] permission model
- [ ] protected FastAPI dependencies
- [ ] frontend auth/session handling
- [ ] authorization checks at application-service level
- [ ] audit actor
- [!] Confirm exact internal AD/FA/SAML/service-account contract

---

## P0 — Workflow Engine

### Domain

- [ ] Workflow model
- [ ] Workflow Execution model
- [ ] Workflow Step Execution model
- [ ] status state machine
- [ ] idempotency key
- [ ] retry metadata
- [ ] timestamps
- [ ] external execution references
- [ ] structured result
- [ ] error model

### Runtime

- [ ] Step Functions adapter
- [ ] workflow start service
- [ ] callback/polling strategy
- [ ] retry policy
- [ ] timeout policy
- [ ] cancellation
- [ ] reconciliation
- [ ] failure recovery

### Observability

- [ ] execution log model
- [ ] log correlation IDs
- [ ] live log API
- [ ] SSE stream
- [ ] execution detail API
- [ ] execution timeline UI
- [ ] step-level status UI

---

## P0 — GitHub Integration

- [ ] GitHub App adapter
- [ ] installation lookup
- [ ] repository discovery
- [ ] template repository lookup
- [ ] fork repository
- [ ] create branch
- [ ] read files
- [ ] write files
- [ ] commit
- [ ] PR creation
- [ ] Check Run lookup
- [ ] webhook endpoint
- [ ] webhook signature validation
- [ ] GitHub integration contract tests

---

## P0 — Road Integration

- [ ] Road client abstraction
- [ ] authentication configuration
- [ ] repository onboarding API
- [ ] repository lookup
- [ ] deployment/pipeline lookup
- [ ] trigger API
- [ ] execution lookup
- [ ] error mapping
- [ ] timeout policy
- [ ] retry/idempotency policy
- [!] Capture/confirm Road API contract
- [!] Capture/confirm Road webhook/check-run behavior

---

## P1 — Road Repository Workflow

- [ ] Select EIM workflow step
- [ ] Select Tenant workflow step
- [ ] Select Instance workflow step
- [ ] Select Component workflow step
- [ ] Select template
- [ ] Generate repository files
- [ ] Generate EIM/account/metadata values
- [ ] Diff preview
- [ ] User confirmation
- [ ] Fork
- [ ] Create branch
- [ ] Commit
- [ ] Create PR
- [ ] Onboard to Road
- [ ] Persist Road repo ID
- [ ] Persist GitHub repo ID
- [ ] Persist workflow result

---

## P1 — Pipeline Manager Workflow

- [ ] Select Deployment
- [ ] Generate `pipelines/<pipeline-name>/tf`
- [ ] Populate repo name variable
- [ ] Populate target information
- [ ] Create branch
- [ ] Generate Terraform files
- [ ] Diff preview
- [ ] Commit/PR
- [ ] Run validation
- [ ] Observe GitHub Check Run
- [ ] Persist Check Run ID
- [ ] Persist CodePipeline execution ID
- [ ] Correlate execution with version/tag/commit
- [ ] Update Deployment/Execution state

---

## P1 — Road CI/CD Correlation

- [ ] Model Git version
- [ ] Model tag
- [ ] Model commit
- [ ] Check Run correlation
- [ ] CodePipeline execution correlation
- [ ] dev CI flow
- [ ] dev CD flow
- [ ] preprod CI flow
- [ ] preprod CD flow
- [ ] production release correlation
- [ ] CR API integration
- [ ] CR status display

---

## P1 — Resource Inventory

### Resource foundation

- [ ] Resource model
- [ ] Provider model
- [ ] external resource ID
- [ ] region/location
- [ ] resource type
- [ ] discovered-at timestamp
- [ ] last-seen timestamp
- [ ] stale/deleted state
- [ ] normalized metadata

### AWS discovery

- [ ] ECS discovery
- [ ] Lambda discovery
- [ ] RDS discovery
- [ ] CodePipeline discovery
- [ ] CodeBuild discovery
- [ ] account discovery
- [ ] region discovery
- [ ] scheduled discovery
- [ ] reconciliation

### Other providers

- [ ] GCP adapter
- [ ] GCP project discovery
- [ ] Ali adapter
- [ ] Ali resource discovery
- [ ] IKP adapter
- [ ] IKP resource discovery

---

## P1 — Resource UI

- [ ] Resource inventory page
- [ ] provider filter
- [ ] resource type filter
- [ ] account/project filter
- [ ] region filter
- [ ] search
- [ ] resource detail
- [ ] discovered metadata
- [ ] linked Assets
- [ ] linked Deployments
- [ ] Run action

---

## P1 — Generic Runner Workflows

### CodePipeline Runner

- [ ] Run form
- [ ] parameter validation
- [ ] workflow execution
- [ ] CodePipeline start API
- [ ] external execution ID
- [ ] polling/callback
- [ ] live logs
- [ ] terminal status
- [ ] retry/reconciliation

### CodeBuild Runner

- [ ] Run form
- [ ] parameter validation
- [ ] workflow execution
- [ ] CodeBuild start API
- [ ] external execution ID
- [ ] live logs
- [ ] terminal status
- [ ] retry/reconciliation

---

## P1 — Frontend

### Shell

- [ ] production navigation
- [ ] breadcrumbs
- [ ] global search
- [ ] user menu
- [ ] provider context
- [ ] responsive layout

### Assets

- [ ] EIM list/detail
- [ ] Tenant list/detail
- [ ] Instance detail
- [ ] Component detail
- [ ] Deployment detail
- [ ] Road Repo detail
- [ ] Road Pipeline detail
- [ ] Execution detail

### Workflows

- [ ] workflow catalog
- [ ] start workflow dialog
- [ ] execution detail
- [ ] step timeline
- [ ] status indicators
- [ ] live logs
- [ ] retry/error presentation
- [ ] result summary
- [ ] external IDs with copy/deep-link

### Diff

- [ ] Git diff component
- [ ] Terraform diff
- [ ] structured change preview
- [ ] confirm mutation dialog

### UX quality

- [ ] loading states
- [ ] empty states
- [ ] error states
- [ ] keyboard accessibility
- [ ] animation conventions
- [ ] dark/light appearance decision
- [ ] reusable design tokens

---

## P2 — Production Hardening

- [ ] audit log
- [ ] structured application logging
- [ ] metrics
- [ ] tracing
- [ ] dashboards
- [ ] alerts
- [ ] rate-limit handling
- [ ] dead-letter handling
- [ ] reconciliation jobs
- [ ] backup/restore
- [ ] security review
- [ ] dependency scanning
- [ ] container scanning
- [ ] disaster recovery plan

---

## P2 — Deployment

- [ ] frontend S3 deployment
- [ ] CloudFront
- [ ] FastAPI container
- [ ] ECS/Fargate
- [ ] ALB/API ingress
- [ ] Step Functions
- [ ] Lambda workers where appropriate
- [ ] secrets management
- [ ] PostgreSQL managed deployment
- [ ] environment configuration
- [ ] CI/CD for the control plane itself

---

## Agent maintenance

- [ ] Keep `AGENTS.md` synchronized with architecture decisions
- [ ] Update `docs/domain-model.md` when domain invariants change
- [ ] Update `docs/architecture.md` when runtime boundaries change
- [ ] Update `docs/workflows.md` when workflow semantics change
- [ ] Update `docs/frontend.md` when frontend stack/conventions change
- [ ] Update `docs/backend.md` when backend conventions change
- [ ] Update `docs/integrations.md` when external contracts change
- [ ] Keep this TODO aligned with actual implementation status
