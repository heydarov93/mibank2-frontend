import { Box } from '@mui/material';
import { useTranslation } from 'react-i18next';

import { CurrencyCalculator } from '../CurrencyCalculator/CurrencyCalculator';
import { ExchangeRatesTable } from '../ExchangeRatesTable/ExchangeRatesTable';

import {
  StyledContainer,
  StyledSubTitle,
  StyledTitle,
} from './CurrencyExchange.styled';

export function CurrencyExchange() {
  const { t } = useTranslation('translation', {
    keyPrefix: 'Homepage.currencyExchange',
  });
  return (
    <Box marginTop={5} paddingBottom={3}>
      <Box width="80%" maxWidth={800}>
        <Box sx={{ width: '100%' }}>
          <StyledTitle>{t('title')}</StyledTitle>
          <StyledSubTitle marginTop={2}>{t('subTitle')}</StyledSubTitle>
        </Box>
      </Box>
      <StyledContainer>
        <CurrencyCalculator />
        <ExchangeRatesTable />
      </StyledContainer>
    </Box>
  );
}
