import { Box } from '@mui/material';
import { useSearchParams } from 'react-router-dom';

import { AllCardsPage } from '..';

import { CurrencyExchange, OffersCarousel } from 'components/organisms';

export const Homepage = () => {
  const [searchParams] = useSearchParams();
  const viewParam = searchParams.get('view');

  if (viewParam === 'cards') {
    return <AllCardsPage />;
  }

  return (
    <Box width="100%">
      <OffersCarousel />
      <CurrencyExchange />
    </Box>
  );
}
