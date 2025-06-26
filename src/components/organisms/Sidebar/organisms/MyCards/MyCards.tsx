import { Box, CircularProgress } from '@mui/material';
import { useState } from 'react';

import { CardDetails } from '../../molecules/CardDetails/CardDetails';
import { EmptySection } from '../../molecules/EmptySection/EmptySection';
import { StaticCardStack } from '../../molecules/StaticCardStack/StaticCardStack';
import { CardStackCarousel } from '../CardStackCarousel/CardStackCarousel';

import { StyledCardContainer, StyledContainer } from './MyCards.styled';
import { useGetUserCards } from './hooks/useGetUserCards';

import { UserBankCard } from 'components/molecules/UserBankCard/UserBankCard';

export function MyCards() {
  const [selectedCard, setSelectedCard] = useState(0);

  const { data: userBankCards, isLoading } = useGetUserCards();

  function handleCardSelect(current: number | undefined) {
    setSelectedCard(current ?? 0);
  }

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center">
        <CircularProgress size={20} />
      </Box>
    );
  }

  if (userBankCards.length === 0) {
    return <EmptySection />;
  }

  return (
    <>
      <StyledContainer>
        <CardStackCarousel index={selectedCard} onChange={handleCardSelect}>
          {userBankCards.map((card, index) => (
            <StyledCardContainer key={index}>
              <UserBankCard card={card} />
            </StyledCardContainer>
          ))}
        </CardStackCarousel>
        <StaticCardStack />
      </StyledContainer>
      <CardDetails data={userBankCards[selectedCard]} />
    </>
  );
}
