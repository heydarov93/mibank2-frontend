import Box from '@mui/material/Box';
import { useTranslation } from 'react-i18next';

import {
  StyledContainer,
  StyledSecondaryText,
  StyledTitleText,
} from './BackOfficeVerificationErrorLayout.styled';

import { ReloadButton } from 'components/atoms';


export const BackOfficeVerificationErrorLayout = () => {
  const { t } = useTranslation('translation', {
    keyPrefix: 'OTPVerificationPage',
  });

  return (
    <StyledContainer>
      <Box>
        <StyledTitleText>
          {t('QRCodeExpired')}
        </StyledTitleText>
        <StyledSecondaryText>
          {t('RefreshPage')}
        </StyledSecondaryText>
      </Box>
      <Box sx={{ cursor: 'pointer' }}>
        <ReloadButton data-testid="reload-button" />
      </Box>
    </StyledContainer>
  );
};
