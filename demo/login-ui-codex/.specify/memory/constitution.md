<!--
Sync Impact Report

- Version change: UNSET → 1.0.0 (initial ratification; template placeholders filled)
- Principles: created 6 principles (architecture, deps/vanilla, a11y, testability, performance, style)
- Added sections: Additional Constraints; Development Workflow & Quality Gates
- Removed sections: none
- Templates requiring updates:
  - ✅ `.specify/templates/tasks-template.md` (testing guidance aligned to constitution)
  - ✅ `.specify/templates/plan-template.md` (constitution gate examples added)
- Deferred TODOs: none
-->

# Login UI Codex Constitution

## Core Principles

### I. Simple Architecture, Readable Code (Prefer Clarity Over Abstraction)
- The default solution MUST be the simplest thing that can work and remain maintainable.
- Abstractions (patterns, layers, helpers) MUST be introduced only when they remove repeated,
  proven complexity (not hypothetical future needs).
- Prefer straightforward, local code over cleverness. If a newcomer can’t follow the flow by
  reading the file top-to-bottom, refactor toward clarity.

### II. Minimal Dependencies, Vanilla-First (HTML/CSS/JavaScript)
- Prefer vanilla HTML/CSS/JavaScript. Avoid frameworks and heavy runtime libraries by default.
- Adding a dependency MUST be justified in the spec/plan with:
  - what problem vanilla cannot solve cleanly,
  - why the chosen dependency is the smallest viable option,
  - what it costs (bundle weight, complexity, long-term maintenance).
- Tooling/build steps MUST stay optional. The project SHOULD be runnable by opening
  `index.html` (or a minimal static server) without a complex toolchain.

### III. Accessibility Is Non-Negotiable (Keyboard, Focus, Semantics)
- All interactive functionality MUST be usable via keyboard alone.
  - No keyboard traps.
  - Logical tab order.
- Focus MUST be visible and intentional.
  - Never remove focus outlines without a clear, accessible replacement.
- Use semantic HTML first (`button`, `a`, `label`, `input`, headings, landmarks).
- Form controls MUST have programmatic names (e.g., associated `<label>` or appropriate ARIA).
- Any ARIA usage MUST be minimal and correct; do not use ARIA to “paper over” non-semantic DOM.

### IV. Core Logic and Local Persistence MUST Be Testable
- “Core task logic” (validation, state transitions, serialization) MUST be separated from the DOM
  so it can be tested in isolation.
- Local persistence (e.g., `localStorage`) MUST be wrapped behind a small interface so behavior
  can be tested without a browser environment.
- Changes to core logic or persistence MUST include automated tests covering:
  - success paths,
  - validation/error paths,
  - backward-compatible data migrations (if stored data shape changes).

### V. Performance: Fast Initial Render, No Heavy Runtime
- Initial render MUST be fast: avoid large JS execution before first meaningful paint.
- Avoid heavy runtime frameworks, large polyfills, and expensive client-side initialization.
- JavaScript MUST be loaded with `defer` (or otherwise not block rendering) unless explicitly
  justified.
- Visual effects MUST be lightweight (prefer CSS over JS for animations) and respect user
  preferences (e.g., reduced motion) when applicable.

### VI. Tasteful, Subtle Skeuomorphism (Consistent and Controlled)
- Skeuomorphic styling MUST be subtle, tasteful, and consistent across components.
- Use a small set of reusable design tokens (e.g., shadow levels, border radii, highlights).
- Avoid excessive gloss, noisy textures, and inconsistent lighting/shadow directions.
- Visual style changes MUST preserve readability and accessibility (contrast, focus visibility).

## Additional Constraints

- **Runtime footprint**: Keep the runtime small; prefer “no-build” where feasible.
- **Compatibility**: Target modern evergreen browsers.
- **Local storage**: Do not store secrets or sensitive data in client-side persistence.
- **Error handling**: Fail clearly in the UI; avoid silent failures for user-facing flows.

## Development Workflow & Quality Gates

- Every spec/plan MUST include a “Constitution Check” section with explicit gates for:
  - dependency additions (justification + impact),
  - keyboard navigation and visible focus,
  - semantic labeling (esp. forms),
  - test coverage for core logic + persistence,
  - performance risk assessment for initial render,
  - style consistency (skeuomorphic rules).
- “Done” means:
  - keyboard-only happy path works end-to-end,
  - focus is visible on every interactive element,
  - core logic/persistence tests pass,
  - no unnecessary dependency introduced,
  - initial render remains fast (no new heavy runtime).

## Governance

- This constitution is the highest-level engineering policy for this repository.
  If another doc conflicts, this constitution wins.
- Amendments MUST include:
  - the reason for the change,
  - expected impact on existing code,
  - a migration plan if behavior or stored data formats change.
- Versioning:
  - **MAJOR**: principles removed or materially redefined.
  - **MINOR**: new principle/section added, or significant new constraints introduced.
  - **PATCH**: clarifications that do not change expectations.
- Reviews MUST verify compliance with each relevant principle. Any exception MUST be documented
  in the spec/plan with a clear justification and the simplest alternative considered.

**Version**: 1.0.0 | **Ratified**: 2026-02-18 | **Last Amended**: 2026-02-18
