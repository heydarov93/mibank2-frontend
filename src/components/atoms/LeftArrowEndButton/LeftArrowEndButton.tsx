import { SvgIcon, SxProps, Theme } from '@mui/material';
import React from 'react';

import { ReactComponent as LeftArrowEnd } from 'assets/icons/LeftArrowEnd.svg';

interface LeftArrowEndButtonProps {
  sx?: SxProps<Theme>;
}

const LeftArrowEndButton = ({ sx, ...props }: LeftArrowEndButtonProps) => {
  return (
    <SvgIcon viewBox="0 0 16 20" sx={{ ...sx }} {...props}>
      <LeftArrowEnd />
    </SvgIcon>
  );
};

export default LeftArrowEndButton;
