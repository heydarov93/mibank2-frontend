import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { Box } from '@mui/material';
import React from 'react';

import { StyledTableTitle } from './BackOfficeTableTitle.styled';

import TableFilterIcon from 'components/atoms/TableFilterIcon/TableFilterIcon';

interface BackOfficeTableTitleProps {
  title: string;
  sortable?: boolean;
  order?: string;
  onSort?: () => void;
}

export const renderSort = (order: string) => {
  switch (order) {
    case 'ASC':
      return <ArrowUpwardIcon fontSize="small" />;
    case 'DESC':
      return <ArrowDownwardIcon fontSize="small" />;
    default:
      return <TableFilterIcon />;
  }
};

const BackOfficeTableTitle = ({
  title,
  sortable,
  order,
  onSort,
}: BackOfficeTableTitleProps) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        cursor: sortable ? 'pointer' : 'default',
      }}
      onClick={onSort}
    >
      <StyledTableTitle>{title}</StyledTableTitle>
      {sortable && renderSort(order || '')}
    </Box>
  );
};

export default BackOfficeTableTitle;
