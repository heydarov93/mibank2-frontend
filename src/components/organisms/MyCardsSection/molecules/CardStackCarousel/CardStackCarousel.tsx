import { useTheme } from '@mui/material/styles';
import { ReactNode } from 'react';
import Carousel from 'react-material-ui-carousel';
import { CarouselProps } from 'react-material-ui-carousel/dist/components/types';

import { CARD_STACK_CAROUSEL_DURATION } from 'constants/ui/layout';

type CardStackCarouselProps = CarouselProps & {
  children: ReactNode[];
};

export function CardStackCarousel(props: CardStackCarouselProps) {
  const theme = useTheme();
  const { children, ...restProps } = props;
  return (
    <Carousel
      {...restProps}
      cycleNavigation={false}
      fullHeightHover={false}
      autoPlay={false}
      indicators={false}
      animation="fade"
      duration={CARD_STACK_CAROUSEL_DURATION}
      navButtonsAlwaysVisible
      stopAutoPlayOnHover
      swipe={false}
      navButtonsWrapperProps={{
        style: {
          display: 'flex',
          alignItems: 'center',
          height: '24px',
          top: 'calc(50% - 12px)',
        },
      }}
      navButtonsProps={{
        style: {
          top: 'unset!important',
          opacity: 'unset!important',
          padding: 0,
          marginInline: theme.spacing(4.5),
          color: theme.palette.common.black,
          boxShadow: `0 4px 4px 0 #00000040`,
          backgroundColor: theme.palette.common.white,
        },
      }}
      sx={{ width: '100%', zIndex: 1 }}
    >
      {children}
    </Carousel>
  );
}
