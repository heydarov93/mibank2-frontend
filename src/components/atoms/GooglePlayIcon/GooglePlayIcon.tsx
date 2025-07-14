import { useMediaQuery } from '@mui/material';

import { ReactComponent as GooglePlayIconBtn } from 'assets/icons/GooglePlay.svg';
import { ICON_SIZES } from 'constants/ui/layout';

export const GooglePlayIcon = () => {
  const isTablet = useMediaQuery('(max-width: 768px)');
  const { width, height } = isTablet ? ICON_SIZES.sm : ICON_SIZES.lg;

  return (
    <GooglePlayIconBtn
      data-testid="google-play-icon"
      width={width}
      height={height}
    />
  );
};
