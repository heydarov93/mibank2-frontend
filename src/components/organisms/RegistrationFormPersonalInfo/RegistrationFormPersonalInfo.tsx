import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import {
  StyledFormTitle,
  StyledForm,
  StyledFormContent,
  StyledBoxContainer,
} from './RegistrationFormPersonalInfo.styled';

import { SubmitButton } from 'components/atoms';
import { BackArrow } from 'components/atoms/BackArrow/BackArrow';

export const RegistrationFormPersonalInfo = () => {
  const { t } = useTranslation('translation');
  const handleCleanField = () => {
    setIsFormDisabled(false);
  };

  const [isFormDisabled, setIsFormDisabled] = useState(true);

  return (
    <>
      <StyledBoxContainer>
        <BackArrow />
        <StyledFormTitle>{t('Registration.personalInfoTitle')}</StyledFormTitle>
        <StyledForm>
          <StyledFormContent></StyledFormContent>
          <SubmitButton
            isDisabled={isFormDisabled}
            onClick={handleCleanField}
            buttonContent={t('SignupPage.buttonLabelContinue')}
          ></SubmitButton>
        </StyledForm>
      </StyledBoxContainer>
    </>
  );
};
