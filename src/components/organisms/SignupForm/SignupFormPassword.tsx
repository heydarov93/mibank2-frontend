import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Box, useTheme, Typography } from '@mui/material';
import { useState } from 'react';
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

import {
  CheckboxWithLabel,
  PasswordField,
  PasswordTooltip,
} from 'components/molecules';
import { validationLoginSchema } from 'constants/validationShemas';
import { IFormInput } from 'models/IAuth';


export const SignupFormPassword = () => {

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
      password: '',
      confirmPassword: '',
      checkbox: true,
    },
  });
  //TODO: handle with disable form
  const [isFormDisabled, setIsFormDisabled] = useState(false);
    
  const onSubmit = async (data: IFormInput) => {
    console.log(data);
  };
  
  const handleCleanField = () => {
    if (errors.password) resetField('password');
    if (errors.password) resetField('confirmPassword');
    navigate('/verification');
  };

  return (
    <>
      <StyledFormTitle>{t('SignupPage.formTitle')}</StyledFormTitle>
      <StyledForm onSubmit={handleSubmit(onSubmit)}>
        <StyledFormContent>
          <Box sx={{ width: '100%' }}>
            <Box sx={{ display: 'flex' }}>
              <StyledLable htmlFor="password">
                {t('SignupPage.password.label')}
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
                {t('SignupPage.confirmPassword.label')}
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
          control={control}
          errors={errors}
          isFormDisabled={isFormDisabled}
        />
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
}
