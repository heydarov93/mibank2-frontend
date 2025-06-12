import { yupResolver } from '@hookform/resolvers/yup';
import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';

import { DepositPayload } from '../utils/buildDepositPayload';

import { MODAL_DISPLAY_TIMEOUT } from 'constants/modalTimeouts';
import { AccountOption, DepositFormValues } from 'models/IDepositInfo';

interface UseDepositFormProps {
  validationSchema: yup.ObjectSchema<DepositFormValues>;
  defaultValues?: Partial<DepositFormValues>;
  onSuccess?: () => void;
  accountOptions: AccountOption[];
  createDeposit: (payload: DepositPayload) => Promise<{
    data?: unknown;
    error?: unknown;
  }>;
  buildPayload: (
    formData: DepositFormValues,
    accountOptions: AccountOption[],
    depositId: number,
  ) => DepositPayload;
  depositId: number;
  isModal?: boolean;
}

type SubmissionState = 'idle' | 'success' | 'error';

export const useDepositForm = ({
  validationSchema,
  defaultValues = {
    amount: undefined,
    account: '',
    checkbox: false,
  },
  onSuccess,
  accountOptions,
  createDeposit,
  buildPayload,
  depositId,
  isModal = false,
}: UseDepositFormProps) => {
  const { t } = useTranslation('translation', { keyPrefix: 'LearnMorePage' });
  const [submissionState, setSubmissionState] =
    useState<SubmissionState>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const form = useForm<DepositFormValues>({
    resolver: yupResolver(validationSchema),
    defaultValues,
    mode: 'all',
  });

  const { reset, formState, watch, handleSubmit } = form;
  const { isValid, errors, isSubmitting } = formState;
  const isSubmitDisabled = !isValid || isSubmitting;
  const amountValue = watch('amount');
  const showSuccessModal = submissionState === 'success';
  const showErrorModal = submissionState === 'error';

  const handleSuccess = useCallback(() => {
    setSubmissionState('success');

    if (!isModal && onSuccess) {
      onSuccess();
    }
  }, [isModal, onSuccess]);

  const handleSuccessModalClose = useCallback(() => {
    setSubmissionState('idle');
    reset();

    if (isModal && onSuccess) {
      onSuccess();
    }
  }, [isModal, onSuccess, reset]);

  const handleError = (message: string) => {
    setErrorMessage(message);
    setSubmissionState('error');
  };

  const handleErrorModalClose = () => {
    setSubmissionState('idle');
    setErrorMessage('');
  };

  const validateSufficientFunds = useCallback(
    (formData: DepositFormValues): boolean => {
      const account = accountOptions.find(
        (acc) => acc.iban === formData.account,
      );
      const hasInsufficientFunds =
        account && Number(account.balance) < Number(formData.amount);

      if (hasInsufficientFunds) {
        handleError(t('confirmationModals.insufficientBalance'));
        return false;
      }
      return true;
    },
    [accountOptions, handleError],
  );

  const onDepositSubmit = handleSubmit(async (formData: DepositFormValues) => {
    if (!validateSufficientFunds(formData)) {
      return;
    }

    try {
      const payload = buildPayload(formData, accountOptions, depositId);
      const result = await createDeposit(payload);

      if (result.error) {
        handleError(t('confirmationModals.somethingWentWrong'));
        return;
      }

      handleSuccess();
    } catch (error) {
      handleError(t('confirmationModals.somethingWentWrong'));
    }
  });

  useEffect(() => {
    if (showErrorModal) {
      const timer = setTimeout(handleErrorModalClose, MODAL_DISPLAY_TIMEOUT);
      return () => clearTimeout(timer);
    }
  }, [showErrorModal, handleErrorModalClose]);

  return {
    form,
    onDepositSubmit,
    isSubmitDisabled,
    amountValue,
    errors,
    submissionState,
    showSuccessModal,
    showErrorModal,
    errorMessage,
    handleSuccessModalClose,
    handleErrorModalClose,
  };
};
