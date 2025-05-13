import { Alert, Box, CircularProgress, Typography } from '@mui/material';
import React, { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';

import { useLogInMutation } from 'api/employeeLogInApi';
import { ELogoSize, Logo, SubmitButton } from 'components/atoms';
import OneTimePasscode from 'components/organisms/OneTimePasscodeForm/OneTimePasscode';
import {
  CancelButton,
  StyledCancelContainer,
} from 'components/organisms/OneTimePasscodeForm/OneTimePasscodeForm.styled';
import { TO_BACK_OFFICE_VIEW_EMPLOYEES } from 'constants/routesName';
import { TokenType } from 'models/IAuth';
import { getEmailRoleFromToken } from 'utils/getEmailFromToken';
import { setEmployeeAuthData } from 'utils/storageAuthHandler';
import { sessionTokenHandler } from 'utils/tokenHandler';

const BackOfficeVerifyEmployeeCode = () => {
  const { t } = useTranslation('translation');

  const [otp, setOtp] = useState<string[]>(new Array(6).fill(''));
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isError, setIsError] = useState<boolean>(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>(Array(6).fill(''));

  const [logIn, { isLoading }] = useLogInMutation();
  const navigate = useNavigate();
  const location = useLocation();

  const handleChange = (value: string, index: number) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < otp.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };
  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>,
    index: number,
  ) => {
    if (event.key === 'Backspace') {
      event.preventDefault();
      const newOtp = [...otp];
      if (otp[index]) {
        newOtp[index] = '';
      } else if (index > 0) {
        newOtp[index - 1] = '';
        inputRefs.current[index - 1]?.focus();
      }
      setOtp(newOtp);
    }
  };

  const handleCancel = () => {
    setOtp(new Array(6).fill(''));
    inputRefs.current[0]?.focus();
  };

  const email = location.state?.email;
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) return;

    try {
      const response = await logIn({
        email: email,
        code: otp.join(''),
      }).unwrap();
      if (response) {
        const res = getEmailRoleFromToken(response.accessToken);
        setEmployeeAuthData(true, res?.email, res?.role);
        sessionTokenHandler.storeToken(response.accessToken, TokenType.ACCESS);
        navigate(TO_BACK_OFFICE_VIEW_EMPLOYEES);
      }
    } catch (e) {
      setIsError(true);
      const error = e as { data: { exceptionMessage: string } };
      setErrorMessage(
        error?.data?.exceptionMessage ||
          t('OTPVerificationPage.errors.errorCommon'),
      );
    }
  };

  return (
    <>
      <form
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '12px',
          justifyContent: 'center',
          height: '100vh',
        }}
        onSubmit={onSubmit}
      >
        <Logo size={ELogoSize.MEDIUM} />
        <Typography>{t('OTPVerificationPage.verifyCodeMessage')}</Typography>
        <Box
          sx={{
            display: 'flex',
            gap: '8px',
          }}
        >
          <OneTimePasscode
            otp={otp}
            handleChange={handleChange}
            handleKeyDown={handleKeyDown}
            inputRefs={inputRefs}
            hasError={isError}
          />
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          {isError && <Alert severity="error">{errorMessage}</Alert>}
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            gap: '12px',
            alignItems: 'center',
          }}
        >
          <StyledCancelContainer>
            <CancelButton onClick={handleCancel}>
              {t('OTPVerificationPage.cancelButtonText')}
            </CancelButton>
          </StyledCancelContainer>
          <SubmitButton
            buttonContent={t('OTPVerificationPage.confirmButtonText')}
            isDisabled={otp.join('').length < 6 || isLoading}
          />
        </Box>
        {isLoading && (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              marginTop: '12px',
            }}
          >
            <CircularProgress />
          </Box>
        )}
      </form>
    </>
  );
};

export default BackOfficeVerifyEmployeeCode;
