import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import { useTranslation } from 'react-i18next';

import { StyledSubTitle } from '../../AllCardsSlider.styled';
import { NoCard } from '../NoCard/NoCard';
import { UserBankCardsCarousel } from '../UserBankCardsCarousel/UserBankCardsCarousel';

import {
  StyledCardContainer,
  StyledCardsContainer,
} from './CardsContent.styled';

import { UserBankCard } from 'components/molecules';
import { IUserBankCard } from 'models/IUserBankCard';

interface CardsContentProps {
  isLoading: boolean;
  hasError: boolean;
  userBankCards?: Omit<IUserBankCard, 'cvv' | 'iban' | 'swift'>[];
  onCardClick: (cardId: IUserBankCard['id']) => void;
  getCardTransform: (cardId: IUserBankCard['id']) => { transform: string };
  openIssueCardModal: () => void;
}

export const SLIDE_USER_CARD_WIDTH = 255;

export const CardsContent = ({
  isLoading,
  hasError,
  userBankCards,
  onCardClick,
  getCardTransform,
  openIssueCardModal,
}: CardsContentProps) => {
  const { t } = useTranslation('translation', { keyPrefix: 'AllCards' });

  if (isLoading) {
    return (
      <StyledCardsContainer>
        <CircularProgress data-testid="loading-spinner" />
      </StyledCardsContainer>
    );
  }

  if (hasError) {
    return (
      <StyledCardsContainer>
        <Alert severity="error" data-testid="error-alert">
          {t('errors.failedToLoadCards')}
        </Alert>
      </StyledCardsContainer>
    );
  }

  if (!userBankCards) {
    return (
      <StyledCardsContainer>
        <Alert severity="warning" data-testid="no-data-alert">
          {t('errors.notFoundCards')}
        </Alert>
      </StyledCardsContainer>
    );
  }

  if (userBankCards.length === 0) {
    return <NoCard openIssueCardModal={openIssueCardModal} />;
  }

  return (
    <StyledCardsContainer data-testid="cards-container">
      <StyledSubTitle data-testid="subtitle">{t('subTitle')}</StyledSubTitle>
      <UserBankCardsCarousel>
        {userBankCards.map((card) => (
          <StyledCardContainer
            data-testid="card-container"
            key={card.id}
            onClick={() => onCardClick(card.id)}
            sx={getCardTransform(card.id)}
          >
            <UserBankCard
              data={card}
              size={SLIDE_USER_CARD_WIDTH}
              data-testid={`user-card-${card.id}`}
            />
          </StyledCardContainer>
        ))}
      </UserBankCardsCarousel>
    </StyledCardsContainer>
  );
};
