import { Table, TableBody, TableContainer, TableRow } from '@mui/material';
import React from 'react';

import {
  StyledTableCell,
  StyledTableHead,
  StyledTableRow,
} from './BackOfficeTable.styled';

import BackOfficeTableItem from 'components/molecules/BackOfficeTableItem/BackOfficeTableItem';
import BackOfficeTableTitle from 'components/molecules/BackOfficeTableTitle/BackOfficeTableTitle';

interface TableBodyType {
  productName: string;
  productSubtype: string;
  dateAdded: string;
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
              />
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default BackOfficeTable;
