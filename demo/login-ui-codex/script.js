/**
 * Skeuomorphic TODO List - User Story 1 (Basic Task Management)
 * Files: index.html, styles.css, script.js
 */

/* ========== DateUtils module (Phase 2) ========== */
const DateUtils = {
  isToday(dateString) {
    if (!dateString || typeof dateString !== "string") return false;
    const d = new Date(dateString);
    const t = new Date();
    return d.getFullYear() === t.getFullYear() && d.getMonth() === t.getMonth() && d.getDate() === t.getDate();
  },
  isFuture(dateString) {
    if (!dateString || typeof dateString !== "string") return false;
    const d = new Date(dateString);
    d.setHours(0, 0, 0, 0);
    const t = new Date();
    t.setHours(0, 0, 0, 0);
    return d.getTime() > t.getTime();
  },
  isPast(dateString) {
    if (!dateString || typeof dateString !== "string") return false;
    const d = new Date(dateString);
    d.setHours(0, 0, 0, 0);
    const t = new Date();
    t.setHours(0, 0, 0, 0);
    return d.getTime() < t.getTime();
  },
};

/* ========== Validation module (Phase 2) ========== */
const Validation = {
  validateTask(task) {
    if (!task || typeof task !== "object") return { valid: false, error: "Task must be an object" };
    const text = typeof task.text === "string" ? task.text.trim() : "";
    if (!text) return { valid: false, error: "Task text is required and must be non-empty after trim" };
    if (task.priority != null && !["low", "medium", "high"].includes(task.priority)) {
      return { valid: false, error: "Priority must be low, medium, or high" };
    }
    if (task.dueDate != null && task.dueDate !== "" && !/^\d{4}-\d{2}-\d{2}$/.test(task.dueDate)) {
      return { valid: false, error: "Due date must be YYYY-MM-DD or empty" };
    }
    return { valid: true };
  },
};

/* ========== Storage module (Phase 2) ========== */
const STORAGE_KEY = "todoAppTasks";

const Storage = {
  loadTasks() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw == null) return [];
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : [];
    } catch (e) {
      console.error("Storage.loadTasks failed:", e);
      return [];
    }
  },

  saveTasks(tasks) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
      return true;
    } catch (e) {
      if (e.name === "QuotaExceededError" || e.code === 22) {
        if (typeof window.showStorageError === "function") window.showStorageError();
      }
      console.error("Storage.saveTasks failed:", e);
      return false;
    }
  },
};

/* ========== TaskManager module (Phase 2 + US1) ========== */
function generateId() {
  return (typeof crypto !== "undefined" && crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(36) + Math.random().toString(36).slice(2));
}

const TaskManager = {
  _tasks: [],

  getAllTasks() {
    return this._tasks.slice();
  },

  getTasksByGroup() {
    const today = [];
    const upcoming = [];
    const someday = [];
    
    this._tasks.forEach((task) => {
      if (!task.dueDate || task.dueDate === "") {
        someday.push(task);
      } else if (DateUtils.isToday(task.dueDate)) {
        today.push(task);
      } else if (DateUtils.isFuture(task.dueDate)) {
        upcoming.push(task);
      } else {
        someday.push(task);
      }
    });
    
    const priorityOrder = { high: 3, medium: 2, low: 1 };
    const sortTasks = (a, b) => {
      const priorityDiff = (priorityOrder[b.priority] || 2) - (priorityOrder[a.priority] || 2);
      if (priorityDiff !== 0) return priorityDiff;
      if (a.dueDate && b.dueDate) {
        const dateDiff = new Date(a.dueDate) - new Date(b.dueDate);
        if (dateDiff !== 0) return dateDiff;
      }
      return a.createdAt - b.createdAt;
    };
    
    today.sort(sortTasks);
    upcoming.sort(sortTasks);
    someday.sort(sortTasks);
    
    return { today, upcoming, someday };
  },

  getFilteredTasks(filter = "all") {
    let filtered = this._tasks.slice();
    
    if (filter === "active") {
      filtered = filtered.filter((task) => !task.completed);
    } else if (filter === "completed") {
      filtered = filtered.filter((task) => task.completed);
    } else if (filter === "overdue") {
      filtered = filtered.filter((task) => {
        if (task.completed) return false;
        if (!task.dueDate || task.dueDate === "") return false;
        return DateUtils.isPast(task.dueDate);
      });
    }
    
    return filtered;
  },

  createTask(text, options = {}) {
    const trimmed = typeof text === "string" ? text.trim() : "";
    const result = Validation.validateTask({ ...options, text: trimmed });
    if (!result.valid) return { success: false, error: result.error };
    const task = {
      id: options.id != null ? String(options.id) : generateId(),
      text: trimmed,
      completed: options.completed === true,
      dueDate: options.dueDate != null ? options.dueDate : null,
      priority: options.priority && ["low", "medium", "high"].includes(options.priority) ? options.priority : "medium",
      createdAt: options.createdAt != null ? options.createdAt : Date.now(),
    };
    this._tasks.push(task);
    return { success: true, task };
  },

  updateTask(id, updates) {
    const task = this._tasks.find((t) => t.id === id);
    if (!task) return { success: false, error: "Task not found" };
    const merged = { ...task, ...updates };
    const result = Validation.validateTask(merged);
    if (!result.valid) return { success: false, error: result.error };
    Object.assign(task, {
      text: typeof merged.text === "string" ? merged.text.trim() : task.text,
      dueDate: merged.dueDate,
      priority: merged.priority,
    });
    return { success: true, task };
  },

  deleteTask(id) {
    const idx = this._tasks.findIndex((t) => t.id === id);
    if (idx === -1) return { success: false, error: "Task not found" };
    this._tasks.splice(idx, 1);
    return { success: true };
  },

  toggleTaskComplete(id) {
    const task = this._tasks.find((t) => t.id === id);
    if (!task) return { success: false, error: "Task not found" };
    task.completed = !task.completed;
    return { success: true, task };
  },

  loadFromStorage() {
    this._tasks = Storage.loadTasks();
  },

  persist() {
    return Storage.saveTasks(this._tasks);
  },
};

