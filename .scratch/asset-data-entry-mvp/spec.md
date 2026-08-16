# Asset Data Entry and Display MVP

Status: ready-for-agent

## Problem Statement

Platform Engineers need a coherent way to record and inspect existing infrastructure business topology. Today the prototype displays hard-coded counts and activity but cannot persist an EIM, Tenant, Instance, Component, or Deployment, validate their relationships, or navigate between them. This prevents the team from validating whether the Asset model matches real operational data before introducing Road, cloud-provider, or Workflow integrations.

The first MVP must prove that the confirmed Asset relationships can be entered, persisted, corrected, archived, displayed, and navigated through a complete operator-facing experience. It must not invent fields or external data that have not yet been supplied.

## Solution

Build a working vertical slice for Asset data entry and display using the established React and FastAPI stack with PostgreSQL persistence. Platform Engineers can create and maintain EIMs, AWS Tenants with EnvSets, Instances, Components, and Deployments; inspect them in lists and detail views; and follow their relationships without reasoning from raw identifiers alone.

A deep Core Asset graph module owns cross-Asset invariants and persistence behavior behind one interface. The frontend provides contextual forms, meaningful validation, complete loading and error states, and relationship navigation. Road Repo, Road Pipeline, Execution, Resource, Workflow, external-system integration, fabricated demo data, and bulk import remain outside this MVP until representative real data is available.

## User Stories

1. As a Platform Engineer, I want to open an Asset workspace, so that I can manage infrastructure business topology from one place.
2. As a Platform Engineer, I want Asset lists to load from persisted data, so that refreshes and process restarts do not erase my work.
3. As a Platform Engineer, I want to create an EIM with a valid unique 8-digit identifier, so that business ownership has a stable identity.
4. As a Platform Engineer, I want invalid EIM identifiers rejected with a useful message, so that malformed business identities do not enter the topology.
5. As a Platform Engineer, I want duplicate EIM identifiers rejected, so that one business entity cannot be represented twice.
6. As a Platform Engineer, I want to view an EIM list, so that I can find the business entity I need.
7. As a Platform Engineer, I want to open an EIM detail view, so that I can inspect its Tenants, Components, and related Deployments.
8. As a Platform Engineer, I want to edit permitted EIM metadata, so that incorrect information can be corrected.
9. As a Platform Engineer, I want to create an AWS Tenant in the context of an EIM, so that provider-specific operational topology remains attached to its business owner.
10. As a Platform Engineer, I want each MVP Tenant to contain one EnvSet, so that its deployment targets are modeled consistently.
11. As a Platform Engineer, I want an AWS EnvSet to represent exactly the `dev`, `preprod`, and `prod` targets, so that incomplete or expanded AWS target sets cannot be recorded accidentally.
12. As a Platform Engineer, I want duplicate Tenants rejected by their confirmed business identity, so that the same EIM, Provider, and EnvSet name cannot be entered twice.
13. As a Platform Engineer, I want to view a Tenant list, so that I can scan provider-specific operational targets.
14. As a Platform Engineer, I want to open a Tenant detail view, so that I can inspect its EIM, EnvSet, Instances, and Deployments.
15. As a Platform Engineer, I want to create an Instance from a Tenant, so that a regional business target cannot be detached from its Tenant.
16. As a Platform Engineer, I want duplicate Instances rejected within the same Tenant, so that one regional business target is represented once.
17. As a Platform Engineer, I want to view Instance lists and details, so that I can understand each regional target and its related Deployments.
18. As a Platform Engineer, I want to create a Component from an EIM, so that the business service is owned independently of any regional target.
19. As a Platform Engineer, I want duplicate Components rejected within the same EIM, so that one business service retains one stable identity.
20. As a Platform Engineer, I want to view Component lists and details, so that I can inspect every target to which the Component is deployed.
21. As a Platform Engineer, I want to create a Deployment from a Component or target context, so that I can record the relationship without following a misleading linear wizard.
22. As a Platform Engineer, I want every Deployment to reference one Component and one Tenant, so that its business service and provider target are explicit.
23. As a Platform Engineer, I want a Deployment to reference an Instance only when that Instance belongs to its selected Tenant, so that cross-Tenant relationships cannot be created.
24. As a Platform Engineer, I want a Deployment to omit Instance when the real topology is Tenant-level, so that the model does not invent regional specificity.
25. As a Platform Engineer, I want duplicate Deployments rejected by their confirmed business identity, so that the same Component and target relationship is not entered twice.
26. As a Platform Engineer, I want Deployment lists and details to show meaningful Asset names before internal identifiers, so that the topology is readable to operators.
27. As a Platform Engineer, I want to navigate from a Deployment to its Component, Tenant, and optional Instance, so that I can move through the topology without repeated searches.
28. As a Platform Engineer, I want to navigate from an EIM, Tenant, Instance, or Component to related Assets, so that relationships remain discoverable in both directions.
29. As a Platform Engineer, I want create and edit forms to preserve my valid input after a validation failure, so that correcting one field does not discard the rest of my work.
30. As a Platform Engineer, I want server-side relationship and uniqueness errors shown next to the relevant form controls, so that I can resolve rejected changes.
31. As a Platform Engineer, I want an explicit success result after saving, so that I know the persisted record is the one now displayed.
32. As a Platform Engineer, I want loading, empty, error, and retry states on every data-backed screen, so that missing content is never confused with a working empty system.
33. As a Platform Engineer, I want hard-coded operational claims removed, so that the UI never presents fabricated health or integration status as fact.
34. As a Platform Engineer, I want to archive an Asset instead of hard-deleting it, so that historical relationships remain inspectable.
35. As a Platform Engineer, I want archived Assets excluded from new Deployment choices by default, so that inactive topology is not selected accidentally.
36. As a Platform Engineer, I want archived Assets visibly distinguished in historical views without relying on color alone, so that their lifecycle state is unambiguous.
37. As a Platform Engineer, I want creation and update timestamps displayed where operationally useful, so that I can understand when locally owned data changed.
38. As a Platform Engineer, I want prototype writes attributed to `Prototype Operator`, so that the audit presentation can be evaluated before real authentication is integrated.
39. As a Platform Engineer, I want the UI to expose business relationships rather than raw database structure, so that it behaves as an operator control plane rather than a database administration tool.
40. As a product team member, I want the MVP to use representative real data before defining external fields or import mappings, so that later screens reflect actual operational records instead of guesses.

