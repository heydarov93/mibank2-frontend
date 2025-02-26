import { Table, TableBody, TableContainer, TableRow } from '@mui/material';

import {
  StyledTableCell,
  StyledTableHead,
  StyledTableRow,
} from './BackOfficeTable.styled';

import BackOfficeTableItem from 'components/molecules/BackOfficeTableItem/BackOfficeTableItem';
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
}

const BackOfficeTable = ({ tableHead, tableBody }: BackOfficeTableProps) => {
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
            tableBody.map(({ id, ...data }) => (
              <StyledTableRow key={id}>
                <BackOfficeTableItem tableData={data} tableHead={tableHead} />
              </StyledTableRow>
            ))}
          {Array.from({
            length: Math.max(10 - tableBody.length, 0),
          }).map((_, index) => (
            <StyledTableRow key={`empty-${index}`} sx={{ height: '70.9px' }} />
          ))}
        </TableBody>
      </Table>
      <BackOfficeTablePagination />
    </TableContainer>
  );
};

export default BackOfficeTable;
