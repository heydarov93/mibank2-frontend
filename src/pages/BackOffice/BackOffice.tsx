import { Box } from '@mui/material';
import React from 'react';
import { Outlet } from 'react-router-dom';

import BackOfficeLeftSidebar from './BackOfficeLeftSidebar';

const BackOffice = () => {
  return (
    <Box display="flex" minHeight="100vh" height={'auto'} width={'100%'}>
      <Box width="25%" bgcolor={'#1847C1'} padding={5}>
        <BackOfficeLeftSidebar />
      </Box>
      <Outlet />
    </Box>
  );
};

export default BackOffice;
