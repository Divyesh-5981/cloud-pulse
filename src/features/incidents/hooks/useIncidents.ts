import { useQuery } from '@apollo/client/react';

import { GET_INCIDENTS } from '@/features/incidents/api/queries';

import { INCIDENT_PAGINATION } from '../config';
import { type FilterValues, type Incident } from '../types';

interface GetIncidentsData {
  incidents: {
    items: Incident[];
    totalCount: number;
  };
}

interface GetIncidentsVariables {
  severity: string[];
  status: string[];
  serviceName: string;
  page: number;
  pageSize: number;
}

interface UseIncidentsParams {
  filters: FilterValues;
  page: number;
}

interface UseIncidentsReturn {
  incidents: Incident[];
  totalCount: number;
  loading: boolean;
  isInitialLoad: boolean;
  isBackgroundFetching: boolean;
  error: Error | undefined;
  refetch: () => void;
}

export function useIncidents({
  filters,
  page,
}: UseIncidentsParams): UseIncidentsReturn {
  const { data, previousData, loading, error, refetch } = useQuery<
    GetIncidentsData,
    GetIncidentsVariables
  >(GET_INCIDENTS, {
    variables: {
      severity: filters.severity ?? [],
      status: filters.status ?? [],
      serviceName: (filters.serviceName?.[0] as string) ?? '',
      page,
      pageSize: INCIDENT_PAGINATION.pageSize,
    },
    fetchPolicy: 'cache-and-network',
  });

  const effectiveData = data ?? previousData;

  const isInitialLoad = loading && !data && !previousData;

  return {
    incidents: effectiveData?.incidents.items ?? [],
    totalCount: effectiveData?.incidents.totalCount ?? 0,
    loading,
    isInitialLoad,
    isBackgroundFetching: loading && !isInitialLoad,
    error,
    refetch: () => void refetch(),
  };
}
