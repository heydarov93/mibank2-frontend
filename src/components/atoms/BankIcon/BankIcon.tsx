import { SvgIcon, SxProps, Theme } from '@mui/material';
import React from 'react';

import { ReactComponent as Bank } from 'assets/icons/BankIcon.svg';

interface BankIconProps {
  sx?: SxProps<Theme>;
}

export const BankIcon = ({ sx, ...props }: BankIconProps) => {
  return (
    <SvgIcon
      viewBox="0 0 48 48"
      sx={{ width: '48px', height: '48px', ...sx }}
      {...props}
    >
      <Bank />
    </SvgIcon>
  );
};
