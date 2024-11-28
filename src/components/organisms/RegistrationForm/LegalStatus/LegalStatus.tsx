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
} from './LegalStatus.styled';

import { InputField, SubmitButton, SecondaryButton } from 'components/atoms';
import { CountrySelectField } from 'components/molecules';
import { ALLOWED_KEYS } from 'constants/allowedKeys';
import { countries } from 'constants/countries';
import { EStepper } from 'enums/EStepper';
import { ILegalStatus } from 'models/IRegistration';
import { setLegalStatusData } from 'store/reducers/RegistrationSlice';
import { setEU, setStep } from 'store/reducers/StepperSlice';
import { validationLegalStatusSchema } from 'validation';

export const LegalStatus = () => {
  const { t } = useTranslation('translation');
  const dispatch = useDispatch();
  const checkEUStatus = (countryLabel: string) => {
    return countries.some(
      (country) => country.label === countryLabel && country.isInEurope,
    );
  };
  const {
    formState: { errors, isValid },
    control,
    handleSubmit,
    getValues,
  } = useForm<ILegalStatus>({
    resolver: yupResolver(validationLegalStatusSchema),
    mode: 'all',
    defaultValues: {
      citizenship: '',
      taxResidenceCountry: '',
      peselNumber: '',
    },
  });
  const onPreviousForm = () => {
    dispatch(setStep(EStepper.PERSONAL_INFO));
  };
  const onSubmit = (data: ILegalStatus) => {
    dispatch(setEU(checkEUStatus(getValues('citizenship'))));
    dispatch(setLegalStatusData(data));
    dispatch(setStep(2));
  };

  const isValidForm = isValid;

  return (
    <StyledBoxContainer>
      <StyledFormTitle>
        {t('RegistrationPage.legalStatusTitle')}
      </StyledFormTitle>
      <StyledForm>
        <StyledFormContent>
          <Box sx={{ width: '100%' }}>
            <StyledLabel htmlFor="pesel">
              {t('RegistrationPage.inputName.labelCitizenship')}
            </StyledLabel>
            <CountrySelectField
              name="citizenship"
              control={control}
              error={errors.citizenship}
              className={errors.citizenship ? 'shake' : ''}
              onKeyDown={(e) => {
                if (
                  !/^[a-zA-Z]+$/.test(e.key) &&
                  !ALLOWED_KEYS.includes(e.key)
                ) {
                  e.preventDefault();
                }
              }}
            />
          </Box>
          <Box sx={{ width: '100%' }}>
            <StyledLabel htmlFor="pesel">
              {t('RegistrationPage.inputName.labelTaxResidenceCountry')}
            </StyledLabel>
            <CountrySelectField
              name="taxResidenceCountry"
              control={control}
              error={errors?.taxResidenceCountry}
              className={errors.taxResidenceCountry ? 'shake' : ''}
              onKeyDown={(e) => {
                if (
                  !/^[a-zA-Z]+$/.test(e.key) &&
                  !ALLOWED_KEYS.includes(e.key)
                ) {
                  e.preventDefault();
                }
              }}
            />
          </Box>
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
              placeholder={t('RegistrationPage.placeholder.name')}
              maxLength={11}
              onKeyDown={(e) => {
                if (!/^\d$/.test(e.key) && !ALLOWED_KEYS.includes(e.key)) {
                  e.preventDefault();
                }
              }}
            />
          </Box>
        </StyledFormContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <SecondaryButton
            onClick={onPreviousForm}
            buttonContent={t('RegistrationPage.buttonBackArrow')}
          />
          <SubmitButton
            isDisabled={!isValidForm}
            onClick={handleSubmit(onSubmit)}
            buttonContent={t('SignupPage.buttonLabelContinue')}
          />
        </Box>
      </StyledForm>
    </StyledBoxContainer>
  );
};
