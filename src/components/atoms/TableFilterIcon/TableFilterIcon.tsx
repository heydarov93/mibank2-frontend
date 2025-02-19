import { SvgIcon, SxProps, Theme } from '@mui/material';
import React from 'react';

import { ReactComponent as FilterIcon } from 'assets/icons/TableFilterIcon.svg';

interface TableFilterIconProps {
  sx?: SxProps<Theme>;
}

const TableFilterIcon = ({ sx, ...props }: TableFilterIconProps) => {
  return (
    <SvgIcon
      viewBox="0 0 10 18"
      sx={{ height: '18px', width: '10px', ...sx }}
      {...props}
    >
      <FilterIcon />
    </SvgIcon>
  );
};

export default TableFilterIcon;
