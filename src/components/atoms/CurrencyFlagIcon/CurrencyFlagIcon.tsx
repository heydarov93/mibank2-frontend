import { CSSProperties, memo } from 'react';
import { useTranslation } from 'react-i18next';

import { FLAG_ICONS } from 'constants/ui/content';
import { TCurrency } from 'types/types';

interface CurrencyFlagIconProps {
  currency: TCurrency;
  style?: CSSProperties;
}

export const CurrencyFlagIcon = memo<CurrencyFlagIconProps>(
  ({ currency, style }: CurrencyFlagIconProps) => {
    const { t } = useTranslation('translation', {
      keyPrefix: 'Accessibility',
    });
    const Icon = FLAG_ICONS[currency as TCurrency];

    return (
      <Icon
        style={style}
        role="img"
        aria-label={t('label.currencyFlag', {
          currency: currency,
        })}
        data-testid="currency-flag-icon"
      />
    );
  },
);

CurrencyFlagIcon.displayName = 'CurrencyFlagIcon';
