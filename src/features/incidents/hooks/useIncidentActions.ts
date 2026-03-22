import { useMutation } from '@apollo/client/react';
import { useCallback } from 'react';

import { useSnackbar } from '@/hooks/useSnackbar';

import { UPDATE_INCIDENT_STATUS } from '../api/queries';
import { type IncidentStatus } from '../types';

interface UpdateIncidentStatusData {
  updateIncidentStatus: {
    __typename?: string;
    id: string;
    status: string;
    updatedAt: string;
  };
}

interface CachedIncidents {
  items: Array<{ id: string; status: string; updatedAt: string }>;
  totalCount: number;
}

interface UseIncidentActionsReturn {
  updateStatus: (id: string, status: IncidentStatus, label: string) => void;
}

export function useIncidentActions(): UseIncidentActionsReturn {
  const { showSnackbar } = useSnackbar();

  const [mutate] = useMutation<UpdateIncidentStatusData>(
    UPDATE_INCIDENT_STATUS,
  );

  const updateStatus = useCallback(
    async (id: string, status: IncidentStatus, label: string) => {
      try {
        await mutate({
          variables: { id, status },
          optimisticResponse: {
            updateIncidentStatus: {
              __typename: 'Incident',
              id,
              status,
              updatedAt: new Date().toISOString(),
            },
          },
          update: (cache, { data }) => {
            const updated = data?.updateIncidentStatus;
            if (!updated) return;

            cache.modify({
              fields: {
                incidents(existing) {
                  const typed = existing as CachedIncidents | undefined;
                  if (!typed?.items) return existing;

                  const newItems = typed.items.map((item) =>
                    item.id === id
                      ? {
                          ...item,
                          status: updated.status,
                          updatedAt: updated.updatedAt,
                        }
                      : item,
                  );

                  return { ...typed, items: newItems };
                },
              },
            });
          },
        });
        showSnackbar(`Incident ${id} ${label.toLowerCase()}`, 'success');
      } catch {
        showSnackbar(
          `Failed to ${label.toLowerCase()} incident ${id}`,
          'error',
        );
      }
    },
    [mutate, showSnackbar],
  );

  return { updateStatus };
}
