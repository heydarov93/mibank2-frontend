import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';

import useDisclosure from './useDisclosure';

import { OpenBusinessAccountModalProps } from 'components/organisms';
import { STEP_RESET_TIMEOUT } from 'constants/ui/layout';
import { EOpenBusinessAccStepper } from 'enums/EOpenBusinessAccStepper';
import {
  businessAccountOptionsSchema,
  openBusinessAccountSchema,
  TOpenBusinessAccountValues,
} from 'validation';

interface UseBusinessAccFlowOptions {
  onClose: OpenBusinessAccountModalProps['onClose'];
}

const defaultValues = {
  currency: '',
  cardIssuer: '',
  issueType: '',
  addressConfirmed: false,
  termsAccepted: false,
};

export type OpenBusinessAccFormValues = typeof defaultValues;

export const useBusinessAccFlow = ({ onClose }: UseBusinessAccFlowOptions) => {
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