/* ========== DOM & UI (US1 + US2 + US3) ========== */
const taskInput = document.getElementById("taskInput");
const dueDateInput = document.getElementById("dueDateInput");
const prioritySelect = document.getElementById("prioritySelect");
const addTaskBtn = document.getElementById("addTaskBtn");
const todayList = document.getElementById("todayList");
const upcomingList = document.getElementById("upcomingList");
const somedayList = document.getElementById("somedayList");
const storageErrorEl = document.getElementById("storageError");
const taskListAnnounce = document.getElementById("taskListAnnounce");

let currentFilter = "all";

function showStorageError(message) {
  if (!storageErrorEl) return;
  storageErrorEl.textContent = message || "Storage is full. Changes will not be saved.";
  storageErrorEl.hidden = false;
}
window.showStorageError = showStorageError;

function announceToScreenReader(text) {
  if (!taskListAnnounce) return;
  taskListAnnounce.textContent = text;
  setTimeout(() => {
    taskListAnnounce.textContent = "";
  }, 500);
}

function renderTaskItem(task) {
  const li = document.createElement("li");
  li.className = "task-item" + (task.completed ? " completed" : "");
  const isOverdue = !task.completed && task.dueDate && task.dueDate !== "" && DateUtils.isPast(task.dueDate);
  if (isOverdue) li.classList.add("overdue");
  li.setAttribute("data-task-id", task.id);
  li.setAttribute("role", "listitem");

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = task.completed;
  checkbox.setAttribute("aria-label", task.completed ? "Mark task incomplete" : "Mark task complete");
  checkbox.addEventListener("change", () => handleToggleComplete(task.id));

  const textWrap = document.createElement("div");
  textWrap.className = "task-text-wrap";
  const textSpan = document.createElement("span");
  textSpan.className = "task-text";
  textSpan.textContent = task.text;
  textWrap.appendChild(textSpan);

  if (task.priority && task.priority !== "medium") {
    const prioritySpan = document.createElement("span");
    prioritySpan.className = `task-priority priority-${task.priority}`;
    prioritySpan.textContent = task.priority.charAt(0).toUpperCase() + task.priority.slice(1);
    prioritySpan.setAttribute("aria-label", `Priority: ${task.priority}`);
    textWrap.appendChild(prioritySpan);
  }

  if (task.dueDate && task.dueDate !== "") {
    const dueDateSpan = document.createElement("span");
    dueDateSpan.className = "task-due-date" + (isOverdue ? " overdue" : "");
    const dueDate = new Date(task.dueDate);
    dueDateSpan.textContent = dueDate.toLocaleDateString("en-US", { month: "short", day: "numeric" });
    dueDateSpan.setAttribute("aria-label", `Due date: ${dueDate.toLocaleDateString()}`);
    textWrap.appendChild(dueDateSpan);
  }

  const actions = document.createElement("div");
  actions.className = "task-actions";
  const editBtn = document.createElement("button");
  editBtn.type = "button";
  editBtn.className = "btn btn-edit";
  editBtn.textContent = "Edit";
  editBtn.setAttribute("aria-label", "Edit task");
  editBtn.addEventListener("click", () => startEdit(task.id));
  const deleteBtn = document.createElement("button");
  deleteBtn.type = "button";
  deleteBtn.className = "btn btn-delete";
  deleteBtn.textContent = "Delete";
  deleteBtn.setAttribute("aria-label", "Delete task");
  deleteBtn.addEventListener("click", () => handleDelete(task.id));
  actions.appendChild(editBtn);
  actions.appendChild(deleteBtn);

  li.appendChild(checkbox);
  li.appendChild(textWrap);
  li.appendChild(actions);
  return li;
}

