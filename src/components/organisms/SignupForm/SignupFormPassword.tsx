import { yupResolver } from '@hookform/resolvers/yup';
import { Box } from '@mui/material';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import {
  StyledForm,
  StyledFormContent,
  StyledFormTitle,
  StyledLable,
} from './SignupForm.styled';

import { ButtonLink, SubmitButton } from 'components/atoms';
import {
  CheckboxWithLabel,
  PasswordField,
  PasswordTooltip,
} from 'components/molecules';
import { validationSignupSchema } from 'constants/validationShemas';
import { useAppDispatch } from 'hooks';
import { ISignupFormInput } from 'models/IAuth';
import { setError } from 'store/reducers/AuthSlice';

export const SignupFormPassword = () => {
  const { t } = useTranslation('translation', { keyPrefix: 'SignupPage' });
  const dispatch = useAppDispatch();

  const {
    formState: { errors },
    control,
    handleSubmit,
    resetField,
    //TODO: logic for reset form
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    reset: resetForm,
  } = useForm<ISignupFormInput>({
    resolver: yupResolver(validationSignupSchema),
    mode: 'onBlur',
    defaultValues: {
      password: '',
      confirmPassword: '',
      checkbox: true,
    },
  });
  //TODO: handle with disable form
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isFormDisabled, setIsFormDisabled] = useState(false);

  const onSubmit = async (data: ISignupFormInput) => {
    // eslint-disable-next-line no-console
    console.log(data);
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

  return (
    <>
      <StyledFormTitle>{t('formTitle')}</StyledFormTitle>
      <StyledForm onSubmit={handleSubmit(onSubmit)}>
        <StyledFormContent>
          <Box sx={{ width: '100%' }}>
            <Box sx={{ display: 'flex' }}>
              <StyledLable htmlFor="password">
                {t('password.label')}
              </StyledLable>
              <PasswordTooltip />
            </Box>
            <PasswordField
              control={control}
              name="password"
              id="password"
              errors={errors}
              isFormDisabled={isFormDisabled}
            />
          </Box>
          <Box sx={{ width: '100%' }}>
            <Box sx={{ display: 'flex' }}>
              <StyledLable htmlFor="confirmPassword">
                {t('confirmPassword.label')}
              </StyledLable>
              <PasswordTooltip />
            </Box>
            <PasswordField
              control={control}
              name="confirmPassword"
              id="confirmPassword"
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
          buttonContent={t('buttonLabelSignup')}
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
