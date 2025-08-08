import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { ReactComponent as CoinsStackedSVG } from 'assets/icons/CoinsStacked.svg';

interface CoinsStackedIconProps extends Omit<SvgIconProps, 'children'> {
  sx?: SvgIconProps['sx'];
}

export const CoinsStackedIcon = memo<CoinsStackedIconProps>(
  ({ sx, ...props }: CoinsStackedIconProps) => {
    const { t } = useTranslation('translation', {
      keyPrefix: 'Accessibility',
    });

    return (
      <SvgIcon
        viewBox="0 0 24 24"
        sx={sx}
        role="img"
        aria-label={t('label.coinsStacked')}
        {...props}
      >
        <CoinsStackedSVG />
      </SvgIcon>
    );
  },
);

CoinsStackedIcon.displayName = 'CoinsStackedIcon';
