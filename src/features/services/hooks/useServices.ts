import { useQuery } from '@apollo/client/react';

import { GET_SERVICES } from '@/features/services/api/queries';

import { type Service } from '../types';

interface GetServicesData {
  services: Service[];
}

interface UseServicesReturn {
  services: Service[];
  loading: boolean;
  isBackgroundFetching: boolean;
  error: Error | undefined;
  refetch: () => void;
}

export function useServices(): UseServicesReturn {
  const { data, previousData, loading, error, refetch } =
    useQuery<GetServicesData>(GET_SERVICES);

  const effectiveData = data ?? previousData;
  const isInitialLoad = loading && !data && !previousData;

  return {
    services: effectiveData?.services ?? [],
    loading,
    isBackgroundFetching: loading && !isInitialLoad,
    error,
    refetch: () => void refetch(),
  };
}
