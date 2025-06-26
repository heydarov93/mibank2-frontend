import { Box } from '@mui/material';
import { useSearchParams } from 'react-router-dom';

import { AllCardsPage } from '..';

import { StyledCurrencyContainer } from './Homepage.styled';

import { OffersCarousel } from 'components/organisms';
import CurrencyCalculator from 'components/organisms/CurrencyCalculator/CurrencyCalculator';
import { RatesTable } from 'components/organisms/CurrencyExchange/Rates/RatesTable';
import { Title } from 'components/organisms/CurrencyExchange/Title/Title';

export function Homepage() {
  const [searchParams] = useSearchParams();
  const viewParam = searchParams.get('view');

  if (viewParam === 'cards') {
    return <AllCardsPage />;
  }

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
