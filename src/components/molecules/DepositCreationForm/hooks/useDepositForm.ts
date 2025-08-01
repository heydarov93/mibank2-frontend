import { yupResolver } from '@hookform/resolvers/yup';
import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';

import { DepositPayload } from '../utils/buildDepositPayload';

import { MODAL_DISPLAY_TIMEOUT } from 'constants/ui/layout';
import { IAccountOption } from 'models/IAccount';
import { IOpenDepositFormData } from 'models/IDeposit';
import { TSubmissionState } from 'types/types';

interface UseDepositFormProps {
  validationSchema: yup.ObjectSchema<IOpenDepositFormData>;
  defaultValues?: Partial<IOpenDepositFormData>;
  onSuccess?: () => void;
  accountOptions: IAccountOption[];
  createDeposit: (payload: DepositPayload) => Promise<{
    data?: unknown;
    error?: unknown;
  }>;
  buildPayload: (
    formData: IOpenDepositFormData,
    accountOptions: IAccountOption[],
    depositId: number,
  ) => DepositPayload;
  depositId: number;
  isModal?: boolean;
}

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
    useState<TSubmissionState>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const form = useForm<IOpenDepositFormData>({
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
    (formData: IOpenDepositFormData): boolean => {
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

  const onDepositSubmit = handleSubmit(async (formData: IOpenDepositFormData) => {
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
