import { SvgIcon, SvgIconProps } from '@mui/material';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { ReactComponent as ShieldIconSVG } from 'assets/icons/ShieldIcon.svg';

interface ShieldIconProps extends Omit<SvgIconProps, 'children'> {
  sx?: SvgIconProps['sx'];
}

export const ShieldIcon = memo<ShieldIconProps>(
  ({ sx, ...props }: ShieldIconProps) => {
    const { t } = useTranslation('translation', {
      keyPrefix: 'Accessibility',
    });

    return (
      <SvgIcon
        viewBox="0 0 48 48"
        sx={{ width: '48px', height: '48px', ...sx }}
        role="img"
        aria-label={t('label.shield')}
        {...props}
      >
        <ShieldIconSVG />
      </SvgIcon>
    );
  },
);

ShieldIcon.displayName = 'ShieldIcon';
