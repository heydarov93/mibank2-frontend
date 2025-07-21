import { SvgIcon, SvgIconProps } from '@mui/material';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { ReactComponent as WalletSVG } from 'assets/icons/WalletIcon.svg';

interface WalletIconProps extends Omit<SvgIconProps, 'children'> {
  sx?: SvgIconProps['sx'];
}

export const WalletIcon = memo<WalletIconProps>(
  ({ sx, ...props }: WalletIconProps) => {
    const { t } = useTranslation('translation', {
      keyPrefix: 'Accessibility',
    });

    return (
      <SvgIcon sx={sx} {...props} role="img" aria-label={t('label.wallet')}>
        <WalletSVG width="100%" height="100%" />
      </SvgIcon>
    );
  },
);

WalletIcon.displayName = 'WalletIcon';
