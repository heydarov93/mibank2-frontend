import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import {
  CardDetails,
  EmptySection,
  StaticCardStack,
} from '../Sidebar/molecules';

import { StyledCardContainer, StyledContainer } from './MyCardsSection.styled';
import { CardStackCarousel } from './molecules';

import { UserBankCard } from 'components/molecules';
import { useUserCards } from 'hooks';

export function MyCardsSection() {
  const { t } = useTranslation('translation', {
    keyPrefix: 'Homepage.sidebar',
  });
  const [selectedCardIndex, setSelectedCardIndex] = useState(0);

  const { data: userBankCards, isLoading, isError } = useUserCards();

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
