import { Box } from '@mui/material';
import React, { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import OneTimePasscode from './OneTimePasscode';
import {
  CancelButton,
  StyledCancelContainer,
} from './OneTimePasscodeForm.styled';

import { SubmitButton } from 'components/atoms';

export const OneTimePasscodeForm = () => {
  const { t } = useTranslation('translation');

  const [otp, setOtp] = useState<string[]>(new Array(6).fill(''));
  const inputRefs = useRef<(HTMLInputElement | null)[]>(Array(6).fill(''));
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

  return (
    <form>
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
        />
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
    </form>
  );
};
