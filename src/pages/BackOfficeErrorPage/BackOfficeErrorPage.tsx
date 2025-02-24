import { Box } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';

import {
  MainContainer,
  SecondaryText,
  MainHeader,
} from './BackOfficeErrorPage.styled';

import { StyledLogo, StyledIcon } from 'components/atoms/Logo/Logo.styled';
import ReloadButton from 'components/atoms/ReloadButton/ReloadButton';

const BackOfficeErrorPage = () => {
  const { t } = useTranslation('translation', { keyPrefix: 'BackOffice' });

  return (
    <MainContainer sx={{ position: 'relative' }}>
      <Box sx={{ position: 'absolute', left: '40px', top: '40px' }}>
        <SecondaryText>Millenium Bank</SecondaryText>
        <StyledLogo isSmall={false}>
          <StyledIcon isWhite={true} />
        </StyledLogo>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '12px',
        }}
      >
        <MainHeader>{t('ErrorPage.serviceUnavailable')}</MainHeader>
        <SecondaryText>{t('ErrorPage.refresh')}</SecondaryText>
        <ReloadButton sx={{ color: 'white' }} />
      </Box>
    </MainContainer>
  );
};

export default BackOfficeErrorPage;
