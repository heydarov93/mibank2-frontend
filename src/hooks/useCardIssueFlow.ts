import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { CardIssueFormValues, IssueCardModalProps } from 'components/organisms';
import { ECardIssueStepper } from 'enums/ECardIssueStepper';
import useDisclosure from 'hooks/useDisclosure';
import { IssuanceCardData } from 'models/IProductInfo';

interface UseIssueFlowOptions {
  onClose: IssueCardModalProps['onClose'];
  defaultValues: CardIssueFormValues;
}

export const useCardIssueFlow = ({
  onClose,
  defaultValues,
}: UseIssueFlowOptions) => {
  const formMethods = useForm({ defaultValues });
  const { reset, watch } = formMethods;
  const [selectedCard, setSelectedCard] = useState<IssuanceCardData | null>(
    null,
  );
  const [step, setStep] = useState<ECardIssueStepper>(
    ECardIssueStepper.DATA_SELECTION,
  );
  const confirmationModal = useDisclosure();

  useEffect(() => {
    const { unsubscribe } = watch((formFields) => {
      const isAllDataFilled = Object.entries(formFields).every(
        ([key, value]) => key === 'paymentAccount' || Boolean(value),
      );

      if (isAllDataFilled && step === ECardIssueStepper.DATA_SELECTION) {
        setStep(ECardIssueStepper.CARD_SELECTION);
      }
    });

    return () => unsubscribe();
  }, [watch, step]);

  function handleClose() {
    onClose();
    confirmationModal.close();
    setTimeout(() => {
      reset();
      setSelectedCard(null);
      setStep(ECardIssueStepper.DATA_SELECTION);
    }, 300);
  }

  function handleSelectCard(cardData: IssuanceCardData) {
    setSelectedCard(cardData);
    setStep(ECardIssueStepper.CARD_SELECTED);
  }

  function handleBack() {
    setStep(ECardIssueStepper.CARD_SELECTED);
  }

  function handleStepUpdate(step: ECardIssueStepper) {
    return () => setStep(step);
  }

  return {
    formMethods,
    selectedCard,
    step,
    confirmationModal,
    handleSelectCard,
    handleClose,
    handleBack,
    handleStepUpdate,
  };
};
