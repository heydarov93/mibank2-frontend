import { CSSProperties } from 'react';

import { FLAG_ICONS } from 'constants/ui/content';
import { TCurrency } from 'types/types';

interface CurrencyFlagIconProps {
  currency: TCurrency;
  style?: CSSProperties;
}

export function CurrencyFlagIcon(props: CurrencyFlagIconProps) {
  const { currency, style } = props;
  const Icon = FLAG_ICONS[currency as TCurrency];
  return <Icon style={style} data-testid="currency-flag-icon" />;
}
