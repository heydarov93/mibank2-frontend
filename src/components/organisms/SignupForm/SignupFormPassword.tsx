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

import { useRegisterNewUserMutation } from 'api/registerNewUserApi';
import { ButtonLink, SubmitButton, ValidationTag } from 'components/atoms';
import { TOSCheckbox, PasswordField } from 'components/molecules';
import { TO_VERIFY_EMAIL } from 'constants/routesName';
import { ValidationKey } from 'enums';
import { ErrorStatus } from 'enums';
import { useAppDispatch } from 'hooks';
import { ISignupFormInput } from 'models/IAuth';
import { IErrorData } from 'models/IError';
import { setError } from 'store/reducers/AuthSlice';
import { passwordValidationRules, validationSignupSchema } from 'validation';

export const SignupFormPassword = () => {
  const { t } = useTranslation('translation', { keyPrefix: 'SignupPage' });
  const dispatch = useAppDispatch();

  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const navigate = useNavigate();

  const {
    formState: { errors, isValid, touchedFields },
    control,
    handleSubmit,
    reset: resetForm,
    watch,
  } = useForm<ISignupFormInput>({
    resolver: yupResolver(validationSignupSchema),
    mode: 'onBlur',
    defaultValues: {
      password: '',
      confirmPassword: '',
      checkbox: true,
    },
  });
  const passwordValue = watch('password');

  const isValidConfirm = !errors?.password && touchedFields.password;
  const [registerNewUser] = useRegisterNewUserMutation();

  const onSubmit = async (data: ISignupFormInput) => {
    const userData = {
      email: localStorage.getItem('email'),
      password: data.password,
    };
    try {
      const postRequest = await registerNewUser(userData).unwrap();
      if (!postRequest) {
        throw {
          originalStatus: ErrorStatus.BAD_REQUEST,
        };
      }
    } catch (e) {
      const error = e as IErrorData;
      if (error.originalStatus) {
        dispatch(setError(t('serverError')));
      }
    }
    navigate(TO_VERIFY_EMAIL, {
      state: { email: localStorage.getItem('email'), from: location.pathname },
    });
    resetForm();
  };

  return (
    <>
      <StyledFormTitle>{t('formTitle')}</StyledFormTitle>
      <StyledForm onSubmit={handleSubmit(onSubmit)}>
        <StyledFormContent>
          <Box sx={{ width: '100%' }}>
            <Box sx={{ display: 'flex' }}>
              <StyledLabel htmlFor="password">
                {t('password.label')}
              </StyledLabel>
            </Box>
            <PasswordField
              control={control}
              name="password"
              id="password"
              errors={errors}
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
          <Box sx={{ width: '100%' }}>
            <Box sx={{ display: 'flex' }}>
              <StyledLabel htmlFor="confirmPassword">
                {t('confirmPassword.label')}
              </StyledLabel>
            </Box>
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
        href="/signin"
      />
    </>
  );
};
