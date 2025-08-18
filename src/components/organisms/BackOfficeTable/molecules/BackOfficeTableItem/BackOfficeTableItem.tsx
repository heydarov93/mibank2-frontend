import { useState } from 'react';

import { BackOfficeButtonGroup } from '../BackOfficeButtonGroup/BackOfficeButtonGroup';

import { StyledTableCell } from './BackOfficeTableItem.styled';

import { SwitchButton } from 'components/atoms';
import { ITableData } from 'models/ITable';

interface TableHeadItem {
  label: string;
  key: string;
}

interface BackOfficeTableItemProps {
  tableData: Partial<ITableData>;
  tableHead: TableHeadItem[];
  onDeleteClick?: (product: Partial<ITableData>) => void;
  onEditClick?: (product: Partial<ITableData>) => void;
  isAdmin?: boolean;
}

export const BackOfficeTableItem = ({
  tableData,
  tableHead,
  onDeleteClick,
  onEditClick,
  isAdmin,
}: BackOfficeTableItemProps) => {
  const [isChecked, setIsChecked] = useState<boolean>(false);

  return (
    <>
      {tableHead.map(({ key }) => (
        <StyledTableCell key={key}>
          {key === 'productStatus' ? (
            <SwitchButton isChecked={isChecked} setIsChecked={setIsChecked} />
          ) : (
            tableData[key as keyof ITableData] || ''
          )}
        </StyledTableCell>
      ))}
      <StyledTableCell>
        {isAdmin && (
          <BackOfficeButtonGroup
            isDisabled={isChecked}
            product={tableData}
            onEditClick={onEditClick}
            onDeleteClick={onDeleteClick}
          />
        )}
      </StyledTableCell>
    </>
  );
};
