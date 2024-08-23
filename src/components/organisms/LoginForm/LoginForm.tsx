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
  StyledLable,
} from './LoginForm.styled';

import { useAuthorizeMutation, useSendcodeMutation } from 'api/authApi';
import { ButtonLink, InputField, SubmitButton } from 'components/atoms';
import {
  CheckboxWithLabel,
  PasswordField,
  PasswordTooltip,
  Timer,
} from 'components/molecules';
import { validationLoginSchema } from 'constants/index';
import { ErrorStatus } from 'enums';
import { useAppDispatch, useErrorHandlers } from 'hooks';
import { ILoginFormInput, ILoginData, TokenType } from 'models/IAuth';
import { IErrorData } from 'models/IError';
import {
  setError,
  setLoading,
  setVerifying,
  setVerifyingTimer,
} from 'store/reducers/AuthSlice';
import { localTokenHandler } from 'utils';

export const LoginForm = () => {
  const { t } = useTranslation('translation', { keyPrefix: 'LoginPage' });
  const dispatch = useAppDispatch();

  const [authorize] = useAuthorizeMutation();
  const [sendcode] = useSendcodeMutation();
  const { handleLockedError } = useErrorHandlers();
  const {
    formState: { errors },
    control,
    handleSubmit,
    resetField,
    reset: resetForm,
  } = useForm<ILoginFormInput>({
    resolver: yupResolver(validationLoginSchema),
    mode: 'onBlur',
    defaultValues: {
      email: '',
      password: '',
      checkbox: true,
    },
  });

  const [remainingTime, setRemainingTime] = useState<number>(0);
  const [isFormDisabled, setIsFormDisabled] = useState(false);
  const [lockoutEndTime, setLockoutEndTime] = useState<number>(0);

  const handleCleanField = () => {
    if (errors.password) resetField('password');
    if (errors.email) resetField('email');
    if (errors.checkbox) {
      dispatch(setError(t('errorTermsPrivacyRequired')));
      resetField('checkbox', { defaultValue: false });
    }
  };

  const navigate = useNavigate();

  const logIn = async (credentials: ILoginData) => {
    try {
      const data = await authorize(credentials).unwrap();

      localTokenHandler.storeToken(data.accessToken, TokenType.TEMPORARY);
      dispatch(setVerifying(true));
      dispatch(setLoading(true));

      let isError = false;

      try {
        const response = await sendcode(null).unwrap();
        const expiredTimer = response.expiredTimer;
        dispatch(setVerifyingTimer(expiredTimer));
      } catch (e) {
        const error = e as IErrorData;
        isError = true;
        switch (error.status) {
          case ErrorStatus.TOO_MANY_REQUESTS:
            dispatch(setVerifyingTimer(error.data.expiredTimer));
            break;
          default:
            dispatch(setError('An unknown error occurred'));
            break;
        }
      } finally {
        navigate('/verification', { state: { isError } });
      }

      resetForm();
    } catch (e) {
      const error = e as IErrorData;

      if (e instanceof Error) {
        dispatch(setError(t('serverError')));
      } else {
        switch (error.status) {
          case ErrorStatus.NOT_FOUND:
            dispatch(setError(error.data.exceptionMessage));
            resetField('password');
            break;
          case ErrorStatus.TOO_MANY_REQUESTS:
            handleLockedError(
              error,
              setIsFormDisabled,
              setRemainingTime,
              setLockoutEndTime,
            );
            resetField('password');
            break;
          default:
            dispatch(setError('An unknown error occurred'));
            break;
        }
      }
    } finally {
      dispatch(setLoading(false));
    }
  };

  const onSubmit = async (data: ILoginFormInput) => {
    try {
      logIn({
        email: data.email,
        password: data.password,
      });
    } catch (err) {
      if (err instanceof Error) {
        dispatch(setError(err.message));
      } else {
        dispatch(setError('An unknown error occurred'));
      }
    }
  };

  const buttonContent = (
    <>
      {t('formBtnSignIn')}
      {isFormDisabled && (
        <>
          <span>&nbsp;</span>
          <span>{'('}</span>
          <Timer
            time={remainingTime}
            endTime={lockoutEndTime}
            runTimer={setIsFormDisabled}
          />
          <span>{`)`}</span>
        </>
      )}
    </>
  );

  return (
    <>
      <StyledFormTitle>{t('formTitle')}</StyledFormTitle>
      <StyledForm onSubmit={handleSubmit(onSubmit)}>
        <StyledFormContent>
          <Box sx={{ width: '100%' }}>
            <StyledLable htmlFor="email">{t('email.label')}</StyledLable>
            <InputField
              name="email"
              id="email"
              control={control}
              className={errors.email ? 'shake' : ''}
              error={errors.email}
              placeholder="example@gmail.com"
              disabled={isFormDisabled}
            />
          </Box>
          <Box sx={{ width: '100%' }}>
            <Box sx={{ display: 'flex' }}>
              <StyledLable htmlFor="password">
                {t('password.label')}
              </StyledLable>
              <PasswordTooltip />
            </Box>
            <PasswordField
              control={control}
              id="password"
              name="password"
              errors={errors}
              isFormDisabled={isFormDisabled}
            />
          </Box>
        </StyledFormContent>
        <CheckboxWithLabel
          name="checkbox"
          control={control}
          errors={errors}
          isFormDisabled={isFormDisabled}
        />
        <SubmitButton
          onClick={handleCleanField}
          buttonContent={buttonContent}
          isDisabled={isFormDisabled}
        />
      </StyledForm>
      <ButtonLink
        message="LoginPage.signUpLink"
        linkText="LoginPage.formBtnSignUp"
        href="/signup-start"
      />
    </>
  );
};
