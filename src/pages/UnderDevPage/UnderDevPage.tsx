import { Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { UnderDevPageWrapper, StyledBox } from './UnderDevPage.styled';

export const UnderDevPage: React.FC = () => {
  const { t } = useTranslation('translation');
  return (
    <UnderDevPageWrapper>
      <StyledBox>
        <Typography variant="h3" textAlign="center">
          {t('UnderDevPage.title')}
        </Typography>
      </StyledBox>
    </UnderDevPageWrapper>
  );
};
