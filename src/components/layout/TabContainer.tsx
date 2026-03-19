import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import { type ReactNode } from 'react';

import { type TabConfig, type TabId } from '@/config/tabs.config';

import { styles } from './TabContainer.styles';

interface TabContainerProps {
  visibleTabs: TabConfig[];
  activeTab: TabId;
  onTabChange: (tabId: TabId) => void;
  children: ReactNode;
}

export function TabContainer({
  visibleTabs,
  activeTab,
  onTabChange,
  children,
}: TabContainerProps) {
  if (visibleTabs.length === 0) {
    return <Box sx={styles.content}>{children}</Box>;
  }

  const activeIndex = visibleTabs.findIndex((tab) => tab.id === activeTab);

  return (
    <Box>
      <Box sx={styles.tabBar}>
        <Tabs
          value={activeIndex === -1 ? 0 : activeIndex}
          sx={styles.tabs}
          onChange={(_, newIndex) => {
            const tab = visibleTabs[newIndex];
            if (tab) onTabChange(tab.id);
          }}
        >
          {visibleTabs.map((tab) => (
            <Tab key={tab.id} label={tab.label} />
          ))}
        </Tabs>
      </Box>
      <Box sx={styles.content}>{children}</Box>
    </Box>
  );
}
