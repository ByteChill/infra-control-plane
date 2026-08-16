# Frontend Architecture

## Stack

```text
React
TypeScript
Vite

Tailwind CSS
shadcn/ui
Beautiful UI

TanStack Query
TanStack Table
TanStack Router

React Hook Form
Zod
Zustand

Framer Motion
Lucide
```

Next.js is intentionally excluded.

## Responsibilities

The SPA owns:

- navigation
- views
- forms
- tables
- filters
- workflow visualization
- execution timelines
- logs
- change previews
- optimistic/UI state

FastAPI owns business logic and persistent state.

## UI principles

This is an internal platform UI for operators, developers, and platform engineers.

Prioritize:

- clear business terminology
- fast navigation
- useful defaults
- dense but readable tables
- visible status
- meaningful relationships
- progressive disclosure
- safe mutation UX

Avoid making the interface look like a raw database administration tool.

## Core navigation

A likely top-level information architecture:

```text
Dashboard

Assets
├── EIMs
├── Tenants
├── Instances
├── Components
├── Deployments
├── Road Repos
├── Road Pipelines
└── Executions

Resources
├── AWS
├── GCP
├── Ali
└── IKP

Workflows
├── Active
├── History
└── Templates
```

The exact navigation can evolve without changing the domain model.

## Workflow UI

Workflow pages should expose:

- overall status
- current step
- step history
- duration
- retries
- external IDs
- dynamic logs
- errors
- input parameters
- output/result
- related assets/resources

Use lightweight animations to communicate state transitions, not decoration.

## Diff

Beautiful UI's Diff component should be used for generated changes where applicable.

Typical flow:

```text
Generate changes
      ↓
View Diff
      ↓
Confirm
      ↓
Mutate
```

Examples:

- Git file changes
- generated Terraform
- PR changes
- structured entity changes

## Tables

TanStack Table is the foundation for large datasets.

Common patterns:

- server-side pagination
- filtering
- sorting
- column visibility
- row selection
- contextual actions
- deep links

## Data fetching

TanStack Query is the default for server state.

Do not duplicate server data into Zustand unless there is a specific UI-state reason.

SSE should be used for long-running execution updates and logs where a push model is beneficial.

## Accessibility

Interactive states must remain understandable without animation.

Do not rely on color alone to communicate workflow state.
