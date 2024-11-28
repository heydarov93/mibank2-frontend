import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { MiBankStepper } from '../MiBankStepper/MiBankStepper';
import { Address } from '../RegistrationForm/Address/Address';
import { DocumentInfoWrapper } from '../RegistrationForm/DocumentInfoWrapper/DocumentInfoWrapper';
import { LegalStatus } from '../RegistrationForm/LegalStatus/LegalStatus';
import { PersonalInfo } from '../RegistrationForm/PersonalInfo/PersonalInfo';

import { StyledBoxContainer } from './RegistrationFormWrapper.styled';

import { NavigationWarningModal } from 'components/atoms';
import { BackArrow } from 'components/atoms';
import { EStepper } from 'enums/EStepper';
import { getStep } from 'store/selectors/StepperSelectors';

export const RegistrationFormWrapper = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  const step = useSelector(getStep);
  const navigate = useNavigate();

  const handleBackClick = () => {
    setModalOpen(true);
  };

  const handleConfirm = () => {
    setModalOpen(false);
    navigate('/signin');
  };

  const handleCancel = () => {
    setModalOpen(false);
  };

  const renderFormStep = () => {
    switch (step) {
      case EStepper.PERSONAL_INFO:
        return <PersonalInfo />;
      case EStepper.LEGAL_STATUS:
        return <LegalStatus />;
      case EStepper.DOCUMENT_INFO:
        return <DocumentInfoWrapper />;
      case EStepper.ADDRESS:
        return <Address />;
      default:
        return <PersonalInfo />;
    }
  };

  return (
    <StyledBoxContainer>
      <BackArrow onBackClick={handleBackClick} />
      <NavigationWarningModal
        open={isModalOpen}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
      <MiBankStepper />
      {renderFormStep()}
    </StyledBoxContainer>
  );
};
