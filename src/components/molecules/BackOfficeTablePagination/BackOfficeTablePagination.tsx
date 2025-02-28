import { SelectChangeEvent } from '@mui/material';
import React from 'react';

import CustomTablePagination from './CustomTablePagination';

interface BackOfficeTablePaginationProps {
  count: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => void;
  onRowsPerPageChange: (event: SelectChangeEvent<number>) => void;
}

const BackOfficeTablePagination: React.FC<BackOfficeTablePaginationProps> = ({
  count,
  page,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
}) => (
  <CustomTablePagination
    count={count}
    page={page}
    rowsPerPage={rowsPerPage}
    onPageChange={onPageChange}
    onRowsPerPageChange={onRowsPerPageChange}
  />
);

export default BackOfficeTablePagination;
