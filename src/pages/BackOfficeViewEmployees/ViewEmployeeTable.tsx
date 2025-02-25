import { Table, TableBody, TableContainer, TableRow } from '@mui/material';
import React from 'react';

import BackOfficeButtonGroup from 'components/molecules/BackOfficeButtonGroup/BackOfficeButtonGroup';
import BackOfficeTableTitle from 'components/molecules/BackOfficeTableTitle/BackOfficeTableTitle';
import {
  StyledTableCell,
  StyledTableHead,
} from 'components/organisms/BackOfficeTable/BackOfficeTable.styled';

interface TableBodyType {
  firstName: string;
  lastName: string;
  role: string;
  email: string;
  dateAdded: string;
}

type Props = {
  tableHead: string[];
  tableBody: TableBodyType[];
};

const ViewEmployeeTable = ({ tableHead, tableBody }: Props) => {
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
            <StyledTableCell />
          </TableRow>
        </StyledTableHead>
        <TableBody>
          {tableBody?.map((item, index) => (
            <TableRow key={index}>
              <StyledTableCell>{item.firstName}</StyledTableCell>
              <StyledTableCell>{item.lastName}</StyledTableCell>
              <StyledTableCell>{item.role}</StyledTableCell>
              <StyledTableCell>{item.email}</StyledTableCell>
              <StyledTableCell>
                {new Date(item.dateAdded).toLocaleDateString('en-GB')}
              </StyledTableCell>
              <StyledTableCell>
                <BackOfficeButtonGroup isDisabled={false} />
              </StyledTableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ViewEmployeeTable;
