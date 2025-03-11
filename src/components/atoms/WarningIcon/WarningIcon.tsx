import { SvgIcon, SxProps, Theme } from '@mui/material';
import React from 'react';

import { ReactComponent as Warning } from 'assets/icons/WarningIcon.svg';

interface WarningIconProps {
  sx?: SxProps<Theme>;
}

const WarningIcon = ({ sx, ...props }: WarningIconProps) => {
  return (
    <SvgIcon viewBox="0 0 20 20" sx={{ ...sx }} {...props}>
      <Warning />
    </SvgIcon>
  );
};

export default WarningIcon;
