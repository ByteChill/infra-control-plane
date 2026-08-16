# 01 — Enter and reopen a real EIM

**What to build:** Enable a Platform Engineer to create, validate, persist, view, and edit one representative real EIM through the operator UI. Refreshing the browser or restarting the application must preserve the EIM. This slice establishes the Core Asset graph module interface and the first complete test path through persistence, HTTP, and UI.

**Blocked by:** None — can start immediately after representative real EIM data is available.

**Status:** ready-for-agent

- [ ] The accepted real EIM record determines the displayed and editable fields; no organization-specific fields are invented.
- [ ] A valid unique 8-digit EIM identifier can be entered and persisted.
- [ ] Invalid and duplicate EIM identifiers are rejected with operator-visible messages.
- [ ] The EIM appears in a persisted list and opens in a detail view after refresh and application restart.
- [ ] Permitted EIM metadata can be edited without changing its stable internal identity.
- [ ] Create and update timestamps and `Prototype Operator` attribution are visible where useful.
- [ ] Loading, empty, validation-error, server-error, success, and retry outcomes are represented without false operational claims.
- [ ] Core Asset graph module tests cover EIM invariants through its interface using the real persistence implementation.
- [ ] Narrow HTTP tests cover transport mapping, and one browser test covers the complete create-refresh-edit journey.
