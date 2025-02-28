import React, { useState } from 'react';

import BackOfficeButtonGroup from '../BackOfficeButtonGroup/BackOfficeButtonGroup';

import { StyledTableCell } from './BackOfficeTableItem.styled';

import RaddioButton from 'components/atoms/SwitchButton/SwitchButton';

export interface TableData {
  id: number;
  productName: string;
  productSubtype: string;
  productStatus: string;
  dateAdded: string;
  firstName: string;
  lastName: string;
  role: string;
  email: string;
  cardDescription: string;
  cardCurrency: string;
  montlyFee: string;
  dailyOperationalLimit: string;
  foreignTransactionLimit: string;
  cardCashbackRate: string;
  minimumDepositSum: string;
  maximumDepositSum: string;
  depositTerm: string;
  depositInterestRate: string;
  depositCapitalizationRate: string;
  earlyWithdrawalLimit: string;
  withdrawalFee: string;
}

interface TableHeadItem {
  label: string;
  key: string;
}

interface BackOfficeTableItemProps {
  tableData: Partial<TableData>;
  tableHead: TableHeadItem[];
  onDeleteClick?: (product: Partial<TableData>) => void;
  onEditClick?: (product: Partial<TableData>) => void;
}

const BackOfficeTableItem = ({
  tableData,
  tableHead,
  onDeleteClick,
  onEditClick,
}: BackOfficeTableItemProps) => {
  const [isActive, setIsActive] = useState<boolean>(false);

  return (
    <>
      {tableHead.map(({ key }) => (
        <StyledTableCell key={key}>
          {key === 'productStatus' ? (
            <RaddioButton isActive={isActive} setIsActive={setIsActive} />
          ) : (
            tableData[key as keyof TableData] || ''
          )}
        </StyledTableCell>
      ))}
      <StyledTableCell>
        <BackOfficeButtonGroup
          isDisabled={isActive}
          product={tableData}
          onEditClick={onEditClick}
          onDeleteClick={onDeleteClick}
        />
      </StyledTableCell>
    </>
  );
};

export default BackOfficeTableItem;
