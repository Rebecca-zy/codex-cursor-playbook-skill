# Data Model: Skeuomorphic TODO List Web App

**Date**: 2026-02-18  
**Phase**: 1 - Design & Contracts

## Entities

### Task

Represents a single todo item.

**Properties**:
- `id` (string, required): Unique identifier. Generated using `Date.now().toString()` or `crypto.randomUUID()` if available.
- `text` (string, required): Task description. Must be non-empty after trim.
- `completed` (boolean, required): Completion status. Default: `false`.
- `dueDate` (string | null, optional): Due date in ISO format (`YYYY-MM-DD`). `null` means no due date (Someday bucket).
- `priority` (string, required): Priority level. Values: `"low"`, `"medium"`, `"high"`. Default: `"medium"`.
- `createdAt` (number, required): Timestamp (milliseconds since epoch) when task was created. Used for sorting.

**Validation Rules**:
- `text`: Must be non-empty string after trimming whitespace
- `dueDate`: If provided, must be valid date string in `YYYY-MM-DD` format
- `priority`: Must be one of `"low"`, `"medium"`, `"high"`
- `id`: Must be unique within task collection

**State Transitions**:
- **Create**: `completed: false`, `priority: "medium"`, `createdAt: Date.now()`
- **Complete**: `completed: true` → `completed: false` (toggle)
- **Edit**: `text` updated, other properties unchanged
- **Delete**: Task removed from collection

**Grouping Logic**:
- **Today**: `dueDate !== null && isToday(dueDate) && !completed`
- **Upcoming**: `dueDate !== null && isFuture(dueDate) && !completed`
- **Someday**: `dueDate === null && !completed`
- **Completed**: `completed === true` (shown in all groups when filter allows)
- **Overdue**: `dueDate !== null && isPast(dueDate) && !completed`

**Date Comparison Helpers**:
- `isToday(dateString)`: Compare date-only (ignore time) with current local date
- `isFuture(dateString)`: Check if date is after today (date-only comparison)
- `isPast(dateString)`: Check if date is before today (date-only comparison)

### TaskGroup

Represents a collection of tasks organized by time bucket.

**Properties**:
- `name` (string): Group name ("Today", "Upcoming", "Someday")
- `tasks` (Task[]): Array of tasks in this group

**Sorting**:
- Within each group, sort by:
  1. Priority (high → medium → low)
  2. Due date (earliest first, nulls last)
  3. Creation date (oldest first)

### Filter

Represents the current view filter state.

**Values**:
- `"all"`: Show all tasks (default)
- `"active"`: Show only incomplete tasks
- `"completed"`: Show only completed tasks
- `"overdue"`: Show only overdue tasks (incomplete tasks with past due dates)

**Application**:
- Filter applied after grouping
- Filter affects all groups equally
- When filter active, empty groups are hidden

## Storage Schema

### localStorage Key: `todoAppTasks`

**Format**: JSON string containing array of Task objects

**Example**:
```json
[
  {
    "id": "1708272000000",
    "text": "Buy groceries",
    "completed": false,
    "dueDate": "2026-02-19",
    "priority": "high",
    "createdAt": 1708272000000
  },
  {
    "id": "1708272000001",
    "text": "Learn TypeScript",
    "completed": false,
    "dueDate": null,
    "priority": "medium",
    "createdAt": 1708272000001
  }
]
```

**Migration Strategy**:
- Add `version` field to stored data if needed for future migrations
- Current version: `1` (implicit, no version field = version 1)
- On load, validate structure and handle missing/invalid fields gracefully

**Error Handling**:
- If localStorage quota exceeded: Show error message, allow continued use without persistence
- If JSON parse fails: Initialize with empty array, log error
- If data structure invalid: Migrate/repair if possible, otherwise reset to empty array

## Data Flow

1. **Load**: Read from localStorage → Parse JSON → Validate → Group tasks → Apply filter → Render
2. **Save**: Update in-memory state → Serialize to JSON → Write to localStorage (with error handling)
3. **Group Update**: Recalculate groups when:
   - Task added/edited/deleted
   - Due date changed
   - Current date changes (on page load or date change detection)

## Relationships

- **Task → TaskGroup**: Many-to-one (each task belongs to one group based on dueDate and completed status)
- **Filter → TaskGroup**: One-to-many (one filter applies to all groups)
