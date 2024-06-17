import { yupResolver } from '@hookform/resolvers/yup';
import {
  VisibilityOutlined,
  VisibilityOffOutlined,
  ErrorOutline,
} from '@mui/icons-material';
import {
  IconButton,
  InputAdornment,
  Button,
  Tooltip,
  Checkbox,
  Link,
  Box,
  ClickAwayListener,
  useTheme,
} from '@mui/material';
import { SyntheticEvent, useState } from 'react';
import { useForm, Controller, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { ErrorNotification } from '../ErrorNotification/ErrorNotification';
import { policyLink, termsLink } from '../Footer/constants';

import {
  AgreementContainer,
  BootstrapTooltip,
  CheckboxStyledContainer,
  StyledBoxContainer,
  StyledButtonContainer,
  StyledErrorHint,
  StyledForm,
  StyledFormContent,
  StyledFormTitle,
  StyledLable,
  StyledTextField,
} from './LoginForm.styled';

import { useAuthorizeMutation } from 'api/authApi';
import { Logo } from 'components/atoms/Logo';
import { ELogoSize } from 'components/atoms/Logo/Logo';
import { REG_EXP } from 'constants/regExp';
import { validationLoginSchema } from 'constants/validationShemas';
import { useAppDispatch } from 'hooks/hook';
import { ILoginData, TokenType } from 'models/IAuth';
import { setError, setLoading, setLogIn, loginToApp } from 'store/reducers/AuthSlice';
import { generateRandomParam } from 'utils';
import { localTokenHandler } from 'utils/tokenHandler';

interface IFormInput {
  email: string;
  password: string;
  checkbox?: boolean;
}
export const LoginForm = () => {
  const { t } = useTranslation('translation');
  const dispatch = useAppDispatch();

  const [authorize, { isLoading }] = useAuthorizeMutation();
  const {
    formState: { errors },
    control,
    handleSubmit,
    resetField,
    reset: resetForm,
  } = useForm<IFormInput>({
    resolver: yupResolver(validationLoginSchema),
    mode: 'onBlur',
    defaultValues: {
      email: '',
      password: '',
      checkbox: true,
    },
  });

  const currentPasswordValue = useWatch({
    control,
    name: 'password',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [open, setOpen] = useState(false);

  const [capsLockOn, setCapsLockOn] = useState(false);

  const onKeyUpHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (currentPasswordValue) {
      const stringValue = currentPasswordValue.replace(
        REG_EXP.nonAlphabeticCharactersRegExp,
        '',
      );
      const capsLockIsOn =
        e.getModifierState('CapsLock') ||
        (stringValue.length > 1 &&
          stringValue === currentPasswordValue.toUpperCase());
      setCapsLockOn(capsLockIsOn);
    } else {
      setCapsLockOn(false);
    }
  };

  const handleTooltipClose = () => {
    setOpen(false);
  };

  const handleTooltipOpen = () => {
    setOpen(true);
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleCleanField = () => {
    if (errors.password) resetField('password');
  };
  const preventChange = (e: SyntheticEvent) => {
    e.preventDefault();
  };

  const navigate = useNavigate();

  const theme = useTheme();

  const logIn = async (credentials: ILoginData) => {
    try {
      const data = await authorize(credentials).unwrap();

      localTokenHandler.storeToken(data.accessToken, TokenType.ACCESS);
      localTokenHandler.storeToken(data.refreshToken, TokenType.REFRESH);
      dispatch(setLogIn());
      dispatch(setLoading(true));
      navigate('/');

      resetForm();
    } catch (e) {
      console.log(e);
      // TODO: make redirect to default page
      // navigate('/signin');
    } finally {
      dispatch(setLoading(false));
    }
  };

  const onSubmit = async (data: IFormInput) => {
    try {
      logIn({
        email: data.email,
        password: data.password,
      });
      dispatch(loginToApp(data.email));

      navigate('/');
    } catch (err) {
      if (err instanceof Error) {
        dispatch(setError(err.message));
      } else {
        dispatch(setError('An unknown error occurred'));
      }
    }
  };

  const handleMouseDown = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const title = (
    <Box>
      <div>{t('LoginPage.infoHintTitle')}</div>
      <div>{t('LoginPage.infoHintUpper')}</div>
      <div>{t('LoginPage.infoHintLower')}</div>
      <div>{t('LoginPage.infoHintDigit')}</div>
      <div>{t('LoginPage.infoHintSpecial')}</div>
    </Box>
  );

  const urlTerms = `${termsLink}${generateRandomParam()}`;
  const urlPolicy = `${policyLink}${generateRandomParam()}`;

  return (
    <StyledBoxContainer>
      <ErrorNotification />
      <Logo size={ELogoSize.MEDIUM} />
      <StyledFormTitle>{t('LoginPage.formTitle')}</StyledFormTitle>

      <StyledForm onSubmit={handleSubmit(onSubmit)}>
        <StyledFormContent>
          <Box sx={{ width: '100%' }}>
            <StyledLable htmlFor="email">
              {t('LoginPage.email.label')}
            </StyledLable>

            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <StyledTextField
                  fullWidth
                  id="email"
                  helperText={errors.email?.message}
                  className={errors.email ? 'shake' : ''}
                  error={!!errors.email}
                  placeholder="example@gmail.com"
                  {...field}
                />
              )}
            />
          </Box>
          <Box sx={{ width: '100%' }}>
            <Box sx={{ display: 'flex' }}>
              <StyledLable htmlFor="password">
                {t('LoginPage.password.label')}
              </StyledLable>
              <ClickAwayListener onClickAway={handleTooltipClose}>
                <div>
                  <StyledErrorHint onClick={handleTooltipOpen}>
                    <BootstrapTooltip
                      PopperProps={{
                        disablePortal: true,
                      }}
                      onClose={handleTooltipClose}
                      open={open}
                      disableFocusListener
                      disableHoverListener
                      disableTouchListener
                      placement="right-end"
                      title={title}
                    >
                      <ErrorOutline fontSize="small" />
                    </BootstrapTooltip>
                  </StyledErrorHint>
                </div>
              </ClickAwayListener>
            </Box>
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <StyledTextField
                  fullWidth
                  id="password"
                  helperText={
                    (capsLockOn && 'Caps Lock is pressed!') ||
                    errors.password?.message
                  }
                  className={errors.password ? 'shake' : ''}
                  error={!!errors.password}
                  type={showPassword ? 'text' : 'password'}
                  onCut={preventChange}
                  onCopy={preventChange}
                  placeholder="᛫᛫᛫᛫᛫᛫᛫᛫᛫"
                  {...field}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <Tooltip
                          title={showPassword ? 'Hide' : 'Show'}
                          placement="right"
                        >
                          <IconButton
                            aria-label="toggle password visibility"
                            sx={{ color: theme.palette.grey[300] }}
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDown}
                            edge="end"
                          >
                            {showPassword ? (
                              <VisibilityOffOutlined />
                            ) : (
                              <VisibilityOutlined />
                            )}
                          </IconButton>
                        </Tooltip>
                      </InputAdornment>
                    ),
                  }}
                  onKeyUp={onKeyUpHandler}
                />
              )}
            />
          </Box>
        </StyledFormContent>
        <CheckboxStyledContainer className={errors.checkbox ? 'shake' : ''}>
          <Controller
            name="checkbox"
            control={control}
            render={({ field }) => {
              return (
                <Checkbox
                  disableRipple
                  defaultChecked
                  size="small"
                  sx={{
                    color: errors.checkbox
                      ? theme.palette.error.main
                      : theme.palette.grey[300],
                    padding: '8px',
                    '&.Mui-checked': {
                      color: 'primary',
                    },
                  }}
                  {...field}
                />
              );
            }}
          />

          <AgreementContainer
            variant="body2"
            sx={{
              color: errors.checkbox
                ? theme.palette.error.main
                : theme.palette.common.black,
            }}
          >
            {`${t('LoginPage.termsText')} `}

            <>
              <Link
                href={urlTerms}
                target="_blank"
                color="inherit"
                variant="body2"
                fontWeight={500}
              >
                {t('footer.footerBottom.terms')}
              </Link>

              {` ${t('footer.footerBottom.and')} `}

              <Link
                href={urlPolicy}
                target="_blank"
                color="inherit"
                variant="body2"
                fontWeight={500}
              >
                {t('footer.footerBottom.policy')}
              </Link>
            </>
          </AgreementContainer>
        </CheckboxStyledContainer>
        <StyledButtonContainer>
          <Button
            size="large"
            variant="contained"
            fullWidth
            type="submit"
            onClick={handleCleanField}
          >
            {t('LoginPage.formBtnSignIn')}
          </Button>
        </StyledButtonContainer>
      </StyledForm>
    </StyledBoxContainer>
  );
};
