import AddIcon from '@mui/icons-material/Add';
import { useTranslation } from 'react-i18next';

import {
  StyledAddButton,
  StyledEmptyContainer,
  StyledSubTitle,
} from '../AllCardsSlider.styled';

import { NoCardIcon } from 'components/atoms';
import { IssueCardModal } from 'components/organisms';
import useDisclosure from 'hooks/useDisclosure';

export const NoCard = () => {
  const issueCardModal = useDisclosure();
  const { t } = useTranslation('translation', { keyPrefix: 'AllCards' });

  return (
    <>
      <StyledEmptyContainer data-testid="empty-container">
        <NoCardIcon data-testid="no-card-icon" />
        <StyledSubTitle data-testid="subtitle">
          {t('emptyStateDescription')}
        </StyledSubTitle>
        <StyledAddButton onClick={issueCardModal.open} data-testid="add-button">
          {t('addButton')}{' '}
          <AddIcon sx={{ fontSize: '23px' }} data-testid="add-icon" />
        </StyledAddButton>
      </StyledEmptyContainer>

      <IssueCardModal
        open={issueCardModal.isOpen}
        onClose={issueCardModal.close}
      />
    </>
  );
};
