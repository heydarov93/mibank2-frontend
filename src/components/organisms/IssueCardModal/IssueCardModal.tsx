import { Box, Stack, Typography } from '@mui/material';
import { useEffect } from 'react';
import { FormProvider } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { InfoAlert } from '../InfoAlert/InfoAlert';
import { SimpleAlert } from '../SimpleAlert/SimpleAlert';

import {
  IssueCardModalActions,
  IssueCardModalSelects,
  IssueCardsSelectionList,
  SelectedCardForm,
} from './molecules';

import { LoadingIndicator, StyledDialog } from 'components/atoms';
import {
  IssuanceCardInfo,
  ModalHeader,
  NavigationWarningModal,
} from 'components/atoms';
import { IssueCardModalBottomAlert } from 'components/atoms';
import { useCardIssuance } from 'components/organisms/IssueCardModal/hooks/useCardIssuance';
import { useCardIssueFlow } from 'components/organisms/IssueCardModal/hooks/useCardIssueFlow';
import { DIALOGS_ANIMATION_TIME } from 'constants/animationsInfo';
import { ECardIssueStepper } from 'enums/ECardIssueStepper';
import useDisclosure from 'hooks/useDisclosure';

export interface IssueCardModalProps {
  open: boolean;
  onClose: () => void;
}

export const IssueCardModal = ({ open, onClose }: IssueCardModalProps) => {
  const { t } = useTranslation('translation', { keyPrefix: 'IssueCardModal' });
  const {
    formMethods,
    step,
    cards,
    selectedCard,
    confirmationModal,
    isLoadingCards,
    isConfirmationStep,
    handleSelectCard,
    handleClose,
    handleBack,
    handleStepUpdate,
  } = useCardIssueFlow({ onClose });
  const { issueCard, reset, isIssuingCard, errorMessage, isCardIssued } =
    useCardIssuance({
      selectedCard,
    });
  const successAlert = useDisclosure();
  const errorAlert = useDisclosure();
  const { handleSubmit } = formMethods;
  const title = t(isConfirmationStep ? 'cardSelected' : 'issueCard');
  const showSelectedCardForm = isConfirmationStep && selectedCard !== null;
  const isDialogHidden = isIssuingCard || isCardIssued;
  const issueFee = selectedCard?.issueFee ?? 0;
  const successMessage = t(
    issueFee === 0 ? 'freeCardIssuedDescription' : 'paidCardIssuedDescription',
  );

  useEffect(() => {
    successAlert.set(isCardIssued);
    errorAlert.set(Boolean(errorMessage));
  }, [isCardIssued, errorMessage, errorAlert.set, successAlert.set]);

  function handleCloseSuccessAlert() {
    successAlert.close();
    handleClose();
    setTimeout(reset, DIALOGS_ANIMATION_TIME);
  }

  function handleCloseErrorAlert() {
    errorAlert.close();
    reset();
  }

  return (
    <>
      <StyledDialog
        open={open}
        onClose={confirmationModal.open}
        data-testid="issue-card-modal"
        sx={{ opacity: isDialogHidden ? 0 : 1 }}
      >
        <Box
          component="form"
          onSubmit={handleSubmit(issueCard)}
          sx={{
            color: 'black',
          }}
        >
          <FormProvider {...formMethods}>
            <ModalHeader
              title={title}
              onClose={confirmationModal.open}
              onBack={isConfirmationStep ? handleBack : undefined}
            />

            {showSelectedCardForm ? (
              <SelectedCardForm
                {...selectedCard}
                background="#000"
                onCancel={confirmationModal.open}
              />
            ) : (
              <>
                <IssueCardModalSelects sx={{ mt: 3 }} />

                {step === ECardIssueStepper.DATA_SELECTION && (
                  <IssueCardModalBottomAlert sx={{ mt: 4 }} />
                )}

                {(step === ECardIssueStepper.CARD_SELECTION ||
                  step === ECardIssueStepper.CARD_SELECTED) && (
                  <IssueCardsSelectionList
                    cards={cards}
                    isLoading={isLoadingCards}
                    onCardSelect={handleSelectCard}
                    selectedCard={selectedCard}
                    sx={{ mt: 4 }}
                  />
                )}

                {step === ECardIssueStepper.CARD_SELECTED && selectedCard && (
                  <IssuanceCardInfo
                    cardName={selectedCard.cardName}
                    cardCurrency={selectedCard.cardCurrency}
                    monthlyFee={selectedCard.monthlyFee}
                    foreignTransactionLimit={
                      selectedCard.foreignTransactionLimit
                    }
                    cashbackRate={selectedCard.cashbackRate}
                    sx={{ mt: 1.5 }}
                  />
                )}

                <IssueCardModalActions
                  step={step}
                  onCancel={confirmationModal.open}
                  onConfirm={handleStepUpdate(ECardIssueStepper.CONFIRMATION)}
                  sx={{ mt: 4 }}
                />
              </>
            )}
          </FormProvider>
        </Box>
      </StyledDialog>

      <SimpleAlert open={isIssuingCard} withBackdrop>
        <Stack direction="row" gap={1.5}>
          <Typography>{t('processingPayment')}</Typography>
          <LoadingIndicator />
        </Stack>
      </SimpleAlert>

      <InfoAlert
        open={successAlert.isOpen}
        onClose={handleCloseSuccessAlert}
        type="success"
        title={t('cardIssuedTitle')}
        message={successMessage}
        withBackdrop
      />

      <InfoAlert
        open={errorAlert.isOpen}
        onClose={handleCloseErrorAlert}
        type="error"
        title={t('transactionFailed')}
        message={errorMessage}
      />

      <NavigationWarningModal
        open={confirmationModal.isOpen}
        title={t('confirmationModal.title')}
        description={t('confirmationModal.description')}
        cancelLabel={t('confirmationModal.goBack')}
        confirmLabel={t('confirmationModal.leave')}
        onConfirm={handleClose}
        onCancel={confirmationModal.close}
        sx={(theme) => ({
          '.MuiTypography-root': {
            color: theme.palette.grey[600],
          },
        })}
      />
    </>
  );
};
