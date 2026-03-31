# Implementation Plan: Skeuomorphic TODO List Web App

**Branch**: `001-todo-app` | **Date**: 2026-02-18 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/001-todo-app/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/plan-template.md` for the execution workflow.

## Summary

Build a skeuomorphic TODO list web application using vanilla HTML/CSS/JavaScript with localStorage persistence. The app will replace the existing login UI in `index.html`, `styles.css`, and `script.js` with a task management interface featuring time-based grouping (Today, Upcoming, Someday), priority levels, filtering, and a tasteful notebook/paper aesthetic with full keyboard accessibility.

## Technical Context

**Language/Version**: JavaScript (ES6+), HTML5, CSS3  
**Primary Dependencies**: None (vanilla JavaScript only)  
**Storage**: Browser localStorage API  
**Testing**: Manual testing + potential for simple test harness (vanilla JS test utilities if needed)  
**Target Platform**: Modern evergreen browsers (Chrome, Firefox, Safari, Edge - latest 2 versions)  
**Project Type**: Single-page web application  
**Performance Goals**: 
- Initial render < 500ms (SC-003)
- User action feedback < 100ms (SC-002)
- Task addition < 3 seconds end-to-end (SC-001)
**Constraints**: 
- Must work without build step (open `index.html` directly)
- Must persist data locally (localStorage)
- Must be keyboard accessible (SC-004)
- Must be responsive (320px to 2560px viewports) (SC-005)
- Skeuomorphic styling must be subtle and accessibility-safe (WCAG 2.1 AA contrast)
**Scale/Scope**: 
- Single-user personal task management
- Expected task count: < 1000 tasks per user
- No cloud sync, no multi-user support

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

### Pre-Research (Phase 0)
- [x] Architecture stays simple; no new abstraction without proven need
  - **Status**: Single-file structure, direct DOM manipulation, simple state management
- [x] Dependencies minimal; vanilla-first; any new dep justified + weighed
  - **Status**: Zero dependencies - pure vanilla HTML/CSS/JS
- [x] Keyboard navigation works; focus visible; semantic labels present
  - **Status**: All interactions keyboard-accessible, visible focus indicators, semantic HTML
- [x] Core logic + local persistence are testable and have automated tests
  - **Status**: Task logic separated from DOM, localStorage wrapped in interface, testable functions
- [x] Initial render stays fast; no heavy runtime or blocking scripts
  - **Status**: Scripts use `defer`, CSS-only animations, minimal JS execution
- [x] Skeuomorphic styling is subtle, consistent, and accessibility-safe
  - **Status**: Reusable design tokens, consistent shadows/depth, WCAG AA contrast maintained

### Post-Design (Phase 1) - Re-evaluation

All gates still pass after design phase:

- [x] **Architecture**: Confirmed simple - three files, no abstractions, direct state management
- [x] **Dependencies**: Confirmed zero - vanilla JS only, no libraries
- [x] **Keyboard/Accessibility**: Design includes semantic HTML, ARIA live regions, focus management, keyboard shortcuts
- [x] **Testability**: Functions organized into testable modules (TaskManager, Storage, DateUtils, Validation)
- [x] **Performance**: Design uses CSS animations, `defer` scripts, no blocking operations
- [x] **Skeuomorphism**: Design specifies subtle shadows, consistent lighting, reusable tokens, WCAG AA compliance

**Conclusion**: All constitution gates pass. Ready for implementation.

## Project Structure

### Documentation (this feature)

```text
specs/001-todo-app/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output (/speckit.plan command)
├── data-model.md        # Phase 1 output (/speckit.plan command)
├── quickstart.md        # Phase 1 output (/speckit.plan command)
├── contracts/           # Phase 1 output (/speckit.plan command)
└── tasks.md             # Phase 2 output (/speckit.tasks command - NOT created by /speckit.plan)
```

### Source Code (repository root)

```text
demo/login-ui-codex/
├── index.html           # Main HTML (replaces login UI with todo app)
├── styles.css           # Skeuomorphic styling (replaces login styles)
├── script.js            # Task management logic (replaces login logic)
└── (no additional files needed - single-page app)
```

**Structure Decision**: Single-page application structure. All functionality contained in three files (`index.html`, `styles.css`, `script.js`) at repository root. No build step required - can be opened directly in browser. Core task logic separated into testable functions within `script.js`, with DOM manipulation isolated to specific functions.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

No violations - all constitution gates pass with vanilla-only approach.
