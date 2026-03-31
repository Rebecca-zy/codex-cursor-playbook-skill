# Quickstart: Skeuomorphic TODO List Web App

**Date**: 2026-02-18  
**Phase**: 1 - Design & Contracts

## Prerequisites

- Modern web browser (Chrome, Firefox, Safari, Edge - latest 2 versions)
- No build tools or dependencies required
- No server required (can open `index.html` directly)

## Setup

1. **Open the application**:
   ```bash
   # Option 1: Open directly in browser
   open index.html
   
   # Option 2: Use a simple HTTP server (recommended for development)
   python3 -m http.server 8000
   # Then navigate to http://localhost:8000
   ```

2. **Verify localStorage is available**:
   - Open browser DevTools → Application → Local Storage
   - Key `todoAppTasks` will be created when you add your first task

## Usage

### Adding a Task

1. Type task text in the input field at the top
2. (Optional) Set due date using the date picker
3. (Optional) Set priority (low/medium/high)
4. Press Enter or click "Add Task" button
5. Task appears in the appropriate section (Today, Upcoming, or Someday)

### Editing a Task

1. Click the edit button (pencil icon) on any task
2. Task text becomes editable inline
3. Make changes and press Enter to save, or Escape to cancel

### Completing a Task

1. Click the checkbox next to a task
2. Task is marked as completed with visual indication
3. Click again to uncomplete

### Deleting a Task

1. Click the delete button (trash icon) on any task
2. Task is removed immediately

### Filtering Tasks

1. Use filter buttons at the top:
   - **All**: Show all tasks
   - **Active**: Show only incomplete tasks
   - **Completed**: Show only completed tasks
   - **Overdue**: Show only overdue tasks

### Keyboard Shortcuts

- **Tab**: Navigate between interactive elements
- **Enter**: Add task (when input focused) or save edit (when editing)
- **Escape**: Cancel edit mode
- **Space**: Toggle checkbox (when checkbox focused)

## File Structure

```
demo/login-ui-codex/
├── index.html      # Main HTML structure
├── styles.css      # Skeuomorphic styling
└── script.js       # Task management logic
```

## Development

### Making Changes

1. Edit files directly (`index.html`, `styles.css`, `script.js`)
2. Refresh browser to see changes
3. No build step required

### Testing

- Manual testing: Use browser DevTools console
- Automated testing: Can add simple test harness (see `contracts/task-api.md` for testable functions)

### Debugging

- Open browser DevTools (F12)
- Check Console for errors
- Check Application → Local Storage for persisted data
- Use breakpoints in `script.js` for debugging

## Data Persistence

- Tasks are saved automatically to `localStorage` after each action
- Data persists across browser sessions
- To clear all data: `localStorage.removeItem('todoAppTasks')` in console

## Troubleshooting

### Tasks not persisting

- Check if localStorage is available: `typeof(Storage) !== "undefined"`
- Check browser console for errors
- Verify localStorage quota not exceeded (typically 5-10MB)

### Styling looks broken

- Ensure `styles.css` is linked correctly in `index.html`
- Check browser DevTools for CSS errors
- Verify viewport meta tag is present: `<meta name="viewport" content="width=device-width, initial-scale=1.0">`

### Keyboard navigation not working

- Ensure focus is visible (check CSS for `:focus-visible` styles)
- Verify semantic HTML is used (`<button>`, `<input>`, etc.)
- Check ARIA attributes are present for dynamic content

## Next Steps

- See `data-model.md` for data structure details
- See `contracts/task-api.md` for function signatures
- See `plan.md` for implementation details
