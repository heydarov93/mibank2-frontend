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
} from './RegistrationFormPersonalInfo.styled';

import { SubmitButton } from 'components/atoms';
import { InputField } from 'components/atoms';
import { BackArrow } from 'components/atoms/BackArrow/BackArrow';
import { PhoneNumberField } from 'components/molecules';
import { IPersonalInfo } from 'models/IRegistration';
import { validationRegistrationSchema } from 'validation';

export const RegistrationFormPersonalInfo = () => {
  const { t } = useTranslation('translation');

  const {
    formState: { errors },
    control,
  } = useForm<IPersonalInfo>({
    resolver: yupResolver(validationRegistrationSchema),
    mode: 'onBlur',
    defaultValues: {
      name: '',
      surname: '',
      phoneNumber: 0,
    },
  });

  const handleCleanField = () => {
    setIsFormDisabled(false);
  };

  const [isFormDisabled, setIsFormDisabled] = useState(true);

  return (
    <>
      <StyledBoxContainer>
        <BackArrow />
        <StyledFormTitle>
          {t('RegistrationPage.personalInfoTitle')}
        </StyledFormTitle>
        <StyledForm>
          <StyledFormContent>
            <Box sx={{ width: '100%' }}>
              <StyledLabel htmlFor="name">
                {t('RegistrationPage.inputName.labelName')}
              </StyledLabel>
              <InputField
                name="name"
                id="name"
                control={control}
                className={errors.name ? 'shake' : ''}
                error={errors.name}
                placeholder={t('RegistrationPage.placeholder.placeholderName')}
              />
            </Box>
            <Box sx={{ width: '100%' }}>
              <StyledLabel htmlFor="surname">
                {t('RegistrationPage.inputName.labelSurname')}
              </StyledLabel>
              <InputField
                name="surname"
                id="surname"
                control={control}
                className={errors.surname ? 'shake' : ''}
                error={errors.surname}
                placeholder={t('RegistrationPage.placeholder.placeholderName')}
              />
            </Box>

            <Box sx={{ width: '100%' }}>
              <Box sx={{ display: 'flex' }}>
                <StyledLabel htmlFor="phone">{'Phone number'}</StyledLabel>
              </Box>
              <PhoneNumberField
                className={errors.phoneNumber ? 'shake' : ''}
                control={control}
                name="phoneNumber"
                errors={errors}
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
    </>
  );
};
