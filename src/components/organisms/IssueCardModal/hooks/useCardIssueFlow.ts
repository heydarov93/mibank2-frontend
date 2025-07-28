import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { useLazySearchCardsQuery } from 'api/services/card-service/cards.api';
import { IssueCardModalProps } from 'components/organisms';
import { MODAL_DISPLAY_TIMEOUT } from 'constants/ui/layout';
import { ECardIssueStepper } from 'enums/ECardIssueStepper';
import useDisclosure from 'hooks/useDisclosure';
import {
  ECardIssuer,
  ECardIssueType,
  ECardType,
  IssuanceCardData,
} from 'models/IProductInfo';

interface UseIssueFlowOptions {
  onClose: IssueCardModalProps['onClose'];
}

const defaultValues = {
  issuanceAccount: '',
  paymentAccount: '',
  currency: '',
  cardType: '',
  issueType: '',
  cardIssuer: '',
  selectedFeatures: [],
};

export type CardIssueFormValues = typeof defaultValues;

export const useCardIssueFlow = ({ onClose }: UseIssueFlowOptions) => {
  const formMethods = useForm({ defaultValues });
  const { reset, watch } = formMethods;
  const [selectedCard, setSelectedCard] = useState<IssuanceCardData | null>(
    null,
  );
  const [step, setStep] = useState<ECardIssueStepper>(
    ECardIssueStepper.DATA_SELECTION,
  );
  const confirmationModal = useDisclosure();
  const [getCardsQuery, { data: cardsData, isFetching: isLoadingCards }] =
    useLazySearchCardsQuery();
  const cards = cardsData?.data ?? [];
  const isConfirmationStep = step === ECardIssueStepper.CONFIRMATION;

  useEffect(() => {
    const { unsubscribe } = watch((formFields) => {
      const isAllDataFilled = Object.entries(formFields).every(
        ([key, value]) => key === 'paymentAccount' || Boolean(value),
      );

      if (isAllDataFilled) {
        if (!isConfirmationStep) {
          getCards(formFields as CardIssueFormValues);
        }

        if (step === ECardIssueStepper.DATA_SELECTION) {
          setStep(ECardIssueStepper.CARD_SELECTION);
        }
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
    }, MODAL_DISPLAY_TIMEOUT);
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

  async function getCards({
    cardType,
    cardIssuer,
    issueType,
    currency,
  }: CardIssueFormValues) {
    getCardsQuery({
      cardType: cardType as ECardType,
      cardIssuer: cardIssuer as ECardIssuer,
      issueType: issueType as ECardIssueType,
      cardCurrency: currency,
    }).then(() => {
      setSelectedCard(null);
      setStep(ECardIssueStepper.CARD_SELECTION);
    });
  }

  return {
    formMethods,
    selectedCard,
    step,
    confirmationModal,
    cards,
    isLoadingCards,
    isConfirmationStep,
    handleSelectCard,
    handleClose,
    handleBack,
    handleStepUpdate,
  };
};
