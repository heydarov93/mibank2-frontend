import { FormProvider } from 'react-hook-form';

import { NavigationWarningModal } from '../NavigationWarningModal/NavigationWarningModal';
import { ProgressStepper } from '../ProgressStepper/ProgressStepper';

import { StyledBoxContainer } from './RegistrationFormWrapper.styled';
import {
  Address,
  DocumentInfoWrapper,
  LegalStatus,
  PersonalInfo,
} from './molecules';

import { BackArrow } from 'components/atoms';
import { EStepper } from 'enums/EStepper';
import { useRegistrationStepper } from 'hooks';

const steps = [1, 2, 3, 4];
export const RegistrationFormWrapper = () => {
  const {
    step,
    leaveModal,
    submitForm,
    handleConfirm,
    handleBack,
    formMethods,
  } = useRegistrationStepper();

  const renderFormStep = () => {
    switch (step) {
      case EStepper.PERSONAL_INFO:
        return <PersonalInfo />;
      case EStepper.LEGAL_STATUS:
        return <LegalStatus onBack={handleBack} />;
      case EStepper.DOCUMENT_INFO:
        return <DocumentInfoWrapper onBack={handleBack} />;
      case EStepper.ADDRESS:
        return <Address onBack={handleBack} />;
      default:
        return <PersonalInfo />;
    }
  };

  return (
    <StyledBoxContainer>
      <BackArrow onBackClick={leaveModal.open} />
      <NavigationWarningModal
        open={leaveModal.isOpen}
        onConfirm={handleConfirm}
        onCancel={leaveModal.close}
        testId="warning-modal"
      />
      <ProgressStepper steps={steps} activeStep={step} />
      <FormProvider {...formMethods}>
        <form onSubmit={submitForm} data-testid="registration-form">
          {renderFormStep()}
        </form>
      </FormProvider>
    </StyledBoxContainer>
  );
};
