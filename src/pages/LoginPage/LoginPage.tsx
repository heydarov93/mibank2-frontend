import {
  Grid,
  Avatar,
  Typography,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
} from '@mui/material';
import React, { ChangeEvent } from 'react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { LoginPageWrapper } from './LoginPage.styled';
import { StyledPaper } from './LoginPage.styled';
import { StyledButton } from './LoginPage.styled';

import { LockIcon } from 'components/atoms/LockIcon/LockIcon';

export const LoginPage: React.FC = () => {
  const { t } = useTranslation('translation');

  const [loginFormData, setLoginFormData] = useState({
    userName: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSignIn = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    localStorage.setItem('userName', loginFormData.userName);
    localStorage.setItem('password', loginFormData.password);
    setLoginFormData({
      userName: '',
      password: '',
    });
    navigate('/');
  };

  return (
    <LoginPageWrapper>
      <StyledPaper elevation={10}>
        <Grid container justifyContent="center" alignItems="center">
          <Avatar>
            <LockIcon sx={{ fontSize: 30 }} />
          </Avatar>
        </Grid>
        <Grid container justifyContent="center" alignItems="center">
          <Typography variant="h5">{t('LoginPage.formTitle')}</Typography>
        </Grid>
        <TextField
          value={loginFormData.userName}
          onChange={handleChange}
          type="text"
          label={t('LoginPage.userInputLabel')}
          name="userName"
          placeholder="Enter username"
          variant="standard"
          fullWidth
          required
        />
        <TextField
          value={loginFormData.password}
          onChange={handleChange}
          type="password"
          label={t('LoginPage.passwordInputLabel')}
          name="password"
          placeholder="Enter password"
          variant="standard"
          fullWidth
          required
        />
        <FormControlLabel
          control={<Checkbox name="checkedB" color="primary" />}
          label={t('LoginPage.formText')}
        />
        <StyledButton
          type="submit"
          color="primary"
          fullWidth
          variant="contained"
          onClick={handleSignIn}
        >
          {t('LoginPage.formBtnSignIn')}
        </StyledButton>
        <Typography>
          <Link href="#">{t('LoginPage.formPassText')}</Link>
        </Typography>
        <Typography>
          {t('LoginPage.formSubTitle')}
          <Link href="#" sx={{ paddingLeft: '8px' }}>
            {t('LoginPage.formBtnSignUp')}
          </Link>
        </Typography>
      </StyledPaper>
    </LoginPageWrapper>
  );
};
