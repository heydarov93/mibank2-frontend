import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Box, useTheme, Typography } from '@mui/material';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import {
  StyledButtonContainer,
  StyledForm,
  StyledFormContent,
  StyledFormTitle,
  StyledLable,
  StyledSignUpLink,
  StyledSignUpLinkContainer,
} from './LoginForm.styled';

import { useAuthorizeMutation } from 'api/authApi';
import { InputField } from 'components/atoms';
import {
  CheckboxWithLabel,
  PasswordField,
  PasswordTooltip,
  Timer,
} from 'components/molecules';
import { validationLoginSchema } from 'constants/index';
import { ErrorStatus } from 'enums';
import { useAppDispatch, useErrorHandlers, useFormatErrorMessage } from 'hooks';
import { IFormInput, ILoginData, TokenType } from 'models/IAuth';
import { IErrorData } from 'models/IError';
import { setError, setLoading, loginToApp } from 'store/reducers/AuthSlice';
import { localTokenHandler } from 'utils';

export const LoginForm = () => {
  const { t } = useTranslation('translation');
  const dispatch = useAppDispatch();

  const [authorize] = useAuthorizeMutation();
  const { handleNotFoundError, handleLockedError } = useErrorHandlers();
  const { formatErrorMessage } = useFormatErrorMessage();
  const {
    formState: { errors },
    control,
    handleSubmit,
    resetField,
    reset: resetForm,
  } = useForm<IFormInput>({
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
      dispatch(setError(t('LoginPage.errorTermsPrivacyRequired')));
      resetField('checkbox', { defaultValue: false });
    }
  };

  const navigate = useNavigate();

  const theme = useTheme();

  const logIn = async (credentials: ILoginData) => {
    try {
      const data = await authorize(credentials).unwrap();

      localTokenHandler.storeToken(data.accessToken, TokenType.TEMPORARY);

      dispatch(setLoading(true));
      navigate('/verification');
      resetForm();
    } catch (e) {
      const error = e as IErrorData;

      if (e instanceof Error) {
        dispatch(setError(e.message));
      } else {
        switch (error.status) {
          case ErrorStatus.NOT_FOUND:
            handleNotFoundError(error, formatErrorMessage);
            resetField('password');
            break;
          case ErrorStatus.LOCKED:
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

  const onSubmit = async (data: IFormInput) => {
    try {
      logIn({
        email: data.email,
        password: data.password,
      });
      dispatch(loginToApp(data.email));
    } catch (err) {
      if (err instanceof Error) {
        dispatch(setError(err.message));
      } else {
        dispatch(setError('An unknown error occurred'));
      }
    }
  };

  return (
    <>
      <StyledFormTitle>{t('LoginPage.formTitle')}</StyledFormTitle>
      <StyledForm onSubmit={handleSubmit(onSubmit)}>
        <StyledFormContent>
          <Box sx={{ width: '100%' }}>
            <StyledLable htmlFor="email">
              {t('LoginPage.email.label')}
            </StyledLable>
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
                {t('LoginPage.password.label')}
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
          control={control}
          errors={errors}
          isFormDisabled={isFormDisabled}
        />
        <StyledButtonContainer>
          <Button
            size="large"
            variant="contained"
            fullWidth
            type="submit"
            onClick={handleCleanField}
            disabled={isFormDisabled}
            sx={{
              '&.Mui-disabled': {
                opacity: '0.65',
                color: theme.palette.common.white,
                background: theme.palette.primary.main,
              },
            }}
          >
            {t('LoginPage.formBtnSignIn')}
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
          </Button>
        </StyledButtonContainer>
      </StyledForm>
      <StyledSignUpLinkContainer>
        <Typography>{t('LoginPage.signUpLink')}</Typography>
        <StyledSignUpLink href="/signup-start">
          {t('LoginPage.formBtnSignUp')}
        </StyledSignUpLink>
      </StyledSignUpLinkContainer>
    </>
  );
};
