import { useCallback, useMemo, useState } from 'react';

import { type TabConfig, type TabId, TABS_CONFIG } from '@/config/tabs.config';
import { useAuth } from '@/hooks/useAuth';

interface UseTabNavigationReturn {
  visibleTabs: TabConfig[];
  activeTab: TabId;
  onTabChange: (tabId: TabId) => void;
}

const firstTab = TABS_CONFIG[0];
if (!firstTab) {
  throw new Error('TABS_CONFIG must contain at least one tab');
}
const DEFAULT_TAB_ID = firstTab.id;

export function useTabNavigation(): UseTabNavigationReturn {
  const { role } = useAuth();
  const [selectedTab, setSelectedTab] = useState<TabId>(DEFAULT_TAB_ID);

  const visibleTabs = useMemo(() => {
    const tabs = TABS_CONFIG.filter((tab) => tab.roles.includes(role));

    if (tabs.length === 0) {
      throw new Error(`No tabs configured for role: ${role}`);
    }

    return tabs;
  }, [role]);

  const activeTab = visibleTabs.some((tab) => tab.id === selectedTab)
    ? selectedTab
    : visibleTabs[0].id;

  const onTabChange = useCallback((tabId: TabId) => {
    setSelectedTab(tabId);
  }, []);

  return { visibleTabs, activeTab, onTabChange };
}
