import { yupResolver } from '@hookform/resolvers/yup';
import { Box } from '@mui/material';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import {
  StyledForm,
  StyledFormContent,
  StyledFormTitle,
  StyledLabel,
} from './SignupForm.styled';

import { useCheckEmailMutation } from 'api/checkEmailApi';
import { ButtonLink, InputField, SubmitButton } from 'components/atoms';
import { ErrorStatus } from 'enums';
import { useAppDispatch } from 'hooks';
import { IEmailFormInput } from 'models/IAuth';
import { IErrorData } from 'models/IError';
import { setError } from 'store/reducers';
import { validationEmailSchema } from 'validation';

export const SignupFormEmail = () => {
  const [shake, setShake] = useState(false);
  const { t } = useTranslation('translation');
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const {
    formState: { errors, isValid },
    control,
    handleSubmit,
    resetField,
    reset: resetForm,
  } = useForm<IEmailFormInput>({
    resolver: yupResolver(validationEmailSchema),
    mode: 'onBlur',
    defaultValues: {
      email: '',
    },
  });

  const [checkEmail] = useCheckEmailMutation();

  const handleAnimationEnd = () => {
    setShake(false);
  };

  const onSubmit = async (data: IEmailFormInput) => {
    try {
      const response = await checkEmail(data).unwrap();
      if (response !== null) {
        throw {
          originalStatus: ErrorStatus.BAD_REQUEST,
        };
      }
      navigate('/signup-end');
    } catch (e) {
      const error = e as IErrorData;
      switch (error.originalStatus) {
        case ErrorStatus.BAD_REQUEST:
          dispatch(setError(t('SignupPage.email.errorEmailRegistered')));
          setShake(true);
          break;
        default:
          dispatch(setError(t('LoginPage.serverError')));
          setShake(false);
          break;
      }
    }
    resetForm();
  };

  const handleCleanField = () => {
    if (errors.email) resetField('email');
  };

  return (
    <>
      <StyledFormTitle>{t('SignupPage.formTitle')}</StyledFormTitle>
      <StyledForm onSubmit={handleSubmit(onSubmit)}>
        <StyledFormContent>
          <Box sx={{ width: '100%' }}>
            <StyledLabel htmlFor="email">
              {t('LoginPage.email.label')}
            </StyledLabel>
            <InputField
              name="email"
              id="email"
              control={control}
              className={errors.email ? 'shake' : ''}
              error={errors.email}
              placeholder="example@gmail.com"
            />
          </Box>
        </StyledFormContent>
        <SubmitButton
          onClick={handleCleanField}
          buttonContent={t('SignupPage.buttonLabelContinue')}
          isDisabled={!isValid}
        />
      </StyledForm>
      <ButtonLink
        message="SignupPage.haveAccountMsg"
        linkText="SignupPage.moveToLoginLink"
        href="/signin"
        delay={0.5}
        shake={shake}
        onAnimationEnd={handleAnimationEnd}
      />
    </>
  );
};
