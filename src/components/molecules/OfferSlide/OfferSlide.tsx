import { useTranslation } from 'react-i18next';

import {
  StyledSlideWrapper,
  StyledImgBanner,
  StyledContentWrapper,
  StyledTitle,
  StyledDesc,
  StyledOverlay,
  StyledButton,
} from './OfferSlide.styled';

import { Offer } from 'api/getOffersApi';

type OfferSlideProps = Offer;

export const OfferSlide = ({ name, description, banner }: OfferSlideProps) => {
  const { t } = useTranslation('translation', { keyPrefix: 'MainPage' });

  return (
    <StyledSlideWrapper data-testid="offers-slider-slide">
      <StyledImgBanner src={banner} />
      <StyledContentWrapper>
        <StyledTitle>{name}</StyledTitle>
        <StyledDesc>{description}</StyledDesc>
      </StyledContentWrapper>
      <StyledOverlay />
      <StyledButton>{t('viewOffers.learnMore')}</StyledButton>
    </StyledSlideWrapper>
  );
};
