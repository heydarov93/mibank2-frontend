import { Box } from '@mui/material';
import { FormProvider } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { StyledDialog } from 'components/atoms';
import {
  IssuanceCardInfo,
  ModalHeader,
  NavigationWarningModal,
} from 'components/atoms';
import { IssueCardModalBottomAlert } from 'components/atoms';
import {
  IssueCardModalActions,
  IssueCardModalSelects,
  IssueCardsSelectionList,
  SelectedCardForm,
} from 'components/molecules';
import { ECardIssueStepper } from 'enums/ECardIssueStepper';
import { useCardIssueFlow } from 'hooks/useCardIssueFlow';
import { IssuanceCardData } from 'models/IProductInfo';

export interface IssueCardModalProps {
  open: boolean;
  onClose: () => void;
}

const mockCardOptions: IssuanceCardData[] = [
  {
    id: 1,
    name: 'Visa Black',
    fee: 15,
    feeCurrency: 'PLN',
    currency: 'PLN',
    background: '#000',
    cardIssuer: 'visa',
    cardType: 'Debit',
    issueType: 'Digital',
    cashbackRate: 0.3,
    monthlyFee: 10,
    foreignTransactionLimit: 10000,
    dailyOperationalLimit: 1000,
  },
  {
    id: 2,
    name: 'Visa Premium',
    fee: 50,
    feeCurrency: 'PLN',
    currency: 'PLN',
    background: 'linear-gradient(136deg, #b3261e 8.4%, #4d110d 92%)',
    cardIssuer: 'visa',
    cardType: 'Debit',
    issueType: 'Digital',
    cashbackRate: 0.5,
    monthlyFee: 20,
    foreignTransactionLimit: 10000,
    dailyOperationalLimit: 1000,
  },
  {
    id: 3,
    name: 'Visa Classic',
    fee: 0,
    feeCurrency: 'PLN',
    currency: 'PLN',
    background: 'linear-gradient(136deg, #4d9bc2 8.4%, #1e3456 92%)',
    cardIssuer: 'visa',
    cardType: 'Credit',
    issueType: 'Plastic',
    cashbackRate: 0.1,
    monthlyFee: 0,
    foreignTransactionLimit: 30000,
    dailyOperationalLimit: 5000,
  },
];

const defaultValues = {
  issuanceAccount: '',
  paymentAccount: '',
  currency: '',
  cardType: '',
  issueType: '',
  cardIssuer: '',
};

export type CardIssueFormValues = typeof defaultValues;

export const IssueCardModal = ({ open, onClose }: IssueCardModalProps) => {
  const { t } = useTranslation('translation', { keyPrefix: 'IssueCardModal' });
  const {
    formMethods,
    step,
    selectedCard,
    confirmationModal,
    handleSelectCard,
    handleClose,
    handleBack,
    handleStepUpdate,
  } = useCardIssueFlow({ onClose, defaultValues });
  const isConfirmationStep = step === ECardIssueStepper.CONFIRMATION;
  const title = isConfirmationStep ? t('cardSelected') : t('issueCard');
  const showSelectedCardForm = isConfirmationStep && selectedCard !== null;

  return (
    <StyledDialog
      open={open}
      onClose={confirmationModal.open}
      data-testid="issue-card-modal"
    >
      <Box
        component="form"
        onSubmit={(e) => {
          // TODO: handle form submission when api is ready
          e.preventDefault();
        }}
        sx={{ color: 'black' }}
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
              onCancel={confirmationModal.open}
            />
          ) : (
            <>
              <IssueCardModalSelects sx={{ mt: 3 }} />

              {step === ECardIssueStepper.DATA_SELECTION && (
                <IssueCardModalBottomAlert sx={{ mt: '36px' }} />
              )}

              {(step === ECardIssueStepper.CARD_SELECTION ||
                step === ECardIssueStepper.CARD_SELECTED) && (
                <IssueCardsSelectionList
                  cards={mockCardOptions}
                  onCardSelect={handleSelectCard}
                  selectedCard={selectedCard}
                  sx={{ mt: '32px' }}
                />
              )}

              {step === ECardIssueStepper.CARD_SELECTED && selectedCard && (
                <IssuanceCardInfo
                  cardName={selectedCard.name}
                  currency={selectedCard.currency}
                  monthlyFee={selectedCard.monthlyFee}
                  foreignTransactionLimit={selectedCard.foreignTransactionLimit}
                  cashbackRate={selectedCard.cashbackRate}
                  sx={{ mt: '12px' }}
                />
              )}

              <IssueCardModalActions
                step={step}
                onCancel={confirmationModal.open}
                onConfirm={handleStepUpdate(ECardIssueStepper.CONFIRMATION)}
                sx={{ mt: '32px' }}
              />
            </>
          )}

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
        </FormProvider>
      </Box>
    </StyledDialog>
  );
};
