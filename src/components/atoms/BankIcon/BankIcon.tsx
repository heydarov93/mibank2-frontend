import { SvgIcon, SvgIconProps } from '@mui/material';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { ReactComponent as BankSVG } from 'assets/icons/BankIcon.svg';

interface BankIconProps extends Omit<SvgIconProps, 'children'> {
  sx?: SvgIconProps['sx'];
}
export const BankIcon = memo<BankIconProps>(
  ({ sx, ...props }: BankIconProps) => {
    const { t } = useTranslation('translation', {
      keyPrefix: 'Accessibility',
    });

    return (
      <SvgIcon
        viewBox="0 0 48 48"
        sx={{ width: '48px', height: '48px', ...sx }}
        role="img"
        aria-label={t('label.bank')}
        {...props}
      >
        <BankSVG />
      </SvgIcon>
    );
  },
);

BankIcon.displayName = 'BankIcon';
