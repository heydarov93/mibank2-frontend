import { SvgIcon, SxProps, Theme } from '@mui/material';
import React from 'react';

import { ReactComponent as MoneyBag } from 'assets/icons/MoneyBag.svg';

interface MoneyBagIconProps {
  sx?: SxProps<Theme>;
}

export const MoneyBagIcon = ({ sx, ...props }: MoneyBagIconProps) => {
  return (
    <SvgIcon
      viewBox="0 0 48 48"
      sx={{ width: '48px', height: '48px', ...sx }}
      {...props}
    >
      <MoneyBag />
    </SvgIcon>
  );
};
