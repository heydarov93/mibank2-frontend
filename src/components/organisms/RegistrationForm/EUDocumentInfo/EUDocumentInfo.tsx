import { yupResolver } from '@hookform/resolvers/yup';
import { Box } from '@mui/material';
import dayjs from 'dayjs';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

import {
  StyledFormTitle,
  StyledForm,
  StyledFormContent,
  StyledBoxContainer,
  StyledLabel,
} from './EUDocumentInfo.styled';

import { InputField, SubmitButton } from 'components/atoms';
import { DocumentDatePicker } from 'components/molecules';
import { ALLOWED_KEYS } from 'constants/allowedKeys';
import { EStepper } from 'enums/EStepper';
import { IEUDocumentInfo } from 'models/IRegistration';
import { setEUDocumentInfoData } from 'store/reducers/RegistrationSlice';
import { setStep } from 'store/reducers/StepperSlice';
import { validationEUDocumentInfoSchema } from 'validation';

export const EUDocumentInfo = () => {
  const { t } = useTranslation('translation');
  const dispatch = useDispatch();

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
  } = useForm<IEUDocumentInfo>({
    resolver: yupResolver(validationEUDocumentInfoSchema),
    mode: 'onBlur',
    defaultValues: {
      idCardNumber: '',
      issueDate: '',
      expirationDate: '',
    },
  });

  const onSubmit = (data: IEUDocumentInfo) => {
    dispatch(setEUDocumentInfoData(data));
    dispatch(setStep(EStepper.ADDRESS));
  };
  const idCardRegExp = /^[A-Z0-9]+$/;
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
              {t('RegistrationPage.inputName.labelIDCardNumber')}
            </StyledLabel>
            <InputField
              name="idCardNumber"
              id="idCardNumber"
              control={control}
              className={errors.idCardNumber ? 'shake' : ''}
              error={errors.idCardNumber}
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
            <StyledLabel htmlFor="passportIssueDate">
              {t('RegistrationPage.inputName.labelIssueDate')}
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
              {t('RegistrationPage.inputName.labelExpirationDate')}
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
        <SubmitButton
          isDisabled={!isValidForm}
          onClick={handleSubmit(onSubmit)}
          buttonContent={t('SignupPage.buttonLabelContinue')}
        ></SubmitButton>
      </StyledForm>
    </StyledBoxContainer>
  );
};
