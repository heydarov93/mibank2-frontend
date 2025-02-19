import { SvgIcon, SxProps, Theme } from '@mui/material';
import React from 'react';

import { ReactComponent as FilterSVG } from 'assets/icons/FilterIcon.svg';

interface FilterIconProps {
  color?: string;
  sx?: SxProps<Theme>;
}

const FilterIcon = ({ color, sx, ...props }: FilterIconProps) => {
  return (
    <SvgIcon
      sx={{
        color: color ? color : '#60636B',
        ...sx,
      }}
      {...props}
    >
      <FilterSVG fill="currentColor" />;
    </SvgIcon>
  );
};

export default FilterIcon;
