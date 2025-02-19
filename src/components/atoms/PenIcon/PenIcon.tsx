import { SvgIcon, SxProps, Theme } from '@mui/material';
import React from 'react';

import { ReactComponent as Pen } from 'assets/icons/EditIcon.svg';

interface PenIconProps {
  color?: string;
  sx?: SxProps<Theme>;
}

const PenIcon = ({ color, sx, ...props }: PenIconProps) => {
  return (
    <SvgIcon
      viewBox="0 0 12 12"
      sx={{ color: color, height: '12px', width: '12px', ...sx }}
      {...props}
    >
      <Pen />
    </SvgIcon>
  );
};

export default PenIcon;
