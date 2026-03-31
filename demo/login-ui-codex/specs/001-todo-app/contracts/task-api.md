# Task Management API Contracts

**Date**: 2026-02-18  
**Phase**: 1 - Design & Contracts

## Overview

This document defines the local JavaScript API contracts for task management. Since this is a vanilla JS application with no backend, these are function signatures and behaviors rather than HTTP endpoints.

## Core Functions

### Task CRUD Operations

#### `createTask(text: string, dueDate?: string | null, priority?: "low" | "medium" | "high"): Task`

Creates a new task and adds it to the task collection.

**Parameters**:
- `text` (string, required): Task description. Must be non-empty after trim.
- `dueDate` (string | null, optional): Due date in `YYYY-MM-DD` format. Default: `null`.
- `priority` (string, optional): Priority level. Default: `"medium"`.

**Returns**: `Task` object with generated `id` and `createdAt` timestamp.

**Side Effects**:
- Adds task to in-memory collection
- Saves to localStorage
- Triggers UI update

**Errors**:
- Throws if `text` is empty after trim
- Throws if `dueDate` format is invalid (if provided)

---

#### `updateTask(id: string, updates: Partial<Task>): Task`

Updates an existing task's properties.

**Parameters**:
- `id` (string, required): Task ID to update
- `updates` (object, required): Partial task object with properties to update

**Returns**: Updated `Task` object.

**Side Effects**:
- Updates task in in-memory collection
- Saves to localStorage
- Triggers UI update

**Errors**:
- Throws if task with `id` not found
- Throws if `updates.text` is empty after trim (if provided)
- Throws if `updates.priority` is invalid value (if provided)

---

#### `deleteTask(id: string): void`

Deletes a task from the collection.

**Parameters**:
- `id` (string, required): Task ID to delete

**Returns**: `void`

**Side Effects**:
- Removes task from in-memory collection
- Saves to localStorage
- Triggers UI update

**Errors**:
- Throws if task with `id` not found

---

#### `toggleTaskComplete(id: string): Task`

Toggles a task's completion status.

**Parameters**:
- `id` (string, required): Task ID to toggle

**Returns**: Updated `Task` object.

**Side Effects**:
- Updates `completed` property
- Saves to localStorage
- Triggers UI update

**Errors**:
- Throws if task with `id` not found

---

### Query Operations

#### `getAllTasks(): Task[]`

Returns all tasks in the collection.

**Returns**: Array of all `Task` objects.

**Side Effects**: None

---

#### `getTasksByGroup(): { today: Task[], upcoming: Task[], someday: Task[] }`

Groups tasks by time bucket (Today, Upcoming, Someday).

**Returns**: Object with three arrays of tasks.

**Side Effects**: None

**Grouping Logic**:
- `today`: Tasks with dueDate === today && !completed
- `upcoming`: Tasks with dueDate > today && !completed
- `someday`: Tasks with dueDate === null && !completed

---

#### `getFilteredTasks(filter: "all" | "active" | "completed" | "overdue"): Task[]`

Returns tasks filtered by status.

**Parameters**:
- `filter` (string, required): Filter type

**Returns**: Array of filtered `Task` objects.

**Side Effects**: None

**Filter Logic**:
- `"all"`: All tasks
- `"active"`: `completed === false`
- `"completed"`: `completed === true`
- `"overdue"`: `completed === false && dueDate !== null && isPast(dueDate)`

---

### Persistence Operations

#### `loadTasks(): Task[]`

Loads tasks from localStorage.

**Returns**: Array of `Task` objects (empty array if none found or error).

**Side Effects**: 
- Reads from localStorage key `todoAppTasks`
- Handles JSON parse errors gracefully
- Validates data structure

**Errors**:
- Returns empty array if localStorage unavailable or quota exceeded
- Returns empty array if JSON parse fails
- Logs errors to console

---

#### `saveTasks(tasks: Task[]): void`

Saves tasks to localStorage.

**Parameters**:
- `tasks` (Task[], required): Array of tasks to save

**Returns**: `void`

**Side Effects**:
- Serializes tasks to JSON
- Writes to localStorage key `todoAppTasks`
- Handles quota exceeded errors

**Errors**:
- Throws if serialization fails
- Shows user-friendly error message if quota exceeded
- Allows continued use without persistence if localStorage unavailable

---

### Utility Functions

#### `isToday(dateString: string): boolean`

Checks if date string represents today (local timezone, date-only comparison).

**Parameters**:
- `dateString` (string, required): Date in `YYYY-MM-DD` format

**Returns**: `boolean`

---

#### `isFuture(dateString: string): boolean`

Checks if date string is in the future (local timezone, date-only comparison).

**Parameters**:
- `dateString` (string, required): Date in `YYYY-MM-DD` format

**Returns**: `boolean`

---

#### `isPast(dateString: string): boolean`

Checks if date string is in the past (local timezone, date-only comparison).

**Parameters**:
- `dateString` (string, required): Date in `YYYY-MM-DD` format

**Returns**: `boolean`

---

#### `validateTask(task: Partial<Task>): void`

Validates task properties.

**Parameters**:
- `task` (object, required): Partial task object to validate

**Returns**: `void`

**Errors**:
- Throws if `text` is empty after trim
- Throws if `priority` is invalid
- Throws if `dueDate` format is invalid (if provided)

---

## Function Organization

Functions are organized into logical modules within `script.js`:

```javascript
// Task state management
const TaskManager = {
  createTask,
  updateTask,
  deleteTask,
  toggleTaskComplete,
  getAllTasks,
  getTasksByGroup,
  getFilteredTasks
};

// Persistence
const Storage = {
  loadTasks,
  saveTasks
};

// Utilities
const DateUtils = {
  isToday,
  isFuture,
  isPast
};

// Validation
const Validation = {
  validateTask
};
```

## Error Handling Strategy

- **Validation errors**: Throw immediately, prevent invalid state
- **Storage errors**: Show user-friendly message, allow continued use
- **DOM errors**: Log to console, show fallback UI if possible
- **All errors**: Log to console for debugging

## Testing Contracts

Each function should be testable in isolation:

- **Pure functions** (utilities, queries): No side effects, easy to test
- **Stateful functions** (CRUD): Mock localStorage, verify state changes
- **DOM functions**: Test separately with jsdom or manual DOM manipulation
