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
  return (
    <Box>
      <Box sx={styles.tabBar}>
        <Tabs
          value={activeTab}
          onChange={(_, newValue: TabId) => onTabChange(newValue)}
          sx={styles.tabs}
        >
          {visibleTabs.map(({ id, label }) => (
            <Tab key={id} value={id} label={label} />
          ))}
        </Tabs>
      </Box>
      <Box sx={styles.content}>{children}</Box>
    </Box>
  );
}
