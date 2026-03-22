import Box from '@mui/material/Box';
import { type ComponentType, useCallback, useState } from 'react';

import Header from '@/components/layout/Header';
import TabContainer from '@/components/layout/TabContainer';
import { TAB_IDS, type TabId } from '@/config/tabs.config';
import { useTabNavigation } from '@/hooks/useTabNavigation';

import { styles } from './App.styles';
import IncidentPanel from './features/incidents/components/IncidentPanel';
import ServiceGrid from './features/services/components/ServiceGrid';

const TAB_PANELS: Record<TabId, ComponentType> = {
  [TAB_IDS.SERVICES]: ServiceGrid,
  [TAB_IDS.INCIDENTS]: IncidentPanel,
};

function App() {
  const { visibleTabs, activeTab, onTabChange } = useTabNavigation();
  const [autoRefresh, setAutoRefresh] = useState(false);
  const ActivePanel = TAB_PANELS[activeTab];

  const handleAutoRefreshToggle = useCallback(() => {
    setAutoRefresh((prev) => !prev);
  }, []);

  const handleManualRefresh = useCallback(() => {
    // Will be connected to data fetching later
  }, []);

  return (
    <Box sx={styles.root}>
      <Header
        autoRefresh={autoRefresh}
        onAutoRefreshToggle={handleAutoRefreshToggle}
        onManualRefresh={handleManualRefresh}
      />
      <TabContainer
        visibleTabs={visibleTabs}
        activeTab={activeTab}
        onTabChange={onTabChange}
      >
        {ActivePanel && <ActivePanel />}
      </TabContainer>
    </Box>
  );
}

export default App;
