# 03 — Enter a Component for an EIM

**What to build:** From an EIM detail view, enable a Platform Engineer to create, validate, persist, view, and edit a Component as a stable business service owned by that EIM. The experience must preserve the accepted rule that Component does not belong to Instance.

**Blocked by:** 01 — Enter and reopen a real EIM.

**Status:** ready-for-agent

- [ ] Component fields are derived from representative real data rather than invented external metadata.
- [ ] A Component can be created only in the context of an existing EIM.
- [ ] Component ownership is recorded against EIM and never inferred from Instance.
- [ ] Component name is unique within its EIM according to the confirmed business identity.
- [ ] Duplicate Component creation is rejected with an operator-visible message.
- [ ] The EIM detail view lists its Components, and the Component detail view links back to its EIM.
- [ ] Component data survives refresh and application restart.
- [ ] Permitted Component metadata can be edited without changing its stable internal identity or ownership.
- [ ] Core Asset graph module tests protect the accepted Component ownership decision through its interface.
- [ ] A browser test covers contextual Component creation, refresh, edit, and relationship navigation.
