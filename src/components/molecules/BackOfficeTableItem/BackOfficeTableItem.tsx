import React, { useState } from 'react';

import BackOfficeButtonGroup from '../BackOfficeButtonGroup/BackOfficeButtonGroup';

import { StyledTableCell } from './BackOfficeTableItem.styled';

import RaddioButton from 'components/atoms/SwitchButton/SwitchButton';

interface BackOfficeTableItemProps {
  depositName?: string;
  depositSubtype?: string;
  addedDate?: string;
  firstName?: string;
  lastName?: string;
  role?: string;
  email?: string;
  showRadioButtonCell?: boolean;
}

const BackOfficeTableItem = ({
  depositName,
  depositSubtype,
  addedDate,
  firstName,
  lastName,
  role,
  email,
  showRadioButtonCell = false,
}: BackOfficeTableItemProps) => {
  const [isActive, setIsActive] = useState<boolean>(false);

  return (
    <>
      {depositName && <StyledTableCell>{depositName}</StyledTableCell>}

      {depositSubtype && <StyledTableCell>{depositSubtype}</StyledTableCell>}
      {firstName && <StyledTableCell>{firstName}</StyledTableCell>}
      {lastName && <StyledTableCell>{lastName}</StyledTableCell>}
      {role && <StyledTableCell>{role}</StyledTableCell>}
      {email && <StyledTableCell>{email}</StyledTableCell>}
      {addedDate && <StyledTableCell>{addedDate}</StyledTableCell>}
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
