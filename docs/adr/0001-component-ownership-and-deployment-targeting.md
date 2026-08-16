# Component ownership and deployment targeting

A Component belongs to an EIM rather than to an Instance, allowing one stable business service to be deployed to multiple regional targets without duplicating its identity. A Deployment records the relationship between that Component and one Tenant plus, when applicable, one Instance within the Tenant.

## Considered Options

- Nest Component under Instance, which makes the hierarchy visually simple but duplicates the same business service across regional targets.
- Own Component at the EIM level and represent targeting through Deployment, which preserves one business identity while making each target relationship explicit.
