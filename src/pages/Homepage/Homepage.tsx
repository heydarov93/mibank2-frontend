import { Box, useTheme } from '@mui/material';

import MiCarousel from 'components/molecules/Carousel/MiCarousel';

const images = [
  'https://i.ibb.co/xXmd9Xn/image-1916.png',
  'https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtnvAOajH9gS4C30cRF7rD_voaTAKly2Ntaw&s',
  'https://images.ctfassets.net/hrltx12pl8hq/28ECAQiPJZ78hxatLTa7Ts/2f695d869736ae3b0de3e56ceaca3958/free-nature-images.jpg?fit=fill&w=1200&h=630',
];

const Homepage = () => {
  const theme = useTheme();
  return (
    <Box display={'flex'} width={'100%'}>
      <Box width={'20%'} padding={5}>
        My cards
      </Box>
      <Box width={'80%'}>
        <Box padding={5}>
          <MiCarousel
            indicatorIconButtonStyles={{
              color: theme.palette.grey[200],
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
                  width: '100%',
                  height: '197px',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              />
            ))}
          </MiCarousel>
        </Box>
      </Box>
    </Box>
  );
};

export default Homepage;
