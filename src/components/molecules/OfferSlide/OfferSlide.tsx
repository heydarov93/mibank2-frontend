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

import { IOffer } from 'api/services/offer-service/offers.types';

type OfferSlideProps = IOffer;

export const OfferSlide = ({ name, description, banner }: OfferSlideProps) => {
  const { t } = useTranslation('translation', {
    keyPrefix: 'Homepage.offers',
  });

  return (
    <StyledSlideWrapper data-testid="offers-slider-slide">
      <StyledImgBanner src={banner} />
      <StyledContentWrapper>
        <StyledTitle>{name}</StyledTitle>
        <StyledDesc>{description}</StyledDesc>
      </StyledContentWrapper>
      <StyledOverlay />
      <StyledButton>{t('learnMore')}</StyledButton>
    </StyledSlideWrapper>
  );
};
