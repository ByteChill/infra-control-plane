# 06 — Archive Assets and preserve historical relationships

**What to build:** Enable a Platform Engineer to archive locally owned Assets without hard deletion, retain their historical relationships, and keep archived records out of new Deployment choices by default. Do not invent parent/child archive coordination; record that rule in the spec addendum before implementing the affected interaction.

**Blocked by:** 05 — Record a Component Deployment target; confirmed parent/child archive coordination rule.

**Status:** ready-for-agent

- [ ] The parent/child archive coordination rule is confirmed and added to the spec before implementation of that behavior.
- [ ] Archiving requires an explicit operator confirmation.
- [ ] Archiving does not hard-delete the Asset or erase historical relationships.
- [ ] Archived Assets remain reachable from existing relationship history.
- [ ] Archived Assets are excluded from new Deployment choices by default.
- [ ] Archived state is distinguishable without relying on color alone.
- [ ] Archive changes record update time and `Prototype Operator` attribution.
- [ ] The Core Asset graph module interface enforces the confirmed archive rule consistently for every Asset type in scope.
- [ ] Tests cover preservation of relationships, selection exclusion, and the confirmed parent/child behavior through the module interface.
- [ ] A browser test covers confirmation, archived-state presentation, historical navigation, and exclusion from new Deployment choices.
