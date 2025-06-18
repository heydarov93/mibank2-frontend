import { yupResolver } from '@hookform/resolvers/yup';
import { Box } from '@mui/material';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';

import {
  StyledForm,
  StyledFormContent,
  StyledFormTitle,
} from './CreatePasswordForm.styled';

import { SubmitButton } from 'components/atoms';
import {
  TOSCheckbox,
  PasswordField,
  PasswordValidationTags,
} from 'components/molecules';
import { TO_VERIFY_EMAIL } from 'constants/routesName';
import { ISignupFormInput } from 'models/IAuth';
import { validationSignupSchema } from 'validation';

export const CreatePasswordForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation('translation', {
    keyPrefix: 'common.form.createPassword',
  });

  const [isPasswordFocused, setIsPasswordFocused] = useState(false);

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
  const showPasswordTags = isPasswordFocused && !isValidConfirm;
  // TODO: substitute with real submit when BE is ready
  const onFormSubmit = async () => {
    try {
      resetForm();
      navigate(TO_VERIFY_EMAIL, {
        state: { email: location.state?.email, from: location.pathname },
      });
    } catch (e) {
      //
    }
  };

  return (
    <>
      <StyledFormTitle>{t('title')}</StyledFormTitle>
      <StyledForm onSubmit={handleSubmit(onFormSubmit)}>
        <StyledFormContent>
          <Box>
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
          <Box>
            <PasswordField
              control={control}
              name="confirmPassword"
              id="confirmPassword"
              errors={errors}
              isFormDisabled={!isValidConfirm}
            />
          </Box>
          <TOSCheckbox name="checkbox" control={control} errors={errors} />
          <SubmitButton
            buttonContent={t('submitLabel')}
            isDisabled={!isValid}
          />
        </StyledFormContent>
      </StyledForm>
    </>
  );
};
