import { MOCK_SERVICES } from './mock-data';

type ResolverFn = (variables: Record<string, unknown>) => unknown;

export const serviceMockResolvers: Record<string, ResolverFn> = {
  GetServices: () => ({
    services: MOCK_SERVICES,
  }),
};
