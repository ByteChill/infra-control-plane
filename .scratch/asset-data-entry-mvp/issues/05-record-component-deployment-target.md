# 05 — Record a Component Deployment target

**What to build:** Enable a Platform Engineer to record a Deployment that connects one Component to one Tenant and, when the real topology requires it, one Instance within that Tenant. Make the resulting relationship readable and navigable from every participating Asset.

**Blocked by:** 02 — Enter an AWS Tenant and EnvSet for an EIM; 03 — Enter a Component for an EIM; 04 — Enter an Instance for a Tenant.

**Status:** ready-for-agent

- [ ] Deployment fields are derived from representative real data rather than Road or provider assumptions.
- [ ] Every Deployment references one existing Component and one existing Tenant.
- [ ] Instance is optional for a Tenant-level Deployment.
- [ ] When Instance is selected, it must belong to the selected Tenant.
- [ ] A cross-Tenant Instance selection is prevented in the UI and rejected by the Core Asset graph module interface.
- [ ] The confirmed Component, Tenant, and optional Instance business identity cannot be duplicated.
- [ ] Deployment data survives refresh and application restart.
- [ ] Deployment details show meaningful Asset names before internal identifiers.
- [ ] EIM, Tenant, Instance, Component, and Deployment views expose the appropriate bidirectional relationship links.
- [ ] Core Asset graph module tests cover valid targeting, optional Instance, cross-Tenant rejection, uniqueness, and persistence through its interface.
- [ ] A browser test covers both Tenant-level and Instance-level Deployment creation and navigation.
