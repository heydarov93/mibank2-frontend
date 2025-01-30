import { CSSProperties, ReactNode } from 'react';
import Carousel from 'react-material-ui-carousel';

interface MiCarouselProps {
  children: ReactNode[];
  indicatorIconButtonStyles?: CSSProperties;
  activeIndicatorIconButtonStyles?: CSSProperties;
  navButtonStyles?: CSSProperties;
}

const MiCarousel: React.FC<MiCarouselProps> = ({
  children,
  indicatorIconButtonStyles,
  activeIndicatorIconButtonStyles,
  navButtonStyles,
}: MiCarouselProps) => {
  return (
    <Carousel
      indicators
      animation="slide"
      interval={3000}
      navButtonsAlwaysVisible
      stopAutoPlayOnHover
      swipe
      indicatorIconButtonProps={{
        style: indicatorIconButtonStyles,
      }}
      activeIndicatorIconButtonProps={{
        style: activeIndicatorIconButtonStyles,
      }}
      navButtonsProps={{
        style: navButtonStyles,
      }}
    >
      {children}
    </Carousel>
  );
};

export default MiCarousel;
