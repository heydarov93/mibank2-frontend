import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';

import { DepositPayload } from '../utils/buildDepositPayload';

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
}: UseDepositFormProps) => {
  const { t } = useTranslation('translation', { keyPrefix: 'LearnMorePage' });
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);
  const [showErrorModal, setShowErrorModal] = useState<boolean>(false);
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

  const onDepositSubmit = handleSubmit(async (formData: DepositFormValues) => {
    try {
      const account = accountOptions.find(
        (acc) => acc.iban === formData.account,
      );

      const isInsufficientFunds =
        account && Number(account.balance) < Number(formData.amount);

      if (isInsufficientFunds) {
        setErrorMessage(t('confirmationModals.insufficientBalance'));
        setShowErrorModal(true);
        return;
      }

      const payload = buildPayload(formData, accountOptions, depositId);
      await createDeposit(payload);
      reset();
      setShowSuccessModal(true);
      onSuccess?.();
    } catch (error) {
      setErrorMessage(t('confirmationModals.somethingWentWrong'));
      setShowErrorModal(true);
    }
  });

  useEffect(() => {
    if (showErrorModal) {
      const timer = setTimeout(() => {
        setShowErrorModal(false);
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, [showErrorModal]);

  return {
    form,
    onDepositSubmit,
    isSubmitDisabled,
    amountValue,
    errors,
    showSuccessModal,
    setShowSuccessModal,
    showErrorModal,
    setShowErrorModal,
    errorMessage,
  };
};
