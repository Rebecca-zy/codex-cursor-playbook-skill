# Cursor × Spec-Kit 执行脚本（拟物风 TODO List）

把下面内容分段粘贴到 Cursor Agent 对话中执行（按顺序）。

---

## 1) 建立项目原则

```text
/speckit.constitution
Create principles for this project:
- Prioritize simple architecture and readability over abstraction
- Keep dependencies minimal; prefer vanilla HTML/CSS/JavaScript
- Enforce accessibility (keyboard navigation, focus visibility, semantic labels)
- Require testability for core task logic and local data persistence behavior
- Performance target: fast initial render on modern browsers with no heavy runtime
- UI principle: skeuomorphic style should remain tasteful, subtle, and consistent
```

---

## 2) 生成功能规格（WHAT / WHY）

```text
/speckit.specify
Build a skeuomorphic TODO List web app for personal daily planning.

Goals:
- Users can add, edit, complete, uncomplete, and delete tasks
- Tasks can be grouped by list sections (e.g., Today, Upcoming, Someday)
- Users can assign due dates and priority (low/medium/high)
- Provide filtering: all / active / completed / overdue
- Persist data locally so refresh does not lose tasks

UX requirements:
- Skeuomorphic visual style inspired by physical notebook/paper/cards
- Subtle shadows, depth, gradients, tactile controls, but keep readability high
- Smooth micro-interactions for toggles, checkboxes, add/remove actions
- Responsive layout for desktop and mobile

Non-goals for this iteration:
- No login, no cloud sync, no multi-user collaboration
```

---

## 3) 需求澄清（建议）

```text
/speckit.clarify
Ask me one question at a time for any ambiguities, especially around:
- default sorting
- overdue behavior
- date format and locale
- skeuomorphic intensity level
- mobile interaction priorities
```

---

## 4) 生成技术方案（HOW）

```text
/speckit.plan
Implementation constraints:
- Use existing project files: index.html, styles.css, script.js
- Prefer vanilla HTML/CSS/JS, no framework
- Use localStorage for persistence
- Modularize JavaScript logically (task model, rendering, storage, events)
- Include lightweight test strategy for core task operations
- Keep code easy to maintain and easy to restyle
```

---

## 5) 生成任务并做一致性检查

```text
/speckit.tasks
```

```text
/speckit.analyze
```

---

## 6) 执行实现

```text
/speckit.implement
Implement all tasks from tasks.md.
After implementation, run/describe validation steps and summarize:
1) changed files
2) test/verification evidence
3) remaining risks or TODOs
```

---

## 7) 收尾验收要求（给 Cursor）

```text
Before finalizing, verify:
- Keyboard accessibility works for all core actions
- Filters and persistence are correct across reload
- Skeuomorphic style is consistent and not visually noisy
- Mobile layout is usable
- No obvious console errors
```
