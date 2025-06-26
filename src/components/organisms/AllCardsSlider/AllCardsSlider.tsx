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
import { UserBankCardsCarousel } from './molecules/UserBankCardsCarousel';

import { UserBankCard } from 'components/molecules/UserBankCard/UserBankCard';
import { IUserBankCard } from 'models/IUserBankCard';

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
          <UserBankCardsCarousel data-testid="user-cards-carousel">
            {userBankCards.map((card) => (
              <UserBankCard
                card={card}
                key={card.id}
                onCardClick={() => handleCardClick(card)}
                data-selected={selectedCardId === card.id}
                data-card-id={card.id}
                isSlide={true}
                isSelected={selectedCardId === card.id}
              />
            ))}
          </UserBankCardsCarousel>
        </StyledCardsContainer>
      )}
    </StyledContainer>
  );
};
