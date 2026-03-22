import { type Service } from '../types';
import { MOCK_SERVICES } from './mock-data';

type ResolverFn = (variables: Record<string, unknown>) => unknown;

function withLiveJitter(service: Service): Service {
  const uptimeJitter = (Math.random() - 0.5) * 0.4; // ±0.2%
  const uptimePercent = Math.min(
    100,
    Math.max(0, +(service.uptimePercent + uptimeJitter).toFixed(2)),
  );

  const incidentJitter =
    Math.random() < 0.15 ? (Math.random() < 0.5 ? 1 : -1) : 0;
  const openIncidentCount = Math.max(
    0,
    service.openIncidentCount + incidentJitter,
  );

  return {
    ...service,
    uptimePercent,
    openIncidentCount,
    lastCheckedAt: new Date().toISOString(),
  };
}

export const serviceMockResolvers: Record<string, ResolverFn> = {
  GetServices: () => ({
    services: MOCK_SERVICES.map(withLiveJitter),
  }),
};