function renderTaskGroups() {
  if (!todayList || !upcomingList || !somedayList) return;
  
  const filteredTasks = TaskManager.getFilteredTasks(currentFilter);
  const allGroups = TaskManager.getTasksByGroup();
  
  const filterTaskSet = new Set(filteredTasks.map((t) => t.id));
  
  const groups = {
    today: allGroups.today.filter((task) => filterTaskSet.has(task.id)),
    upcoming: allGroups.upcoming.filter((task) => filterTaskSet.has(task.id)),
    someday: allGroups.someday.filter((task) => filterTaskSet.has(task.id)),
  };
  
  todayList.innerHTML = "";
  if (groups.today.length > 0 || currentFilter === "all") {
    groups.today.forEach((task) => {
      todayList.appendChild(renderTaskItem(task));
    });
    const todayGroupEl = document.getElementById("todayGroup");
    if (todayGroupEl) todayGroupEl.hidden = groups.today.length === 0 && currentFilter !== "all";
  } else {
    const todayGroupEl = document.getElementById("todayGroup");
    if (todayGroupEl) todayGroupEl.hidden = true;
  }
  
  upcomingList.innerHTML = "";
  if (groups.upcoming.length > 0 || currentFilter === "all") {
    groups.upcoming.forEach((task) => {
      upcomingList.appendChild(renderTaskItem(task));
    });
    const upcomingGroupEl = document.getElementById("upcomingGroup");
    if (upcomingGroupEl) upcomingGroupEl.hidden = groups.upcoming.length === 0 && currentFilter !== "all";
  } else {
    const upcomingGroupEl = document.getElementById("upcomingGroup");
    if (upcomingGroupEl) upcomingGroupEl.hidden = true;
  }
  
  somedayList.innerHTML = "";
  if (groups.someday.length > 0 || currentFilter === "all") {
    groups.someday.forEach((task) => {
      somedayList.appendChild(renderTaskItem(task));
    });
    const somedayGroupEl = document.getElementById("somedayGroup");
    if (somedayGroupEl) somedayGroupEl.hidden = groups.someday.length === 0 && currentFilter !== "all";
  } else {
    const somedayGroupEl = document.getElementById("somedayGroup");
    if (somedayGroupEl) somedayGroupEl.hidden = true;
  }
}

function renderTasks() {
  renderTaskGroups();
}

