import { Typography, Link } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { ErrorPageWrapper, StyledBox } from './ErrorPage.styled';

export const ErrorPage: React.FC = () => {
  const { t } = useTranslation('translation');
  return (
    <ErrorPageWrapper>
      <StyledBox>
        <Typography variant="h2">{t('ErrorPage.title')}</Typography>
        <Typography variant="body1">{t('ErrorPage.subTitle')}</Typography>
        <Typography variant="body1">
          {t('ErrorPage.text')} <Link href="#">{t('ErrorPage.linkText')}</Link>
        </Typography>
      </StyledBox>
    </ErrorPageWrapper>
  );
};
