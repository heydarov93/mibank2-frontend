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
} from './LegalStatus.styled';

import { InputField, SubmitButton } from 'components/atoms';
import { ILegalStatus } from 'models/IRegistration';
import { validationLegalStatusSchema } from 'validation';

export const LegalStatus = () => {
  const [isFormDisabled, setIsFormDisabled] = useState(true);
  const { t } = useTranslation('translation');
  const handleCleanField = () => {
    setIsFormDisabled(false);
  };

  const {
    formState: { errors },
    control,
  } = useForm<ILegalStatus>({
    resolver: yupResolver(validationLegalStatusSchema),
    mode: 'onBlur',
    defaultValues: {
      peselNumber: undefined,
    },
  });

  return (
    <StyledBoxContainer>
      <StyledFormTitle>
        {t('RegistrationPage.legalStatusTitle')}
      </StyledFormTitle>
      <StyledForm>
        <StyledFormContent>
          <Box sx={{ width: '100%' }}>
            <StyledLabel htmlFor="pesel">
              {t('RegistrationPage.inputName.labelPeselNumber')}
            </StyledLabel>
            <InputField
              name="peselNumber"
              id="peselNumber"
              control={control}
              className={errors.peselNumber ? 'shake' : ''}
              error={errors.peselNumber}
              placeholder={t('RegistrationPage.placeholder.placeholderName')}
              maxLength={11}
            />
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