function startEdit(taskId) {
  const allLists = [todayList, upcomingList, somedayList];
  let li = null;
  for (const list of allLists) {
    li = list.querySelector(`[data-task-id="${taskId}"]`);
    if (li) break;
  }
  if (!li) return;
  const task = TaskManager.getAllTasks().find((t) => t.id === taskId);
  if (!task) return;
  const textWrap = li.querySelector(".task-text-wrap");
  const textSpan = li.querySelector(".task-text");
  if (!textWrap || !textSpan) return;
  
  const editContainer = document.createElement("div");
  editContainer.className = "task-edit-container";
  
  const input = document.createElement("input");
  input.type = "text";
  input.className = "task-edit-input";
  input.value = task.text;
  input.setAttribute("aria-label", "Edit task text");
  
  const dateInput = document.createElement("input");
  dateInput.type = "date";
  dateInput.className = "task-edit-date-input";
  dateInput.value = task.dueDate || "";
  dateInput.setAttribute("aria-label", "Edit due date");
  
  const prioritySelectEdit = document.createElement("select");
  prioritySelectEdit.className = "task-edit-priority-select";
  prioritySelectEdit.setAttribute("aria-label", "Edit priority");
  ["low", "medium", "high"].forEach((p) => {
    const option = document.createElement("option");
    option.value = p;
    option.textContent = p.charAt(0).toUpperCase() + p.slice(1);
    if (task.priority === p) option.selected = true;
    prioritySelectEdit.appendChild(option);
  });
  
  editContainer.appendChild(input);
  editContainer.appendChild(dateInput);
  editContainer.appendChild(prioritySelectEdit);
  
  const originalContent = textWrap.innerHTML;
  textWrap.innerHTML = "";
  textWrap.appendChild(editContainer);
  input.focus();

  function commitEdit() {
    const newText = input.value.trim();
    const newDueDate = dateInput.value || null;
    const newPriority = prioritySelectEdit.value || "medium";
    if (newText) {
      TaskManager.updateTask(taskId, { text: newText, dueDate: newDueDate, priority: newPriority });
      persistAndRender();
      announceToScreenReader("Task updated");
    } else {
      textWrap.innerHTML = originalContent;
      li.appendChild(li.querySelector(".task-actions"));
    }
    input.removeEventListener("blur", commitEdit);
    input.removeEventListener("keydown", onKey);
    dateInput.removeEventListener("change", commitEdit);
    prioritySelectEdit.removeEventListener("change", commitEdit);
  }

  function onKey(e) {
    if (e.key === "Enter") {
      e.preventDefault();
      commitEdit();
    } else if (e.key === "Escape") {
      textWrap.innerHTML = originalContent;
      li.appendChild(li.querySelector(".task-actions"));
      input.removeEventListener("blur", commitEdit);
      input.removeEventListener("keydown", onKey);
      dateInput.removeEventListener("change", commitEdit);
      prioritySelectEdit.removeEventListener("change", commitEdit);
    }
  }

  input.addEventListener("blur", commitEdit);
  input.addEventListener("keydown", onKey);
  dateInput.addEventListener("change", commitEdit);
  prioritySelectEdit.addEventListener("change", commitEdit);
}

function handleToggleComplete(taskId) {
  TaskManager.toggleTaskComplete(taskId);
  persistAndRender();
  const task = TaskManager.getAllTasks().find((t) => t.id === taskId);
  announceToScreenReader(task && task.completed ? "Task marked complete" : "Task marked incomplete");
}

function handleDelete(taskId) {
  TaskManager.deleteTask(taskId);
  persistAndRender();
  announceToScreenReader("Task deleted");
}

function persistAndRender() {
  TaskManager.persist();
  renderTasks();
}

function addTaskFromInput() {
  const text = taskInput && taskInput.value ? taskInput.value.trim() : "";
  if (!text) return;
  const dueDate = dueDateInput && dueDateInput.value ? dueDateInput.value : null;
  const priority = prioritySelect && prioritySelect.value ? prioritySelect.value : "medium";
  const result = TaskManager.createTask(text, { dueDate, priority });
  if (!result.success) return;
  taskInput.value = "";
  if (dueDateInput) dueDateInput.value = "";
  if (prioritySelect) prioritySelect.value = "medium";
  persistAndRender();
  announceToScreenReader("Task added");
}

function handleFilterChange(filter) {
  currentFilter = filter;
  renderTaskGroups();
  const filterButtons = document.querySelectorAll(".filter-btn");
  filterButtons.forEach((btn) => {
    if (btn.getAttribute("data-filter") === filter) {
      btn.classList.add("active");
      btn.setAttribute("aria-pressed", "true");
    } else {
      btn.classList.remove("active");
      btn.setAttribute("aria-pressed", "false");
    }
  });
}

addTaskBtn.addEventListener("click", () => addTaskFromInput());
taskInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    addTaskFromInput();
  }
});

const filterButtons = document.querySelectorAll(".filter-btn");
filterButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const filter = btn.getAttribute("data-filter");
    if (filter) handleFilterChange(filter);
  });
});

/* ========== Init: load from localStorage (US1) ========== */
TaskManager.loadFromStorage();
renderTasks();

// Initialize filter buttons state
const filterButtonsInit = document.querySelectorAll(".filter-btn");
filterButtonsInit.forEach((btn) => {
  const filter = btn.getAttribute("data-filter");
  if (filter === currentFilter) {
    btn.classList.add("active");
    btn.setAttribute("aria-pressed", "true");
  } else {
    btn.classList.remove("active");
    btn.setAttribute("aria-pressed", "false");
  }
});

