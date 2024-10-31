// import { yupResolver } from '@hookform/resolvers/yup';
import { Box } from '@mui/material';
import { useState } from 'react';
// import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import {
  StyledFormTitle,
  StyledForm,
  StyledFormContent,
  StyledBoxContainer,
  StyledLabel,
} from './DocumentInfo.styled';

import { SubmitButton } from 'components/atoms';
import {
  PassportExpirationDate,
  PassportIssueDate,
} from 'components/molecules';
// TODO: this import will need to use with form state
// import { IPersonalInfo } from 'models/IRegistration';
// import { validationRegistrationSchema } from 'validation';

export const DocumentInfo = () => {
  const [isFormDisabled, setIsFormDisabled] = useState(true);
  const { t } = useTranslation('translation');
  const handleCleanField = () => {
    setIsFormDisabled(false);
  };

  //TODO: when redux store will be ready, finish formState
  // const {
  //   formState: { errors },
  //   control,
  // } = useForm<IPersonalInfo>({
  //   resolver: yupResolver(validationRegistrationSchema),
  //   mode: 'onBlur',
  //   defaultValues: {
  //     name: '',
  //     surname: '',
  //     phoneNumber: 0,
  //   },
  // });

  return (
    <StyledBoxContainer>
      <StyledFormTitle>
        {t('RegistrationPage.documentInfoTitle')}
      </StyledFormTitle>
      <StyledForm>
        <StyledFormContent>
          <Box sx={{ width: '100%' }}>
            <StyledLabel htmlFor="passportIssueDate">
              {t('RegistrationPage.inputName.labelPassportIssueDate')}
            </StyledLabel>
            <PassportIssueDate />
          </Box>
          <Box sx={{ width: '100%' }}>
            <StyledLabel htmlFor="passportExpirationDate">
              {t('RegistrationPage.inputName.labelPassportExpirationDate')}
            </StyledLabel>
            <PassportExpirationDate />
          </Box>
        </StyledFormContent>
        <SubmitButton
          isDisabled={isFormDisabled}
          onClick={handleCleanField}
          buttonContent={t('SignupPage.buttonLabelContinue')}
        ></SubmitButton>
      </StyledForm>
    </StyledBoxContainer>
  );
};
