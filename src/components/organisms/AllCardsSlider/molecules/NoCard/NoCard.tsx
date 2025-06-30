import AddIcon from '@mui/icons-material/Add';
import { useTranslation } from 'react-i18next';

import { StyledSubTitle } from '../../AllCardsSlider.styled';

import { StyledAddButton, StyledEmptyContainer } from './NoCard.styled';

import { NoCardIcon } from 'components/atoms';

export const NoCard = ({
  openIssueCardModal,
}: {
  openIssueCardModal: () => void;
}) => {
  const { t } = useTranslation('translation', { keyPrefix: 'AllCards' });
  return (
    <StyledEmptyContainer data-testid="empty-container">
      <NoCardIcon data-testid="no-card-icon" />
      <StyledSubTitle data-testid="subtitle">
        {t('emptyStateDescription')}
      </StyledSubTitle>
      <StyledAddButton onClick={openIssueCardModal} data-testid="add-button">
        {t('addButton')}{' '}
        <AddIcon sx={{ fontSize: '23px' }} data-testid="add-icon" />
      </StyledAddButton>
    </StyledEmptyContainer>
  );
};
