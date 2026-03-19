import { useCallback, useMemo, useState } from 'react';

import { type TabConfig, type TabId, TABS_CONFIG } from '@/config/tabs.config';
import { useAuth } from '@/hooks/useAuth';

interface UseTabNavigationReturn {
  visibleTabs: TabConfig[];
  activeTab: TabId;
  onTabChange: (tabId: TabId) => void;
}

const DEFAULT_TAB_ID = TABS_CONFIG[0].id;

export function useTabNavigation(): UseTabNavigationReturn {
  const { role } = useAuth();
  const [selectedTab, setSelectedTab] = useState<TabId>(DEFAULT_TAB_ID);

  const visibleTabs = useMemo(
    () => TABS_CONFIG.filter((tab) => tab.roles.includes(role)),
    [role],
  );

  const isSelectedTabVisible = visibleTabs.some(
    (tab) => tab.id === selectedTab,
  );

  const activeTab = isSelectedTabVisible
    ? selectedTab
    : (visibleTabs[0]?.id ?? DEFAULT_TAB_ID);

  const onTabChange = useCallback((tabId: TabId) => {
    setSelectedTab(tabId);
  }, []);

  return { visibleTabs, activeTab, onTabChange };
}
