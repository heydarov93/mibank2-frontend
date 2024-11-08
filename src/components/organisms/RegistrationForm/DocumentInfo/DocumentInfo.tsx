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
} from './DocumentInfo.styled';

import { InputField, SubmitButton } from 'components/atoms';
import {
  PassportExpirationDate,
  PassportIssueDate,
} from 'components/molecules';
import { EStepper } from 'enums/EStepper';
import { IDocumentInfo } from 'models/IRegistration';
import { setDocumentInfoData } from 'store/reducers/RegistrationSlice';
import { setStep } from 'store/reducers/StepperSlice';
import { validationDocumentInfoSchema } from 'validation';

export const DocumentInfo = () => {
  const { t } = useTranslation('translation');
  const dispatch = useDispatch();

  const {
    formState: { errors, isValid },
    control,
    handleSubmit,
  } = useForm<IDocumentInfo>({
    resolver: yupResolver(validationDocumentInfoSchema),
    mode: 'onBlur',
    defaultValues: {
      passportNumber: '',
      issueDate: '',
      expirationDate: '',
    },
  });

  const onSubmit = (data: IDocumentInfo) => {
    dispatch(setDocumentInfoData(data));
    dispatch(setStep(EStepper.PERSONAL_INFO));
  };

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
              placeholder={t('RegistrationPage.placeholder.placeholderName')}
            />
          </Box>
          <Box sx={{ width: '100%' }}>
            <StyledLabel htmlFor="passportIssueDate">
              {t('RegistrationPage.inputName.labelPassportIssueDate')}
            </StyledLabel>
            <PassportIssueDate
              name="issueDate"
              control={control}
              errors={errors}
            />
          </Box>
          <Box sx={{ width: '100%' }}>
            <StyledLabel htmlFor="passportExpirationDate">
              {t('RegistrationPage.inputName.labelPassportExpirationDate')}
            </StyledLabel>
            <PassportExpirationDate
              name="expirationDate"
              control={control}
              errors={errors}
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
