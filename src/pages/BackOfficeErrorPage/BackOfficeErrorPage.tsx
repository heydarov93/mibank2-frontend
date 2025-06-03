import { Box } from '@mui/material';
import { useTranslation } from 'react-i18next';

import {
  MainContainer,
  SecondaryText,
  MainHeader,
} from './BackOfficeErrorPage.styled';

import { Logo } from 'components/atoms';
import ReloadButton from 'components/atoms/ReloadButton/ReloadButton';

const BackOfficeErrorPage = () => {
  const { t } = useTranslation('translation', { keyPrefix: 'BackOffice' });

  return (
    <MainContainer sx={{ position: 'relative' }}>
      <Box position="absolute" left="40px" top="40px">
        <Logo color="white" />
      </Box>
      <Box display="flex" flexDirection="column" alignItems="center" gap={1.5}>
        <MainHeader>{t('ErrorPage.serviceUnavailable')}</MainHeader>
        <SecondaryText>{t('ErrorPage.refresh')}</SecondaryText>
        <ReloadButton sx={{ color: 'white' }} />
      </Box>
    </MainContainer>
  );
};

export default BackOfficeErrorPage;
