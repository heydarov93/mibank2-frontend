import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import React, { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import {
  CancelButton,
  StyledCancelContainer,
} from './OneTimePasscodeForm.styled';

import { useValidateOTPMutation } from 'api/services/employee-service/employees.api';
import { SubmitButton } from 'components/atoms';
import { OneTimePasscode } from 'components/molecules';
import { BACK_OFFICE_EMPLOYEE_SIGN_IN } from 'constants/navigation/routePaths';
import { OTP_CODE_LENGHT } from 'constants/validation/otp';
import { theme } from 'theme/theme';

export const OneTimePasscodeForm = ({ email }: { email: string | null }) => {
  const { t } = useTranslation('translation');

  const [otp, setOtp] = useState<string[]>(new Array(OTP_CODE_LENGHT).fill(''));
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isError, setIsError] = useState<boolean>(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>(
    Array(OTP_CODE_LENGHT).fill(''),
  );

  const [validateOTP, { isLoading }] = useValidateOTPMutation();
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
    setOtp(new Array(OTP_CODE_LENGHT).fill(''));
    inputRefs.current[0]?.focus();
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) return;

    try {
      const response = await validateOTP({
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
          isDisabled={otp.join('').length < OTP_CODE_LENGHT}
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
