import React, { useState } from 'react';

import BackOfficeButtonGroup from '../BackOfficeButtonGroup/BackOfficeButtonGroup';

import { StyledTableCell } from './BackOfficeTableItem.styled';

import RaddioButton from 'components/atoms/SwitchButton/SwitchButton';

interface TableData {
  productName: string;
  productSubtype: string;
  productStatus: string;
  dateAdded: string;
  firstName: string;
  lastName: string;
  role: string;
  email: string;
}

interface TableHeadItem {
  label: string;
  key: string;
}

interface BackOfficeTableItemProps {
  tableData: Partial<TableData>;
  tableHead: TableHeadItem[];
  showRadioButtonCell?: boolean;
}

const BackOfficeTableItem = ({
  tableData,
  tableHead,
  showRadioButtonCell,
}: BackOfficeTableItemProps) => {
  const [isActive, setIsActive] = useState<boolean>(false);

  return (
    <>
      {tableHead.map(({ key }) => (
        <StyledTableCell key={key}>
          {tableData[key as keyof TableData] || ''}
        </StyledTableCell>
      ))}

      {showRadioButtonCell && (
        <StyledTableCell>
          <RaddioButton isActive={isActive} setIsActive={setIsActive} />
        </StyledTableCell>
      )}

      <StyledTableCell>
        <BackOfficeButtonGroup isDisabled={isActive} />
      </StyledTableCell>
    </>
  );
};

export default BackOfficeTableItem;
