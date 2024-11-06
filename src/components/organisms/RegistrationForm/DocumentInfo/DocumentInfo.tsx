import { yupResolver } from '@hookform/resolvers/yup';
import { Box } from '@mui/material';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import {
  StyledFormTitle,
  StyledForm,
  StyledFormContent,
  StyledBoxContainer,
  StyledLabel,
} from './DocumentInfo.styled';

import { InputField, SubmitButton } from 'components/atoms';
import {
  PassportExpirationDate,
  PassportIssueDate,
} from 'components/molecules';
import { IDocumentInfo } from 'models/IRegistration';
import { validationDocumentInfoSchema } from 'validation';

export const DocumentInfo = () => {
  const [isFormDisabled, setIsFormDisabled] = useState(true);
  const { t } = useTranslation('translation');
  const handleCleanField = () => {
    setIsFormDisabled(false);
  };

  const {
    formState: { errors },
    control,
  } = useForm<IDocumentInfo>({
    resolver: yupResolver(validationDocumentInfoSchema),
    mode: 'onBlur',
    defaultValues: {
      passportNumber: '',
    },
  });

  return (
    <StyledBoxContainer>
      <StyledFormTitle>
        {t('RegistrationPage.documentInfoTitle')}
      </StyledFormTitle>
      <StyledForm>
        <StyledFormContent>
          <Box sx={{ width: '100%' }}>
            <StyledLabel htmlFor="passportIssueDate">
              {t('RegistrationPage.inputName.labelPassportNumber')}
            </StyledLabel>
            <InputField
              name="passportNumber"
              id="passportNumber"
              control={control}
              className={errors.passportNumber ? 'shake' : ''}
              error={errors.passportNumber}
              placeholder={t('RegistrationPage.placeholder.placeholderName')}
            />
          </Box>
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
