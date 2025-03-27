import { Box, Button, useTheme } from '@mui/material';
import { useState } from 'react';

import MiCarousel from 'components/molecules/Carousel/MiCarousel';
import { AvailableDepositsWindow } from 'components/organisms';
import CurrencyCalculator from 'components/organisms/CurrencyCalculator/CurrencyCalculator';
import { RatesTable } from 'components/organisms/CurrencyExchange/Rates/RatesTable';
import { Title } from 'components/organisms/CurrencyExchange/Title/Title';

const images = [
  'https://i.ibb.co/xXmd9Xn/image-1916.png',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtnvAOajH9gS4C30cRF7rD_voaTAKly2Ntaw&s',
  'https://images.ctfassets.net/hrltx12pl8hq/28ECAQiPJZ78hxatLTa7Ts/2f695d869736ae3b0de3e56ceaca3958/free-nature-images.jpg?fit=fill&w=1200&h=630',
];

const Homepage = () => {
  const theme = useTheme();
  const [isWindowOpen, setIsWindowOpen] = useState<boolean>(false);

  const handleWindowClose = () => {
    setIsWindowOpen(false);
  };

  return (
    <Box display={'flex'} width={'100%'}>
      <Box width={'20%'} padding={5}>
        My cards
      </Box>
      <Box width={'80%'}>
        <Box marginTop={5}>
          <Box sx={{ position: 'relative', width: '974px', height: '197px' }}>
            <MiCarousel
              indicatorIconButtonStyles={{
                color: theme.palette.grey[200],
                width: '10px',
                height: '10px',
                margin: '0 5px',
              }}
              activeIndicatorIconButtonStyles={{
                color: theme.palette.primary.main,
              }}
              navButtonStyles={{
                backgroundColor: 'transparent',
                color: theme.palette.common.white,
                marginTop: '-15px',
              }}
            >
              {images.map((image, index) => (
                <Box
                  key={index}
                  component="img"
                  src={image}
                  alt={`Product Offers ${index + 1}`}
                  sx={{
                    width: '974px',
                    height: '197px',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 0,
                  }}
                />
              ))}
            </MiCarousel>
            <Button
              color="inherit"
              size="large"
              sx={{
                position: 'absolute',
                bottom: 50,
                left: 75,
                borderRadius: '8px',
                backgroundColor: theme.palette.common.white,
                zIndex: 1,
                padding: '8px 24px',
                height: '48px',
                fontSize: '14px',
              }}
            >
              Learn more
            </Button>
          </Box>
        </Box>
        <Box marginTop={5} paddingBottom={3} width={'90%'}>
          <Title />
          <Box display={'flex'} width={'100%'} marginTop={3}>
            <Box width={'50%'}>
              <CurrencyCalculator />
            </Box>
            <RatesTable />
          </Box>
        </Box>
        <AvailableDepositsWindow
          onClose={handleWindowClose}
          isOpen={isWindowOpen}
        />
      </Box>
    </Box>
  );
};

export default Homepage;
