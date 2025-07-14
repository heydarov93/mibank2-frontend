import { useMediaQuery } from '@mui/material';

import { ReactComponent as AppStoreIconBtn } from 'assets/icons/AppStore.svg';
import { ICON_SIZES } from 'constants/ui/layout';

export const AppStoreIcon = () => {
  const isTablet = useMediaQuery('(max-width: 768px)');
  const { width, height } = isTablet ? ICON_SIZES.sm : ICON_SIZES.lg;

  return (
    <AppStoreIconBtn
      data-testid="app-store-icon"
      width={width}
      height={height}
    />
  );
};
