import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import { useTranslation } from 'react-i18next';

import { StyledStack, StyledCarouselContainer } from './OffersCarousel.styled';
import { OfferSlide } from './molecules/OfferSlide/OfferSlide';

import { useGetOfferImagesQuery } from 'api/services/offer-service/offers.api';
import { IOffer } from 'api/services/offer-service/offers.types';
import { CustomCarousel } from 'components/molecules';

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
  const mockOffers: IOffer[] =
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
      <CustomCarousel>
        {mockOffers.map((offer, index) => (
          <OfferSlide key={index} {...offer} />
        ))}
      </CustomCarousel>
    </StyledCarouselContainer>
  );
};
