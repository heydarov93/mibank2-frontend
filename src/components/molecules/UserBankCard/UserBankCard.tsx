import { Box, Typography } from '@mui/material';

import {
  StyledBtmBox,
  StyledContainer,
  StyledTopBox,
} from './UserBankCard.styled';

import { ReactComponent as SimpleLogo } from 'assets/icons/SimpleLogo.svg';
import { CardIssuerIcon } from 'components/atoms';
import { currencySymbol } from 'constants/currencies';
import { IUserBankCard } from 'models/IUserBankCard';
import { separateThousands } from 'utils/formatters';

export const USER_CARD_WIDTH = 288;

export type TUserBankCardComponent = Pick<
  IUserBankCard,
  | 'holder'
  | 'name'
  | 'issuer'
  | 'number'
  | 'balance'
  | 'currency'
  | 'expirationDate'
  | 'issueType'
>;

interface Props {
  data: TUserBankCardComponent;
  size?: number;
}

export function UserBankCard({ data, size = USER_CARD_WIDTH }: Props) {
  const fontSize = size / USER_CARD_WIDTH;
  const width = size / fontSize;

  return (
    <StyledContainer fontSize={fontSize} width={`${width}em`}>
      <StyledTopBox>
        <Typography fontSize="14em" whiteSpace="nowrap">
          {data.name}
        </Typography>
        <SimpleLogo
          data-testid="simple-logo"
          style={{ width: '24em', height: '24em' }}
        />
      </StyledTopBox>
      <Typography fontSize="24em" fontWeight={600} marginTop="0.5em">
        {currencySymbol[data.currency]}{' '}
        {separateThousands(Number(data.balance), ' ')}
      </Typography>
      <StyledBtmBox>
        <Box>
          <Typography fontSize="16em" fontFamily="Inter" noWrap>
            {`•••• ${data.number.toString().slice(-4)}`}
          </Typography>
          <Typography fontSize="12em" marginTop="0.65em">
            {data.expirationDate}
          </Typography>
        </Box>
        <Box display="flex" alignItems="center" gap="8em">
          <Typography fontSize="12em">
            {data.issueType === 'digital' ? 'virtual' : 'plastic'}
          </Typography>
          <CardIssuerIcon
            issuer={data.issuer}
            style={{ height: '24em', width: '50em' }}
          />
        </Box>
      </StyledBtmBox>
    </StyledContainer>
  );
}
