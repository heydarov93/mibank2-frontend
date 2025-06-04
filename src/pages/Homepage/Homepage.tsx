import { Box } from '@mui/material';

import { StyledCurrencyContainer } from './Homepage.styled';

import { OffersCarousel } from 'components/organisms';
import CurrencyCalculator from 'components/organisms/CurrencyCalculator/CurrencyCalculator';
import { RatesTable } from 'components/organisms/CurrencyExchange/Rates/RatesTable';
import { Title } from 'components/organisms/CurrencyExchange/Title/Title';

export function Homepage() {
  return (
    <Box width="100%">
      <OffersCarousel />
      <Box marginTop={5} paddingBottom={3}>
        <Box width="80%" maxWidth={800}>
          <Title />
        </Box>
        <StyledCurrencyContainer>
          <CurrencyCalculator />
          <RatesTable />
        </StyledCurrencyContainer>
      </Box>
    </Box>
  );
}
