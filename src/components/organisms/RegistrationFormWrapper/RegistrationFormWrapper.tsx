import { useSelector } from 'react-redux';

import { MiBankStepper } from '../MiBankStepper/MiBankStepper';
import { Address } from '../RegistrationForm/Address/Address';
import { DocumentInfo } from '../RegistrationForm/DocumentInfo/DocumentInfo';
import { LegalStatus } from '../RegistrationForm/LegalStatus/LegalStatus';
import { PersonalInfo } from '../RegistrationForm/PersonalInfo/PersonalInfo';

import { StyledBoxContainer } from './RegistrationFormWrapper.styled';

import { BackArrow } from 'components/atoms/BackArrow/BackArrow';
import { EStepper } from 'enums/EStepper';
import { getStep } from 'store/selectors/StepperSelectors';

export const RegistrationFormWrapper = () => {
  const step = useSelector(getStep);

  const renderFormStep = () => {
    switch (step) {
      case EStepper.PERSONAL_INFO:
        return <PersonalInfo />;
      case EStepper.LEGAL_STATUS:
        return <LegalStatus />;
      case EStepper.DOCUMENT_INFO:
        return <DocumentInfo />;
      case EStepper.ADDRESS:
        return <Address />;
      default:
        return <PersonalInfo />;
    }
  };

  return (
    <StyledBoxContainer>
      <BackArrow />
      <MiBankStepper />
      {renderFormStep()}
    </StyledBoxContainer>
  );
};
