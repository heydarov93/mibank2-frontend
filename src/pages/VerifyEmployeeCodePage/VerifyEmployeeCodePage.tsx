import { Alert, Box, CircularProgress } from '@mui/material';
import React, {
  FormEvent,
  useCallback,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';

import {
  StyledButtonGroup,
  StyledFormContainer,
  StyledPasswordRow,
  StyledSubTitle,
  StyledTitle,
  StyledTitleContainer,
} from './VerifyEmployeeCodePage.styled';

import { useAuthenticateEmployeeMutation } from 'api/services/employee-service/employees.api';
import { Logo, SubmitButton } from 'components/atoms';
import { OneTimePasscode } from 'components/molecules';
import { TO_BACK_OFFICE_VIEW_EMPLOYEES } from 'constants/navigation/routePaths';
import { DEFAULT_BREAKPOINT_KEYS } from 'constants/ui/layout';
import { OTP_CODE_LENGHT, OTP_INPUT_KEY } from 'constants/validation/otp';
import { ETokenType } from 'enums';
import { getEmailRoleFromToken } from 'utils/auth/emailFromTokenHandler';
import { setEmployeeAuthData } from 'utils/auth/storageAuthHandler';
import { sessionTokenHandler } from 'utils/auth/tokenHandler';

export const VerifyEmployeeCodePage = () => {
  const { t } = useTranslation('translation', {
    keyPrefix: 'OTPVerificationPage',
  });
  const navigate = useNavigate();
  const email = (useLocation().state as { email?: string })?.email;
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [otp, setOtp] = useState<string[]>(Array(OTP_CODE_LENGHT).fill(''));
  const inputRefs = useRef<Array<HTMLInputElement | null>>(
    Array(OTP_CODE_LENGHT).fill(null),
  );
  const [authenticate, { isLoading }] = useAuthenticateEmployeeMutation();

  const otpValue = useMemo(() => otp.join(''), [otp]);
  const isError = Boolean(errorMessage);
  const isSubmitDisabled = otpValue.length < OTP_CODE_LENGHT || isLoading;

  const handleChange = (value: string, idx: number) => {
    if (!/^[0-9]?$/.test(value)) return;
    setOtp((prev) => {
      const next = [...prev];
      next[idx] = value;
      return next;
    });
    if (value && idx < OTP_CODE_LENGHT - 1) {
      inputRefs.current[idx + 1]?.focus();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    idx: number,
  ) => {
    if (e.key !== OTP_INPUT_KEY.Backspace) return;
    e.preventDefault();
    setOtp((prev) => {
      const next = [...prev];
      if (next[idx]) {
        next[idx] = '';
      } else if (idx > 0) {
        next[idx - 1] = '';
        inputRefs.current[idx - 1]?.focus();
      }
      return next;
    });
  };

  const handleSubmit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();
      if (!email) return;
      setErrorMessage(null);
      try {
        const response = await authenticate({ email, code: otpValue }).unwrap();
        const { email: userEmail, role } =
          getEmailRoleFromToken(response.accessToken) || {};
        setEmployeeAuthData(true, userEmail, role);
        sessionTokenHandler.storeToken(response.accessToken, ETokenType.ACCESS);
        navigate(TO_BACK_OFFICE_VIEW_EMPLOYEES);
      } catch {
        setErrorMessage(t('errors.errorCommon'));
      }
    },
    [authenticate, email, navigate, otpValue],
  );

  return (
    <StyledFormContainer onSubmit={handleSubmit} data-testid="verify-form">
      <Logo size={DEFAULT_BREAKPOINT_KEYS.lg} />
      <StyledTitleContainer>
        <StyledTitle>{t('verifyTitle')}</StyledTitle>
        <StyledSubTitle>{t('verifyCodeMessage')}</StyledSubTitle>
      </StyledTitleContainer>

      <StyledPasswordRow date-testid="one-time-passcode-row">
        <OneTimePasscode
          otp={otp}
          inputRefs={inputRefs}
          handleChange={handleChange}
          handleKeyDown={handleKeyDown}
          hasError={isError}
        />
      </StyledPasswordRow>

      {isError && (
        <Box textAlign="center" my={2}>
          <Alert severity="error">{errorMessage}</Alert>
        </Box>
      )}

      <StyledButtonGroup>
        <SubmitButton
          buttonContent={t('confirmButtonText')}
          isDisabled={isSubmitDisabled || isLoading}
          sx={{ minWidth: '400px', marginTop: 2 }}
          startIcon={
            isLoading ? (
              <CircularProgress size={16} color="inherit" />
            ) : undefined
          }
        />
      </StyledButtonGroup>
    </StyledFormContainer>
  );
};
