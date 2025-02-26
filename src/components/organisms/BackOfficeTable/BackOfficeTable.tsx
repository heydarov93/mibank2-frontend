import { Table, TableBody, TableContainer, TableRow } from '@mui/material';
import React from 'react';

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

interface BackOfficeTableProps {
  tableHead: string[];
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
                <BackOfficeTableTitle title={title} />
              </StyledTableCell>
            ))}
            <StyledTableCell />
          </TableRow>
        </StyledTableHead>
        <TableBody>
          {tableBody.map(({ id, ...data }) => (
            <BackOfficeTableItem key={id} tableData={data} />
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
