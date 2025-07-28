import Box from '@mui/material/Box';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import {
  StyledActionsWrapper,
  StyledContentContainer,
} from '../../RegistrationFormWrapper.styled';

import {
  StyledBoxContainer,
  StyledFormContent,
  StyledFormTitle,
  StyledLabel,
} from './LegalStatus.styled';

import { InputField, SecondaryButton, SubmitButton } from 'components/atoms';
import { CountrySelectField } from 'components/molecules';
import { VALIDATION_PATTERNS } from 'constants/validation/patterns';
import { FormStepProps, ILegalStatus } from 'models/IRegistration';
import { checkAllowedKey } from 'utils/checkers';

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
                  checkAllowedKey(e, VALIDATION_PATTERNS.LEGAL_STATUS_INPUT)
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
                  checkAllowedKey(e, VALIDATION_PATTERNS.LEGAL_STATUS_INPUT)
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
                if (checkAllowedKey(e, VALIDATION_PATTERNS.DIGITS_ONLY)) {
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
