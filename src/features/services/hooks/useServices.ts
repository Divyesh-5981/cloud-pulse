import { useQuery } from '@apollo/client/react';

import { GET_SERVICES } from '@/features/services/api/queries';

import { type Service } from '../types';

interface GetServicesData {
  services: Service[];
}

interface UseServicesReturn {
  services: Service[];
  loading: boolean;
  error: Error | undefined;
  refetch: () => void;
}

export function useServices(): UseServicesReturn {
  const { data, loading, error, refetch } =
    useQuery<GetServicesData>(GET_SERVICES);

  return {
    services: data?.services ?? [],
    loading,
    error,
    refetch: () => void refetch(),
  };
}
