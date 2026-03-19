import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useCallback, useState } from 'react';

import { Header } from '@/components/layout/Header';
import { TabContainer } from '@/components/layout/TabContainer';
import { TAB_IDS } from '@/config/tabs.config';
import { useTabNavigation } from '@/hooks/useTabNavigation';

import { styles } from './App.styles';

function App() {
  const { visibleTabs, activeTab, onTabChange } = useTabNavigation();
  const [autoRefresh, setAutoRefresh] = useState(false);

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
        {activeTab === TAB_IDS.SERVICES && (
          <Typography color="text.secondary">
            Services tab — cards will go here
          </Typography>
        )}
        {activeTab === TAB_IDS.INCIDENTS && (
          <Typography color="text.secondary">
            Incidents tab — table will go here
          </Typography>
        )}
      </TabContainer>
    </Box>
  );
}

export default App;
