import { Box, CircularProgress } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { CardDetails } from '../../molecules/CardDetails/CardDetails';
import { EmptySection } from '../../molecules/EmptySection/EmptySection';
import { StaticCardStack } from '../../molecules/StaticCardStack/StaticCardStack';
import { CardStackCarousel } from '../CardStackCarousel/CardStackCarousel';

import { StyledCardContainer, StyledContainer } from './MyCards.styled';
import { useGetUserCards } from './hooks/useGetUserCards';

import { UserBankCard } from 'components/molecules/UserBankCard/UserBankCard';

export function MyCards() {
  const { t } = useTranslation('translation', {
    keyPrefix: 'Homepage.sidebar',
  });
  const [selectedCardIndex, setSelectedCardIndex] = useState(0);

  const { data: userBankCards, isLoading, isError } = useGetUserCards();

  function handleCardChange(current: number | undefined) {
    setSelectedCardIndex(current ?? 0);
  }

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center">
        <CircularProgress size={20} />
      </Box>
    );
  }

  if (isError || !userBankCards) {
    return <EmptySection description={t('emptySectionConnectionError')} />;
  }

  if (userBankCards.length === 0) {
    return <EmptySection />;
  }

  const selectedCard = userBankCards[selectedCardIndex];

  return (
    <>
      <StyledContainer>
        <CardStackCarousel
          index={selectedCardIndex}
          onChange={handleCardChange}
        >
          {userBankCards.map((card) => (
            <StyledCardContainer key={card.number}>
              <UserBankCard data={card} />
            </StyledCardContainer>
          ))}
        </CardStackCarousel>
        {userBankCards.length > 1 && (
          <StaticCardStack userCardsCount={userBankCards.length} />
        )}
      </StyledContainer>
      <CardDetails
        cardId={selectedCard.id}
        isCardPrimary={selectedCard.isPrimary}
      />
    </>
  );
}
