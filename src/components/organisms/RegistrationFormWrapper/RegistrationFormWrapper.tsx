import { AutoQCStepper } from '../AutoQCStepper/AutoQCStepper';
import { DocumentInfo } from '../RegistrationForm/DocumentInfo/DocumentInfo';
// TODO: after redux store will be ready, need to create routing between forms
// import { PersonalInfo } from '../RegistrationForm/PersonalInfo/PersonalInfo';

import { StyledBoxContainer } from './RegistrationFormWrapper.styled';

import { BackArrow } from 'components/atoms/BackArrow/BackArrow';

export const RegistrationFormWrapper = () => {
  return (
    <StyledBoxContainer>
      <BackArrow />
      <AutoQCStepper />
      {/* <PersonalInfo /> */}
      <DocumentInfo />
    </StyledBoxContainer>
  );
};
