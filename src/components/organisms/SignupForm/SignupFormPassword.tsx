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
} from './SignupForm.styled';

import { useRegisterNewUserMutation } from 'api/services/user-account-service/user-accounts.api';
import { ButtonLink, SubmitButton } from 'components/atoms';
import {
  TOSCheckbox,
  PasswordField,
  PasswordValidationTags,
} from 'components/molecules';
import { TO_SIGN_IN, TO_VERIFY_EMAIL } from 'constants/navigation/routePaths';
import { LOCAL_STORAGE_KEYS } from 'constants/security/storageAuthKeys';
import { EErrorStatus } from 'enums';
import { useAppDispatch } from 'hooks';
import { ISignupFormInput } from 'models/IAuth';
import { IErrorData } from 'models/IError';
import { setError } from 'store/slices/auth/AuthSlice';
import { TUserSignupValues, userSignupSchema } from 'validation';

export const SignupFormPassword = () => {
  const { t } = useTranslation('translation', { keyPrefix: 'SignupPage' });
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const {
    formState: { errors, isValid, touchedFields },
    control,
    handleSubmit,
    reset: resetForm,
    watch,
  } = useForm<TUserSignupValues>({
    resolver: yupResolver(userSignupSchema),
    mode: 'onBlur',
    defaultValues: {
      password: '',
      confirmPassword: '',
      checkbox: true,
    },
  });

  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const passwordValue = watch('password');
  const isValidConfirm = !errors?.password && touchedFields.password;
  const showPasswordTags = isPasswordFocused && !isValidConfirm;

  const [registerNewUser] = useRegisterNewUserMutation();

  const onSubmit = async (data: ISignupFormInput) => {
    const userData = {
      email: localStorage.getItem(LOCAL_STORAGE_KEYS.Email),
      password: data.password,
    };
    try {
      const postRequest = await registerNewUser(userData).unwrap();
      if (!postRequest) {
        throw {
          originalStatus: EErrorStatus.BAD_REQUEST,
        };
      }
    } catch (e) {
      const error = e as IErrorData;
      if (error.originalStatus) {
        dispatch(setError(t('serverError')));
      }
      if (error.status) {
        dispatch(setError(t('serverError')));
      }
    }
    navigate(TO_VERIFY_EMAIL, {
      state: {
        email: localStorage.getItem(LOCAL_STORAGE_KEYS.Email),
        from: location.pathname,
      },
    });
    resetForm();
  };

  return (
    <>
      <StyledFormTitle>{t('formTitle')}</StyledFormTitle>
      <StyledForm onSubmit={handleSubmit(onSubmit)}>
        <StyledFormContent>
          <Box width="100%">
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
          <Box width="100%">
            <PasswordField
              control={control}
              name="confirmPassword"
              id="confirmPassword"
              errors={errors}
              isFormDisabled={!isValidConfirm}
            />
          </Box>
        </StyledFormContent>
        <TOSCheckbox name="checkbox" control={control} errors={errors} />
        <SubmitButton
          buttonContent={t('buttonLabelSignup')}
          isDisabled={!isValid}
          sx={{ marginBottom: 3 }}
        />
      </StyledForm>
      <ButtonLink
        message="SignupPage.haveAccountMsg"
        linkText="SignupPage.moveToLoginLink"
        href={TO_SIGN_IN}
      />
    </>
  );
};
