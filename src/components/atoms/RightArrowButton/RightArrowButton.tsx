import { SvgIcon, SxProps, Theme } from '@mui/material';
import React from 'react';

import { ReactComponent as RightArrow } from 'assets/icons/RightArrow.svg';

interface RightArrowButtonProps {
  sx?: SxProps<Theme>;
}

const RightArrowButton = ({ sx, ...props }: RightArrowButtonProps) => {
  return (
    <SvgIcon viewBox="0 0 12 20" sx={{ ...sx }} {...props}>
      <RightArrow />
    </SvgIcon>
  );
};

export default RightArrowButton;
