import { useApolloClient } from '@apollo/client/react';
import { useCallback, useEffect, useRef } from 'react';

const REFRESH_INTERVAL_MS = 30_000;

interface UseAutoRefreshParams {
  enabled: boolean;
  activeTab: string;
}

interface UseAutoRefreshReturn {
  manualRefresh: () => void;
}

export function useAutoRefresh({
  enabled,
  activeTab,
}: UseAutoRefreshParams): UseAutoRefreshReturn {
  const client = useApolloClient();
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const refetchAll = useCallback(() => {
    void client.refetchQueries({ include: 'active' });
  }, [client]);

  useEffect(() => {
    if (!enabled) return;

    intervalRef.current = setInterval(refetchAll, REFRESH_INTERVAL_MS);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [enabled, activeTab, refetchAll]);

  return { manualRefresh: refetchAll };
}
