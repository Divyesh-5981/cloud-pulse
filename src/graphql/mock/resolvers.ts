import { incidentMockResolvers } from '@/features/incidents/api/resolvers';
import { serviceMockResolvers } from '@/features/services/api/resolvers';

type ResolverFn = (variables: Record<string, unknown>) => unknown;

export const mockResolvers: Record<string, ResolverFn> = {
  ...serviceMockResolvers,
  ...incidentMockResolvers,
};