/* ========== US1 Tests (T011–T016) – testable in console or test harness ========== */
const US1Tests = {
  testCreateTask() {
    const before = TaskManager.getAllTasks().length;
    const r = TaskManager.createTask("  hello  ");
    const ok = r.success && r.task && r.task.text === "hello" && r.task.completed === false && r.task.id && typeof r.task.createdAt === "number";
    if (TaskManager._tasks.length > before) TaskManager._tasks.pop();
    return ok;
  },
  testUpdateTask() {
    TaskManager._tasks = [{ id: "1", text: "old", completed: false, dueDate: null, priority: "medium", createdAt: 0 }];
    const r = TaskManager.updateTask("1", { text: "new" });
    if (!r.success || TaskManager._tasks[0].text !== "new") return false;
    TaskManager._tasks = [];
    return true;
  },
  testDeleteTask() {
    TaskManager._tasks = [{ id: "d1", text: "x", completed: false, dueDate: null, priority: "medium", createdAt: 0 }];
    const r = TaskManager.deleteTask("d1");
    if (!r.success || TaskManager._tasks.length !== 0) return false;
    return true;
  },
  testToggleTaskComplete() {
    TaskManager._tasks = [{ id: "t1", text: "x", completed: false, dueDate: null, priority: "medium", createdAt: 0 }];
    TaskManager.toggleTaskComplete("t1");
    if (!TaskManager._tasks[0].completed) return false;
    TaskManager.toggleTaskComplete("t1");
    if (TaskManager._tasks[0].completed) return false;
    TaskManager._tasks = [];
    return true;
  },
  testStoragePersist() {
    const original = TaskManager.getAllTasks();
    Storage.saveTasks([{ id: "s1", text: "stored", completed: false, dueDate: null, priority: "medium", createdAt: 1 }]);
    TaskManager.loadFromStorage();
    const loaded = TaskManager.getAllTasks();
    const ok = loaded.length === 1 && loaded[0].id === "s1" && loaded[0].text === "stored";
    Storage.saveTasks(original);
    TaskManager.loadFromStorage();
    return ok;
  },
  runAll() {
    const results = {
      testCreateTask: this.testCreateTask(),
      testUpdateTask: this.testUpdateTask(),
      testDeleteTask: this.testDeleteTask(),
      testToggleTaskComplete: this.testToggleTaskComplete(),
      testStoragePersist: this.testStoragePersist(),
    };
    results.allPassed = Object.values(results).filter((v) => typeof v === "boolean").every(Boolean);
    return results;
  },
};

window.US1Tests = US1Tests;

/* ========== US2 Tests (T036–T039) – testable in console or test harness ========== */
const US2Tests = {
  testGetTasksByGroup() {
    const todayStr = new Date().toISOString().split("T")[0];
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowStr = tomorrow.toISOString().split("T")[0];
    
    TaskManager._tasks = [
      { id: "1", text: "today task", completed: false, dueDate: todayStr, priority: "medium", createdAt: 100 },
      { id: "2", text: "upcoming task", completed: false, dueDate: tomorrowStr, priority: "medium", createdAt: 200 },
      { id: "3", text: "someday task", completed: false, dueDate: null, priority: "medium", createdAt: 300 },
      { id: "4", text: "someday task 2", completed: false, dueDate: "", priority: "medium", createdAt: 400 },
    ];
    
    const groups = TaskManager.getTasksByGroup();
    const ok = groups.today.length === 1 && groups.today[0].id === "1" &&
                groups.upcoming.length === 1 && groups.upcoming[0].id === "2" &&
                groups.someday.length === 2 && groups.someday[0].id === "3";
    
    TaskManager._tasks = [];
    return ok;
  },
  
  testIsToday() {
    const todayStr = new Date().toISOString().split("T")[0];
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowStr = tomorrow.toISOString().split("T")[0];
    
    const ok1 = DateUtils.isToday(todayStr) === true;
    const ok2 = DateUtils.isToday(tomorrowStr) === false;
    const ok3 = DateUtils.isToday(null) === false;
    const ok4 = DateUtils.isToday("") === false;
    
    return ok1 && ok2 && ok3 && ok4;
  },
  
  testIsFuture() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    const tomorrowStr = tomorrow.toISOString().split("T")[0];
    const yesterdayStr = yesterday.toISOString().split("T")[0];
    const todayStr = today.toISOString().split("T")[0];
    
    const ok1 = DateUtils.isFuture(tomorrowStr) === true;
    const ok2 = DateUtils.isFuture(todayStr) === false;
    const ok3 = DateUtils.isFuture(yesterdayStr) === false;
    const ok4 = DateUtils.isFuture(null) === false;
    
    return ok1 && ok2 && ok3 && ok4;
  },
  
  testTaskMovesFromUpcomingToToday() {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowStr = tomorrow.toISOString().split("T")[0];
    const todayStr = new Date().toISOString().split("T")[0];
    
    TaskManager._tasks = [
      { id: "move1", text: "will move", completed: false, dueDate: tomorrowStr, priority: "medium", createdAt: 100 },
    ];
    
    let groups = TaskManager.getTasksByGroup();
    const wasUpcoming = groups.upcoming.length === 1 && groups.today.length === 0;
    
    TaskManager.updateTask("move1", { dueDate: todayStr });
    groups = TaskManager.getTasksByGroup();
    const nowToday = groups.today.length === 1 && groups.upcoming.length === 0;
    
    TaskManager._tasks = [];
    return wasUpcoming && nowToday;
  },
  
  runAll() {
    const results = {
      testGetTasksByGroup: this.testGetTasksByGroup(),
      testIsToday: this.testIsToday(),
      testIsFuture: this.testIsFuture(),
      testTaskMovesFromUpcomingToToday: this.testTaskMovesFromUpcomingToToday(),
    };
    results.allPassed = Object.values(results).filter((v) => typeof v === "boolean").every(Boolean);
    return results;
  },
};

