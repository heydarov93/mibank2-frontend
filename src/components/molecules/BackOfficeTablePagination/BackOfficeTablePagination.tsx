import React, { useState } from 'react';

import CustomTablePagination from './CustomTablePagination';

const BackOfficeTablePagination: React.FC = () => {
  //TODO: Once the backend is ready I need to integrate the actual API
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const count = 500;

  return (
    <CustomTablePagination
      count={count}
      page={page}
      rowsPerPage={rowsPerPage}
      onPageChange={(event, newPage) => setPage(newPage)}
      onRowsPerPageChange={(event) => {
        setRowsPerPage(Number(event.target.value));
        setPage(0);
      }}
    />
  );
};

export default BackOfficeTablePagination;
