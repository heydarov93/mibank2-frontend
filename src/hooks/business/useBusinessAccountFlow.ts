import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';

import { OpenBusinessAccountModalProps } from 'components/organisms';
import { STEP_RESET_TIMEOUT } from 'constants/ui/layout';
import { EOpenBusinessAccStepper } from 'enums/EOpenBusinessAccStepper';
import { useDisclosure } from 'hooks';
import {
  businessAccountOptionsSchema,
  openBusinessAccountSchema,
  TOpenBusinessAccountValues,
} from 'validation';

const defaultValues = {
  currency: '',
  cardIssuer: '',
  issueType: '',
  addressConfirmed: false,
  termsAccepted: false,
};

export type OpenBusinessAccountFormValues = typeof defaultValues;

export const useBusinessAccountFlow = ({
  onClose,
}: {
  onClose: OpenBusinessAccountModalProps['onClose'];
}) => {
  const formMethods = useForm<TOpenBusinessAccountValues>({
    resolver: yupResolver(openBusinessAccountSchema),
    defaultValues,
  });
  const { reset, control } = formMethods;
  const confirmationModal = useDisclosure();
  const [step, setStep] = useState(EOpenBusinessAccStepper.DATA_SELECTION);
  const watchedFields = useWatch({
    control,
    name: ['currency', 'cardIssuer', 'issueType'],
  });

  useEffect(() => {
    const checkValidity = async () => {
      const [currency, cardIssuer, issueType] = watchedFields;

      const isAllDataFilled = await businessAccountOptionsSchema.isValid({
        currency,
        cardIssuer,
        issueType,
      });

      if (isAllDataFilled && step === EOpenBusinessAccStepper.DATA_SELECTION) {
        setStep(EOpenBusinessAccStepper.DATA_FILLED);
      }
    };

    checkValidity();
  }, [...watchedFields, step]);

  function handleClose() {
    onClose();
    confirmationModal.close();
    setTimeout(() => {
      reset();
      setStep(EOpenBusinessAccStepper.DATA_SELECTION);
    }, STEP_RESET_TIMEOUT);
  }

  function handleEdit() {
    setStep(EOpenBusinessAccStepper.EDIT_ADDRESS);
  }

  function handleBack() {
    setStep(EOpenBusinessAccStepper.DATA_FILLED);
  }

  return {
    step,
    formMethods,
    confirmationModal,
    handleEdit,
    handleClose,
    handleBack,
  };
};
