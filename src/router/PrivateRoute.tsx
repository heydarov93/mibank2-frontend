import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { PropsWithChildren } from 'react';
import { Navigate } from 'react-router-dom';

import { useAppSelector } from 'hooks';
import { getLoading } from 'store/selectors';
import { getAuthStatus } from 'utils';

export const PrivateRoute = ({ children }: PropsWithChildren<object>) => {
  const isAuth = getAuthStatus();
  const loading = useAppSelector(getLoading);

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  return isAuth ? <>{children}</> : <Navigate to="/signin" replace />;
};
