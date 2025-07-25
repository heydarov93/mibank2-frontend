import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { Box } from '@mui/material';

import { StyledTableTitle } from './BackOfficeTableTitle.styled';

import { TableFilterIcon } from 'components/atoms';
import { SORT_ORDER } from 'constants/business/sortOrder';
import { TSortOrder } from 'types/types';

interface BackOfficeTableTitleProps {
  title: string;
  sortable?: boolean;
  order?: string;
  onSort?: () => void;
}

export const renderSort = (order: TSortOrder) => {
  switch (order) {
    case SORT_ORDER.ASC:
      return <ArrowUpwardIcon fontSize="small" />;
    case SORT_ORDER.DESC:
      return <ArrowDownwardIcon fontSize="small" />;
    default:
      return <TableFilterIcon />;
  }
};

export const BackOfficeTableTitle = ({
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
      {sortable && renderSort(order as TSortOrder)}
    </Box>
  );
};
