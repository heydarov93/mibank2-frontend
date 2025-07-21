import { useState } from 'react';

import BackOfficeButtonGroup from '../BackOfficeButtonGroup/BackOfficeButtonGroup';

import { StyledTableCell } from './BackOfficeTableItem.styled';

import { SwitchButton } from 'components/atoms';

export interface TableData {
  id: number;
  productType: string;
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
  monthlyFee: string;
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

export const BackOfficeTableItem = ({
  tableData,
  tableHead,
  onDeleteClick,
  onEditClick,
}: BackOfficeTableItemProps) => {
  const [isChecked, setIsChecked] = useState<boolean>(false);

  return (
    <>
      {tableHead.map(({ key }) => (
        <StyledTableCell key={key}>
          {key === 'productStatus' ? (
            <SwitchButton isChecked={isChecked} setIsChecked={setIsChecked} />
          ) : (
            tableData[key as keyof TableData] || ''
          )}
        </StyledTableCell>
      ))}
      <StyledTableCell>
        <BackOfficeButtonGroup
          isDisabled={isChecked}
          product={tableData}
          onEditClick={onEditClick}
          onDeleteClick={onDeleteClick}
        />
      </StyledTableCell>
    </>
  );
};
