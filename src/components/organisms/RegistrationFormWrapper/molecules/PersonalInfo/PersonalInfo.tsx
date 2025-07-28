import Box from '@mui/material/Box';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { PhoneInputProps } from 'react-phone-input-2';

import { StyledContentContainer } from '../../RegistrationFormWrapper.styled';

import {
  StyledBoxContainer,
  StyledFormContent,
  StyledFormTitle,
  StyledLabel,
} from './PersonalInfo.styled';

import { InputField, SubmitButton } from 'components/atoms';
import { DateOfBirthField, PhoneNumberField } from 'components/molecules';
import { IPersonalInfo } from 'models/IRegistration';

export const PersonalInfo = () => {
  const { t } = useTranslation('translation');

  const {
    formState: { errors, isValid },
    control,
    setValue,
  } = useFormContext<IPersonalInfo>();

  const updatePhoneCode: PhoneInputProps['onChange'] = (value, data) => {
    if ('dialCode' in data) {
      setValue('phoneCode', data.dialCode);
    }
  };

  return (
    <StyledBoxContainer>
      <StyledFormTitle>
        {t('RegistrationPage.personalInfoTitle')}
      </StyledFormTitle>
      <StyledContentContainer>
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
              placeholder={t('RegistrationPage.placeholder.name')}
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
              placeholder={t('RegistrationPage.placeholder.name')}
            />
          </Box>
          <Box sx={{ width: '100%' }}>
            <StyledLabel htmlFor="dateOfBirth">
              {t('RegistrationPage.inputName.labelDateOfBirth')}
            </StyledLabel>
            <DateOfBirthField
              name="dateOfBirth"
              control={control}
              errors={errors}
              className={errors.dateOfBirth ? 'shake' : ''}
            />
          </Box>
          <Box sx={{ width: '100%' }}>
            <StyledLabel htmlFor="phone">
              {t('RegistrationPage.phoneNumber.label')}
            </StyledLabel>
            <PhoneNumberField
              className={errors.phoneNumber ? 'shake' : ''}
              control={control}
              name="phoneNumber"
              errors={errors}
              onChange={updatePhoneCode}
            />
          </Box>
        </StyledFormContent>
        <SubmitButton
          isDisabled={!isValid}
          buttonContent={t('SignupPage.buttonLabelContinue')}
          sx={{ mt: '21px' }}
        />
      </StyledContentContainer>
    </StyledBoxContainer>
  );
};
