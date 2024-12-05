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

import { useCheckEmailMutation } from 'api/checkEmailApi';
import { InputField, SubmitButton } from 'components/atoms';
import { TO_SIGN_UP_END } from 'constants/routesName';
import { ErrorStatus } from 'enums';
import { useAppDispatch } from 'hooks';
import { IEmailFormInput } from 'models/IAuth';
import { IErrorData } from 'models/IError';
import { setError } from 'store/reducers';
import { setEmail } from 'store/reducers/AuthSlice';
import { validationEmailSchema } from 'validation';

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
    resolver: yupResolver(validationEmailSchema),
    mode: 'onBlur',
    defaultValues: {
      email: '',
    },
  });

  const [checkEmail] = useCheckEmailMutation();

  const onSubmit = async (data: IEmailFormInput) => {
    try {
      localStorage.setItem('email', data.email);
      const response = await checkEmail(data).unwrap();

      if (response !== null) {
        throw {
          originalStatus: ErrorStatus.BAD_REQUEST,
        };
      }
      dispatch(setEmail(data));
      navigate(TO_SIGN_UP_END);
    } catch (e) {
      const error = e as IErrorData;

      dispatch(
        setError(
          t(
            error.originalStatus === ErrorStatus.BAD_REQUEST
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
      <StyledForm onSubmit={handleSubmit(onSubmit)}>
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
