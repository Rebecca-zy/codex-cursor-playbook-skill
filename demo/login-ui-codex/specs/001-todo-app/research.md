# Research: Skeuomorphic TODO List Web App

**Date**: 2026-02-18  
**Phase**: 0 - Outline & Research

## Research Questions

### 1. Skeuomorphic Design Patterns for Web

**Question**: What are best practices for implementing tasteful skeuomorphic design in vanilla CSS?

**Decision**: Use layered box-shadows, subtle gradients, and consistent lighting direction to create depth. Avoid excessive textures or noisy patterns.

**Rationale**: 
- Modern skeuomorphism focuses on subtle depth cues rather than literal material imitation
- CSS box-shadow with multiple layers creates convincing depth without images
- Consistent light source (top-left) maintains visual coherence
- Paper/notebook aesthetic achieved through soft shadows, rounded corners, and subtle borders

**Alternatives Considered**:
- CSS background images/textures: Rejected - adds file size, less flexible
- CSS filters (blur, drop-shadow): Considered but box-shadow more performant
- SVG patterns: Rejected - overkill for subtle effect, adds complexity

**Implementation Notes**:
- Use 3-4 shadow layers for cards (inset for pressed state, multiple offsets for depth)
- Subtle gradient overlays for paper texture effect
- Consistent border-radius (12-16px) for modern, approachable feel
- Color palette: warm off-whites, soft grays, muted accent colors

### 2. localStorage Best Practices

**Question**: How to structure localStorage data for task persistence with error handling?

**Decision**: Store tasks as JSON array under single key (`todoAppTasks`). Wrap localStorage calls in try-catch for quota exceeded errors. Provide graceful degradation.

**Rationale**:
- Single key simplifies data management and migration
- JSON serialization handles all task properties (id, text, completed, dueDate, priority, createdAt)
- Try-catch handles quota exceeded (5-10MB limit) and private browsing mode
- Graceful degradation: show error message but allow continued use without persistence

**Alternatives Considered**:
- IndexedDB: Rejected - overkill for < 1000 tasks, adds complexity
- Multiple localStorage keys: Rejected - harder to manage, no atomic updates
- SessionStorage: Rejected - doesn't meet persistence requirement

**Implementation Notes**:
- Version data structure for future migrations (add `version` field)
- Validate JSON on load (handle corrupted data)
- Debounce saves to reduce write frequency
- Show user-friendly error message if localStorage unavailable

### 3. Keyboard Accessibility Patterns

**Question**: How to implement full keyboard navigation for task management (add, edit, complete, delete, filter)?

**Decision**: Use semantic HTML (`<button>`, `<input>`, proper tab order), ARIA attributes for dynamic content, and keyboard event handlers for shortcuts.

**Rationale**:
- Semantic HTML provides baseline keyboard support (Tab, Enter, Space)
- ARIA live regions announce dynamic changes (task added, completed, deleted)
- Keyboard shortcuts enhance power users (e.g., Enter to add, Escape to cancel edit)
- Focus management: move focus appropriately after actions (e.g., focus new task after add)

**Alternatives Considered**:
- Custom tabindex manipulation: Rejected - semantic HTML handles this naturally
- Full ARIA widget implementation: Rejected - overkill, semantic HTML sufficient
- No keyboard shortcuts: Rejected - reduces efficiency for power users

**Implementation Notes**:
- All interactive elements focusable via Tab
- Enter/Space activate buttons and checkboxes
- Escape cancels edit mode
- Arrow keys navigate task list (optional enhancement)
- Focus visible on all elements (CSS :focus-visible)

### 4. Inline Editing Pattern

**Question**: How to implement inline task editing with keyboard support?

**Decision**: Replace task text with `<input>` on edit click, handle Enter (save) and Escape (cancel), restore focus to edit button after save.

**Rationale**:
- Inline editing reduces cognitive load (no modal/popup)
- Input element provides native keyboard support
- Enter/Escape provide clear save/cancel actions
- Focus management maintains keyboard navigation flow

**Alternatives Considered**:
- Modal dialog: Rejected - breaks flow, adds complexity
- Separate edit page: Rejected - overkill for single-line text
- ContentEditable: Rejected - harder to control, accessibility concerns

