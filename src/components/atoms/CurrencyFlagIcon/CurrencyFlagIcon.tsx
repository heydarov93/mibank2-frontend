import { SvgIcon, SvgIconProps } from '@mui/material';

import { ReactComponent as CHF } from 'assets/icons/ChfFlag.svg';
import { ReactComponent as EUR } from 'assets/icons/EurFlag.svg';
import { ReactComponent as GBP } from 'assets/icons/GbpFlag.svg';
import { ReactComponent as JPY } from 'assets/icons/JpyFlag.svg';
import { ReactComponent as PLN } from 'assets/icons/PlnFlag.svg';
import { ReactComponent as USD } from 'assets/icons/UsaFlag.svg';

const icons = {
  USD,
  EUR,
  GBP,
  CHF,
  JPY,
  PLN,
};

export type TCurrency = keyof typeof icons;

type CurrencyFlagIconProps = SvgIconProps & {
  currency: TCurrency;
};

export function CurrencyFlagIcon(props: CurrencyFlagIconProps) {
  const { currency, ...restProps } = props;
  const Icon = icons[currency];
  return (
    <SvgIcon {...restProps}>
      <Icon />
    </SvgIcon>
  );
}
