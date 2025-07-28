import useMediaQuery from '@mui/material/useMediaQuery';
import { CSSProperties, memo } from 'react';
import { useTranslation } from 'react-i18next';

import { ReactComponent as AppStoreIconBtn } from 'assets/icons/AppStore.svg';
import { ICON_SIZES } from 'constants/ui/layout';

interface AppStoreIconProps {
  style?: CSSProperties;
}
export const AppStoreIcon = memo<AppStoreIconProps>(
  ({ style, ...props }: AppStoreIconProps) => {
    const { t } = useTranslation('translation', {
      keyPrefix: 'Accessibility',
    });
    const isTablet = useMediaQuery('(max-width: 768px)');
    const { width, height } = isTablet ? ICON_SIZES.sm : ICON_SIZES.lg;

    return (
      <AppStoreIconBtn
        style={style}
        role="img"
        aria-label={t('label.appStore')}
        data-testid="app-store-icon"
        width={width}
        height={height}
        {...props}
      />
    );
  },
);

AppStoreIcon.displayName = 'AppStoreIcon';
