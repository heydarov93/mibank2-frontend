import { SvgIcon, SxProps, Theme } from '@mui/material';
import React from 'react';

import { ReactComponent as Smiley } from 'assets/icons/SmileyIcon.svg';

interface SmileyFaceIconProps {
  sx?: SxProps<Theme>;
}

export const SmileyFaceIcon = ({ sx, ...props }: SmileyFaceIconProps) => {
  return (
    <SvgIcon
      viewBox="0 0 48 48"
      sx={{ width: '48px', height: '48px', ...sx }}
      {...props}
    >
      <Smiley />
    </SvgIcon>
  );
};
