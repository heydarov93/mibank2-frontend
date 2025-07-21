import { memo, ReactNode } from 'react';

interface TabPanelProps {
  children?: ReactNode;
  index: number;
  value: number;
}

export const TabPanel = memo<TabPanelProps>(
  ({ children, index, value, ...props }: TabPanelProps) => {
    const isActive = value === index;
    const tabId = `tab-${index}`;

    return (
      <div
        role="tabpanel"
        hidden={!isActive}
        id={tabId}
        aria-labelledby={tabId}
        aria-hidden={!isActive}
        tabIndex={isActive ? 0 : -1}
        {...props}
      >
        {isActive && children}
      </div>
    );
  },
);

TabPanel.displayName = 'TabPanel';
