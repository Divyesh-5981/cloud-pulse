# Cloud Service Monitor Dashboard — Requirements

## 1. Project Overview

Build a Cloud Service Monitor Dashboard using React and a mocked GraphQL API layer.

The dashboard provides:

- Real-time cloud service health overview
- Incident tracking and management
- Role-based action visibility
- Auto-refresh and background updates
- Config-driven extensibility

## 2. Technical Stack

| Technology  | Details                           |
| ----------- | --------------------------------- |
| React       | 18+                               |
| GraphQL     | Mocked — no real backend required |
| API Mocking | Static mock responses             |
| UI Library  | Material UI                       |

No real backend. All queries and mutations must be mocked.

## 3. Config-Driven UI

The page structure must be driven by a configuration object. This includes:

- Tabs
- Table columns
- Filters
- Actions
- Side panel sections

The UI must render dynamically based on configuration — not hardcoded JSX.

### Conceptual Example

```json
{
  "tabs": [
    { "id": "services", "label": "Services" },
    { "id": "incidents", "label": "Incidents" }
  ],
  "incidentTable": {
    "columns": [
      { "id": "title", "label": "Title", "type": "link" },
      { "id": "severity", "label": "Severity", "type": "badge" },
      { "id": "status", "label": "Status", "type": "chip" }
    ]
  }
}
```

### Extensibility Expectations

The design must allow:

- Adding a new column without rewriting table logic
- Adding a new action without modifying multiple components
- Adding a new tab without restructuring layout

## 4. Header

- Application title
- Auto-refresh toggle (ON/OFF)
- Manual refresh button

## 5. Role-Based Visibility

Three roles exist:

| Role     | Services Tab | Incidents Tab | Actions |
| -------- | ------------ | ------------- | ------- |
| Admin    | ✅           | ✅            | All     |
| Operator | ✅           | ✅            | Limited |
| Viewer   | ✅           | ❌            | None    |

## 6. Services Tab — Health Overview

Visible to: Admin, Operator, Viewer (everyone)

Displays service cards containing:

- Service Name
- Status: Healthy / Degraded / Down
- Uptime Percentage
- Last Checked Time
- Open Incident Count

Requirements:

- Status indicators must be consistent across the entire app
- Skeleton loading must be used during initial fetch

## 7. Incidents Tab

Visible to: Admin, Operator only

Contains:

- Filter section
- Incident table
- Pagination
- Side panel
- Actions

### 7.1 Incident Table — Column Mapping

Columns must map to specific component types, driven from configuration:

| Column Name | Field       | Component Type | Expected Rendering         |
| ----------- | ----------- | -------------- | -------------------------- |
| ID          | id          | Text           | Plain text                 |
| Title       | title       | Link           | Click opens side panel     |
| Service     | serviceName | Chip           | Styled label               |
| Severity    | severity    | Badge          | Colored severity indicator |
| Status      | status      | Status Chip    | Colored status chip        |
| Assignee    | assignee    | Text           | Plain text                 |
| Created     | createdAt   | Relative Time  | "X minutes ago"            |

### 7.2 Filters — Incidents Tab

Filters must be generated from configuration:

| Filter   | Type          | Options                      |
| -------- | ------------- | ---------------------------- |
| Severity | Multi-select  | Critical, High, Medium, Low  |
| Status   | Multi-select  | Open, Acknowledged, Resolved |
| Service  | Single-select | Service list                 |

Filter Behavior:

- Multi-select allows multiple selections
- Selected filters appear as removable chips
- "Clear All" resets all filters
- Pagination resets to page 1 on filter change
- No infinite fetch loops
- Filter changes must not cause unstable UI

## 8. Side Panel — Incident Detail

Opens when clicking the Title column in the incident table.

Contains:

- Header: Title, Severity, Status
- Details section
- Notes section

## 9. Notes Section — Auto-Save Behavior

The Notes field must:

- Be a controlled input
- Auto-save after 2 seconds of inactivity
- Have NO explicit Save button

### Save States

| State      | Indicator           |
| ---------- | ------------------- |
| No changes | ✓ Saved             |
| Typing     | Unsaved changes     |
| Saving     | Spinner + "Saving…" |
| Saved      | ✓ Saved             |

### Critical Behavior

If user types while a save is in progress:

- UI must correctly show "Unsaved changes"
- Save state must reflect the latest content
- No stale "Saved" state should be shown

Notes must be updated via mocked GraphQL mutation.

## 10. Pagination

- Page size: 10
- Show total count
- Disable navigation buttons appropriately (first/last page)
- Background refetch must NOT clear existing rows

## 11. Auto-Refresh Behavior

- Toggle available in header
- When ON → refetch incidents every 30 seconds
- When OFF → no polling
- Switching tabs must NOT leave polling active
- Must properly clean up intervals on unmount/tab switch

Manual refresh button must refetch immediately.

## 12. Loading, Error & Empty States

Must handle all of these:

- Initial skeleton loading
- Background updating indicator (subtle, doesn't replace content)
- Error state with retry button
- Empty filtered state ("No incidents match your filters")
- Zero incidents state ("No incidents")

No layout shifts during loading transitions.

## 13. Action Behavior

When any action is taken:

- Table row updates immediately (optimistic update)
- Side panel updates immediately
- Snackbar confirmation appears
- No unnecessary re-fetch of entire dataset
- UI remains stable

## 14. Evaluation Criteria

### Architectural Design

- Clean, scalable structure
- Config-driven rendering
- Centralized role logic

### Data Flow Clarity

- Clear async behavior
- Stable effects (no infinite loops, proper cleanup)
- No redundant renders

### UX Precision

- Proper disabled states
- Clear feedback on all actions
- Stable layout (no shifts)

### Code Quality

- Clean naming conventions
- Logical component organization
- Proper testing of key flows

## 15. Key Evaluation Priorities (What Matters Most)

In order of importance:

1. **Scalable thinking** — Can the architecture grow without rewrites?
2. **Clean architecture** — Is the code organized logically with clear boundaries?
3. **Stable asynchronous handling** — Are effects clean? No race conditions? Proper cleanup?
4. **Professional UI engineering discipline** — Proper states, feedback, no layout shifts
5. **Clarity and structure over visual polish** — Code quality > pixel perfection

### Our Approach for Every Step

For each piece of the application, we will document:

- **What** we're building and why
- **The approach** and its benefits
- **How popular libraries solve the same problem** (for interview context)
- **Edge cases** we're handling and why
- **Best practices** applied: scalability, maintainability, readability, clean architecture

## 16. Submission Requirements

1. Upload code to personal Git repository
2. Share the GitHub link
3. Host the UI on a free platform (Vercel, Netlify, Render, GitHub Pages, or equivalent)
4. Provide both: Git repository link AND hosted application URL
