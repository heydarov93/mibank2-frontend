import { SvgIcon, SxProps, Theme } from '@mui/material';
import React from 'react';

import { ReactComponent as PlusIcon } from 'assets/icons/ButtonPlusIcon.svg';

interface ButtonPlusIconProps {
  sx?: SxProps<Theme>;
}

const ButtonPlusIcon = ({ sx, ...props }: ButtonPlusIconProps) => {
  return (
    <SvgIcon viewBox="0 0 15 16" sx={{ ...sx }} {...props}>
      <PlusIcon />
    </SvgIcon>
  );
};

export default ButtonPlusIcon;
