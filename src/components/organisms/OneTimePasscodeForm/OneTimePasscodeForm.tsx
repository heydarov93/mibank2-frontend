import { Box } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';

import OneTimePasscode from './OneTimePasscode';

import { SubmitButton, SecondaryButton } from 'components/atoms';

export const OneTimePasscodeForm = () => {
  const { t } = useTranslation('translation');

  return (
    <form>
      <Box
        sx={{
          display: 'flex',
          gap: '8px',
        }}
      >
        <OneTimePasscode />
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          gap: '12px',
          alignItems: 'center',
        }}
      >
        <SecondaryButton
          buttonContent={t('OTPVerificationPage.cancelButtonText')}
        />
        <SubmitButton
          buttonContent={t('OTPVerificationPage.confirmButtonText')}
        />
      </Box>
    </form>
  );
};
