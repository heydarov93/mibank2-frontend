import { Box, Icon, Typography } from '@mui/material';

import {
  StyledBtmBox,
  StyledContainer,
  StyledTopBox,
} from './UserBankCard.styled';

import { ReactComponent as SimpleLogo } from 'assets/icons/SimpleLogo.svg';
import { CardIssuerIcon } from 'components/atoms';
import { currencySymbol } from 'constants/currencies';
import { TCardIssuer, TCardStatus, TCardType, TCurrency } from 'models/types';
import { separateThousands } from 'utils';

export interface IUserBankCard {
  holder: string;
  name: string;
  issuer: TCardIssuer;
  number: number;
  cvv: number;
  iban: string;
  swift: string;
  balance: number;
  currency: TCurrency;
  type: TCardType;
  issueDate: string;
  expirationDate: string;
  cashbackRate: number;
  status: TCardStatus;
}

export function UserBankCard({ data }: { data: IUserBankCard }) {
  return (
    <StyledContainer>
      <StyledTopBox>
        <Typography fontSize={14} whiteSpace="nowrap">
          {data.name}
        </Typography>
        <Icon sx={{ width: 24, height: 24 }}>
          <SimpleLogo data-testid="simple-logo" />
        </Icon>
      </StyledTopBox>
      <Typography fontSize={24} fontWeight={600} marginTop={1.5}>
        {currencySymbol[data.currency]} {separateThousands(data.balance, ' ')}
      </Typography>
      <StyledBtmBox>
        <Box>
          <Typography fontFamily="Inter" noWrap>
            {`•••• ${data.number.toString().slice(-4)}`}
          </Typography>
          <Typography fontSize={12} marginTop={1}>
            {data.expirationDate}
          </Typography>
        </Box>
        <Box display="flex" alignItems="center" gap={1}>
          <Typography fontSize={12}>
            {data.type === 'digital' ? 'virtual' : 'plastic'}
          </Typography>
          <CardIssuerIcon
            issuer={data.issuer}
            style={{ height: 24, width: 50 }}
          />
        </Box>
      </StyledBtmBox>
    </StyledContainer>
  );
}
