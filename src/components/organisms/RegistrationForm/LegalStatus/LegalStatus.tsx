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

import { InputField, SubmitButton } from 'components/atoms';
import { EStepper } from 'enums/EStepper';
import { ILegalStatus } from 'models/IRegistration';
import { setLegalStatusData } from 'store/reducers/RegistrationSlice';
import { setStep } from 'store/reducers/StepperSlice';
import { validationLegalStatusSchema } from 'validation';

export const LegalStatus = () => {
  const { t } = useTranslation('translation');
  const dispatch = useDispatch();

  const {
    formState: { errors, isValid },
    control,
    handleSubmit,
  } = useForm<ILegalStatus>({
    resolver: yupResolver(validationLegalStatusSchema),
    mode: 'onBlur',
    defaultValues: {
      peselNumber: undefined,
    },
  });

  const onSubmit = (data: ILegalStatus) => {
    dispatch(setLegalStatusData(data));
    dispatch(setStep(EStepper.DOCUMENT_INFO));
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
              {t('RegistrationPage.inputName.labelPeselNumber')}
            </StyledLabel>
            <InputField
              name="peselNumber"
              id="peselNumber"
              control={control}
              className={errors.peselNumber ? 'shake' : ''}
              error={errors.peselNumber}
              placeholder={t('RegistrationPage.placeholder.placeholderName')}
              maxLength={11}
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
