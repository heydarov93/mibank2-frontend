import { yupResolver } from '@hookform/resolvers/yup';
import { Box } from '@mui/material';
import dayjs from 'dayjs';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import {
  StyledFormTitle,
  StyledForm,
  StyledFormContent,
  StyledBoxContainer,
  StyledLabel,
} from './DocumentInfo.styled';

import { InputField, SubmitButton, SecondaryButton } from 'components/atoms';
import { DocumentDatePicker } from 'components/molecules';
import { ALLOWED_KEYS } from 'constants/allowedKeys';
import { EStepper } from 'enums/EStepper';
import { IDocumentInfo } from 'models/IRegistration';
import { RootState } from 'store';
import { setDocumentInfoData } from 'store/reducers/RegistrationSlice';
import { setStep } from 'store/reducers/StepperSlice';
import { validationDocumentInfoSchema } from 'validation';

export const DocumentInfo = () => {
  const { t } = useTranslation('translation');
  const dispatch = useDispatch();
  const documentInfo: IDocumentInfo = useSelector((state: RootState) => state.registration.documentInfo as IDocumentInfo);
  const dateLimitation = {
    minDateExpiration: dayjs().add(1, 'year'),
    maxDateExpiration: dayjs().add(20, 'year'),
    minDateIssue: dayjs().subtract(1, 'day'),
    maxDateIssue: dayjs().subtract(20, 'years'),
  };

  const {
    formState: { errors, isValid },
    control,
    handleSubmit,
    reset,
  } = useForm<IDocumentInfo>({
    resolver: yupResolver(validationDocumentInfoSchema),
    mode: 'all',
    defaultValues: {
      passportNumber: '',
      issueDate: '',
      expirationDate: '',
    },
  });
  useEffect(() => {
    reset({
      passportNumber: documentInfo.passportNumber,
      issueDate: documentInfo.issueDate,
      expirationDate: documentInfo.expirationDate,
    })
  }, [documentInfo, reset]);
  const onSubmit = (data: IDocumentInfo) => {
    dispatch(setDocumentInfoData(data));
    dispatch(setStep(EStepper.ADDRESS));
  };
  const onPreviousForm = () => {
    dispatch(setStep(EStepper.LEGAL_STATUS));
  };

  const passportRegExp = /^[A-Z0-9]+$/;
  const isValidForm = isValid;

  return (
    <StyledBoxContainer>
      <StyledFormTitle>
        {t('RegistrationPage.documentInfoTitle')}
      </StyledFormTitle>
      <StyledForm>
        <StyledFormContent>
          <Box sx={{ width: '100%' }}>
            <StyledLabel htmlFor="passportNumber">
              {t('RegistrationPage.inputName.labelPassportNumber')}
            </StyledLabel>
            <InputField
              name="passportNumber"
              id="passportNumber"
              control={control}
              className={errors.passportNumber ? 'shake' : ''}
              error={errors.passportNumber}
              placeholder={t('RegistrationPage.placeholder.name')}
              onKeyDown={(e) => {
                if (
                  !passportRegExp.test(e.key) &&
                  !ALLOWED_KEYS.includes(e.key)
                ) {
                  e.preventDefault();
                }
              }}
            />
          </Box>
          <Box sx={{ width: '100%' }}>
            <StyledLabel htmlFor="passportIssueDate">
              {t('RegistrationPage.inputName.labelPassportIssueDate')}
            </StyledLabel>
            <DocumentDatePicker
              name="issueDate"
              control={control}
              errors={errors}
              maxDate={dateLimitation.minDateIssue}
              minDate={dateLimitation.maxDateIssue}
              placeholder="RegistrationPage.placeholder.dateOfBirth"
            />
          </Box>
          <Box sx={{ width: '100%' }}>
            <StyledLabel htmlFor="passportExpirationDate">
              {t('RegistrationPage.inputName.labelPassportExpirationDate')}
            </StyledLabel>
            <DocumentDatePicker
              name="expirationDate"
              control={control}
              errors={errors}
              maxDate={dateLimitation.maxDateExpiration}
              minDate={dateLimitation.minDateExpiration}
              placeholder="RegistrationPage.placeholder.dateOfBirth"
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