## Implementation Decisions

- The MVP is a working vertical slice, not a static clickable mock. It uses real routes, forms, validation, HTTP transport, and PostgreSQL persistence.
- The frontend remains React, TypeScript, and Vite. Server state is owned by TanStack Query; forms use React Hook Form with Zod validation; tabular datasets use TanStack Table where it provides useful behavior.
- The backend remains FastAPI with SQLAlchemy, Alembic, and PostgreSQL.
- A Core Asset graph module is the primary seam. Its interface is the highest stable surface for creating, changing, querying, and archiving the confirmed Asset graph.
- HTTP route handlers translate transport input and output only. They do not own Asset relationship rules, transaction choreography, uniqueness policy, or archive behavior.
- Persistence details remain internal to the Core Asset graph module. Repository seams are not exposed merely to make tests convenient.
- EIM owns Components and provider-specific Tenants.
- Tenant belongs to one EIM and contains one EnvSet.
- MVP Tenant creation is limited to AWS. Multi-provider entry is deferred.
- An AWS EnvSet contains exactly `dev`, `preprod`, and `prod` targets.
- Instance belongs to one Tenant.
- Component belongs to one EIM, not to Instance. This preserves one business-service identity across regional targets.
- Deployment records the relationship between one Component, one Tenant, and an optional Instance within that Tenant.
- The Component ownership and Deployment targeting decision follows the accepted ADR and must not be replaced by the older linear hierarchy shown in stale diagrams.
- Platform-generated UUIDs provide stable internal identity. Confirmed business uniqueness is also enforced: EIM by its 8-digit identifier; Tenant by EIM, Provider, and EnvSet name; Instance by Tenant and name; Component by EIM and name; Deployment by Component, Tenant, and optional Instance.
- The application supports create, view, edit, and archive behavior. Hard deletion of referenced Assets is not part of the MVP.
- Archived Assets remain available to historical relationship views and are excluded from new Deployment selection by default.
- Data-entry interaction is contextual rather than a single forced wizard: EIM exposes Tenant and Component creation, Tenant exposes Instance creation, and Deployment creation begins from a meaningful Asset context.
- The UI includes Dashboard, Asset lists and details, create and edit forms, archive confirmation, relationship navigation, validation feedback, loading states, empty states, error states, and duplicate-data feedback.
- Domain names are primary in operator-facing views. Internal identifiers remain available when useful but are not the principal labels.
- Real authentication is deferred. MVP write attribution uses `Prototype Operator`, while the data model and presentation retain audit timestamps and an actor concept for later replacement.
- Existing hard-coded counts, execution rows, Deployment rows, and operational-health claims are not treated as real data.
- Actual field mappings beyond confirmed domain invariants are derived from representative real data. Agents must not invent Road, Execution, Resource, target-account, or organization-specific metadata.
- No external mutation occurs in this MVP.

