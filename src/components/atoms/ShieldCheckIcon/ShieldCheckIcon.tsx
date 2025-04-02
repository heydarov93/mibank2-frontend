import { SvgIcon, SxProps, Theme } from '@mui/material';
import React from 'react';

import { ReactComponent as ShieldCheck } from 'assets/icons/ShieldCheckIcon.svg';

interface ShieldCheckIconProps {
  sx?: SxProps<Theme>;
}

export const ShieldCheckIcon = ({ sx, ...props }: ShieldCheckIconProps) => {
  return (
    <SvgIcon
      viewBox="0 0 48 48"
      sx={{ width: '48px', height: '48px', ...sx }}
      {...props}
    >
      <ShieldCheck />
    </SvgIcon>
  );
};
