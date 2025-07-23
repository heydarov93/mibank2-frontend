import { yupResolver } from '@hookform/resolvers/yup';
import { Box } from '@mui/material';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import {
  StyledForm,
  StyledFormContent,
  StyledFormTitle,
  StyledLabel,
} from './CreateForgotPasswordForm.styled';

import { useConfirmForgotPasswordMutation } from 'api/services/user-account-service/user-accounts.api';
import { LinkButton, SubmitButton } from 'components/atoms';
import {
  PasswordField,
  PasswordValidationTags,
  VerificationCodeInputField,
} from 'components/molecules';
import {
  TO_CREATE_FORGOT_PASSWORD_FINISHED,
  TO_SIGN_IN,
} from 'constants/navigation/routePaths';
import { LOCAL_STORAGE_KEYS } from 'constants/security/storageAuthKeys';
import { EErrorStatus } from 'enums';
import { useAppDispatch } from 'hooks';
import { IForgotPasswordFormInput } from 'models/IAuth';
import { IErrorData } from 'models/IError';
import { setError } from 'store/slices/auth';
import { forgotPasswordSchema, TForgotPasswordValues } from 'validation';

export const CreateForgotPasswordForm = () => {
  const { t } = useTranslation('translation', { keyPrefix: 'ForgotPassword' });
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [confirmForgotPassword] = useConfirmForgotPasswordMutation();
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);

  const {
    formState: { errors, isValid, touchedFields },
    control,
    handleSubmit,
    reset: resetForm,
    watch,
    setError: setFormError,
    setValue: setFormInputValue,
    clearErrors,
  } = useForm<TForgotPasswordValues>({
    resolver: yupResolver(forgotPasswordSchema),
    mode: 'onBlur',
    defaultValues: {
      password: '',
      confirmPassword: '',
      verificationCode: '',
    },
  });

  const passwordValue = watch('password');
  const confirmPasswordValue = watch('confirmPassword');
  const isValidConfirm = !errors?.password && touchedFields.password;
  const showPasswordTags = isPasswordFocused && !isValidConfirm;

  useEffect(() => {
    const trimmedPassword = passwordValue.trim();
    const trimmedConfirmPassword = confirmPasswordValue.trim();

    if (
      trimmedConfirmPassword.length > 0 &&
      trimmedPassword !== trimmedConfirmPassword
    ) {
      setFormError(
        'confirmPassword',
        {
          type: 'focus',
          message: t('confirmPassword.errorMatch'),
        },
        { shouldFocus: true },
      );
    } else if (
      trimmedPassword === trimmedConfirmPassword &&
      errors?.confirmPassword
    ) {
      clearErrors('confirmPassword');
    }
  }, [passwordValue, confirmPasswordValue]);

  const onSubmit = async (data: IForgotPasswordFormInput) => {
    const userData = {
      email: localStorage.getItem(LOCAL_STORAGE_KEYS.Email),
      code: data.verificationCode,
      newPassword: data.password,
    };
    try {
      await confirmForgotPassword(userData).unwrap();
      navigate(TO_CREATE_FORGOT_PASSWORD_FINISHED);
      resetForm();
    } catch (e) {
      const error = e as IErrorData;
      switch (error.status) {
        case EErrorStatus.BAD_REQUEST:
          setFormError(
            'verificationCode',
            { type: 'focus', message: t('invalidVerificationCode') },
            { shouldFocus: true },
          );
          break;
        default:
          dispatch(setError(t('serverError')));
          break;
      }
    }
  };

  const handlePaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
    event.preventDefault();
    const clipboardData = event.clipboardData;
    if (clipboardData.types.includes('text/plain')) {
      const pastedText = clipboardData.getData('text/plain');
      setFormInputValue('verificationCode', pastedText);
    }
  };

  return (
    <>
      <StyledFormTitle>{t('CreateForgotPassword')}</StyledFormTitle>
      <StyledForm onSubmit={handleSubmit(onSubmit)}>
        <StyledFormContent>
          <Box sx={{ width: '100%' }}>
            <PasswordField
              control={control}
              name="password"
              id="password"
              errors={errors}
              onFocus={() => setIsPasswordFocused(true)}
            />
            {showPasswordTags && (
              <PasswordValidationTags password={passwordValue} />
            )}
          </Box>
          <Box sx={{ width: '100%' }}>
            <PasswordField
              control={control}
              name="confirmPassword"
              id="confirmPassword"
              errors={errors}
              isFormDisabled={!isValidConfirm}
            />
          </Box>

          <Box sx={{ width: '100%' }}>
            <Box sx={{ display: 'flex' }}>
              <StyledLabel htmlFor="verificationCode">
                {t('EnterVerificatonCode')}
              </StyledLabel>
            </Box>
            <VerificationCodeInputField
              control={control}
              name="verificationCode"
              errors={errors}
              isFormDisabled={!isValidConfirm}
              onPaste={(event) =>
                handlePaste(event as React.ClipboardEvent<HTMLInputElement>)
              }
            />
          </Box>
        </StyledFormContent>
        <SubmitButton buttonContent={t('Confirm')} isDisabled={!isValid} />
      </StyledForm>
      <LinkButton
        message="SignupPage.haveAccountMsg"
        linkText="SignupPage.moveToLoginLink"
        to={TO_SIGN_IN}
      />
    </>
  );
};
