import { FormProvider } from 'react-hook-form';

import { MiBankStepper } from '../MiBankStepper/MiBankStepper';
import { Address } from '../RegistrationForm/Address/Address';
import { DocumentInfoWrapper } from '../RegistrationForm/DocumentInfoWrapper/DocumentInfoWrapper';
import { LegalStatus } from '../RegistrationForm/LegalStatus/LegalStatus';
import { PersonalInfo } from '../RegistrationForm/PersonalInfo/PersonalInfo';

import { StyledBoxContainer } from './RegistrationFormWrapper.styled';

import { NavigationWarningModal } from 'components/atoms';
import { BackArrow } from 'components/atoms';
import { EStepper } from 'enums/EStepper';
import { useRegFormFlow } from 'hooks/useRegFormFlow';

export const RegistrationFormWrapper = () => {
  const {
    step,
    leaveModal,
    submitForm,
    handleConfirm,
    handleBack,
    formMethods,
  } = useRegFormFlow();

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
      />
      <MiBankStepper step={step} />
      <FormProvider {...formMethods}>
        <form onSubmit={submitForm}>{renderFormStep()}</form>
      </FormProvider>
    </StyledBoxContainer>
  );
};
