import { Box } from '@mui/material';
import { useTranslation } from 'react-i18next';

import BackOfficeConfirmationWindow from '../BackOfficeConfirmationWindow/BackOfficeConfirmationWindow';
import BackOfficeFailWindow from '../BackOfficeFailWindow/BackOfficeFailWindow';
import { BackOfficeWarningWindow } from '../BackOfficeWarningWindow/BackOfficeWarningWindow';

import { StyledContainer, StyledTermsLink } from './DepositCreationForm.styled';
import { useDepositForm } from './hooks/useDepositForm';
import { useCreateDeposit, useUserAccounts } from './hooks/useUserAccounts';
import AccountSelect from './molecules/AccountSelect';
import AmountField from './molecules/AmountField';
import ConfirmationSwitch from './molecules/ConfirmationSwitch';
import FormButtons from './molecules/FormButtons';
import FormHeader from './molecules/FormHeader';
import InterestInfo from './molecules/InterestInfo';
import { buildDepositPayload } from './utils/buildDepositPayload';

import useDisclosure from 'hooks/useDisclosure';
import { openDepositValidationSchema } from 'validation/validationOpenDepositSchema';

interface DepositCreationFormProps {
  modal?: boolean;
  onCloseModal?: () => void;
  currency: string;
  onBack: () => void;
  depositId: number;
  interestRate: number;
  term: number;
  depositName: string;
}

export const DepositCreationForm = ({
  depositName,
  depositId,
  interestRate,
  currency,
  term,
  modal,
  onCloseModal,
  onBack,
}: DepositCreationFormProps) => {
  const { isOpen, open, close } = useDisclosure();
  const { t } = useTranslation('translation', { keyPrefix: 'LearnMorePage' });
  const { accountOptions, isLoading } = useUserAccounts();
  const [createUserDeposit] = useCreateDeposit();

  const {
    form,
    onDepositSubmit,
    amountValue,
    errors,
    isSubmitDisabled,
    showSuccessModal,
    setShowSuccessModal,
    showErrorModal,
    setShowErrorModal,
    errorMessage,
  } = useDepositForm({
    validationSchema: openDepositValidationSchema,
    onSuccess: modal ? onCloseModal : undefined,
    accountOptions,
    createDeposit: createUserDeposit,
    buildPayload: buildDepositPayload,
    depositId,
  });

  const { control } = form;

  return (
    <StyledContainer data-testid="deposit-creation-form">
      <Box component="form" onSubmit={onDepositSubmit}>
        <FormHeader onBack={onBack} />

        <AmountField control={control} errors={errors} currency={currency} />

        <AccountSelect
          control={control}
          errors={errors}
          isLoading={isLoading}
          options={accountOptions}
        />

        <InterestInfo
          interestRate={interestRate}
          amount={amountValue}
          currency={currency}
          term={term}
        />

        <ConfirmationSwitch control={control} />

        <StyledTermsLink>{t('termsLinkText')}</StyledTermsLink>

        <FormButtons
          isDisabled={isSubmitDisabled}
          onCloseModal={open}
          modal={modal}
        />
      </Box>

      <BackOfficeWarningWindow
        deposit={true}
        open={isOpen}
        title={t('confirmationModals.cancelDepositTitle')}
        text={t('confirmationModals.cancelDepositBody')}
        onCancelClick={onBack}
        onBackClick={close}
      />

      {showSuccessModal && (
        <BackOfficeConfirmationWindow
          sx={{
            height: 'fit-content',
            width: '540px',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
          title={t('confirmationModals.successTitle')}
          body={t('confirmationModals.successBody', {
            depositName: depositName?.toLowerCase(),
          })}
          depositSuccess={true}
          depositId={depositId}
          onClose={() => setShowSuccessModal(false)}
        />
      )}

      {showErrorModal && (
        <BackOfficeFailWindow
          sx={{
            height: 'fit-content',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
          onClose={() => setShowErrorModal(false)}
          title={t('confirmationModals.depositFailTitle')}
          body={errorMessage}
        />
      )}
    </StyledContainer>
  );
};
