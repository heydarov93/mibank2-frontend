import { useMediaQuery } from '@mui/material';

import { ReactComponent as GooglePlayIconBtn } from 'assets/icons/GooglePlay.svg';

export const GooglePlayIcon = () => {
  const isTablet = useMediaQuery('(max-width: 768px)');
  const iconWidth = isTablet ? 139 : 180;
  const iconHeight = isTablet ? 40 : 52;
  return (
    <GooglePlayIconBtn
      data-testid="google-play-icon"
      width={iconWidth}
      height={iconHeight}
    />
  );
};
