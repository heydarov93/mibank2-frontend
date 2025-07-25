import Box from '@mui/material/Box';
import dayjs from 'dayjs';
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
} from './EUDocumentInfo.styled';

import { InputField, SecondaryButton, SubmitButton } from 'components/atoms';
import { DocumentDatePicker } from 'components/molecules';
import { VALIDATION_PATTERNS } from 'constants/validation/patterns';
import { FormStepProps, IEUDocumentInfo } from 'models/IRegistration';
import { checkAllowedKey } from 'utils/checkers';

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
                if (checkAllowedKey(e, VALIDATION_PATTERNS.DOCUMENT_NUMBER)) {
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
