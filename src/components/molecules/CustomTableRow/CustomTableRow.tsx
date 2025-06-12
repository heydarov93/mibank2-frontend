import { ChevronRight } from '@mui/icons-material';
import { Box, IconButton } from '@mui/material';

import {
  StyledAmountText,
  StyledTableCell,
  StyledTableRow,
} from './CustomTableRow.styled';

import { ReactComponent as GreenPlusIcon } from 'assets/icons/GreenPlus.svg';
import { ReactComponent as RedMinusIcon } from 'assets/icons/RedMinus.svg';

interface CustomTableRowProps {
  cardNumber: string;
  amount: number;
  template: string;
  date: string;
  time: string;
  currency: string;
  isIncome: boolean;
}

export const CustomTableRow = ({
  cardNumber,
  isIncome,
  currency,
  amount,
  template,
  date,
  time,
}: CustomTableRowProps) => {
  return (
    <StyledTableRow data-testid="table-row">
      <StyledTableCell>{cardNumber}</StyledTableCell>
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
          data-testid="icon-button"
          sx={({ palette }) => ({
            color: palette.common.black,
            width: '24px',
            height: '24px',
          })}
        >
          <ChevronRight fontSize="medium" data-testid="chevron-right" />
        </IconButton>
      </StyledTableCell>
    </StyledTableRow>
  );
};
