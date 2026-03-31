---
description: "Task list template for feature implementation"
---

# Tasks: Skeuomorphic TODO List Web App

**Input**: Design documents from `/specs/001-todo-app/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: Tests are included for core task logic (validation/state/serialization) and local data persistence as required by the specification.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Single project**: Files at repository root (`index.html`, `styles.css`, `script.js`)
- All code in three files: `index.html`, `styles.css`, `script.js`

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [ ] T001 Replace existing login UI structure in index.html with todo app HTML skeleton
- [ ] T002 [P] Setup basic HTML structure with semantic elements (header, main, sections) in index.html
- [ ] T003 [P] Setup CSS file structure and reset/normalize styles in styles.css
- [ ] T004 [P] Setup JavaScript module structure (TaskManager, Storage, DateUtils, Validation) in script.js

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [ ] T005 Implement Task entity structure and validation in script.js (TaskManager module)
- [ ] T006 [P] Implement Storage module with loadTasks() and saveTasks() functions in script.js
- [ ] T007 [P] Implement DateUtils module with isToday(), isFuture(), isPast() functions in script.js
- [ ] T008 [P] Implement Validation module with validateTask() function in script.js
- [ ] T009 Setup error handling infrastructure for localStorage quota exceeded errors in script.js
- [ ] T010 Setup basic CSS variables for skeuomorphic design tokens (colors, shadows, spacing) in styles.css

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Basic Task Management (Priority: P1) 🎯 MVP

**Goal**: Users can add, edit, complete, uncomplete, and delete tasks with local persistence

**Independent Test**: Can be fully tested by opening the app, adding a task, marking it complete, editing it, and deleting it. Delivers immediate value for personal task tracking.

### Tests for User Story 1 (REQUIRED for core logic/persistence) ⚠️

> **NOTE: Write these tests FIRST, ensure they FAIL before implementation**

- [ ] T011 [P] [US1] Test TaskManager.createTask() creates task with correct properties in script.js (testable function)
- [ ] T012 [P] [US1] Test TaskManager.updateTask() updates task properties correctly in script.js (testable function)
- [ ] T013 [P] [US1] Test TaskManager.deleteTask() removes task from collection in script.js (testable function)
- [ ] T014 [P] [US1] Test TaskManager.toggleTaskComplete() toggles completion status in script.js (testable function)
- [ ] T015 [P] [US1] Test Storage.loadTasks() and Storage.saveTasks() persist and restore tasks correctly in script.js (testable functions)
- [ ] T016 [US1] Test end-to-end: add task → complete → edit → delete → verify persistence in script.js (integration test)

### Implementation for User Story 1

- [ ] T017 [US1] Implement TaskManager.createTask() function in script.js
- [ ] T018 [US1] Implement TaskManager.updateTask() function in script.js
- [ ] T019 [US1] Implement TaskManager.deleteTask() function in script.js
- [ ] T020 [US1] Implement TaskManager.toggleTaskComplete() function in script.js
- [ ] T021 [US1] Implement TaskManager.getAllTasks() function in script.js
- [ ] T022 [US1] Create HTML structure for task list container and task items in index.html
- [ ] T023 [US1] Create HTML structure for add task input and button in index.html
- [ ] T024 [US1] Implement renderTasks() function to display tasks in DOM in script.js
- [ ] T025 [US1] Implement event handler for add task button/Enter key in script.js
- [ ] T026 [US1] Implement event handler for task checkbox (complete/uncomplete) in script.js
- [ ] T027 [US1] Implement event handler for edit task button in script.js
- [ ] T028 [US1] Implement inline editing functionality (replace text with input, handle Enter/Escape) in script.js
- [ ] T029 [US1] Implement event handler for delete task button in script.js
- [ ] T030 [US1] Implement auto-save to localStorage after each task operation in script.js
- [ ] T031 [US1] Implement load tasks from localStorage on page load in script.js
- [ ] T032 [US1] Add basic CSS styling for task list and task items in styles.css
- [ ] T033 [US1] Add CSS styling for add task input and button in styles.css
- [ ] T034 [US1] Add keyboard accessibility (Tab navigation, Enter/Space activation) in index.html and script.js
- [ ] T035 [US1] Add ARIA labels and live regions for screen readers in index.html

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently

---

## Phase 4: User Story 2 - Task Organization by Time (Priority: P2)

**Goal**: Tasks are organized into time buckets (Today, Upcoming, Someday) based on due dates

**Independent Test**: Can be fully tested by adding tasks with different due dates and verifying they appear in correct sections (Today for today's date, Upcoming for future dates, Someday for tasks without dates).

### Tests for User Story 2 (REQUIRED for core logic) ⚠️

- [ ] T036 [P] [US2] Test TaskManager.getTasksByGroup() groups tasks correctly by date in script.js (testable function)
- [ ] T037 [P] [US2] Test DateUtils.isToday() correctly identifies today's date in script.js (testable function)
- [ ] T038 [P] [US2] Test DateUtils.isFuture() correctly identifies future dates in script.js (testable function)
- [ ] T039 [US2] Test task moves from Upcoming to Today when due date becomes today in script.js (integration test)

### Implementation for User Story 2

- [ ] T040 [US2] Implement TaskManager.getTasksByGroup() function in script.js
- [ ] T041 [US2] Create HTML structure for three section containers (Today, Upcoming, Someday) in index.html
- [ ] T042 [US2] Implement renderTaskGroups() function to display tasks in sections in script.js
- [ ] T043 [US2] Add HTML structure for due date input field in add task form in index.html
- [ ] T044 [US2] Implement event handler to capture due date when adding task in script.js
- [ ] T045 [US2] Implement event handler to update due date when editing task in script.js
- [ ] T046 [US2] Implement task sorting within each group (priority → due date → creation date) in script.js
- [ ] T047 [US2] Add CSS styling for task group sections and headers in styles.css
- [ ] T048 [US2] Add CSS styling for due date display on task items in styles.css
- [ ] T049 [US2] Implement automatic group recalculation when date changes (on page load) in script.js

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently

---

## Phase 5: User Story 3 - Task Prioritization and Filtering (Priority: P2)

**Goal**: Users can assign priorities to tasks and filter their view (All, Active, Completed, Overdue)

**Independent Test**: Can be fully tested by adding tasks with different priorities, marking some as complete, and using filters to view different subsets of tasks.

### Tests for User Story 3 (REQUIRED for core logic) ⚠️

- [ ] T050 [P] [US3] Test TaskManager.getFilteredTasks() filters tasks correctly by status in script.js (testable function)
- [ ] T051 [P] [US3] Test overdue filter correctly identifies tasks with past due dates in script.js (testable function)
- [ ] T052 [US3] Test filter state persists across task operations in script.js (integration test)

### Implementation for User Story 3

- [ ] T053 [US3] Implement TaskManager.getFilteredTasks() function in script.js
- [ ] T054 [US3] Add HTML structure for priority selector (low/medium/high) in add task form in index.html
- [ ] T055 [US3] Implement event handler to capture priority when adding task in script.js
- [ ] T056 [US3] Implement event handler to update priority when editing task in script.js
- [ ] T057 [US3] Create HTML structure for filter buttons (All, Active, Completed, Overdue) in index.html
- [ ] T058 [US3] Implement event handler for filter button clicks in script.js
- [ ] T059 [US3] Implement filter application logic (apply filter after grouping) in script.js
- [ ] T060 [US3] Implement hide empty groups when filter is active in script.js
- [ ] T061 [US3] Add CSS styling for priority indicators on task items in styles.css
- [ ] T062 [US3] Add CSS styling for filter buttons and active state in styles.css
- [ ] T063 [US3] Add visual priority indicators (colors/icons) for low/medium/high in styles.css
- [ ] T064 [US3] Add CSS styling for overdue task indicators in styles.css

**Checkpoint**: At this point, User Stories 1, 2, AND 3 should all work independently

---

## Phase 6: User Story 4 - Skeuomorphic Visual Experience (Priority: P3)

**Goal**: App displays notebook/paper aesthetic with subtle shadows, depth, gradients, and smooth micro-interactions

**Independent Test**: Can be fully tested by interacting with the UI and verifying visual elements (shadows, depth, gradients, animations) create a cohesive notebook-like aesthetic.

### Tests for User Story 4 (Visual/UI-only - no test tasks required)

> **NOTE**: Visual styling is tested manually. No automated tests needed for CSS-only changes.

### Implementation for User Story 4

- [ ] T065 [US4] Implement layered box-shadows for card depth effect in styles.css
- [ ] T066 [US4] Add subtle gradients for paper texture effect in styles.css
- [ ] T067 [US4] Implement consistent lighting direction (top-left) for all shadows in styles.css
- [ ] T068 [US4] Add border-radius (12-16px) for modern, approachable feel in styles.css
- [ ] T069 [US4] Implement color palette (warm off-whites, soft grays, muted accent colors) in styles.css
- [ ] T070 [US4] Add CSS transitions for smooth state changes (hover, active, focus) in styles.css
- [ ] T071 [US4] Implement button press animation (scale + shadow change) in styles.css
- [ ] T072 [US4] Implement checkbox toggle animation (smooth transition) in styles.css
- [ ] T073 [US4] Implement task entrance animation (fade + slide) in styles.css
- [ ] T074 [US4] Add CSS for pressed/active states (inset shadows) in styles.css
- [ ] T075 [US4] Implement responsive design with media queries (mobile < 480px, tablet 480-768px, desktop > 768px) in styles.css
- [ ] T076 [US4] Scale down shadows and spacing proportionally for mobile in styles.css
- [ ] T077 [US4] Ensure touch targets are minimum 44x44px for mobile in styles.css
- [ ] T078 [US4] Add prefers-reduced-motion media query to respect accessibility preference in styles.css
- [ ] T079 [US4] Verify WCAG 2.1 AA contrast requirements are met for all text/background combinations in styles.css

**Checkpoint**: All user stories should now be independently functional with polished visual experience

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [ ] T080 [P] Add focus-visible styles for keyboard navigation indicators in styles.css
- [ ] T081 [P] Enhance ARIA live regions for better screen reader announcements in index.html
- [ ] T082 Code cleanup and refactoring: ensure consistent code style in script.js
- [ ] T083 Performance optimization: debounce localStorage saves to reduce write frequency in script.js
- [ ] T084 [P] Add error message display UI for localStorage quota exceeded errors in index.html and script.js
- [ ] T085 [P] Add loading state indicator for initial task load in index.html and script.js
- [ ] T086 Verify keyboard shortcuts work correctly (Tab, Enter, Escape, Space) across all features
- [ ] T087 Run quickstart.md validation: test all scenarios from quickstart guide
- [ ] T088 Verify responsive layout works correctly on mobile (320px) to desktop (2560px) viewports
- [ ] T089 Verify all success criteria from spec.md are met (SC-001 through SC-007)

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3+)**: All depend on Foundational phase completion
  - User stories can then proceed in parallel (if staffed)
  - Or sequentially in priority order (P1 → P2 → P3)
- **Polish (Final Phase)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 2 (P2)**: Can start after Foundational (Phase 2) - Depends on US1 for task structure
- **User Story 3 (P2)**: Can start after Foundational (Phase 2) - Depends on US1 for task structure, integrates with US2 for filtering grouped tasks
- **User Story 4 (P3)**: Can start after Foundational (Phase 2) - Visual styling can be applied incrementally to existing components

### Within Each User Story

- Tests MUST be written and FAIL before implementation for core logic/persistence work
- Core functions before DOM manipulation
- DOM structure before event handlers
- Basic styling before advanced styling
- Story complete before moving to next priority

### Parallel Opportunities

- All Setup tasks marked [P] can run in parallel
- All Foundational tasks marked [P] can run in parallel (within Phase 2)
- Once Foundational phase completes, user stories can start in parallel (if team capacity allows)
- All tests for a user story marked [P] can run in parallel
- Different user stories can be worked on in parallel by different team members
- Polish tasks marked [P] can run in parallel

---

## Parallel Example: User Story 1

```bash
# Launch all tests for User Story 1 together:
Task: "Test TaskManager.createTask() creates task with correct properties in script.js"
Task: "Test TaskManager.updateTask() updates task properties correctly in script.js"
Task: "Test TaskManager.deleteTask() removes task from collection in script.js"
Task: "Test TaskManager.toggleTaskComplete() toggles completion status in script.js"
Task: "Test Storage.loadTasks() and Storage.saveTasks() persist and restore tasks correctly in script.js"

