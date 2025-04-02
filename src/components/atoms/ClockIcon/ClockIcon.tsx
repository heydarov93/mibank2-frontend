import { SvgIcon, SxProps, Theme } from '@mui/material';
import React from 'react';

import { ReactComponent as Clock } from 'assets/icons/ClockIcon.svg';

interface ClockIconProps {
  sx?: SxProps<Theme>;
}

export const ClockIcon = ({ sx, ...props }: ClockIconProps) => {
  return (
    <SvgIcon
      viewBox="0 0 48 48"
      sx={{ width: '48px', height: '48px', ...sx }}
      {...props}
    >
      <Clock />
    </SvgIcon>
  );
};
