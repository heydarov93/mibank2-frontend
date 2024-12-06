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
} from './EUDocumentInfo.styled';

import { InputField, SubmitButton, SecondaryButton } from 'components/atoms';
import { DocumentDatePicker } from 'components/molecules';
import { ALLOWED_KEYS } from 'constants/allowedKeys';
import { EStepper } from 'enums/EStepper';
import { IEUDocumentInfo } from 'models/IRegistration';
import { RootState } from 'store';
import { setEUDocumentInfoData } from 'store/reducers/RegistrationSlice';
import { setStep } from 'store/reducers/StepperSlice';
import { validationEUDocumentInfoSchema } from 'validation';

export const EUDocumentInfo = () => {
  const { t } = useTranslation('translation');
  const dispatch = useDispatch();
  const euDocumentInfo: IEUDocumentInfo = useSelector(
    (state: RootState) => state.registration.euDocumentInfo as IEUDocumentInfo,
  );
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
  } = useForm<IEUDocumentInfo>({
    resolver: yupResolver(validationEUDocumentInfoSchema),
    mode: 'onBlur',
    defaultValues: {
      documentNumber: '',
      issueDate: '',
      expirationDate: '',
    },
  });
  useEffect(() => {
    reset({
      documentNumber: euDocumentInfo.documentNumber,
      issueDate: euDocumentInfo.issueDate,
      expirationDate: euDocumentInfo.expirationDate,
    });
  }, [euDocumentInfo, reset]);
  const onSubmit = (data: IEUDocumentInfo) => {
    dispatch(setEUDocumentInfoData(data));
    dispatch(setStep(EStepper.ADDRESS));
  };
  const idCardRegExp = /^[A-Z0-9]+$/;
  const isValidForm = isValid;
  const onPreviousForm = () => {
    dispatch(setStep(EStepper.LEGAL_STATUS));
  };
  return (
    <StyledBoxContainer>
      <StyledFormTitle>
        {t('RegistrationPage.documentInfoTitle')}
      </StyledFormTitle>
      <StyledForm>
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
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <SecondaryButton
            onClick={onPreviousForm}
            buttonContent={t('RegistrationPage.buttonBackArrow')}
          />
          <SubmitButton
            isDisabled={!isValidForm}
            onClick={handleSubmit(onSubmit)}
            buttonContent={t('SignupPage.buttonLabelContinue')}
          ></SubmitButton>
        </Box>
      </StyledForm>
    </StyledBoxContainer>
  );
};