# Launch foundational tasks together:
Task: "Implement Storage module with loadTasks() and saveTasks() functions in script.js"
Task: "Implement DateUtils module with isToday(), isFuture(), isPast() functions in script.js"
Task: "Implement Validation module with validateTask() function in script.js"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (CRITICAL - blocks all stories)
3. Complete Phase 3: User Story 1
4. **STOP and VALIDATE**: Test User Story 1 independently
5. Deploy/demo if ready

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready
2. Add User Story 1 → Test independently → Deploy/Demo (MVP!)
3. Add User Story 2 → Test independently → Deploy/Demo
4. Add User Story 3 → Test independently → Deploy/Demo
5. Add User Story 4 → Test independently → Deploy/Demo
6. Each story adds value without breaking previous stories

### Parallel Team Strategy

With multiple developers:

1. Team completes Setup + Foundational together
2. Once Foundational is done:
   - Developer A: User Story 1 (P1)
   - Developer B: User Story 2 (P2) - can start after US1 task structure exists
   - Developer C: User Story 3 (P2) - can start after US1 task structure exists
   - Developer D: User Story 4 (P3) - can start styling existing components
3. Stories complete and integrate independently

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- Verify tests fail before implementing
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- Avoid: vague tasks, same file conflicts, cross-story dependencies that break independence
- All file paths are relative to repository root: `demo/login-ui-codex/`
- Three main files: `index.html`, `styles.css`, `script.js`
- Tests are written as testable functions within script.js (can be extracted to separate test file if needed)

