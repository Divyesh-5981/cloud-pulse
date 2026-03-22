import { useCallback, useMemo, useState } from 'react';

import { type TabConfig, type TabId, TABS_CONFIG } from '@/config/tabs.config';
import { useAuth } from '@/hooks/useAuth';

interface UseTabNavigationReturn {
  visibleTabs: TabConfig[];
  activeTab: TabId;
  onTabChange: (tabId: TabId) => void;
}

export function useTabNavigation(): UseTabNavigationReturn {
  const { role } = useAuth();

  const visibleTabs = useMemo(
    () => TABS_CONFIG.filter((tab) => tab.roles.includes(role)),
    [role],
  );

  const [selectedTab, setSelectedTab] = useState<TabId>(visibleTabs[0].id);

  const activeTab = visibleTabs.some((tab) => tab.id === selectedTab)
    ? selectedTab
    : visibleTabs[0].id;

  const onTabChange = useCallback(
    (tabId: TabId) => {
      if (visibleTabs.some((tab) => tab.id === tabId)) setSelectedTab(tabId);
    },
    [visibleTabs],
  );

  return { visibleTabs, activeTab, onTabChange };
}
