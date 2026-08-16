# Infra Control Plane

Infra Control Plane connects business deployment topology, externally owned infrastructure facts, and operational execution history so operators can understand and act across system boundaries.

## Language

**Platform Engineer**:
The primary operator who investigates infrastructure and deployment state and performs controlled operational actions across integrated systems.
_Avoid_: Administrator, database operator

**EIM**:
The business entity that owns Components and provider-specific Tenants, identified by a unique 8-digit number.
_Avoid_: Tenant, account

**Tenant**:
A provider-specific operational boundary owned by an EIM and containing one EnvSet.
_Avoid_: Account, environment

**EnvSet**:
The provider-specific set of deployment targets within a Tenant; an AWS EnvSet contains exactly the `dev`, `preprod`, and `prod` target accounts.
_Avoid_: Environment, Tenant

**Instance**:
A business-oriented regional target within a Tenant that gives deployments a meaningful regional identity.
_Avoid_: Component, cloud region

**Component**:
A stable business service owned by an EIM and deployable to one or more Tenant or Instance targets.
_Avoid_: Deployment, Instance

**Deployment**:
The relationship that deploys one Component to one Tenant and, when applicable, one Instance within that Tenant.
_Avoid_: Component, Execution

**Asset**:
A platform-owned business or deployment-topology concept, such as an EIM, Tenant, Instance, Component, Deployment, Road Repo, or Road Pipeline.
_Avoid_: Resource, cloud object

**Resource**:
An infrastructure or delivery object owned by an external provider and discovered by the platform.
_Avoid_: Asset, platform-owned object

**Workflow**:
A durable operational process that coordinates one or more steps and may interact with external systems.
_Avoid_: Road job, synchronous request

**Execution**:
A concrete run of a deployment, pipeline, or Workflow whose identifiers and outcomes can be correlated across systems.
_Avoid_: Workflow, configuration

**External System**:
A system such as Road, GitHub, CR Change Request, or a cloud provider that remains authoritative for the facts it owns.
_Avoid_: Internal module, replicated source of truth
