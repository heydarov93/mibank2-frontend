import { Box, Icon, Typography } from '@mui/material';

import {
  StyledBtmBox,
  StyledContainer,
  StyledTopBox,
} from './UserBankCard.styled';

import { ReactComponent as SimpleLogo } from 'assets/icons/SimpleLogo.svg';
import { CardIssuerIcon } from 'components/atoms';
import { currencySymbol } from 'constants/currencies';
import { TCardIssuer, TCurrency } from 'models/types';
import { separateThousands } from 'utils';

interface IUserBankCard {
  name: string;
  number: number;
  balance: number;
  currency: TCurrency;
  issuer: TCardIssuer;
  expirationDate: string;
  type: 'virtual' | 'plastic';
}

export function UserBankCard({ data }: { data: IUserBankCard }) {
  return (
    <StyledContainer>
      <StyledTopBox>
        <Typography noWrap fontSize={12}>
          {data.name}
        </Typography>
        <Icon sx={{ width: 24, height: 24 }}>
          <SimpleLogo />
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
        <Box display="flex" alignItems="center" gap={2}>
          <Typography fontSize={12}>{data.type}</Typography>
          <CardIssuerIcon issuer={data.issuer} />
        </Box>
      </StyledBtmBox>
    </StyledContainer>
  );
}