## Testing Decisions

- Good tests assert externally observable behavior through a stable module interface. They do not assert internal SQLAlchemy structure, private helper calls, query-key layout, React view composition, or repository call order.
- The Core Asset graph module interface is the primary test surface.
- Core Asset graph tests run against an isolated PostgreSQL-compatible test database and exercise transactions through the same persistence implementation used by the application.
- Core Asset graph tests cover valid graph creation, every confirmed ownership relationship, Deployment targeting, optional Instance behavior, cross-Tenant rejection, uniqueness rules, edit behavior, archive behavior, and persistence across independent requests.
- The module tests verify that Component remains EIM-owned and that Deployment carries target relationships, protecting the accepted ADR from regression.
- HTTP tests remain narrow: request validation, status codes, response serialization, and translation of module outcomes into transport errors.
- A small browser-level acceptance suite covers the complete operator journey: enter the confirmed Asset graph, refresh, find the records, navigate relationships, edit permitted data, observe validation failures, and archive a record.
- Browser tests use the running frontend, FastAPI process, and isolated database rather than mocking the Core Asset graph module.
- Browser tests cover loading, empty, error, retry, successful save, duplicate rejection, archived-state presentation, and non-color status cues.
- Frontend tests prefer operator-visible outcomes and accessible roles or labels. They do not test internal hooks or view implementation details.
- Existing FastAPI TestClient smoke tests provide prior art for transport-level testing, but there is no existing Asset module, persistence, or frontend test suite to preserve.
- New tests replace redundant lower-level tests when they cover the same behavior through the higher seam. The interface remains the test surface.

## Out of Scope

- Road Repo and Road Pipeline ingestion or maintenance.
- Execution and Resource ingestion, synchronization, or fabricated demo records.
- Workflow creation, orchestration, observation, logs, or external execution correlation.
- GitHub, Road, CR Change Request, AWS control-plane, GCP, Ali, or IKP integration.
- External mutations, generated changes, Diff previews, approvals, or deployment actions.
- Real authentication, authorization roles, or organization identity integration.
- Providers other than AWS for data entry.
- CSV or JSON bulk import before representative real data and failure semantics are understood.
- Automatic discovery converting a Resource into an Asset.
- Replacing Road, cloud consoles, GitHub, or CR Change Request.
- A general-purpose cloud resource manager.

## Further Notes

- Representative real data is required before finalizing the complete field set, external identifier formats, display columns, example states, or bulk-import requirements. This spec intentionally leaves those facts unspecified.
- The following design questions were paused and must not be silently inferred: target deployment environment, final top-level navigation, topology-graph visualization, parent/child archive coordination, reassignment of referenced ownership relationships, and responsive-screen target.
- Work that does not depend on those decisions may proceed through the confirmed Core Asset graph seam. A short spec addendum should capture each deferred decision when the corresponding real data or product constraint becomes available.
- Existing documentation diagrams that nest Component under Instance are stale relative to the accepted ADR. Documentation should be corrected deliberately when implementation begins so the repository has one interpretation.
- The architecture review also identified future Workflow acceptance, frontend Asset workspace, and Execution observation deepening opportunities. They are not all mandated by this MVP spec; only the Core Asset graph module seam was confirmed for this work.
