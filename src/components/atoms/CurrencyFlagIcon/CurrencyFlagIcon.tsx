import { CSSProperties } from 'react';

import { ReactComponent as CHF } from 'assets/icons/ChfFlag.svg';
import { ReactComponent as EUR } from 'assets/icons/EurFlag.svg';
import { ReactComponent as GBP } from 'assets/icons/GbpFlag.svg';
import { ReactComponent as JPY } from 'assets/icons/JpyFlag.svg';
import { ReactComponent as PLN } from 'assets/icons/PlnFlag.svg';
import { ReactComponent as USD } from 'assets/icons/UsaFlag.svg';
import { TCurrency } from 'models/types';

export const flagIcons = {
  USD,
  EUR,
  GBP,
  CHF,
  JPY,
  PLN,
};

interface CurrencyFlagIconProps {
  currency: TCurrency;
  style?: CSSProperties;
}

export function CurrencyFlagIcon(props: CurrencyFlagIconProps) {
  const { currency, style } = props;
  const Icon = flagIcons[currency];
  return <Icon style={style} data-testid="currency-flag-icon" />;
}
