import { Snackbar, SnackbarProps } from '@mui/material';
import { ReactElement } from 'react';

import { StyledContainer } from './SimpleAlert.styled';

export interface SimpleAlertProps
  extends Omit<SnackbarProps, 'message' | 'children'> {
  children?: ReactElement | string | undefined | never[];
}

export const SimpleAlert = ({
  children,
  ...snackbarProps
}: SimpleAlertProps) => {
  return (
    <Snackbar
      role="alert"
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      {...snackbarProps}
      sx={{
        ...snackbarProps.sx,
        width: '100%',
      }}
    >
      <StyledContainer>{children}</StyledContainer>
    </Snackbar>
  );
};
