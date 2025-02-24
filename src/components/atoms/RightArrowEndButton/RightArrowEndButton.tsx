import { SvgIcon, SxProps, Theme } from '@mui/material';
import React from 'react';

import { ReactComponent as RightArrowEnd } from 'assets/icons/RightArrowEnd.svg';

interface RightArrowEndButtonProps {
  sx?: SxProps<Theme>;
}

const RightArrowEndButton = ({ sx, ...props }: RightArrowEndButtonProps) => {
  return (
    <SvgIcon sx={{ ...sx }} {...props}>
      <RightArrowEnd />
    </SvgIcon>
  );
};

export default RightArrowEndButton;
