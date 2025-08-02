import Box from '@mui/material/Box';
import { useSearchParams } from 'react-router-dom';

import { CurrencyExchange, OffersCarousel } from 'components/organisms';
import { AllCardsPage } from 'pages/AllCardsPage/AllCardsPage';

export const HomeLayout = () => {
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
};
