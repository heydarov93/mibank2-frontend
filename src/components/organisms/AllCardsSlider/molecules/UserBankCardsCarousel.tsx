import { ChevronLeftRounded, ChevronRightRounded } from '@mui/icons-material';
import { Box } from '@mui/material';
import { ReactNode, useState } from 'react';

import {
  StyledCardsTrack,
  StyledNavigationButton,
  StyledPaginationContainer,
  StyledPaginationIndicator,
} from '../AllCardsSlider.styled';

import { SLIDE_USER_CARD_WIDTH } from 'components/molecules/UserBankCard/UserBankCard.styled';
import { useGetUserCards } from 'components/organisms/Sidebar/organisms/MyCards/hooks/useGetUserCards';

interface UserCardsCarouselProps {
  children: ReactNode;
}

const GAP_BETWEEN = 65;
const CARDS_PER_VIEW = 3;

export const UserBankCardsCarousel = ({ children }: UserCardsCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { data: userBankCards } = useGetUserCards();

  const totalPages = Math.ceil(userBankCards.length / CARDS_PER_VIEW);
  const maxIndex = Math.max(0, userBankCards.length - CARDS_PER_VIEW);

  const nextSlide = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, maxIndex));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  };

  const goToPage = (pageIndex: number) => {
    const slideIndex = Math.min(pageIndex, maxIndex);
    setCurrentIndex(slideIndex);
  };

  const getCurrentPage = () => {
    if (currentIndex === 0) return 0;
    if (currentIndex === 1) return 1;
    return Math.min(Math.floor(currentIndex), totalPages - 1);
  };

  const translateX = currentIndex * (SLIDE_USER_CARD_WIDTH + GAP_BETWEEN);

  return (
    <Box sx={{ position: 'relative', width: '100%' }}>
      <StyledNavigationButton
        position="left"
        onClick={prevSlide}
        disabled={currentIndex === 0}
        data-testid="nav-button-left"
      >
        <ChevronLeftRounded />
      </StyledNavigationButton>

      <Box
        sx={({ spacing }) => ({
          overflow: 'hidden',
          padding: spacing(2, 3),
        })}
      >
        <StyledCardsTrack
          translateX={translateX}
          data-translate-x={translateX}
          data-testid="cards-track"
        >
          {children}
        </StyledCardsTrack>
      </Box>

      <StyledNavigationButton
        position="right"
        onClick={nextSlide}
        disabled={currentIndex === maxIndex}
        data-testid="nav-button-right"
      >
        <ChevronRightRounded />
      </StyledNavigationButton>

      <StyledPaginationContainer data-testid="pagination-container">
        {Array.from({ length: totalPages }).map((_, index) => (
          <StyledPaginationIndicator
            key={index}
            active={getCurrentPage() === index}
            onClick={() => goToPage(index)}
            type="button"
            data-testid="pagination-indicator"
            data-active={getCurrentPage() === index}
          />
        ))}
      </StyledPaginationContainer>
    </Box>
  );
};
