import { useMediaQuery } from '@mui/material';

import { ReactComponent as AppStoreIconBtn } from 'assets/icons/AppStore.svg';

export const AppStoreIcon = () => {
  const isTablet = useMediaQuery('(max-width: 768px)');
  const iconWidth = isTablet ? 139 : 180;
  const iconHeight = isTablet ? 40 : 52;
  return (
    <AppStoreIconBtn
      data-testid="app-store-icon"
      width={iconWidth}
      height={iconHeight}
    />
  );
};
