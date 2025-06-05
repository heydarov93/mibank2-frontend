import { ChevronRight } from '@mui/icons-material';
import { Box, IconButton } from '@mui/material';

import {
  StyledAmountText,
  StyledTableCell,
  StyledTableRow,
} from './CustomTableRow.styled';

import GreenPlusIcon from 'components/atoms/GreenPlusIcon/GreenPlusIcon';
import RedMinusIcon from 'components/atoms/RedMinusIcon/RedMinusIcon';

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
            alignItems: 'baseline',
            justifyContent: 'flex-start',
            gap: 0.5,
            '& .MuiSvgIcon-root': {
              verticalAlign: 'middle',
              marginTop: '0px',
              marginBottom: '0px',
            },
          }}
        >
          {isIncome ? (
            <GreenPlusIcon
              sx={{
                verticalAlign: 'baseline',
                display: 'inline-block',
              }}
            />
          ) : (
            <RedMinusIcon
              sx={{
                verticalAlign: 'baseline',
                display: 'inline-block',
              }}
            />
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
          sx={({ palette }) => ({ color: palette.common.black })}
        >
          <ChevronRight fontSize="medium" data-testid="chevron-right" />
        </IconButton>
      </StyledTableCell>
    </StyledTableRow>
  );
};
