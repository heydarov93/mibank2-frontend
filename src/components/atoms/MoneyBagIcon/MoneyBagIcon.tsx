import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { ReactComponent as MoneyBagSVG } from 'assets/icons/MoneyBag.svg';

interface MoneyBagIconProps extends Omit<SvgIconProps, 'children'> {
  sx?: SvgIconProps['sx'];
}

export const MoneyBagIcon = memo<MoneyBagIconProps>(
  ({ sx, ...props }: MoneyBagIconProps) => {
    const { t } = useTranslation('translation', {
      keyPrefix: 'Accessibility',
    });

    return (
      <SvgIcon
        viewBox="0 0 48 48"
        sx={{ width: '48px', height: '48px', ...sx }}
        role="img"
        aria-label={t('label.moneyBag')}
        {...props}
      >
        <MoneyBagSVG />
      </SvgIcon>
    );
  },
);

MoneyBagIcon.displayName = 'MoneyBagIcon';
