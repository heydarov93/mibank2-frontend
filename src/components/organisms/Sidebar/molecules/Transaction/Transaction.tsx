import { Box } from '@mui/material';

import { TransactionIcon } from '../../atoms/TransactionIcon/TransactionIcon';

import {
  StyledBtmRow,
  StyledContainer,
  StyledTopRow,
  StyledTypography,
} from './Transaction.styled';

import { ITransaction } from 'models/ITransactionInfo';
import { formatLocaleTimeString } from 'utils/formatters';

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
          <StyledTypography>
            {formatLocaleTimeString(data.date)}
          </StyledTypography>
        </StyledBtmRow>
      </Box>
    </StyledContainer>
  );
}
