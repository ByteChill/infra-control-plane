# Workflows

## Definition

A Workflow wraps a long-running, multi-step operation.

It is not synonymous with Road.

Road is one integration that can be orchestrated by a Workflow.

## When to use a Workflow

Use a Workflow when an operation:

- calls multiple APIs
- can take significant time
- can time out
- can fail
- needs retry
- needs durable progress
- needs dynamic logs
- returns an external execution identifier
- may wait for an external state transition

Simple CRUD operations should remain ordinary API calls.

## Common workflow shape

```text
Create execution
      ↓
Validate
      ↓
Prepare
      ↓
External operation
      ↓
Persist external ID
      ↓
Wait / poll / callback
      ↓
Next step
      ↓
Complete / fail
```

Every step should have observable state.

Suggested states:

```text
PENDING
RUNNING
WAITING
SUCCEEDED
FAILED
CANCELLED
```

## Road repository workflow

A Road repository/deployment setup can contain steps such as:

```text
1. Find/select EIM and target metadata
2. Validate input
3. Select repository template
4. Fork repository
5. Generate/modify files
6. Show changes / Diff
7. Commit or create PR
8. Onboard repository to Road
9. Create pipeline-manager configuration
10. Create branch
11. Generate Terraform configuration
12. Run validation/check
13. Observe CodePipeline execution ID
14. Persist correlations
15. Complete
```

Actual Road behavior remains external.

## Road CI/CD model

For a Road-managed repository:

### Non-production

```text
non-main branch push
    → dev CI

non-main tag
    → dev CD

merge/push to main
    → preprod CI

main tag
    → preprod CD
```

### Production

Production deployment is associated with a release and external CR Change Request process.

The platform consumes CR information but does not implement approval/scheduling.

## Version correlation

A Road flow can associate:

```text
version
git_tag
commit_sha
github_check_run_id
codepipeline_execution_id
```

These correlations should be persisted so the UI can navigate between:

```text
Component
  ↓
Deployment
  ↓
Execution
  ↓
Git commit/tag
  ↓
GitHub check
  ↓
CodePipeline execution
```

## Generic runner workflows

Workflows are not limited to repository creation.

Examples:

```text
CodePipeline Runner
CodeBuild Runner
GitOps Infrastructure Workflow
Component Deployment Workflow
```

For a discovered CodePipeline or CodeBuild resource, the UI may offer a Run action.

The resulting operation should:

1. accept validated trigger parameters
2. create a Workflow Execution
3. invoke the external API asynchronously
4. stream/persist logs
5. persist the external execution ID
6. wait for terminal state
7. return the final result

## Human interaction

When an operation produces material changes that users can review, show a Diff/Change Preview before the mutation.

Examples:

- generated Git files
- Terraform changes
- repository changes
- metadata changes

The frontend should not force users to understand raw IDs when business names can be shown.
