import { SvgIcon, SvgIconProps } from '@mui/material';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { ReactComponent as ClockSVG } from 'assets/icons/ClockIcon.svg';

interface ClockIconProps extends Omit<SvgIconProps, 'children'> {
  sx?: SvgIconProps['sx'];
}

export const ClockIcon = memo<ClockIconProps>(
  ({ sx, ...props }: ClockIconProps) => {
    const { t } = useTranslation('translation', {
      keyPrefix: 'Accessibility',
    });

    return (
      <SvgIcon
        viewBox="0 0 48 48"
        sx={{ width: '48px', height: '48px', ...sx }}
        role="img"
        aria-label={t('label.clock')}
        {...props}
      >
        <ClockSVG />
      </SvgIcon>
    );
  },
);

ClockIcon.displayName = 'ClockIcon';
