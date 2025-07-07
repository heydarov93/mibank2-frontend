import { Box } from '@mui/material';
import dayjs from 'dayjs';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import {
  StyledActionsWrapper,
  StyledContentContainer,
} from '../RegistrationForm.styled';

import {
  StyledBoxContainer,
  StyledFormContent,
  StyledFormTitle,
  StyledLabel,
} from './DocumentInfo.styled';

import { InputField, SecondaryButton, SubmitButton } from 'components/atoms';
import { DocumentDatePicker } from 'components/molecules';
import { VALIDATION_PATTERNS } from 'constants/validationPatternConstants';
import { FormStepProps, IDocumentInfo } from 'models/IRegistration';
import { checkAllowedKey } from 'utils/checkers';

export const DocumentInfo = ({ onBack }: FormStepProps) => {
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
  } = useFormContext<IDocumentInfo>();


  return (
    <StyledBoxContainer data-testid="document-info-title">
      <StyledFormTitle>
        {t('RegistrationPage.documentInfoTitle')}
      </StyledFormTitle>
      <StyledContentContainer>
        <StyledFormContent>
          <Box sx={{ width: '100%' }}>
            <StyledLabel htmlFor="documentNumber">
              {t('RegistrationPage.inputName.labelPassportNumber')}
            </StyledLabel>
            <InputField
              name="documentNumber"
              id="documentNumber"
              control={control}
              className={errors.documentNumber ? 'shake' : ''}
              error={errors.documentNumber}
              placeholder={t('RegistrationPage.placeholder.name')}
              onKeyDown={(e) => {
                if (checkAllowedKey(e, VALIDATION_PATTERNS.DOCUMENT_NUMBER)) {
                  e.preventDefault();
                }
              }}
            />
          </Box>
          <Box sx={{ width: '100%' }}>
            <StyledLabel htmlFor="issueDate">
              {t('RegistrationPage.inputName.labelPassportIssueDate')}
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
              {t('RegistrationPage.inputName.labelPassportExpirationDate')}
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
            isDisabled={!isValid}
            buttonContent={t('SignupPage.buttonLabelContinue')}
            fullWidth={false}
          />
        </StyledActionsWrapper>
      </StyledContentContainer>
    </StyledBoxContainer>
  );
};
