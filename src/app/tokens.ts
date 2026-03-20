/**
 * Design tokens — single source of truth for all visual constants.
 * Theme, style files, and components all import from here.
 *
 * Naming: category.variant (e.g., palette.primary.main, overlay.white.high)
 */

/* ─── App metadata ─── */
export const APP_TITLE = 'Cloud Pulse';

/* ─── Brand palette ─── */
export const palette = {
  primary: {
    dark: '#0f1620',
    main: '#1a2332',
    light: '#2d3a4a',
    surface: '#243447',
    contrastText: '#ffffff',
  },
  secondary: '#3b82f6',
  accent: {
    green: '#34d399',
  },
  background: {
    default: '#f0f2f5',
    paper: '#ffffff',
  },
  border: {
    light: 'rgba(0,0,0,0.06)',
  },
} as const;

/* ─── White overlays (for dark backgrounds) ─── */
export const overlay = {
  white: {
    high: 'rgba(255,255,255,0.95)',
    medium: 'rgba(255,255,255,0.7)',
    low: 'rgba(255,255,255,0.4)',
    faint: 'rgba(255,255,255,0.12)',
  },
} as const;

/**
 * Status / severity / incident colors
 *
 * Accessibility note:
 * These colors are used as background or text indicators. When used as text on
 * a white (#fff) background, ensure a minimum 4.5:1 contrast ratio (WCAG AA).
 *   - severityColors.Medium (#ff9800) has ~3.0:1 on white — pair with a dark
 *     background or use as a background with dark text instead.
 *   - statusColors.Healthy (#2e7d32) ≈ 4.8:1 on white — passes AA.
 *   - statusColors.Down / severityColors.Critical (#d32f2f) ≈ 5.6:1 — passes AA.
 *
 * TODO: Add automated contrast-ratio checks when these tokens are consumed.
 */
export const statusColors = {
  Healthy: '#2e7d32',
  Degraded: '#ed6c02',
  Down: '#d32f2f',
} as const;

export const severityColors = {
  Critical: '#d32f2f',
  High: '#f44336',
  Medium: '#ff9800',
  Low: '#2196f3',
} as const;

export const incidentStatusColors = {
  Open: '#d32f2f',
  Acknowledged: '#ed6c02',
  Resolved: '#2e7d32',
} as const;

/* ─── Error / feedback ─── */
export const errorColors = {
  main: '#d32f2f',
  surface: '#fef2f2',
  detailsBg: '#f8f9fa',
} as const;

/* ─── Elevation / shadows ─── */
export const shadow = {
  header: '0 1px 3px rgba(0,0,0,0.24), 0 4px 12px rgba(0,0,0,0.16)',
  card: '0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)',
  subtle: '0 1px 2px rgba(0,0,0,0.04)',
} as const;

/* ─── Gradients ─── */
export const gradient = {
  header: `linear-gradient(135deg, ${palette.primary.dark} 0%, ${palette.primary.main} 50%, ${palette.primary.surface} 100%)`,
} as const;

/* ─── Border radii (numbers for theme, use `${radius.md}px` where CSS strings needed) ─── */
export const radius = {
  sm: 6,
  md: 8,
  lg: 10,
} as const;

/* ─── Sizing ─── */
export const sizing = {
  controlHeight: 36,
  headerMinHeight: { xs: 56, sm: 64 },
} as const;
