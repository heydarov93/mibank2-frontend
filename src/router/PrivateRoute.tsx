import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAppSelector } from 'hooks';
import { getLoading } from 'store/selectors';

export const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const isAuth = localStorage.getItem('isAuth');
  const loading = useAppSelector(getLoading);

  useEffect(() => {
    if (!isAuth) {
      navigate('/signin');
    }
  }, [isAuth, loading, navigate]);

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

  if (isAuth) {
    return <>{children}</>;
  }

  return null;
};
