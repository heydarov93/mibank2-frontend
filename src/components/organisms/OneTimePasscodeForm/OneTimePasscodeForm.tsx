import { Box, CircularProgress } from '@mui/material';
import React, { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import {
  CancelButton,
  StyledCancelContainer,
} from './OneTimePasscodeForm.styled';
import OneTimePasscode from './molecules/OneTimePasscode';

import { useValidateOtpMutation } from 'api/validateOtpApi';
import { SubmitButton } from 'components/atoms';
import { BACK_OFFICE_EMPLOYEE_SIGN_IN } from 'constants/routesName';
import { theme } from 'theme/theme';

interface OneTimePasscodeFormProps {
  email: string | null;
}

export const OneTimePasscodeForm = ({ email }: OneTimePasscodeFormProps) => {
  const { t } = useTranslation('translation');

  const [otp, setOtp] = useState<string[]>(new Array(6).fill(''));
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isError, setIsError] = useState<boolean>(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>(Array(6).fill(''));

  const [validateOtp, { isLoading }] = useValidateOtpMutation();
  const navigate = useNavigate();

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

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) return;

    try {
      const response = await validateOtp({
        email: email,
        code: otp.join(''),
      }).unwrap();
      if (response) {
        navigate(BACK_OFFICE_EMPLOYEE_SIGN_IN);
      }
    } catch (e) {
      setIsError(true);
      const error = e as { data: { exceptionMessage: string } };
      setErrorMessage(
        error?.data?.exceptionMessage ||
          t('OTPVerificationPage.error.errorCommon'),
      );
    }
  };

  return (
    <form onSubmit={onSubmit}>
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
        {isError && (
          <p style={{ color: theme.palette.error.main }}>{errorMessage}</p>
        )}
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
          isDisabled={otp.join('').length < 6}
        />
      </Box>
      {isLoading && (
        <Box
          sx={{ display: 'flex', justifyContent: 'center', marginTop: '12px' }}
        >
          <CircularProgress />
        </Box>
      )}
    </form>
  );
};
