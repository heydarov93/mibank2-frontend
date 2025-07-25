import useMediaQuery from '@mui/material/useMediaQuery';
import { CSSProperties, memo } from 'react';
import { useTranslation } from 'react-i18next';

import { ReactComponent as GooglePlaySVG } from 'assets/icons/GooglePlay.svg';
import { ICON_SIZES } from 'constants/ui/layout';

interface GooglePlayIconProps {
  style?: CSSProperties;
}

export const GooglePlayIcon = memo<GooglePlayIconProps>(
  ({ style, ...props }: GooglePlayIconProps) => {
    const { t } = useTranslation('translation', {
      keyPrefix: 'Accessibility',
    });
    const isTablet = useMediaQuery('(max-width: 768px)');
    const { width, height } = isTablet ? ICON_SIZES.sm : ICON_SIZES.lg;

    return (
      <GooglePlaySVG
        style={style}
        role="img"
        aria-label={t('label.googlePlay')}
        data-testid="google-play-icon"
        width={width}
        height={height}
        {...props}
      />
    );
  },
);

GooglePlayIcon.displayName = 'GooglePlayIcon';
