import { SvgIcon, SxProps, Theme, useTheme } from '@mui/material';
import React from 'react';

import { ReactComponent as Warning } from 'assets/icons/BackOfficeWarningIcon.svg';

interface BackOfficeWarningIconProps {
  sx?: SxProps<Theme>;
}

export const BackOfficeWarningIcon = ({
  sx,
  ...props
}: BackOfficeWarningIconProps) => {
  const theme = useTheme();

  return (
    <SvgIcon viewBox="0 0 20 20" sx={{ ...sx }} {...props}>
      <Warning color={theme.palette.error.main} />
    </SvgIcon>
  );
};
