import { Typography, useMediaQuery, useTheme } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { StyledBoxContainer } from '../LoginForm/LoginForm.styled';

import { VerificationField } from './VerificationField';
import {
  StyledVerificationBoxTitle,
  StyledVerificationForm,
  StyledVerificationFormContent,
  StyledVerificationSubTitle,
  StyledVerificationTitle,
} from './VerificationForm.styled';

import { Logo, ELogoSize } from 'components/atoms';

const mockEmail = 'user1@gmail.com';

export const VerificationForm = () => {
  const { t } = useTranslation('translation');

  const [values, setValues] = useState(Array(6).fill(''));

  const theme = useTheme();
  const isDesctopView = useMediaQuery(theme.breakpoints.up('md'));

  return (
    <StyledBoxContainer>
      <Logo size={ELogoSize.MEDIUM} />
      <StyledVerificationBoxTitle>
        <StyledVerificationTitle>
          {t('VerificationPage.verificationTitle')}
        </StyledVerificationTitle>
        <StyledVerificationSubTitle>
          {isDesctopView
            ? t('VerificationPage.verificationTextMd')
            : t('VerificationPage.verificationTextSm')}{' '}
          {mockEmail}
        </StyledVerificationSubTitle>
      </StyledVerificationBoxTitle>
      <StyledVerificationForm>
        <StyledVerificationFormContent>
          <VerificationField />
        </StyledVerificationFormContent>
      </StyledVerificationForm>
      <Typography
        textAlign="center"
        sx={{
          marginTop: '20px',
          fontWeight: 500,
          color: '#1847C1',
          fontSize: `${isDesctopView ? `16px` : `12px`}`,
        }}
      >
        {t('VerificationPage.recendCodeInTime')}
      </Typography>
    </StyledBoxContainer>
  );
};
