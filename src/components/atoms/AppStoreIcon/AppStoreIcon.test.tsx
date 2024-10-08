import { useMediaQuery } from '@mui/material';
import { render } from '@testing-library/react';

import { AppStoreIcon } from './AppStoreIcon';

jest.mock('@mui/material', () => ({
  useMediaQuery: jest.fn(),
}));

describe('AppStoreIcon component', () => {
  it('renders with the correct size for tablets', () => {
    (useMediaQuery as jest.Mock).mockReturnValue(true);

    const { getByTestId } = render(<AppStoreIcon />);
    const icon = getByTestId('app-store-icon');

    expect(icon).toHaveAttribute('width', '139');
    expect(icon).toHaveAttribute('height', '40');
  });

  it('renders with the correct size for larger screens', () => {
    (useMediaQuery as jest.Mock).mockReturnValue(false);

    const { getByTestId } = render(<AppStoreIcon />);
    const icon = getByTestId('app-store-icon');

    expect(icon).toHaveAttribute('width', '180');
    expect(icon).toHaveAttribute('height', '52');
  });
});
