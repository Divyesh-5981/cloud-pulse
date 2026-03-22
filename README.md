# ☁️ CloudPulse — Cloud Service Monitor Dashboard

A config-driven, role-aware dashboard for monitoring cloud service health and managing incidents in real time. Built with React 19, Material UI 7, and Apollo Client 4 over a fully mocked GraphQL layer — no backend required.

---

## Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Available Scripts](#available-scripts)
- [Project Structure](#project-structure)
- [Features](#features)
- [Role-Based Access Control](#role-based-access-control)
- [Config-Driven Architecture](#config-driven-architecture)
- [Testing](#testing)
- [Design Decisions](#design-decisions)

---

## Overview

CloudPulse is a single-page dashboard that provides:

- A real-time health overview of cloud services (status, uptime, last checked, open incidents)
- A full incident management workflow (filter, paginate, inspect, acknowledge, resolve, create)
- Role-based visibility — tabs, actions, and UI elements adapt to the active user role
- Auto-refresh with background polling and manual refresh support
- Optimistic UI updates with snackbar feedback on every action

All data is served through an in-memory mocked GraphQL layer using Apollo Client's `SchemaLink`, making the app fully self-contained.

---

## Tech Stack

| Layer           | Technology                                          |
| --------------- | --------------------------------------------------- |
| Framework       | React 19                                            |
| Language        | TypeScript 5.9                                      |
| UI Library      | Material UI 7 (Emotion)                             |
| Data Layer      | Apollo Client 4 + GraphQL                           |
| API Mocking     | `graphql-tools` executable schema with `SchemaLink` |
| Build Tool      | Vite 8                                              |
| Testing         | Vitest 4 + React Testing Library                    |
| Linting         | ESLint 9 + Prettier                                 |
| Package Manager | pnpm                                                |

---

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm 9+

### Installation

```bash
# Clone the repository
git clone https://github.com/<your-username>/cloud-pulse.git
cd cloud-pulse

# Install dependencies
pnpm install

# Start the development server
pnpm run dev
```

The app will be available at `http://localhost:5173`.

---

## Available Scripts

| Command               | Description                      |
| --------------------- | -------------------------------- |
| `pnpm run dev`        | Start Vite dev server            |
| `pnpm run build`      | Type-check + production build    |
| `pnpm run preview`    | Preview production build locally |
| `pnpm run test`       | Run all tests (single run)       |
| `pnpm run test:watch` | Run tests in watch mode          |
| `pnpm run lint`       | Lint with ESLint                 |
| `pnpm run lint:fix`   | Auto-fix lint issues             |
| `pnpm run type-check` | TypeScript type checking         |
| `pnpm run format`     | Format code with Prettier        |

---

## Project Structure

```
src/
├── app/                  # Theme configuration, root providers
├── components/
│   ├── feedback/         # BackgroundUpdateIndicator, ErrorFallback
│   └── layout/           # Header, TabContainer, RoleSwitcher
├── config/               # Tabs and roles configuration
├── context/              # Auth and Snackbar context providers
├── features/
│   ├── incidents/        # Incident management feature
│   │   ├── api/          # GraphQL queries, resolvers, mock data
│   │   ├── components/   # Table, Filters, SidePanel, Pagination, etc.
│   │   ├── hooks/        # useIncidents, useIncidentFilters, useAutoSave, etc.
│   │   ├── types/        # Incident-specific type definitions
│   │   └── utils/        # Helpers (severity colors, relative time, etc.)
│   └── services/         # Service health feature (same structure)
├── graphql/              # Apollo client setup, schema, mock user data
├── hooks/                # Shared hooks (useAuth, useSnackbar, useAutoRefresh)
├── shared/               # Design tokens (colors, spacing)
├── test/                 # Test setup and utilities
└── types/                # Global types (roles, permissions)
```

Each feature is self-contained with its own API layer, components, hooks, types, and utilities — following a feature-sliced architecture.

---

## Features

### Services Tab — Health Overview

Visible to all roles. Displays service cards with:

- Service name and health status (Healthy / Degraded / Down)
- Uptime percentage
- Last checked timestamp
- Open incident count
- Skeleton loading during initial fetch
- Empty state when no services exist

### Incidents Tab — Incident Management

Visible to Admin and Operator roles. Includes:

- **Filterable table** — severity (multi-select), status (multi-select), service (single-select), with "Clear All" support
- **Pagination** — 10 items per page, total count display, proper disabled states at boundaries
- **Detail side panel** — opens on title click, shows full incident details with notes
- **Auto-save notes** — debounced 2-second save with visual status indicators (idle → unsaved → saving → saved)
- **Actions** — Acknowledge and Resolve buttons, gated by role and incident status
- **New Incident dialog** — form with validation (Admin only)
- **Empty and error states** — filtered empty, zero incidents, error with retry

### Auto-Refresh

- Toggle in the header enables 30-second polling
- Manual refresh button for immediate refetch
- Background update indicator (subtle, doesn't replace content)
- Proper cleanup on tab switch and unmount

### Optimistic Updates

- Acknowledge/Resolve actions update the table and side panel instantly
- Snackbar confirmation on every action
- No full dataset re-fetch — uses Apollo cache modification

---

## Role-Based Access Control

Three roles with distinct permissions, switchable via the header toggle:

| Capability            | Admin | Operator | Viewer |
| --------------------- | :---: | :------: | :----: |
| Services Tab          |  ✅   |    ✅    |   ✅   |
| Incidents Tab         |  ✅   |    ✅    |   ❌   |
| Acknowledge Incidents |  ✅   |    ✅    |   ❌   |
| Resolve Incidents     |  ✅   |    ❌    |   ❌   |
| Create Incidents      |  ✅   |    ❌    |   ❌   |

Role logic is centralized in `src/config/roles.config.ts` — a single source of truth consumed by all components.

---

## Config-Driven Architecture

The UI is rendered dynamically from configuration objects rather than hardcoded JSX. This means:

- **Adding a new table column** → add one entry to `INCIDENT_COLUMNS`
- **Adding a new filter** → add one entry to `INCIDENT_FILTERS`
- **Adding a new action** → add one entry to `INCIDENT_ACTIONS`
- **Adding a new tab** → add one entry to `TABS_CONFIG`

No component modifications required. Example:

```typescript
// Adding a column is a one-line config change
export const INCIDENT_COLUMNS: ColumnConfig[] = [
  { id: 'title', label: 'Title', type: 'link', minWidth: 180 },
  { id: 'severity', label: 'Severity', type: 'badge', minWidth: 110 },
  // Add new column here — table renders it automatically
];
```

---

## Testing

38 tests covering the key flows:

```bash
pnpm run test
```

| Test Suite           | What It Covers                                                             |
| -------------------- | -------------------------------------------------------------------------- |
| `useAutoSave`        | Debounce timing, save-in-flight handling, error recovery, unmount flush    |
| `useIncidentFilters` | Filter state, pagination reset, no-op detection, clearAll                  |
| `RoleBased`          | Tab visibility per role, permission matrix, action gating by role + status |
| `ConfigDriven`       | Column/filter/action config integrity, structural correctness, defaults    |

Test utilities in `src/test/test-utils.tsx` provide a `renderWithProviders` helper that wraps components with Apollo, Theme, Auth, and Snackbar contexts.

---

## Design Decisions

| Decision                                     | Rationale                                                                                                                         |
| -------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| Feature-sliced architecture                  | Each feature owns its API, components, hooks, and types — clear boundaries, easy to extend                                        |
| Config-driven rendering                      | Columns, filters, actions, and tabs are data — not hardcoded JSX. Adding features requires config changes, not component rewrites |
| Centralized role permissions                 | Single `ROLE_PERMISSIONS` map consumed everywhere — no scattered permission checks                                                |
| Apollo `cache.modify` for optimistic updates | Instant UI feedback without re-fetching the entire dataset                                                                        |
| `useRef` for mutable flags in hooks          | Avoids stale closures in async save flows (e.g., `dirtyRef`, `savingRef` in `useAutoSave`)                                        |
| `SchemaLink` for mocking                     | Full GraphQL execution with resolvers — behaves like a real API without network overhead                                          |
| Pure-logic tests over component tests        | Tests validate business rules (roles, configs, state machines) without brittle DOM assertions                                     |
