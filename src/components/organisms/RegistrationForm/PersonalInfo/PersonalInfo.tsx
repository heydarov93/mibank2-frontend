import { yupResolver } from '@hookform/resolvers/yup';
import { Box } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

import {
  StyledFormTitle,
  StyledForm,
  StyledFormContent,
  StyledBoxContainer,
  StyledLabel,
} from './PersonalInfo.styled';

import { SubmitButton } from 'components/atoms';
import { InputField } from 'components/atoms';
import { DateOfBirthField, PhoneNumberField } from 'components/molecules';
import { EStepper } from 'enums/EStepper';
import { IPersonalInfo } from 'models/IRegistration';
import { setPersonalInfoData } from 'store/reducers/RegistrationSlice';
import { setStep } from 'store/reducers/StepperSlice';
import { validationRegistrationSchema } from 'validation';

export const PersonalInfo = () => {
  const { t } = useTranslation('translation');
  const dispatch = useDispatch();

  const {
    formState: { errors, isValid, touchedFields },
    control,
    handleSubmit,
  } = useForm<IPersonalInfo>({
    resolver: yupResolver(validationRegistrationSchema),
    mode: 'onBlur',
    defaultValues: {
      name: '',
      surname: '',
      dateOfBirth: '',
      phoneNumber: 0,
    },
  });

  const onSubmit = (data: IPersonalInfo) => {
    dispatch(setPersonalInfoData(data));
    dispatch(setStep(EStepper.LEGAL_STATUS));
  };

  const isValidForm = isValid && Object.keys(touchedFields).length > 2;

  return (
    <StyledBoxContainer>
      <StyledFormTitle>
        {t('RegistrationPage.personalInfoTitle')}
      </StyledFormTitle>
      <StyledForm onSubmit={handleSubmit(onSubmit)}>
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
            <StyledLabel htmlFor="phone">{'Phone number'}</StyledLabel>
            <PhoneNumberField
              className={errors.phoneNumber ? 'shake' : ''}
              control={control}
              name="phoneNumber"
              errors={errors}
            />
          </Box>
        </StyledFormContent>
        <SubmitButton
          onClick={handleSubmit(onSubmit)}
          isDisabled={!isValidForm}
          buttonContent={t('SignupPage.buttonLabelContinue')}
        ></SubmitButton>
      </StyledForm>
    </StyledBoxContainer>
  );
};
