import { Box } from '@mui/material';

import { TransactionIcon } from '../../atoms/TransactionIcon/TransactionIcon';

import {
  StyledBtmRow,
  StyledContainer,
  StyledTopRow,
  StyledTypography,
} from './Transaction.styled';

import { TCurrency } from 'components/atoms/CurrencyFlagIcon/CurrencyFlagIcon';
import { getLocaleTimeString } from 'utils/dateUtils';

type TTransactionType = 'income' | 'expense';

export interface ITransaction {
  cardName: string;
  cardNumber: string;
  amount: string;
  currency: TCurrency;
  date: string;
  type: TTransactionType;
}

export function Transaction({ data }: { data: ITransaction }) {
  const amountLabel = `${data.type === 'income' ? '+' : '-'} ${data.currency} ${data.amount}`;
  const cardNumber = `**** ${data.cardNumber.slice(-4)}`;

  return (
    <StyledContainer>
      <TransactionIcon type={data.type} />
      <Box width="100%">
        <StyledTopRow>
          <StyledTypography>{data.cardName}</StyledTypography>
          <StyledTypography>{amountLabel}</StyledTypography>
        </StyledTopRow>
        <StyledBtmRow>
          <StyledTypography>{cardNumber}</StyledTypography>
          <StyledTypography>{getLocaleTimeString(data.date)}</StyledTypography>
        </StyledBtmRow>
      </Box>
    </StyledContainer>
  );
}
