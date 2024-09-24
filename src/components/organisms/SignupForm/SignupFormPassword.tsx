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
} from './SignupForm.styled';

import { ButtonLink, SubmitButton, ValidationTag } from 'components/atoms';
import {
  CheckboxWithLabel,
  PasswordField,
  PasswordTooltip,
} from 'components/molecules';
import { ValidationKey } from 'enums';
import { useAppDispatch } from 'hooks';
import { ISignupFormInput } from 'models/IAuth';
import { setError } from 'store/reducers/AuthSlice';
import { passwordValidationRules, validationSignupSchema } from 'validation';

export const SignupFormPassword = () => {
  const { t } = useTranslation('translation', { keyPrefix: 'SignupPage' });
  const dispatch = useAppDispatch();

  const [isPasswordFocused, setIsPasswordFocused] = useState(false);

  const {
    formState: { errors, isValid, touchedFields },
    control,
    handleSubmit,
    resetField,
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

  const onSubmit = async (data: ISignupFormInput) => {
    // eslint-disable-next-line no-console
    console.log(data);
    resetForm();
  };

  const handleCleanField = () => {
    if (errors.password || errors.confirmPassword) {
      resetField('password');
      resetField('confirmPassword');
    }
    if (errors.checkbox) {
      dispatch(setError(t('errorTermsPrivacyRequired')));
      resetField('checkbox', { defaultValue: false });
    }
  };

  const handleCheckboxChange = (isChecked: boolean) => {
    if (!isChecked) dispatch(setError(t('errorTermsPrivacyRequired')));
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
              <PasswordTooltip />
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
        <CheckboxWithLabel
          name="checkbox"
          control={control}
          errors={errors}
          onCheckboxChange={handleCheckboxChange}
        />
        <SubmitButton
          onClick={handleCleanField}
          buttonContent={t('buttonLabelSignup')}
          isDisabled={!isValid}
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
