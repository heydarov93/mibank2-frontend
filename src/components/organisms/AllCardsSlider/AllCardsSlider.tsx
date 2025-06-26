import AddIcon from '@mui/icons-material/Add';
import { useTranslation } from 'react-i18next';

import { useGetUserCards } from '../Sidebar/organisms/MyCards/hooks/useGetUserCards';

import {
  StyledCardsContainer,
  StyledContainer,
  StyledIconButton,
  StyledSubTitle,
  StyledTitle,
  StyledTitleContainer,
} from './AllCardsSlider.styled';
import { NoCard } from './molecules/NoCard';
import { UserCardsCarousel } from './molecules/UserCardsCarousel';

import { UserBankCard } from 'components/molecules/UserBankCard/UserBankCard';
import { IUserBankCard } from 'models/IUserCard';

interface AllCardsSliderProps {
  onCardSelect: (card: IUserBankCard) => void;
  selectedCardId: string | number;
}

export const AllCardsSlider = ({
  onCardSelect,
  selectedCardId,
}: AllCardsSliderProps) => {
  const { t } = useTranslation('translation', { keyPrefix: 'AllCards' });
  const { data: userBankCards } = useGetUserCards();

  const handleCardClick = (card: IUserBankCard) => {
    onCardSelect(card);
  };

  return (
    <StyledContainer data-testid="main-container">
      <StyledTitleContainer data-testid="title-container">
        <StyledTitle data-testid="title">{t('title')}</StyledTitle>
        <StyledIconButton data-testid="icon-button">
          <AddIcon sx={{ fontSize: '20px' }} />
        </StyledIconButton>
      </StyledTitleContainer>
      {userBankCards.length === 0 ? (
        <NoCard />
      ) : (
        <StyledCardsContainer data-testid="cards-container">
          <StyledSubTitle data-testid="subtitle">
            {t('subTitle')}
          </StyledSubTitle>
          <UserCardsCarousel data-testid="user-cards-carousel">
            {userBankCards.map((card: IUserBankCard, index: number) => (
              <UserBankCard
                card={card}
                key={index}
                onCardClick={() => handleCardClick(card)}
                isSelected={selectedCardId === card.id}
                isSlide={true}
                data-selected={selectedCardId === card.id}
                data-card-id={card.id}
              />
            ))}
          </UserCardsCarousel>
        </StyledCardsContainer>
      )}
    </StyledContainer>
  );
};
