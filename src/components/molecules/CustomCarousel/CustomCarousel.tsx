import { SxProps, useTheme } from '@mui/material';
import { CSSProperties, ReactNode } from 'react';
import Carousel from 'react-material-ui-carousel';

interface CustomCarouselProps {
  children: ReactNode[];
  indicatorIconButtonStyles?: CSSProperties;
  activeIndicatorIconButtonStyles?: CSSProperties;
  navButtonStyles?: CSSProperties;
  sx?: SxProps;
}

export const CustomCarousel: React.FC<CustomCarouselProps> = ({
  children,
  indicatorIconButtonStyles,
  activeIndicatorIconButtonStyles,
  navButtonStyles,
  sx,
}: CustomCarouselProps) => {
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
        '& > div:first-of-type': {
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

