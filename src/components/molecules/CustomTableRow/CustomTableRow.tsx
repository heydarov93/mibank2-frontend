import ChevronRight from '@mui/icons-material/ChevronRight';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';

import {
  StyledAmountText,
  StyledTableCell,
  StyledTableRow,
} from './CustomTableRow.styled';

import { ReactComponent as GreenPlusIcon } from 'assets/icons/GreenPlus.svg';
import { ReactComponent as RedMinusIcon } from 'assets/icons/RedMinus.svg';
import { IPaymentReceipt } from 'models/IPaymentReceipt';

interface CustomTableRowProps {
  sourceNumber: string;
  transferType: string;
  amount: number;
  template: string;
  date: string;
  time: string;
  currency: string;
  isIncome: boolean;
  handleShowPaymentReceipt: (paymentInfo: IPaymentReceipt) => void;
}

const FakePaymentReceiptData: IPaymentReceipt = {
  payerName: 'Yashar Aliyev',
  date: '2025-03-28T15:21:11Z',
  fromAccount: 'PL61109010140000071219812874',
  toAccount: 'PL61109010140000071219812875',
  amount: '112.40',
  currency: 'PLN',
  fee: 20,
  totalAmount: 132.4,
  transferMethod: 'card',
};

export const CustomTableRow = ({
  sourceNumber,
  transferType,
  isIncome,
  currency,
  amount,
  template,
  date,
  time,
  handleShowPaymentReceipt,
}: CustomTableRowProps) => {
  const handleShowPaymentReceiptClick = () => {
    handleShowPaymentReceipt(FakePaymentReceiptData);
  };

  return (
    <StyledTableRow data-testid="table-row">
      <StyledTableCell>{sourceNumber}</StyledTableCell>
      <StyledTableCell>{transferType}</StyledTableCell>
      <StyledTableCell>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 0.5,
          }}
        >
          {isIncome ? (
            <GreenPlusIcon data-testid="green-plus-icon" />
          ) : (
            <RedMinusIcon data-testid="red-minus-icon" />
          )}
          <StyledAmountText
            income={isIncome}
            data-testid="amount-text"
            data-income={isIncome}
          >
            {currency} {amount.toFixed(2)}
          </StyledAmountText>
        </Box>
      </StyledTableCell>
      <StyledTableCell>{template}</StyledTableCell>
      <StyledTableCell>
        {date} {time}
      </StyledTableCell>
      <StyledTableCell sx={{ textAlign: 'center' }}>
        <IconButton
          size="small"
          data-testid="open-modal-btn"
          sx={({ palette }) => ({
            color: palette.common.black,
            width: '24px',
            height: '24px',
          })}
          onClick={handleShowPaymentReceiptClick}
        >
          <ChevronRight fontSize="medium" data-testid="chevron-right" />
        </IconButton>
      </StyledTableCell>
    </StyledTableRow>
  );
};
