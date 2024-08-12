import { Typography, Link } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { ErrorPageWrapper, StyledBox } from './ErrorPage.styled';

export const ErrorPage: React.FC = () => {
  const { t } = useTranslation('translation', {
    keyPrefix: 'ErrorPage',
  });
  return (
    <ErrorPageWrapper>
      <StyledBox>
        <Typography variant="h2">{t('title')}</Typography>
        <Typography variant="body1">{t('subTitle')}</Typography>
        <Typography variant="body1">
          {t('text')} <Link href="/">{t('linkText')}</Link>
        </Typography>
      </StyledBox>
    </ErrorPageWrapper>
  );
};
