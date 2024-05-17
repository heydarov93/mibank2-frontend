import { yupResolver } from '@hookform/resolvers/yup';
import {
  VisibilityOutlined,
  VisibilityOffOutlined,
  HighlightOff,
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
} from '@mui/material';
import { SyntheticEvent, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { ErrorNotification } from '../ErrorNotification/ErrorNotification';
import { policyLink, termsLink } from '../Footer/constants';

import {
  AgreementContainer,
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

import { Logo } from 'components/atoms/Logo';
import { ELogoSize } from 'components/atoms/Logo/Logo';
import { validationLoginSchema } from 'constants/validationShemas';
import { useAppDispatch } from 'hooks/hook';
import { signInUser, setError } from 'store/reducers/AuthSlice';

interface IFormInput {
  email: string;
  password: string;
  checkbox?: boolean;
}
export const LoginForm = () => {
  const { t } = useTranslation('translation');
  const dispatch = useAppDispatch();
  const {
    formState: { errors },
    control,
    handleSubmit,
    resetField,
  } = useForm<IFormInput>({
    resolver: yupResolver(validationLoginSchema),
    mode: 'onBlur',
    defaultValues: {
      email: '',
      password: '',
      checkbox: false,
    },
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowHint = () =>
    // eslint-disable-next-line no-alert
    alert(
      'Password should have at least 1 one character in uppercase and one in lowercase',
    );

  const handleClear = () => resetField('email');
  const preventChange = (e: SyntheticEvent) => {
    e.preventDefault();
  };

  const navigate = useNavigate();

  const onSubmit = async (data: IFormInput) => {
    try {
      dispatch(signInUser({ username: data.email, password: data.password }));
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

  const generateRandomParam = () => {
    return `?${Math.random().toString(36).substring(7)}`;
  };

  const urlTerms = `${termsLink}${generateRandomParam()}`;
  const urlPolicy = `${policyLink}${generateRandomParam()}`;

  return (
    <StyledBoxContainer>
      <ErrorNotification/>
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
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          disableRipple
                          aria-label="toggle password visibility"
                          onClick={handleClear}
                          onMouseDown={handleMouseDown}
                          edge="end"
                        >
                          {field.value ? <HighlightOff /> : null}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              )}
            />
          </Box>
          <Box sx={{ width: '100%' }}>
            <Box sx={{ display: 'flex' }}>
              <StyledLable htmlFor="password">
                {t('LoginPage.password.label')}
              </StyledLable>

              <StyledErrorHint>
                <ErrorOutline fontSize="small" onClick={handleClickShowHint} />
              </StyledErrorHint>
            </Box>
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <StyledTextField
                  fullWidth
                  id="password"
                  helperText={errors.password?.message}
                  className={errors.password ? 'shake' : ''}
                  error={!!errors.password}
                  type={showPassword ? 'text' : 'password'}
                  // prevent ctrl+V past
                  onCut={preventChange}
                  onCopy={preventChange}
                  onPaste={preventChange}
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
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDown}
                            edge="end"
                          >
                            {showPassword ? (
                              <VisibilityOutlined />
                            ) : (
                              <VisibilityOffOutlined />
                            )}
                          </IconButton>
                        </Tooltip>
                      </InputAdornment>
                    ),
                  }}
                />
              )}
            />
          </Box>
        </StyledFormContent>
        <CheckboxStyledContainer>
          <Controller
            name="checkbox"
            control={control}
            render={({ field }) => (
              <Checkbox
                disableRipple
                size="small"
                sx={{
                  color: 'grey',
                  padding: '8px',
                  '&.Mui-checked': {
                    color: 'primary',
                  },
                }}
                {...field}
              />
            )}
          />

          <AgreementContainer variant="body2">
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
          <Button size="large" variant="contained" fullWidth type="submit">
            {t('LoginPage.formBtnSignIn')}
          </Button>
        </StyledButtonContainer>
      </StyledForm>
    </StyledBoxContainer>
  );
};
