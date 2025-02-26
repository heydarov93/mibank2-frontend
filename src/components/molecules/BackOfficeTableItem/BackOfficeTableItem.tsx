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

interface BackOfficeTableItemProps {
  tableData: Partial<TableData>;
  showRadioButtonCell?: boolean;
}

const BackOfficeTableItem = ({
  tableData,
  showRadioButtonCell,
}: BackOfficeTableItemProps) => {
  const [isActive, setIsActive] = useState<boolean>(false);

  return (
    <>
      {Object.entries(tableData).map(([key, value]) =>
        value ? <StyledTableCell key={key}>{value}</StyledTableCell> : null,
      )}

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
