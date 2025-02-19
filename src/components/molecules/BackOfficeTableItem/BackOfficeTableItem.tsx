import React, { useState } from 'react';

import BackOfficeButtonGroup from '../BackOfficeButtonGroup/BackOfficeButtonGroup';

import { StyledTableCell } from './BackOfficeTableItem.styled';

import RaddioButton from 'components/atoms/SwitchButton/SwitchButton';

interface BackOfficeTableItemProps {
  depositName: string;
  depositSubtype: string;
  addedDate: string;
}

const BackOfficeTableItem = ({
  depositName,
  depositSubtype,
  addedDate,
}: BackOfficeTableItemProps) => {
  const [isActive, setIsActive] = useState<boolean>(false);

  return (
    <>
      <StyledTableCell>{depositName}</StyledTableCell>
      <StyledTableCell>{depositSubtype}</StyledTableCell>
      <StyledTableCell>{addedDate}</StyledTableCell>
      <StyledTableCell>
        <RaddioButton isActive={isActive} setIsActive={setIsActive} />
      </StyledTableCell>
      <StyledTableCell>
        <BackOfficeButtonGroup isDisabled={!isActive} />
      </StyledTableCell>
    </>
  );
};

export default BackOfficeTableItem;
