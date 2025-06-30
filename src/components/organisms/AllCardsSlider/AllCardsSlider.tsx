import AddIcon from '@mui/icons-material/Add';
import { useTranslation } from 'react-i18next';

import { IssueCardModal } from '../IssueCardModal/IssueCardModal';
import { useGetUserCards } from '../Sidebar/organisms/MyCards/hooks/useGetUserCards';

import {
  StyledContainer,
  StyledIconButton,
  StyledTitle,
  StyledTitleContainer,
} from './AllCardsSlider.styled';
import { CardsContent } from './molecules/CardsContent/CardsContent';

import useDisclosure from 'hooks/useDisclosure';
import { IUserBankCard } from 'models/IUserBankCard';

const SELECTED_CARD_SCALE = 1.12;

interface AllCardsSliderProps {
  onCardIdSelect: (id: IUserBankCard['id']) => void;
  selectedCardId: IUserBankCard['id'];
}

export const AllCardsSlider = ({
  onCardIdSelect,
  selectedCardId,
}: AllCardsSliderProps) => {
  const { t } = useTranslation('translation', { keyPrefix: 'AllCards' });
  const issueCardModal = useDisclosure();

  const { data: userBankCards, isLoading, isError } = useGetUserCards();

  const handleCardClick = (cardId: IUserBankCard['id']) =>
    onCardIdSelect(cardId);

  const getCardTransform = (cardId: IUserBankCard['id']) => ({
    transform:
      selectedCardId === cardId ? `scale(${SELECTED_CARD_SCALE})` : 'scale(1)',
  });

  return (
    <>
      <StyledContainer data-testid="main-container">
        <StyledTitleContainer data-testid="title-container">
          <StyledTitle data-testid="title">{t('title')}</StyledTitle>
          <StyledIconButton
            onClick={issueCardModal.open}
            disabled={isError}
            data-testid="icon-button"
          >
            <AddIcon sx={{ fontSize: '20px' }} />
          </StyledIconButton>
        </StyledTitleContainer>

        <CardsContent
          isLoading={isLoading}
          hasError={isError}
          userBankCards={userBankCards}
          onCardClick={handleCardClick}
          getCardTransform={getCardTransform}
          openIssueCardModal={issueCardModal.open}
        />
      </StyledContainer>

      <IssueCardModal
        open={issueCardModal.isOpen}
        onClose={issueCardModal.close}
        data-testid="issue-card-modal"
      />
    </>
  );
};
