# Domain Model

## Purpose

This document defines the canonical business vocabulary. Database tables should represent these concepts without unnecessarily duplicating external data.

## EIM

**EIM** is an internal entity identifier and is a unique 8-digit numeric value.

EIM has attributes such as:

- `eim_id`
- `name`
- business ID
- ITSO/user staff ID
- other internal metadata

An EIM can own targets for multiple infrastructure providers.

## Tenant

A **Tenant** is a virtual target boundary composed of:

- EIM
- provider
- EnvSet
- tenant metadata

Conceptually:

```text
Tenant = EIM + Provider + EnvSet + metadata
```

For AWS, an EnvSet contains exactly three environment accounts:

```text
dev
preprod
prod
```

A Deployment targets the Tenant/EnvSet rather than being modeled as a deployment to only one environment account.

GCP can have a different target-set shape. Provider-specific target semantics belong behind the provider boundary rather than forcing AWS's three-account model onto every provider.

## Instance

An **Instance** is a business-oriented regional virtual concept under a Tenant.

It represents a tenant's regional/business instance and contains metadata used to make deployment identifiers understandable.

Example:

```text
EIM A
└── AWS Tenant
    └── Instance: mws-uk
        └── target region: eu-west-2
```

`market` is metadata associated with an Instance. It is intentionally not a general platform-level abstraction.

The purpose is to distinguish technical identity from business identity:

```text
eimA-euw2
```

may be technically correct but less meaningful to a user than:

```text
mws-uk
```

## Component

A **Component** represents a service/application/component managed by the platform.

Examples:

- service A
- teller
- infra-deployment
- pipeline-manager

Components can have multiple deployments.

## Deployment

A **Deployment** represents a deployable relationship between a Component and a target Tenant/Instance.

A Deployment may represent different deployment mechanisms, such as ECS, Lambda, S3, or Road-managed infrastructure delivery.

For Road-backed deployments:

```text
Deployment
└── exactly one Road Repo
```

Deployment also has CI/CD semantics where applicable.

## Road Repo

A **Road Repo** is an asset representing a repository onboarded to Road and associated with a Deployment.

Examples:

```text
infra-deployment-...
ecs-deployment-teller-mws-uk
```

The exact repository naming convention is an implementation detail and must not replace relational identity.

## Road Pipeline

A **Road Pipeline** is an asset representing the pipeline configuration that Road uses to perform work for a repository/deployment.

This is intentionally distinct from generic discovered AWS CodePipeline resources.

## Execution

An **Execution** is a concrete run of a pipeline/workflow/deployment.

For Road-backed CI/CD it can correlate:

```text
version = 1.8.2
git_tag = v1.8.2
commit_sha = abc123
github_check_run_id = ...
codepipeline_execution_id = ...
```

These relationships are retained so users can navigate from a version to the exact Git event, check run, pipeline execution, and resulting deployment.

## Resource

A **Resource** represents infrastructure or delivery resources discovered from providers.

Examples:

```text
AWS
├── ECS
├── Lambda
├── RDS
├── CodePipeline
└── CodeBuild

GCP
...

Ali
...

IKP
...
```

Resources are discovered periodically and persisted. They are not the same thing as Assets.

For example, a discovered CodePipeline is a Resource. A Road Pipeline is an Asset.

## Workflow

A **Workflow** is an asynchronous operation composed of multiple steps and potentially multiple external API calls.

It is used when an operation:

- takes significant time
- can wait
- can retry
- can fail partially
- needs dynamic logs
- calls multiple APIs
- needs durable state
- returns an external execution ID

Examples:

- Road repository creation/onboarding
- Road deployment setup
- future GitOps infrastructure creation
- component deployment orchestration
- CodePipeline runner
- CodeBuild runner

A Workflow has one or more Workflow Executions.

## CR Change Request

CR Change Request is an externally managed resource/system.

This platform consumes CR APIs to display information and correlate deployment context. It does not own CR approval rules, approval groups, or production scheduling.

## Relationship principles

Avoid repeating the same external entity data across many tables.

Prefer:

```text
deployment_id
tenant_id
instance_id
component_id
repo_id
pipeline_id
execution_id
```

over copying names, account metadata, repository metadata, etc. into every record.

External identifiers should be stored explicitly where they are needed for correlation.
