import { yupResolver } from '@hookform/resolvers/yup';
import { Box } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import {
  StyledForm,
  StyledFormContent,
  StyledFormTitle,
  StyledLabel,
} from './ForgotPassword.styled';

import { useGetCodeForForgotPasswordMutation } from 'api/services/user-account-service/user-accounts.api';
import { InputField, SubmitButton } from 'components/atoms';
import { TO_CREATE_FORGOT_PASSWORD } from 'constants/navigation/routePaths';
import { LOCAL_STORAGE_KEYS } from 'constants/security/storageAuthKeys';
import { EErrorStatus } from 'enums';
import { useAppDispatch } from 'hooks';
import { IEmailFormInput } from 'models/IAuth';
import { IErrorData } from 'models/IError';
import { setEmail, setError } from 'store/slices/auth';
import { userEmailSchema } from 'validation';

export const ForgotPassword = () => {
  const { t } = useTranslation('translation');
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const {
    formState: { errors, isValid, touchedFields },
    control,
    handleSubmit,
    resetField,
    reset: resetForm,
  } = useForm<IEmailFormInput>({
    resolver: yupResolver(userEmailSchema),
    mode: 'onBlur',
    defaultValues: {
      email: '',
    },
  });

  const [getCodeForForgotPassword] = useGetCodeForForgotPasswordMutation();

  const onSubmit = async (data: IEmailFormInput) => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEYS.Email, data.email);
      const response = await getCodeForForgotPassword(data).unwrap();

      if (response !== null) {
        throw {
          originalStatus: EErrorStatus.BAD_REQUEST,
        };
      }
      dispatch(setEmail(data));
      navigate(TO_CREATE_FORGOT_PASSWORD);
    } catch (e) {
      const error = e as IErrorData;
      dispatch(
        setError(
          t(
            error.originalStatus === EErrorStatus.BAD_REQUEST
              ? 'SignupPage.email.errorEmailRegistered'
              : 'LoginPage.serverError',
          ),
        ),
      );
    }
    resetForm();
  };

  const handleCleanField = () => {
    if (errors.email) resetField('email');
  };
  const isValidEmail = isValid && !errors.email && touchedFields.email;

  return (
    <>
      <StyledFormTitle>{t('ForgotPassword.EmailPageTitle')}</StyledFormTitle>
      <StyledForm
        onSubmit={handleSubmit(onSubmit)}
        style={{ marginBottom: '50px' }}
      >
        <StyledFormContent>
          <Box sx={{ width: '100%' }}>
            <StyledLabel htmlFor="email">
              {t('LoginPage.email.label')}
            </StyledLabel>
            <InputField
              name="email"
              id="email"
              control={control}
              className={errors.email ? 'shake' : ''}
              error={errors.email}
              placeholder={t('ForgotPassword.EmailPagePlaceholder')}
            />
          </Box>
        </StyledFormContent>
        <SubmitButton
          onClick={handleCleanField}
          buttonContent={t('ForgotPassword.EmailPageButton')}
          isDisabled={!isValidEmail}
        />
      </StyledForm>
    </>
  );
};
