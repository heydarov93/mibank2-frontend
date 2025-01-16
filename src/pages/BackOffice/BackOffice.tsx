import { Box } from '@mui/material';
import React from 'react';
import { useLocation } from 'react-router-dom';

import BackOfficeLeftSidebar from './BackOfficeLeftSidebar';
import CreateEmployee from './CreateEmployee';

const BackOffice = () => {
  const location = useLocation();
  return (
    <Box display="flex" minHeight="100vh" height={'auto'} width={'100%'}>
      {/* Left Section */}
      <Box width="25%" bgcolor={'#1847C1'} padding={5}>
        <BackOfficeLeftSidebar location={location} />
      </Box>

      {/* Right Section */}
      {location.pathname === '/back-office/create-employee' && (
        <CreateEmployee />
      )}
    </Box>
  );
};

export default BackOffice;
