import { SvgIcon, SxProps, Theme } from '@mui/material';
import React from 'react';

import { ReactComponent as LeftArrow } from 'assets/icons/LeftArrow.svg';

interface LeftArrowButtonProps {
  sx?: SxProps<Theme>;
}

const LeftArrowButton = ({ sx, ...props }: LeftArrowButtonProps) => {
  return (
    <SvgIcon viewBox="0 0 12 20" sx={{ ...sx }} {...props}>
      <LeftArrow />
    </SvgIcon>
  );
};

export default LeftArrowButton;
