import { Button, CircularProgress } from '@mui/material';
import { useTranslation } from 'react-i18next';

import { StyledStack, StyledCarouselContainer } from './OffersCarousel.styled';

import { Offer, useGetOfferImagesQuery } from 'api/getOffersApi';
import MiCarousel from 'components/molecules/Carousel/MiCarousel';
import { OfferSlide } from 'components/molecules/OfferSlide/OfferSlide';

export const OffersCarousel = () => {
  const { t } = useTranslation('translation', {
    keyPrefix: 'Homepage.offers',
  });
  const {
    data: images,
    isLoading,
    isError,
    refetch,
  } = useGetOfferImagesQuery();
  // TODO replace these mock offers with real values when api for them is ready
  const mockOffers: Offer[] =
    images?.imageFiles.map((img) => ({
      banner: `data:image/png;base64,${img}`,
      name: 'All Banks in one',
      description: 'Track the money you spend in our new mobile app',
    })) ?? [];

  if (isError) {
    return (
      <StyledStack data-testid="offers-slider-error">
        {t('errorMessage')}
        <Button onClick={refetch} variant="contained">
          Retry
        </Button>
      </StyledStack>
    );
  }

  if (isLoading) {
    return (
      <StyledStack>
        <CircularProgress />
      </StyledStack>
    );
  }

  if (mockOffers.length === 0) {
    return null;
  }

  return (
    <StyledCarouselContainer data-testid="offers-slider">
      <MiCarousel>
        {mockOffers.map((offer, index) => (
          <OfferSlide key={index} {...offer} />
        ))}
      </MiCarousel>
    </StyledCarouselContainer>
  );
};
