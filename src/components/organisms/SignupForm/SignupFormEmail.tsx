import { yupResolver } from '@hookform/resolvers/yup';
import { Box } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import {
  StyledForm,
  StyledFormContent,
  StyledFormTitle,
  StyledLable,
} from './SignupForm.styled';

import { ButtonLink, InputField, SubmitButton } from 'components/atoms';
import { validationEmailSchema } from 'constants/validationShemas';
import { IEmailFormInput } from 'models/IAuth';

export const SignupFormEmail = () => {
  const { t } = useTranslation('translation');

  const navigate = useNavigate();

  const {
    formState: { errors },
    control,
    handleSubmit,
    resetField,
    //TODO: logic for reset form
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    reset: resetForm,
  } = useForm<IEmailFormInput>({
    resolver: yupResolver(validationEmailSchema),
    mode: 'onBlur',
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = async (data: IEmailFormInput) => {
    //TODO: logic for submit
    // eslint-disable-next-line no-console
    console.log(data);
    navigate('/signup-end');
  };

  const handleCleanField = () => {
    if (errors.email) resetField('email');
  };

  return (
    <>
      <StyledFormTitle>{t('SignupPage.formTitle')}</StyledFormTitle>
      <StyledForm onSubmit={handleSubmit(onSubmit)}>
        <StyledFormContent>
          <Box sx={{ width: '100%' }}>
            <StyledLable htmlFor="email">
              {t('LoginPage.email.label')}
            </StyledLable>
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
