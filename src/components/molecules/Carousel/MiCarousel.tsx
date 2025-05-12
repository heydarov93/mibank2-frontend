import { SxProps, useTheme } from '@mui/material';
import { CSSProperties, ReactNode } from 'react';
import Carousel from 'react-material-ui-carousel';

interface MiCarouselProps {
  children: ReactNode[];
  indicatorIconButtonStyles?: CSSProperties;
  activeIndicatorIconButtonStyles?: CSSProperties;
  navButtonStyles?: CSSProperties;
  sx?: SxProps;
}

const MiCarousel: React.FC<MiCarouselProps> = ({
  children,
  indicatorIconButtonStyles,
  activeIndicatorIconButtonStyles,
  navButtonStyles,
  sx,
}: MiCarouselProps) => {
  const theme = useTheme();

  return (
    <Carousel
      indicators
      animation="slide"
      interval={3000}
      navButtonsAlwaysVisible
      stopAutoPlayOnHover
      swipe
      indicatorIconButtonProps={{
        style: {
          color: 'transparent',
          width: '10px',
          height: '10px',
          margin: '0 10px',
          border: `1px solid ${theme.palette.primary.main}`,
          ...indicatorIconButtonStyles,
        },
      }}
      activeIndicatorIconButtonProps={{
        style: {
          color: 'transparent',
          background: theme.palette.primary.main,
          width: '20px',
          height: '10px',
          borderRadius: '10px',
          ...activeIndicatorIconButtonStyles,
        },
      }}
      navButtonsProps={{
        style: {
          backgroundColor: 'transparent',
          color: theme.palette.common.white,
          marginTop: '-20px',
          ...navButtonStyles,
        },
      }}
      sx={{
        '& > div:first-child': {
          borderRadius: '8px',
          overflow: 'hidden',
        },
        ...sx,
      }}
    >
      {children}
    </Carousel>
  );
};

export default MiCarousel;
