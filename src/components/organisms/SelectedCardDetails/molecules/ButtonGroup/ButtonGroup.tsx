import { Alert } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { TUserBankCardDetails } from '../InfoTab/InfoTab';

import {
  StyledButtonGroup,
  StyledOutlinedButton,
  StyledPrimaryButton,
} from './ButtonGroup.styled';

import {
  useUpdatePrimaryPaymentCardMutation,
  useUpdateUserCardStatusMutation,
} from 'api/userCardsApi';
import { TO_TRANSFERS } from 'constants/routesName';

type ActionButton = 'status' | 'primary';

const ButtonGroup = ({
  selectedUserCardDetails,
}: {
  selectedUserCardDetails: TUserBankCardDetails;
}) => {
  const { t } = useTranslation('translation', {
    keyPrefix: 'AllCards.selectedCard',
  });
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState<string>('');

  const [
    updateUserCardStatus,
    { isLoading: isUpdatingStatus, isError: isStatusError },
  ] = useUpdateUserCardStatusMutation();
  const [
    updatePrimaryPaymentCard,
    { isLoading: isUpdatingPrimary, isError: isPrimaryError },
  ] = useUpdatePrimaryPaymentCardMutation();

  const isCardBlocked = selectedUserCardDetails.status === 'blocked';
  const isPrimaryCard = selectedUserCardDetails.isPrimary;

  const handleTransfer = () => navigate(TO_TRANSFERS);

  const handleStatusToggle = async () => {
    const newStatus = isCardBlocked ? 'ACTIVE' : 'BLOCKED';
    const action = isCardBlocked ? 'unblock' : 'block';

    try {
      await updateUserCardStatus({
        id: selectedUserCardDetails.id,
        status: newStatus,
      }).unwrap();
    } catch {
      setErrorMessage(`Failed to ${action} card`);
    }
  };

  const handleSetPrimary = async () => {
    try {
      await updatePrimaryPaymentCard({
        id: selectedUserCardDetails.id,
        isPrimaryPaymentCard: true,
      }).unwrap();
    } catch {
      setErrorMessage('Failed to set as primary card');
    }
  };

  const getButtonText = (actionBtn: ActionButton) => {
    if (actionBtn === 'status') {
      const statusAction = isCardBlocked ? 'unblock' : 'block';
      return t(
        `${statusAction}${isUpdatingStatus ? 'LoadingState' : 'Button'}`,
      );
    }

    if (actionBtn === 'primary') {
      return t(`putTop${isUpdatingPrimary ? 'LoadingState' : 'Button'}`);
    }
  };

  return (
    <>
      <StyledButtonGroup data-testid="button-group">
        <StyledPrimaryButton
          variant="contained"
          onClick={handleTransfer}
          data-testid="transfer-button"
        >
          {t('transferButton')}
        </StyledPrimaryButton>

        {!isPrimaryCard && (
          <StyledOutlinedButton
            variant="outlined"
            onClick={handleSetPrimary}
            disabled={isUpdatingPrimary || isCardBlocked}
            data-testid="primary-button"
          >
            {getButtonText('primary')}
          </StyledOutlinedButton>
        )}

        <StyledOutlinedButton
          variant="outlined"
          onClick={handleStatusToggle}
          disabled={isUpdatingStatus}
          data-testid="status-button"
        >
          {getButtonText('status')}
        </StyledOutlinedButton>
      </StyledButtonGroup>

      {(isStatusError || isPrimaryError) && (
        <Alert
          severity="error"
          sx={{ mt: 2, width: '50%' }}
          data-testid="error-alert"
        >
          {errorMessage}
        </Alert>
      )}
    </>
  );
};

export default ButtonGroup;
