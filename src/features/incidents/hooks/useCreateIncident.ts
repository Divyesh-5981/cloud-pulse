import { useMutation } from '@apollo/client/react';
import { useCallback } from 'react';

import { useSnackbar } from '@/hooks/useSnackbar';

import { CREATE_INCIDENT } from '../api/queries';
import { type Incident, type Severity } from '../types';

interface CreateIncidentData {
  createIncident: Incident;
}

export interface CreateIncidentInput {
  title: string;
  description: string;
  serviceName: string;
  severity: Severity | '';
  assignee: string;
}

interface UseCreateIncidentReturn {
  createIncident: (input: CreateIncidentInput) => Promise<boolean>;
  loading: boolean;
}

export function useCreateIncident(): UseCreateIncidentReturn {
  const { showSnackbar } = useSnackbar();

  const [mutate, { loading }] = useMutation<CreateIncidentData>(
    CREATE_INCIDENT,
    { refetchQueries: ['GetIncidents'] },
  );

  const createIncident = useCallback(
    async (input: CreateIncidentInput): Promise<boolean> => {
      try {
        await mutate({ variables: input });
        showSnackbar('Incident created successfully', 'success');
        return true;
      } catch {
        showSnackbar('Failed to create incident', 'error');
        return false;
      }
    },
    [mutate, showSnackbar],
  );

  return { createIncident, loading };
}
