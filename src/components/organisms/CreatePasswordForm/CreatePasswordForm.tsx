import { yupResolver } from '@hookform/resolvers/yup';
import { Box } from '@mui/material';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

import {
  StyledForm,
  StyledFormContent,
  StyledFormTitle,
} from './CreatePasswordForm.styled';

import { usePostRegistrationLegalEntityInfoMutation } from 'api/services/user-account-service/user-accounts.api';
import { SubmitButton } from 'components/atoms';
import {
  PasswordField,
  PasswordValidationTags,
  TOSCheckbox,
} from 'components/molecules';
import { TO_VERIFY_EMAIL } from 'constants/navigation/routePaths';
import { setError } from 'store/slices/auth';
import { getLegalEntity } from 'store/slices/auth/AuthSelectors';
import { TUserSignupValues, userSignupSchema } from 'validation';

export const CreatePasswordForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
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
  } = useForm<TUserSignupValues>({
    resolver: yupResolver(userSignupSchema),
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
  const [postRegistrationLegalEntityInfo] =
    usePostRegistrationLegalEntityInfoMutation();

  const legalEntity = useSelector(getLegalEntity);
  if (!legalEntity) return null;
  const { ownerFullName, email, nip, companyName } = legalEntity;

  const onFormSubmit = async (data: TUserSignupValues) => {
    try {
      await postRegistrationLegalEntityInfo({
        companyEmail: email,
        ownerFullName,
        nip,
        companyName,
        password: data.password,
      }).unwrap();

      resetForm();
      navigate(TO_VERIFY_EMAIL, {
        state: { email: location.state?.email, from: location.pathname },
      });
    } catch (err) {
      if (typeof err === 'object' && err !== null && 'status' in err) {
        dispatch(setError(t('serverError')));
      } else {
        dispatch(setError(t('unexpectedError')));
      }
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
