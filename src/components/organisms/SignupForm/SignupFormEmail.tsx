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
} from './SignupForm.styled';

import { useCheckEmailMutation } from 'api/checkEmailApi';
import { ButtonLink, InputField, SubmitButton } from 'components/atoms';
import { TO_CREATE_PASSWORD, TO_SIGN_IN } from 'constants/routesName';
import { ErrorStatus } from 'enums';
import { useAppDispatch, useAppSelector } from 'hooks';
import { IEmailFormInput } from 'models/IAuth';
import { IErrorData } from 'models/IError';
import { setError } from 'store/reducers';
import { setEmail } from 'store/reducers/AuthSlice';
import { errorMessage } from 'store/selectors';
import { validationEmailSchema } from 'validation';

export const SignupFormEmail = () => {
  const { t } = useTranslation('translation');
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const {
    formState: { errors, isValid, touchedFields },
    control,
    handleSubmit,
    resetField,
    reset: resetForm,
    setError: setFormError,
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
      navigate(TO_CREATE_PASSWORD);
      resetForm();
    } catch (e) {
      const error = e as IErrorData;
      switch (error.status) {
        case ErrorStatus.BAD_REQUEST:
          setFormError(
            'email',
            {
              type: 'focus',
              message: t('SignupPage.email.errorEmailRegistered'),
            },
            { shouldFocus: true },
          );
          break;
        default:
          dispatch(setError(t('LoginPage.serverError')));
          break;
      }
    }
  };

  const handleCleanField = () => {
    if (errors.email) resetField('email');
  };

  const errorMsg = useAppSelector(errorMessage);
  const isShake = t('SignupPage.email.errorEmailRegistered') === errorMsg;
  const isValidEmail = isValid && !errors.email && touchedFields.email;
  return (
    <>
      <StyledFormTitle>{t('SignupPage.formTitle')}</StyledFormTitle>
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
              placeholder="example@gmail.com"
            />
          </Box>
        </StyledFormContent>
        <SubmitButton
          onClick={handleCleanField}
          buttonContent={t('SignupPage.buttonLabelContinue')}
          isDisabled={!isValidEmail}
        />
      </StyledForm>
      <ButtonLink
        message="SignupPage.haveAccountMsg"
        linkText="SignupPage.moveToLoginLink"
        href={TO_SIGN_IN}
        delay={0.5}
        shake={isShake}
      />
    </>
  );
};
