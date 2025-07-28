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
import { TableData } from 'models/ITableData';

interface TableHeadItem {
  label: string;
  key: string;
  sortable?: boolean | undefined;
  order?: string;
  onSort?: () => void;
}

interface TableBody {
  id: number;
  productName: string;
  productSubtype: string;
  productStatus: string;
  dateAdded: string;
  firstName: string;
  lastName: string;
  role: string;
  email: string;
}

type PartialTableBody = Partial<TableBody>;

interface BackOfficeTableProps {
  tableHead: TableHeadItem[];
  tableBody: PartialTableBody[];
  totalItems?: number;
  page?: number;
  pageSize?: number;
  onPageChange?: (page: number) => void;
  onPageSizeChange?: (size: number) => void;
  onDeleteClick?: (product: Partial<TableData>) => void;
  onEditClick?: (product: Partial<TableData>) => void;
  isLoading?: boolean;
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
