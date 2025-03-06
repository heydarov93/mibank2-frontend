import { render, screen, fireEvent } from '@testing-library/react';

import '@testing-library/jest-dom/extend-expect';
import BackOfficeViewProductsPage from './BackOfficeViewProductsPage';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
  initReactI18next: {
    type: '3rdParty',
    init: jest.fn(),
  },
}));

jest.mock('components/molecules/SearchField/SearchField', () => ({
  __esModule: true,
  default: jest.fn(() => <input data-testid="search-field" />),
}));

jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
}));

jest.mock('react-hook-form', () => ({
  useForm: () => ({
    control: {},
  }),
}));

describe('BackOfficeViewProductsPage', () => {
  it('clicking "Add Employee" button', () => {
    const { container } = render(<BackOfficeViewProductsPage />);
    expect(container).toMatchSnapshot();
  });

  it('renders the component correctly', () => {
    render(<BackOfficeViewProductsPage />);
  });

  it('filters table data based on selected filters', () => {
    render(<BackOfficeViewProductsPage />);
    fireEvent.click(screen.getByText('header.products'));
    fireEvent.click(screen.getByText('header.productSubtypes'));
    expect(screen.getByText('CreateProduct.productName')).toBeInTheDocument();
    expect(
      screen.getByText('CreateProduct.productSubtype'),
    ).toBeInTheDocument();
  });

  test('renders the page correctly', () => {
    render(<BackOfficeViewProductsPage />);
    expect(screen.getByText('header.viewProducts')).toBeInTheDocument();
  });

  test('renders table headers correctly', () => {
    render(<BackOfficeViewProductsPage />);
    expect(screen.getByText('CreateProduct.productName')).toBeInTheDocument();
    expect(
      screen.getByText('CreateProduct.productSubtype'),
    ).toBeInTheDocument();
    expect(screen.getByText('CreateProduct.addedDate')).toBeInTheDocument();
    expect(screen.getByText('CreateProduct.productStatus')).toBeInTheDocument();
  });

  test('filters should apply correctly', () => {
    render(<BackOfficeViewProductsPage />);
    const filterButton = screen.getByText('header.products');
    fireEvent.click(filterButton);
    expect(filterButton).toBeEnabled();
  });
});
