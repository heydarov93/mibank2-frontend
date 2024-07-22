import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Box, useTheme, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import {
  StyledButtonContainer,
  StyledForm,
  StyledFormContent,
  StyledFormTitle,
  StyledLable,
  StyledSignInLink,
  StyledSignInLinkContainer,
} from './SignupForm.styled';

import { InputField } from 'components/atoms';
import { validationLoginSchema } from 'constants/validationShemas';
import { IFormInput } from 'models/IAuth';

export const SignupFormEmail = () => {
  const { t } = useTranslation('translation');

  const navigate = useNavigate();

  const theme = useTheme();

  const {
    formState: { errors },
    control,
    handleSubmit,
    resetField,
    //TODO: logic for reset form
    reset: resetForm,
  } = useForm<IFormInput>({
    resolver: yupResolver(validationLoginSchema),
    mode: 'onBlur',
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = async (data: IFormInput) => {
    //TODO: logic for submit
    console.log(data);
  };

  const handleCleanField = () => {
    if (errors.email) resetField('email');
    navigate('/signup-end');
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
        <StyledButtonContainer>
          <Button
            size="large"
            variant="contained"
            fullWidth
            type="submit"
            onClick={handleCleanField}
            sx={{
              '&.Mui-disabled': {
                opacity: '0.65',
                color: theme.palette.common.white,
                background: theme.palette.primary.main,
              },
            }}
          >
            {t('SignupPage.buttonLabel')}
          </Button>
        </StyledButtonContainer>
      </StyledForm>
      <StyledSignInLinkContainer>
        <Typography>{t('SignupPage.haveAccountMsg')}</Typography>
        <StyledSignInLink href="/signin">
          {t('SignupPage.moveToLoginLink')}
        </StyledSignInLink>
      </StyledSignInLinkContainer>
    </>
  );
};
