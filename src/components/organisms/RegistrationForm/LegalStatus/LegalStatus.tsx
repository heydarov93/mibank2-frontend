import { Box } from '@mui/material';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import {
  StyledActionsWrapper,
  StyledContentContainer,
} from '../RegistrationForm.styled';

import {
  StyledFormTitle,
  StyledFormContent,
  StyledBoxContainer,
  StyledLabel,
} from './LegalStatus.styled';

import { InputField, SubmitButton, SecondaryButton } from 'components/atoms';
import { CountrySelectField } from 'components/molecules';
import { ALLOWED_KEYS } from 'constants/allowedKeys';
import { FormStepProps, ILegalStatus } from 'models/IRegistration';

export const LegalStatus = ({ onBack }: FormStepProps) => {
  const { t } = useTranslation('translation');
  const {
    formState: { errors, isValid },
    control,
  } = useFormContext<ILegalStatus>();

  return (
    <StyledBoxContainer>
      <StyledFormTitle>
        {t('RegistrationPage.legalStatusTitle')}
      </StyledFormTitle>
      <StyledContentContainer>
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
        <StyledActionsWrapper>
          <SecondaryButton
            onClick={onBack}
            buttonContent={t('RegistrationPage.buttonBackArrow')}
          />
          <SubmitButton
            isDisabled={!isValid}
            buttonContent={t('SignupPage.buttonLabelContinue')}
            fullWidth={false}
          />
        </StyledActionsWrapper>
      </StyledContentContainer>
    </StyledBoxContainer>
  );
};
