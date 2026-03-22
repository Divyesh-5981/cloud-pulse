export const SERVICE_STATUS = {
  HEALTHY: 'Healthy',
  DEGRADED: 'Degraded',
  DOWN: 'Down',
} as const;

export type ServiceStatus =
  (typeof SERVICE_STATUS)[keyof typeof SERVICE_STATUS];

export interface StatusLegendItem {
  status: ServiceStatus;
  label: string;
}

export interface Service {
  id: string;
  name: string;
  status: ServiceStatus;
  uptimePercent: number;
  lastCheckedAt: string;
  openIncidentCount: number;
}

export type CardFieldType = 'badge' | 'uptime' | 'incidents' | 'lastChecked';

export interface CardFieldConfig {
  type: CardFieldType;
}
