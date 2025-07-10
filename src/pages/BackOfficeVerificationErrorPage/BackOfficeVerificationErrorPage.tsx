import { Box } from '@mui/material';
import { useTranslation } from 'react-i18next';

import {
  StyledContainer,
  StyledSecondaryText,
  StyledTitleText,
} from './BackOfficeVerificationErrorPage.styled';

import ReloadButton from 'components/atoms/ReloadButton/ReloadButton';

export const BackOfficeVerificationErrorPage = () => {
  const { t } = useTranslation('translation', {
    keyPrefix: 'OTPVerificationPage',
  });

  return (
    <StyledContainer>
      <Box>
        <StyledTitleText data-testid="title-text">
          {t('QRCodeExpired')}
        </StyledTitleText>
        <StyledSecondaryText data-testid="secondary-text">
          {t('RefreshPage')}
        </StyledSecondaryText>
      </Box>
      <Box sx={{ cursor: 'pointer' }}>
        <ReloadButton data-testid="reload-icon" />
      </Box>
    </StyledContainer>
  );
};
