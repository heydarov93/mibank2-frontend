import { ChevronLeftRounded, ChevronRightRounded } from '@mui/icons-material';
import { Box } from '@mui/material';
import { Children, ReactNode, useState, useCallback, useMemo } from 'react';

import { SLIDE_USER_CARD_WIDTH } from '../CardsContent/CardsContent';

import {
  StyledCardsTrack,
  StyledNavigationButton,
  StyledPaginationContainer,
  StyledPaginationIndicator,
} from './UserBankCardsCarousel.styled';

const GAP_BETWEEN = 65;
const CARDS_PER_VIEW = 3;

export const UserBankCardsCarousel = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const cardsCount = Children.count(children);

  const { totalPages, maxIndex, translateX } = useMemo(
    () => ({
      totalPages: Math.ceil(cardsCount / CARDS_PER_VIEW),
      maxIndex: Math.max(0, cardsCount - CARDS_PER_VIEW),
      translateX: currentIndex * (SLIDE_USER_CARD_WIDTH + GAP_BETWEEN),
    }),
    [cardsCount, currentIndex],
  );

  const currentPage = useMemo(() => {
    if (currentIndex <= 1) return currentIndex;
    return Math.min(Math.floor(currentIndex), totalPages - 1);
  }, [currentIndex, totalPages]);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => Math.min(prev + 1, maxIndex));
  }, [maxIndex]);

  const prevSlide = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  };

  const goToPage = useCallback(
    (pageIndex: number) => {
      setCurrentIndex(Math.min(pageIndex, maxIndex));
    },
    [maxIndex],
  );

  const isAtStart = currentIndex === 0;
  const isAtEnd = currentIndex === maxIndex;

  return (
    <Box
      sx={{ position: 'relative', width: '100%' }}
      data-testid="cards-carousel"
    >
      <StyledNavigationButton
        position="left"
        onClick={prevSlide}
        disabled={isAtStart}
        data-testid="nav-button-left"
      >
        <ChevronLeftRounded />
      </StyledNavigationButton>

      <Box sx={{ overflow: 'hidden', padding: 2 }}>
        <StyledCardsTrack
          translateX={translateX}
          data-testid="cards-track"
          style={{ transform: `translateX(-${translateX}px)` }}
        >
          {children}
        </StyledCardsTrack>
      </Box>

      <StyledNavigationButton
        position="right"
        onClick={nextSlide}
        disabled={isAtEnd}
        data-testid="nav-button-right"
      >
        <ChevronRightRounded />
      </StyledNavigationButton>

      {totalPages > 1 && (
        <StyledPaginationContainer data-testid="pagination-container">
          {Array.from({ length: totalPages }, (_, index) => (
            <StyledPaginationIndicator
              key={index}
              active={currentPage === index}
              onClick={() => goToPage(index)}
              data-testid="pagination-indicator"
              type="button"
            />
          ))}
        </StyledPaginationContainer>
      )}
    </Box>
  );
};