---

## Summary

**Total Tasks**: 89
**Tasks by Phase**:
- Phase 1 (Setup): 4 tasks
- Phase 2 (Foundational): 6 tasks
- Phase 3 (User Story 1): 25 tasks (5 tests + 20 implementation)
- Phase 4 (User Story 2): 10 tasks (4 tests + 6 implementation)
- Phase 5 (User Story 3): 15 tasks (3 tests + 12 implementation)
- Phase 6 (User Story 4): 15 tasks (visual styling, no tests)
- Phase 7 (Polish): 10 tasks

**Tasks by User Story**:
- User Story 1 (P1 - MVP): 25 tasks
- User Story 2 (P2): 10 tasks
- User Story 3 (P2): 15 tasks
- User Story 4 (P3): 15 tasks

**Parallel Opportunities Identified**: 
- 15+ tasks can run in parallel across different files
- All foundational tasks can run in parallel
- All test tasks within a story can run in parallel
- User stories 2, 3, and 4 can be worked on in parallel after US1 is complete

**Independent Test Criteria**:
- **US1**: Add, edit, complete, uncomplete, delete tasks → verify persistence
- **US2**: Add tasks with different due dates → verify correct grouping
- **US3**: Add tasks with priorities, mark some complete → verify filtering works
- **US4**: Interact with UI → verify skeuomorphic aesthetic and animations

**Suggested MVP Scope**: User Story 1 only (25 tasks) - delivers complete basic task management with persistence

**Format Validation**: ✅ All tasks follow checklist format with checkbox, ID, optional [P] marker, optional [Story] label, and file path in description
