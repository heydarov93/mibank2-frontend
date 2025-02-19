import { SvgIcon, SxProps, Theme } from '@mui/material';
import React from 'react';

import { ReactComponent as SearchIcon } from 'assets/icons/MagnifyingGlass.svg';

interface MagnifyingGlassProps {
  sx?: SxProps<Theme>;
}

export const MagnifyingGlass = ({ sx, ...props }: MagnifyingGlassProps) => {
  return (
    <SvgIcon sx={{ ...sx }} {...props}>
      <SearchIcon />
    </SvgIcon>
  );
};