window.US2Tests = US2Tests;

/* ========== US3 Tests (T050–T052) – testable in console or test harness ========== */
const US3Tests = {
  testGetFilteredTasks() {
    TaskManager._tasks = [
      { id: "1", text: "active", completed: false, dueDate: null, priority: "medium", createdAt: 100 },
      { id: "2", text: "completed", completed: true, dueDate: null, priority: "medium", createdAt: 200 },
      { id: "3", text: "active2", completed: false, dueDate: null, priority: "medium", createdAt: 300 },
    ];
    
    const all = TaskManager.getFilteredTasks("all");
    const active = TaskManager.getFilteredTasks("active");
    const completed = TaskManager.getFilteredTasks("completed");
    
    const ok1 = all.length === 3;
    const ok2 = active.length === 2 && active.every((t) => !t.completed);
    const ok3 = completed.length === 1 && completed[0].completed === true;
    
    TaskManager._tasks = [];
    return ok1 && ok2 && ok3;
  },
  
  testOverdueFilter() {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split("T")[0];
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowStr = tomorrow.toISOString().split("T")[0];
    
    TaskManager._tasks = [
      { id: "1", text: "overdue", completed: false, dueDate: yesterdayStr, priority: "medium", createdAt: 100 },
      { id: "2", text: "future", completed: false, dueDate: tomorrowStr, priority: "medium", createdAt: 200 },
      { id: "3", text: "completed overdue", completed: true, dueDate: yesterdayStr, priority: "medium", createdAt: 300 },
      { id: "4", text: "no date", completed: false, dueDate: null, priority: "medium", createdAt: 400 },
    ];
    
    const overdue = TaskManager.getFilteredTasks("overdue");
    const ok = overdue.length === 1 && overdue[0].id === "1";
    
    TaskManager._tasks = [];
    return ok;
  },
  
  testFilterStatePersistence() {
    TaskManager._tasks = [
      { id: "1", text: "active", completed: false, dueDate: null, priority: "medium", createdAt: 100 },
      { id: "2", text: "completed", completed: true, dueDate: null, priority: "medium", createdAt: 200 },
    ];
    
    currentFilter = "active";
    const before = TaskManager.getFilteredTasks(currentFilter).length;
    
    TaskManager.toggleTaskComplete("1");
    const after = TaskManager.getFilteredTasks(currentFilter).length;
    
    const ok = before === 1 && after === 0;
    
    TaskManager._tasks = [];
    currentFilter = "all";
    return ok;
  },
  
  runAll() {
    const results = {
      testGetFilteredTasks: this.testGetFilteredTasks(),
      testOverdueFilter: this.testOverdueFilter(),
      testFilterStatePersistence: this.testFilterStatePersistence(),
    };
    results.allPassed = Object.values(results).filter((v) => typeof v === "boolean").every(Boolean);
    return results;
  },
};

window.US3Tests = US3Tests;
