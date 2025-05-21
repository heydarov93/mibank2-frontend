import { Box } from '@mui/material';
import dayjs from 'dayjs';
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
} from './EUDocumentInfo.styled';

import { InputField, SubmitButton, SecondaryButton } from 'components/atoms';
import { DocumentDatePicker } from 'components/molecules';
import { ALLOWED_KEYS } from 'constants/allowedKeys';
import { FormStepProps, IEUDocumentInfo } from 'models/IRegistration';

export const EUDocumentInfo = ({ onBack }: FormStepProps) => {
  const { t } = useTranslation('translation');

  const dateLimitation = {
    minDateExpiration: dayjs().add(1, 'year'),
    maxDateExpiration: dayjs().add(20, 'year'),
    minDateIssue: dayjs().subtract(1, 'day'),
    maxDateIssue: dayjs().subtract(20, 'years'),
  };

  const {
    formState: { errors, isValid },
    control,
  } = useFormContext<IEUDocumentInfo>();

  const idCardRegExp = /^[A-Z0-9]+$/;

  return (
    <StyledBoxContainer>
      <StyledFormTitle>
        {t('RegistrationPage.documentInfoTitle')}
      </StyledFormTitle>
      <StyledContentContainer>
        <StyledFormContent>
          <Box sx={{ width: '100%' }}>
            <StyledLabel htmlFor="passportNumber">
              {t('RegistrationPage.inputName.labelIDCardNumber')}
            </StyledLabel>
            <InputField
              name="documentNumber"
              id="documentNumber"
              control={control}
              className={errors.documentNumber ? 'shake' : ''}
              error={errors.documentNumber}
              onKeyDown={(e) => {
                if (
                  !idCardRegExp.test(e.key) &&
                  !ALLOWED_KEYS.includes(e.key)
                ) {
                  e.preventDefault();
                }
              }}
              placeholder={t('RegistrationPage.placeholder.name')}
            />
          </Box>
          <Box sx={{ width: '100%' }}>
            <StyledLabel htmlFor="issueDate">
              {t('RegistrationPage.inputName.labelIssueDate')}
            </StyledLabel>
            <DocumentDatePicker
              name="issueDate"
              id="issueDate"
              control={control}
              errors={errors}
              maxDate={dateLimitation.minDateIssue}
              minDate={dateLimitation.maxDateIssue}
              placeholder="RegistrationPage.placeholder.dateOfBirth"
            />
          </Box>
          <Box sx={{ width: '100%' }}>
            <StyledLabel htmlFor="expirationDate">
              {t('RegistrationPage.inputName.labelExpirationDate')}
            </StyledLabel>
            <DocumentDatePicker
              name="expirationDate"
              id="expirationDate"
              control={control}
              errors={errors}
              maxDate={dateLimitation.maxDateExpiration}
              minDate={dateLimitation.minDateExpiration}
              placeholder="RegistrationPage.placeholder.dateOfBirth"
            />
          </Box>
        </StyledFormContent>
        <StyledActionsWrapper>
          <SecondaryButton
            onClick={onBack}
            buttonContent={t('RegistrationPage.buttonBackArrow')}
          />
          <SubmitButton
            fullWidth={false}
            isDisabled={!isValid}
            buttonContent={t('SignupPage.buttonLabelContinue')}
          />
        </StyledActionsWrapper>
      </StyledContentContainer>
    </StyledBoxContainer>
  );
};
