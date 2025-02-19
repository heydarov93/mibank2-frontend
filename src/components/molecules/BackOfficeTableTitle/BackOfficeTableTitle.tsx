import { Box } from '@mui/material';
import React from 'react';

import { StyledTableTitle } from './BackOfficeTableTitle.styled';

import TableFilterIcon from 'components/atoms/TableFilterIcon/TableFilterIcon';

interface BackOfficeTableTitleProps {
  title: string;
}

const BackOfficeTableTitle = ({ title }: BackOfficeTableTitleProps) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <StyledTableTitle>{title}</StyledTableTitle>
      <TableFilterIcon />
    </Box>
  );
};

export default BackOfficeTableTitle;
