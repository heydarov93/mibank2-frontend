import Box from '@mui/material/Box';
import { useTranslation } from 'react-i18next';

import { ConfirmationWindow } from '../ConfirmationWindow/ConfirmationWindow';
import { FailWindow } from '../FailWindow/FailWindow';
import { WarningWindow } from '../WarningWindow/WarningWindow';

import { StyledContainer, StyledTermsLink } from './DepositCreationForm.styled';
import AccountSelect from './atoms/AccountSelect/AccountSelect';
import AmountField from './atoms/AmountField/AmountField';
import ConfirmationSwitch from './atoms/ConfirmationSwitch/ConfirmationSwitch';
import FormButtons from './atoms/FormButtons/FormButtons';
import FormHeader from './atoms/FormHeader/FormHeader';
import InterestInfo from './atoms/InterestInfo/InterestInfo';
import { useDepositForm } from './hooks/useDepositForm';
import { useCreateDeposit, useUserAccounts } from './hooks/useUserAccounts';
import { buildDepositPayload } from './utils/buildDepositPayload';

import { useDisclosure } from 'hooks';
import { TCurrency } from 'types/types';
import { openDepositSchema } from 'validation';

export interface DepositCreationFormProps {
  modal?: boolean;
  currency: TCurrency;
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
    showErrorModal,
    errorMessage,
    handleSuccessModalClose,
    handleErrorModalClose,
  } = useDepositForm({
    validationSchema: openDepositSchema,
    onSuccess: onBack,
    accountOptions,
    createDeposit: createUserDeposit,
    buildPayload: buildDepositPayload,
    depositId,
    isModal: modal,
  });

  const { control } = form;

  return (
    <StyledContainer data-testid="deposit-creation-form">
      <Box component="form" onSubmit={onDepositSubmit}>
        <FormHeader />

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

      <WarningWindow
        deposit={true}
        open={isOpen}
        title={t('confirmationModals.cancelDepositTitle')}
        text={t('confirmationModals.cancelDepositBody')}
        onCancelClick={onBack}
        onBackClick={close}
      />

      {showSuccessModal && (
        <ConfirmationWindow
          sx={{
            height: 'fit-content',
            maxWidth: '540px',
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
          onClose={handleSuccessModalClose}
        />
      )}

      {showErrorModal && (
        <FailWindow
          sx={{
            height: 'fit-content',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
          onClose={handleErrorModalClose}
          title={t('confirmationModals.depositFailTitle')}
          body={errorMessage}
        />
      )}
    </StyledContainer>
  );
};
