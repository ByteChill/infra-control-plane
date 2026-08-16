# 04 — Enter an Instance for a Tenant

**What to build:** From a Tenant detail view, enable a Platform Engineer to create, validate, persist, view, and edit an Instance as a regional business target belonging to that Tenant. Show the surrounding EIM, Tenant, EnvSet, and Instance topology without presenting Instance as a Component owner.

**Blocked by:** 02 — Enter an AWS Tenant and EnvSet for an EIM.

**Status:** ready-for-agent

- [ ] Instance fields are derived from representative real data rather than invented provider metadata.
- [ ] An Instance can be created only in the context of an existing Tenant.
- [ ] Instance name is unique within its Tenant according to the confirmed business identity.
- [ ] Duplicate Instance creation is rejected with an operator-visible message.
- [ ] The Tenant detail view lists its Instances, and the Instance detail view links to its Tenant and EIM.
- [ ] Instance data survives refresh and application restart.
- [ ] Permitted Instance metadata can be edited without changing its stable internal identity or Tenant ownership.
- [ ] Views use meaningful business names before internal identifiers.
- [ ] Core Asset graph module tests cover Tenant membership, uniqueness, and persistence through its interface.
- [ ] A browser test covers contextual Instance creation, refresh, edit, and relationship navigation.
