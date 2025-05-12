import { ThemeProvider } from '@mui/material';
import { render } from '@testing-library/react';

import { OffersCarousel } from './OffersCarousel';

import { useGetOfferImagesQuery } from 'api/getOffersApi';
import { theme } from 'theme/theme';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (str: string) => str,
  }),
}));

jest.mock('api/getOffersApi', () => ({
  useGetOfferImagesQuery: jest.fn(),
}));

const renderSlider = () =>
  render(
    <ThemeProvider theme={theme}>
      <OffersCarousel />
    </ThemeProvider>,
  );

describe('ViewOffersSlider', () => {
  it('displays loading spinner', () => {
    (useGetOfferImagesQuery as jest.Mock).mockReturnValue({
      data: undefined,
      isLoading: true,
      isError: false,
    });

    const { getByRole } = renderSlider();
    expect(getByRole('progressbar')).toBeInTheDocument();
  });

  it('displays error message', () => {
    (useGetOfferImagesQuery as jest.Mock).mockReturnValue({
      data: undefined,
      isLoading: false,
      isError: true,
    });

    const { getByTestId } = renderSlider();
    expect(getByTestId('offers-slider-error')).toBeInTheDocument();
  });

  it('displays carousel with correct amount of offers', () => {
    (useGetOfferImagesQuery as jest.Mock).mockReturnValue({
      data: {
        imageFiles: ['img1.jpg', 'img2.jpg', 'img3.jpg'],
      },
      isLoading: false,
      isError: false,
    });

    const { getByTestId, getAllByTestId } = renderSlider();
    expect(getByTestId('offers-slider')).toBeInTheDocument();
    expect(getAllByTestId('offers-slider-slide')).toHaveLength(3);
  });
});