**Implementation Notes**:
- Toggle between `<span>` (display) and `<input>` (edit)
- Save on Enter or blur, cancel on Escape
- Validate input (non-empty) before saving
- Announce changes via ARIA live region

### 5. Date Handling and Timezone

**Question**: How to handle dates for "Today" grouping and timezone changes?

**Decision**: Use JavaScript `Date` objects with local timezone, compare dates using date-only (ignore time), update grouping on page load and when date changes.

**Rationale**:
- Local timezone is user's context (no need for UTC conversion)
- Date-only comparison handles "Today" correctly regardless of time
- Simple comparison: `taskDate.toDateString() === today.toDateString()`
- Tasks automatically move between sections based on current date

**Alternatives Considered**:
- UTC dates: Rejected - confusing for users, "Today" wouldn't match local day
- Date strings (YYYY-MM-DD): Considered but Date objects more flexible
- Moment.js or date libraries: Rejected - violates vanilla-only constraint

**Implementation Notes**:
- Store dates as ISO strings in localStorage (`YYYY-MM-DD` format)
- Parse to Date objects for comparison
- Group tasks: Today (date === today), Upcoming (date > today), Someday (no date)
- Overdue: date < today && !completed

### 6. Responsive Design for Skeuomorphic UI

**Question**: How to maintain skeuomorphic aesthetic on mobile while ensuring usability?

**Decision**: Scale down shadows and spacing proportionally, maintain touch targets (min 44x44px), use CSS media queries for breakpoints, preserve visual hierarchy.

**Rationale**:
- Smaller screens need lighter visual weight (reduced shadows)
- Touch targets must be large enough for finger interaction
- Breakpoints: mobile (< 480px), tablet (480-768px), desktop (> 768px)
- Skeuomorphic elements remain recognizable at smaller scale

**Alternatives Considered**:
- Separate mobile stylesheet: Rejected - adds complexity, single file preferred
- Hide skeuomorphic elements on mobile: Rejected - breaks design consistency
- Fixed sizes: Rejected - doesn't adapt to screen size

**Implementation Notes**:
- Reduce shadow blur/offset on mobile (50% of desktop)
- Increase padding for touch targets
- Stack elements vertically on mobile
- Maintain border-radius proportions

### 7. Animation and Micro-interactions

**Question**: How to implement smooth animations without performance impact?

**Decision**: Use CSS transitions for state changes, CSS animations for entrance effects, prefer transform/opacity over layout properties, respect `prefers-reduced-motion`.

**Rationale**:
- CSS animations perform better than JavaScript (GPU-accelerated)
- Transform/opacity don't trigger layout reflow
- Reduced motion preference improves accessibility
- Subtle animations enhance perceived performance

**Alternatives Considered**:
- JavaScript animations: Rejected - less performant, more code
- No animations: Rejected - reduces polish, violates FR-012
- Heavy animation libraries: Rejected - violates vanilla-only constraint

**Implementation Notes**:
- Task entrance: fade + slide (opacity + transform)
- Button press: scale(0.98) + shadow change
- Checkbox toggle: smooth transition
- Respect `@media (prefers-reduced-motion: reduce)`

## Technical Decisions Summary

| Decision | Rationale | Impact |
|----------|-----------|--------|
| Vanilla CSS for skeuomorphism | No dependencies, performant, flexible | Zero runtime cost |
| Single localStorage key with JSON | Simple, atomic updates, easy migration | Minimal code complexity |
| Semantic HTML + ARIA | Baseline accessibility + dynamic content | Meets WCAG 2.1 AA |
| Inline editing with input | Simple, keyboard-friendly | Low complexity |
| Local timezone date handling | Matches user context | Intuitive behavior |
| CSS-only animations | Performant, accessible | Smooth interactions |
| Responsive with media queries | Single stylesheet, adaptive | Works on all devices |

## Unresolved Questions

None - all technical questions resolved.

## Next Steps

Proceed to Phase 1: Design & Contracts
- Create data-model.md with Task entity structure
- Define API contracts (local functions, not HTTP)
- Create quickstart.md with setup instructions
