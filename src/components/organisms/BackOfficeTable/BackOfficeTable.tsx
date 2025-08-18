import CircularProgress from '@mui/material/CircularProgress';
import { SelectChangeEvent } from '@mui/material/Select';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import { MouseEvent } from 'react';

import {
  StyledTableCell,
  StyledTableHead,
  StyledTableRow,
} from './BackOfficeTable.styled';
import { BackOfficeTableItem, BackOfficeTableTitle } from './molecules';

import { CustomTablePagination } from 'components/molecules';
import {
  DEFAULT_PAGE_INDEX,
  DEFAULT_PAGE_SIZE,
} from 'constants/business/pagination';
import { usePaginationInfo } from 'hooks';
import { ITableBody, ITableData, ITableHead } from 'models/ITable';

type PartialTableBody = Partial<ITableBody>;

interface BackOfficeTableProps {
  tableHead: ITableHead[];
  tableBody: PartialTableBody[];
  totalItems?: number;
  page?: number;
  pageSize?: number;
  onPageChange?: (page: number) => void;
  onPageSizeChange?: (size: number) => void;
  onDeleteClick?: (product: Partial<ITableData>) => void;
  onEditClick?: (product: Partial<ITableData>) => void;
  isLoading?: boolean;
  isAdmin?: boolean;
}

export const BackOfficeTable = ({
  tableHead,
  tableBody,
  page,
  pageSize,
  onPageChange,
  onPageSizeChange,
  onDeleteClick,
  onEditClick,
  isLoading,
  isAdmin,
}: BackOfficeTableProps) => {
  const { totalPages, pageDisplayText } = usePaginationInfo(
    tableBody.length,
    page ?? DEFAULT_PAGE_INDEX + 1,
    pageSize ?? DEFAULT_PAGE_SIZE,
  );

  const handlePageChange = (
    _event: MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    onPageChange?.(newPage);
  };

  const handleRowsPerPageChange = (event: SelectChangeEvent<number>) => {
    onPageSizeChange?.(Number(event.target.value));
    onPageChange?.(0);
  };

  return (
    <TableContainer
      sx={{
        borderTopLeftRadius: '8px',
        borderTopRightRadius: '8px',
        maxHeight: '738px',
      }}
    >
      <Table>
        <StyledTableHead>
          <TableRow>
            {tableHead.map((title, index) => (
              <StyledTableCell key={index}>
                <BackOfficeTableTitle
                  title={title.label}
                  sortable={title.sortable || false}
                  order={title.order || ''}
                  onSort={title.onSort}
                />
              </StyledTableCell>
            ))}
            <StyledTableCell />
          </TableRow>
        </StyledTableHead>
        <TableBody>
          {isLoading ? (
            <StyledTableRow>
              <StyledTableCell colSpan={tableHead.length + 1} align="center">
                <CircularProgress />
              </StyledTableCell>
            </StyledTableRow>
          ) : (
            tableBody.length > 0 &&
            tableBody.map((item) => (
              <StyledTableRow data-testid="table-row" key={item.id}>
                <BackOfficeTableItem
                  tableData={item}
                  tableHead={tableHead}
                  isAdmin={isAdmin}
                  onDeleteClick={onDeleteClick}
                  onEditClick={onEditClick}
                />
              </StyledTableRow>
            ))
          )}
        </TableBody>
      </Table>

      <CustomTablePagination
        pageDisplayText={pageDisplayText}
        totalPages={totalPages}
        page={page || DEFAULT_PAGE_INDEX}
        rowsPerPage={pageSize || DEFAULT_PAGE_SIZE}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleRowsPerPageChange}
      />
    </TableContainer>
  );
};
