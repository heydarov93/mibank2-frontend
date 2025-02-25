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

interface TableBodyType {
  productName?: string;
  productSubtype?: string;
  dateAdded?: string;
  firstName?: string;
  lastName?: string;
  role?: string;
  email?: string;
}

interface BackOfficeTableProps {
  tableHead?: string[];
  tableBody?: TableBodyType[];
}

const BackOfficeTable = ({ tableHead, tableBody }: BackOfficeTableProps) => {
  return (
    <TableContainer
      sx={{ borderTopLeftRadius: '8px', borderTopRightRadius: '8px' }}
    >
      <Table>
        <StyledTableHead>
          <TableRow>
            {tableHead?.map((title, index) => (
              <StyledTableCell key={index}>
                <BackOfficeTableTitle title={title} />
              </StyledTableCell>
            ))}
            <StyledTableCell></StyledTableCell>
          </TableRow>
        </StyledTableHead>
        <TableBody>
          {tableBody?.map((item, index) => (
            <StyledTableRow key={index}>
              <BackOfficeTableItem
                depositName={item.productName}
                depositSubtype={item.productSubtype}
                addedDate={item.dateAdded}
                firstName={item.firstName}
                lastName={item.lastName}
                role={item.role}
                email={item.email}
              />
            </StyledTableRow>
          ))}
          {Array.from({
            length: Math.max(10 - (tableBody?.length || 0), 0),
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
