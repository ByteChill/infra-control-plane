# 07 — Complete the operator workspace with real Asset data

**What to build:** Replace the hard-coded prototype dashboard with a complete operator workspace backed by the persisted EIM, Tenant, EnvSet, Instance, Component, and Deployment topology. Platform Engineers can find records, inspect relationships, recognize lifecycle state, and recover from empty or failed data loads without seeing fabricated operational claims.

**Blocked by:** 05 — Record a Component Deployment target; 06 — Archive Assets and preserve historical relationships.

**Status:** ready-for-agent

- [ ] Dashboard summaries are derived from persisted Asset data rather than hard-coded counts.
- [ ] Hard-coded Workflow, Execution, Deployment, and system-health claims are removed unless backed by real data.
- [ ] Platform Engineers can find an Asset using the search behavior confirmed for the MVP.
- [ ] EIM, Tenant, Instance, Component, and Deployment lists link to complete detail views.
- [ ] Detail views expose all confirmed relationships with meaningful business names before internal identifiers.
- [ ] Archived Assets are visibly distinguished and remain discoverable where historical context requires them.
- [ ] Every data-backed surface has loading, empty, error, retry, and success behavior.
- [ ] Errors and lifecycle states are understandable without relying on color alone.
- [ ] The complete workspace survives refresh and application restart without falling back to fixtures.
- [ ] Browser acceptance tests cover entry of a representative Asset graph, refresh, search, relationship navigation, edit, archive, and failure recovery.
- [ ] Tests assert operator-visible outcomes and do not depend on internal view composition or private query coordination.
