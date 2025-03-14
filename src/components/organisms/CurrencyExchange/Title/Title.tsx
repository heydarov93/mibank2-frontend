import { Box } from '@mui/material';
import { useTranslation } from 'react-i18next';

import { StyledSubTitle, StyledTitle } from './Title.styled';

export const Title = () => {
  const { t } = useTranslation('translation');
  return (
    <Box sx={{ width: '100%' }}>
      <StyledTitle>{t('MainPage.currencyExchange.title')}</StyledTitle>
      <StyledSubTitle sx={{ marginTop: '16px' }}>
        {t('MainPage.currencyExchange.subTitle')}
      </StyledSubTitle>
    </Box>
  );
};
