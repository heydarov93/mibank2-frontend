import { SvgIcon, SxProps, Theme } from '@mui/material';
import React from 'react';

import { ReactComponent as BlueTick } from 'assets/icons/BlueTick.svg';

interface BlueTickIconProps {
  sx?: SxProps<Theme>;
}

export const BlueTickIcon = ({ sx, ...props }: BlueTickIconProps) => {
  return (
    <SvgIcon viewBox="0 0 40 40" sx={{ ...sx }} {...props}>
      <BlueTick />
    </SvgIcon>
  );
};
