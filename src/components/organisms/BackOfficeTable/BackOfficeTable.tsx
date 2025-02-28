import { Table, TableBody, TableContainer, TableRow } from '@mui/material';

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

interface TableBody {
  productName: string;
  productSubtype: string;
  productStatus: string;
  dateAdded: string;
  firstName: string;
  lastName: string;
  role: string;
  email: string;
}

type PartialTableBody = Partial<TableBody> & { id: number };

interface TableHeadItem {
  label: string;
  key: string;
}

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
}: BackOfficeTableProps) => {
  return (
    <TableContainer
      sx={{ borderTopLeftRadius: '8px', borderTopRightRadius: '8px' }}
    >
      <Table>
        <StyledTableHead>
          <TableRow>
            {tableHead.map((title, index) => (
              <StyledTableCell key={index}>
                <BackOfficeTableTitle title={title.label} />
              </StyledTableCell>
            ))}
            <StyledTableCell />
          </TableRow>
        </StyledTableHead>
        <TableBody>
          {tableBody.length > 0 &&
            tableBody.map((item) => (
              <StyledTableRow key={item.id}>
                <BackOfficeTableItem
                  tableData={item}
                  tableHead={tableHead}
                  onDeleteClick={onDeleteClick}
                  onEditClick={onEditClick}
                />
              </StyledTableRow>
            ))}
          {Array.from({
            length: Math.max(10 - tableBody.length, 0),
          }).map((_, index) => (
            <StyledTableRow key={`empty-${index}`} sx={{ height: '70.9px' }} />
          ))}
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
