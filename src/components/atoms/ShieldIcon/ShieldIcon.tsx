import { SvgIcon, SxProps, Theme } from '@mui/material';
import React from 'react';

import { ReactComponent as Shield } from 'assets/icons/ShieldIcon.svg';

interface ShieldIconProps {
  sx?: SxProps<Theme>;
}

export const ShieldIcon = ({ sx, ...props }: ShieldIconProps) => {
  return (
    <SvgIcon
      viewBox="0 0 48 48"
      sx={{ width: '48px', height: '48px', ...sx }}
      {...props}
    >
      <Shield />
    </SvgIcon>
  );
};
