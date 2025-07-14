import { yupResolver } from '@hookform/resolvers/yup';
import { Box } from '@mui/material';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import {
  StyledForm,
  StyledFormContent,
  StyledFormTitle,
  StyledLabel,
} from './LoginForm.styled';
import { useLogin } from './hooks/useLogin';

import { ButtonLink, InputField, SubmitButton } from 'components/atoms';
import {
  TOSCheckbox,
  PasswordField,
  Timer,
  PasswordValidationTags,
} from 'components/molecules';
import {
  TO_FORGOT_PASSWORD,
  TO_SIGN_UP,
} from 'constants/navigation/routePaths';
import { useAppDispatch } from 'hooks';
import { ILoginFormInput } from 'models/IAuth';
import { setError } from 'store/reducers/AuthSlice';
import { TUserLoginValues, userLoginSchema } from 'validation';

export const LoginForm = () => {
  const { t } = useTranslation('translation', { keyPrefix: 'LoginPage' });
  const dispatch = useAppDispatch();

  const {
    formState: { errors, touchedFields },
    control,
    handleSubmit,
    resetField,
    watch,
    reset: resetForm,
  } = useForm<TUserLoginValues>({
    resolver: yupResolver(userLoginSchema),
    mode: 'onBlur',
    defaultValues: {
      email: '',
      password: '',
      checkbox: true,
    },
  });

  const [isFormDisabled, setIsFormDisabled] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const isValidConfirm = !errors?.password && touchedFields.password;
  const showPasswordTags = isPasswordFocused && !isValidConfirm;
  const passwordValue = watch('password');

  const { logIn, remainingTime, lockoutEndTime } = useLogin({
    dispatch,
    setIsFormDisabled,
    resetForm,
    resetField,
  });

  const handleCleanField = () => {
    if (errors.password) resetField('password');
    if (errors.email) resetField('email');
    if (errors.checkbox) {
      dispatch(setError(t('errorTermsPrivacyRequired')));
      resetField('checkbox', { defaultValue: false });
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
          <Box width="100%">
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
          <Box width="100%">
            <PasswordField
              control={control}
              id="password"
              name="password"
              errors={errors}
              isFormDisabled={isFormDisabled}
              onFocus={() => setIsPasswordFocused(true)}
            />
            {showPasswordTags && (
              <PasswordValidationTags password={passwordValue} />
            )}
          </Box>
        </StyledFormContent>
        <TOSCheckbox
          name="checkbox"
          control={control}
          errors={errors}
          isFormDisabled={isFormDisabled}
        />
        <ButtonLink
          message=""
          linkText="LoginPage.formBtnForgotPassword"
          href={TO_FORGOT_PASSWORD}
        />
        <SubmitButton
          onClick={handleCleanField}
          buttonContent={buttonContent}
          isDisabled={isFormDisabled}
          sx={{ marginTop: 1, marginBottom: 3 }}
        />
      </StyledForm>
      <ButtonLink
        message="LoginPage.signUpLink"
        linkText="LoginPage.formBtnSignUp"
        href={TO_SIGN_UP}
      />
    </>
  );
};
