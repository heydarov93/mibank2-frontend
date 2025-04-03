import {
  CircularProgress,
  Table,
  TableBody,
  TableContainer,
  TableRow,
} from '@mui/material';

import {
  StyledTableCell,
  StyledTableHead,
  StyledTableRow,
} from './BackOfficeTable.styled';

import BackOfficeTableItem, {
  TableData,
} from 'components/molecules/BackOfficeTableItem/BackOfficeTableItem';
import BackOfficeTablePagination from 'components/molecules/BackOfficeTablePagination/BackOfficeTablePagination';
import BackOfficeTableTitle from 'components/molecules/BackOfficeTableTitle/BackOfficeTableTitle';

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

const BackOfficeTable = ({
  tableHead,
  tableBody,
  totalItems,
  page,
  pageSize,
  onPageChange,
  onPageSizeChange,
  onDeleteClick,
  onEditClick,
  isLoading,
}: BackOfficeTableProps) => {
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
      <BackOfficeTablePagination
        count={totalItems || 0}
        page={page || 0}
        rowsPerPage={pageSize || 10}
        onPageChange={(_event, newPage) => onPageChange?.(newPage)}
        onRowsPerPageChange={(event) =>
          onPageSizeChange?.(Number(event.target.value))
        }
      />
    </TableContainer>
  );
};

export default BackOfficeTable;
