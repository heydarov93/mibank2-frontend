import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAppSelector } from 'hooks/hook';
import { getUser, setLoading } from 'store/selectors/AuthSelectors';

export const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const user = useAppSelector(getUser);
  const loading = useAppSelector(setLoading);

  useEffect(() => {
    if (!loading && !user) {
      navigate('/signin');
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (user) {
    return <>{children}</>;
  }

  return null;
};
