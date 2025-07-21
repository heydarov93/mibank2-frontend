import { SvgIcon, SvgIconProps } from '@mui/material';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { ReactComponent as ShieldCheckSVG } from 'assets/icons/ShieldCheckIcon.svg';

interface ShieldCheckIconProps extends Omit<SvgIconProps, 'children'> {
  sx?: SvgIconProps['sx'];
}

export const ShieldCheckIcon = memo<ShieldCheckIconProps>(
  ({ sx, ...props }: ShieldCheckIconProps) => {
    const { t } = useTranslation('translation', {
      keyPrefix: 'Accessibility',
    });

    return (
      <SvgIcon
        viewBox="0 0 48 48"
        sx={{ width: '48px', height: '48px', ...sx }}
        role="img"
        aria-label={t('label.shieldCheck')}
        {...props}
      >
        <ShieldCheckSVG />
      </SvgIcon>
    );
  },
);

ShieldCheckIcon.displayName = 'ShieldCheckIcon';
