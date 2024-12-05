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
} from './LoginForm.styled';

import { useAuthorizeMutation, useSendcodeMutation } from 'api/authApi';
import {
  ButtonLink,
  InputField,
  SubmitButton,
  ValidationTag,
} from 'components/atoms';
import { CheckboxWithLabel, PasswordField, Timer } from 'components/molecules';
import { ErrorStatus, ValidationKey } from 'enums';
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
import { passwordValidationRules, validationLoginSchema } from 'validation';

export const LoginForm = () => {
  const { t } = useTranslation('translation', { keyPrefix: 'LoginPage' });
  const dispatch = useAppDispatch();

  const [authorize] = useAuthorizeMutation();
  const [sendcode] = useSendcodeMutation();
  const { handleLockedError } = useErrorHandlers();
  const {
    formState: { errors, touchedFields },
    control,
    handleSubmit,
    resetField,
    watch,
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

  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const navigate = useNavigate();

  const passwordValue = watch('password');

  const isValidConfirm = !errors?.password && touchedFields.password;

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
          case ErrorStatus.LOCKED:
            dispatch(setVerifyingTimer(error.data.blockTimeRemaining));
            break;
          case ErrorStatus.BAD_REQUEST:
            dispatch(setError(error.data.exceptionMessage));
            break;
          default:
            dispatch(setError(t('serverError')));
            break;
        }
      } finally {
        navigate('/verification', { state: { isError } });
      }

      resetForm();
    } catch (e) {
      const error = e as IErrorData;
      switch (error.status) {
        case ErrorStatus.NOT_FOUND:
          dispatch(setError(error.data.exceptionMessage));
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
          dispatch(setError(t('serverError')));
          break;
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
            <StyledLabel htmlFor="email">{t('email.label')}</StyledLabel>
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
              <StyledLabel htmlFor="password">
                {t('password.label')}
              </StyledLabel>
            </Box>
            <PasswordField
              control={control}
              id="password"
              name="password"
              errors={errors}
              isFormDisabled={isFormDisabled}
              onFocus={() => setIsPasswordFocused(true)}
            />
            {isPasswordFocused &&
              !isValidConfirm &&
              Object.keys(passwordValidationRules).map((key) => (
                <ValidationTag
                  key={key}
                  tagText={t(`password.${key}`)}
                  isValidated={passwordValidationRules[key as ValidationKey](
                    passwordValue,
                  )}
                  isSpecial={key === ValidationKey.SPECIAL_CHAR ? true : false}
                />
              ))}
          </Box>
        </StyledFormContent>
        <CheckboxWithLabel
          name="checkbox"
          control={control}
          errors={errors}
          isFormDisabled={isFormDisabled}
        />
        <ButtonLink
          message=""
          linkText="LoginPage.formBtnForgotPassword"
          href="/forgot-password"
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
