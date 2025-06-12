import { Snackbar, SnackbarProps } from '@mui/material';
import { ReactElement } from 'react';

import { StyledContainer } from './SimpleAlert.styled';

export interface SimpleAlertProps
  extends Omit<SnackbarProps, 'message' | 'children'> {
  children?: ReactElement | string | undefined | never[];
  withBackdrop?: boolean;
}

export const SimpleAlert = ({
  children,
  withBackdrop,
  ...snackbarProps
}: SimpleAlertProps) => {
  return (
    <Snackbar
      role="alert"
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      {...snackbarProps}
      sx={{
        ...(withBackdrop && {
          '&': {
            top: 0,
            width: '100%',
            height: '100%',
            background: 'rgba(0, 0, 0, 0.3)',
          },
        }),
        ...snackbarProps.sx,
      }}
    >
      <StyledContainer>{children}</StyledContainer>
    </Snackbar>
  );
};
