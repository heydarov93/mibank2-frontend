import { Box, Icon, Typography } from '@mui/material';

import {
  StyledBottomBox,
  StyledContainer,
  StyledTopBox,
} from './UserBankCard.styled';

import { ReactComponent as SimpleLogo } from 'assets/icons/SimpleLogo.svg';
import { CardIssuerIcon } from 'components/atoms';
import { currencySymbol } from 'constants/currencies';
import { IUserBankCard } from 'models/IUserCard';
import { separateThousands } from 'utils';

interface UserBankCardProps {
  card: IUserBankCard;
  isSelected?: boolean;
  isSlide?: boolean;
  onCardClick?: () => void;
}

export function UserBankCard({
  card,
  onCardClick,
  isSelected,
  isSlide = false,
}: UserBankCardProps) {
  return (
    <StyledContainer
      onClick={onCardClick}
      isSelected={isSelected}
      isSlide={isSlide}
      data-testid="user-bank-card"
    >
      <StyledTopBox>
        <Typography fontSize={14} whiteSpace="nowrap">
          {card.name}
        </Typography>
        <Icon sx={{ width: 24, height: 24 }}>
          <SimpleLogo data-testid="simple-logo" />
        </Icon>
      </StyledTopBox>
      <Typography fontSize={24} fontWeight={600} marginTop={1.5}>
        {currencySymbol[card.currency]} {separateThousands(card.balance, ' ')}
      </Typography>
      <StyledBottomBox>
        <Box>
          <Typography fontFamily="Inter" noWrap>
            {`•••• ${card.number.toString().slice(-4)}`}
          </Typography>
          <Typography fontSize={12} marginTop={1}>
            {card.expirationDate}
          </Typography>
        </Box>
        <Box display="flex" alignItems="center" gap={1}>
          <Typography fontSize={12}>
            {card.type === 'digital' ? 'virtual' : 'plastic'}
          </Typography>
          <CardIssuerIcon
            issuer={card.issuer}
            style={{ height: 24, width: 50 }}
          />
        </Box>
      </StyledBottomBox>
    </StyledContainer>
  );
}
