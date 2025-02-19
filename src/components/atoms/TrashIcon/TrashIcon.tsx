import { SvgIcon, SxProps, Theme } from '@mui/material';
import React from 'react';

import { ReactComponent as Trash } from 'assets/icons/TrashIcon.svg';

interface TrashIconProps {
  sx?: SxProps<Theme>;
}

const TrashIcon = ({ sx, ...props }: TrashIconProps) => {
  return (
    <SvgIcon
      viewBox="0 0 12 12"
      sx={{ height: '12px', width: '12px', ...sx }}
      {...props}
    >
      <Trash />
    </SvgIcon>
  );
};

export default TrashIcon;
