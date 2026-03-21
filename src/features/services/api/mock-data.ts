import { type Service, SERVICE_STATUS } from '@/features/services/types';

function minutesAgo(minutes: number): string {
  return new Date(Date.now() - minutes * 60_000).toISOString();
}

export const MOCK_SERVICES: Service[] = [
  {
    id: 'svc_api_gateway',
    name: 'API Gateway',
    status: SERVICE_STATUS.HEALTHY,
    uptimePercent: 99.98,
    lastCheckedAt: minutesAgo(2),
    openIncidentCount: 0,
  },
  {
    id: 'svc_auth_service',
    name: 'Auth Service',
    status: SERVICE_STATUS.HEALTHY,
    uptimePercent: 99.95,
    lastCheckedAt: minutesAgo(1),
    openIncidentCount: 0,
  },
  {
    id: 'svc_payment_processor',
    name: 'Payment Processor',
    status: SERVICE_STATUS.DEGRADED,
    uptimePercent: 97.3,
    lastCheckedAt: minutesAgo(5),
    openIncidentCount: 2,
  },
  {
    id: 'svc_notification_engine',
    name: 'Notification Engine',
    status: SERVICE_STATUS.HEALTHY,
    uptimePercent: 99.99,
    lastCheckedAt: minutesAgo(3),
    openIncidentCount: 0,
  },
  {
    id: 'svc_data_pipeline',
    name: 'Data Pipeline',
    status: SERVICE_STATUS.DEGRADED,
    uptimePercent: 94.7,
    lastCheckedAt: minutesAgo(8),
    openIncidentCount: 1,
  },
  {
    id: 'svc_cdn',
    name: 'CDN',
    status: SERVICE_STATUS.DOWN,
    uptimePercent: 78.2,
    lastCheckedAt: minutesAgo(12),
    openIncidentCount: 3,
  },
];
