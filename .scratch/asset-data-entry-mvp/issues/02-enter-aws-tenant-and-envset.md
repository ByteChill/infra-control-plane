# 02 — Enter an AWS Tenant and EnvSet for an EIM

**What to build:** From an EIM detail view, enable a Platform Engineer to create and maintain an AWS Tenant with one EnvSet containing the real `dev`, `preprod`, and `prod` targets. Persist the topology and make the EIM–Tenant relationship navigable from both sides.

**Blocked by:** 01 — Enter and reopen a real EIM.

**Status:** ready-for-agent

- [ ] Tenant and target fields are derived from representative real data rather than fabricated examples.
- [ ] A Tenant can be created only in the context of an existing EIM.
- [ ] MVP Tenant entry is restricted to AWS.
- [ ] Every AWS Tenant contains exactly one EnvSet with `dev`, `preprod`, and `prod` targets.
- [ ] An incomplete or expanded AWS target set is rejected with a useful validation result.
- [ ] The combination of EIM, Provider, and EnvSet name is unique.
- [ ] The EIM detail view lists its Tenant, and the Tenant detail view links back to its EIM.
- [ ] Tenant and EnvSet data survives refresh and application restart.
- [ ] Core Asset graph module tests cover ownership, target-set invariants, uniqueness, and persistence through its interface.
- [ ] A browser test covers contextual Tenant creation and bidirectional relationship navigation.
