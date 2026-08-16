# Integrations

## Principle

External systems are integration boundaries.

The core domain should not depend directly on provider-specific SDK types.

## GitHub

A GitHub App is used for repository operations.

Capabilities may include:

- scan/list repositories
- fork repository
- create branch
- read/write files
- commit
- create/update PR
- read check runs
- receive webhooks

GitHub is also used for correlating source versions with Road executions.

## Road

Road is an existing internal AWS deployment platform.

This project:

- calls Road APIs
- submits repository/onboarding information
- triggers operations when supported
- consumes Road state/results
- stores returned execution identifiers

This project does not implement Road.

## AWS

AWS is both:

1. a provider for resources
2. the runtime platform for this control plane

Resources can include:

- ECS
- Lambda
- RDS
- CodePipeline
- CodeBuild
- other AWS services

Discovery is periodic and provider-specific.

## GCP

GCP is a supported resource/deployment provider.

Its target-set semantics differ from AWS. Do not force AWS's three-account EnvSet model onto GCP.

## Ali

Ali is a supported resource/deployment provider.

Provider-specific authentication and resource discovery stay behind the Ali integration boundary.

## IKP

IKP is an internal Kubernetes platform.

Kubernetes/API details should remain isolated from the core domain.

## CR Change Request

CR Change Request is an externally managed system.

The platform may consume:

- request metadata
- deployment/component context
- target information
- scan/report information
- approval status
- scheduled deployment information

The platform does not implement CR approval workflow or scheduling.

## Internal AWS authentication

AWS access is obtained through the organization's internal AD/FA/SAML/service-account flow.

The implementation should be encapsulated so the rest of the application can request an AWS credential/session for a target account without knowing the authentication protocol.

## Integration contract

Every integration should define:

- authentication
- request/response types
- timeout
- retry policy
- idempotency behavior
- error mapping
- observability
- correlation IDs
- reconciliation strategy
