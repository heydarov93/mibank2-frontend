import { ThemeProvider } from '@mui/material/styles';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { FormProvider, useForm } from 'react-hook-form';

import { CityField } from './CityField';

import { ILegalAddress } from 'models/IRegistration';
import { theme } from 'theme/theme';

const mockUseCityDropdown = jest.fn();
const mockHandleCityInputChange = jest.fn();
const mockHandleCitySelect = jest.fn();
const mockHandleCityInputClick = jest.fn();
const mockHandleClickAway = jest.fn();

const cityDropdownReturnValue = {
  cityInput: '',
  filteredCities: ['Warsaw', 'Krakow'],
  isDropdownOpen: true,
  noResults: false,
  inputRef: { current: { offsetWidth: 300 } },
  anchorEl: document.createElement('div'),
  error: null,
  loadingError: null,
  isLoading: false,
  handleCityInputChange: mockHandleCityInputChange,
  handleCitySelect: mockHandleCitySelect,
  handleCityInputClick: mockHandleCityInputClick,
  handleClickAway: mockHandleClickAway,
};

jest.mock('../hooks/useCityDropdown', () => ({
  useCityDropdown: () => mockUseCityDropdown(),
}));

const renderCityField = () => {
  const Wrapper = () => {
    const methods = useForm<ILegalAddress>({
      defaultValues: { city: '' },
    });

    return (
      <ThemeProvider theme={theme}>
        <FormProvider {...methods}>
          <CityField
            name="city"
            control={methods.control}
            label="City"
            placeholder="Enter city"
          />
        </FormProvider>
      </ThemeProvider>
    );
  };

  return render(<Wrapper />);
};

describe('CityField Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders with label and placeholder', () => {
    mockUseCityDropdown.mockReturnValue({
      ...cityDropdownReturnValue,
    });

    renderCityField();
    expect(screen.getByLabelText('City')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter city')).toBeInTheDocument();
  });

  it('displays city options when dropdown is open', async () => {
    mockUseCityDropdown.mockReturnValue({
      ...cityDropdownReturnValue,
    });

    renderCityField();
    await waitFor(() => {
      expect(screen.getByText('Warsaw')).toBeInTheDocument();
      expect(screen.getByText('Krakow')).toBeInTheDocument();
    });
  });

  it('shows error message if error exists', () => {
    mockUseCityDropdown.mockReturnValue({
      ...cityDropdownReturnValue,
      cityInput: '',
      filteredCities: [],
      error: { message: 'City is required' },
    });

    renderCityField();
    expect(screen.getByText('City is required')).toBeInTheDocument();
  });

  it('calls handleCityInputChange on input change', () => {
    mockUseCityDropdown.mockReturnValue({
      ...cityDropdownReturnValue,
    });
    renderCityField();

    const input = screen.getByPlaceholderText('Enter city');
    fireEvent.change(input, { target: { value: 'Wroclaw' } });

    expect(mockHandleCityInputChange).toHaveBeenCalled();
  });

  it('calls handleCityInputClick on input click', () => {
    mockUseCityDropdown.mockReturnValue({
      ...cityDropdownReturnValue,
    });
    renderCityField();

    const input = screen.getByPlaceholderText('Enter city');
    fireEvent.click(input);

    expect(mockHandleCityInputClick).toHaveBeenCalled();
  });

  it('calls handleCitySelect when a city is clicked', () => {
    mockUseCityDropdown.mockReturnValue({
      ...cityDropdownReturnValue,
    });
    renderCityField();

    const cityOption = screen.getByText('Warsaw');
    fireEvent.click(cityOption);

    expect(mockHandleCitySelect).toHaveBeenCalledWith('Warsaw');
  });

  it('calls handleClickAway when click away occurs', () => {
    mockUseCityDropdown.mockReturnValue({
      ...cityDropdownReturnValue,
    });
    renderCityField();

    expect(mockHandleClickAway).not.toHaveBeenCalled();
    mockHandleClickAway();
    expect(mockHandleClickAway).toHaveBeenCalled();
  });

  it('displays nothing in dropdown if filteredCities is empty', () => {
    mockUseCityDropdown.mockReturnValue({
      ...cityDropdownReturnValue,
      filteredCities: [],
    });
    renderCityField();

    const popper = screen.getByTestId('dropdown-popper');

    expect(popper).toBeInTheDocument();
    expect(screen.queryByText('Warsaw')).not.toBeInTheDocument();
    expect(screen.queryByText('Krakow')).not.toBeInTheDocument();
  });

  it('dropdown menu is closed when isDropdownOpen is false', () => {
    mockUseCityDropdown.mockReturnValue({
      ...cityDropdownReturnValue,
      isDropdownOpen: false,
    });
    renderCityField();

    expect(screen.queryByText('Warsaw')).not.toBeInTheDocument();
    expect(screen.queryByText('Krakow')).not.toBeInTheDocument();
  });

  it('renders selected city as selected', () => {
    mockUseCityDropdown.mockReturnValue({
      ...cityDropdownReturnValue,
      cityInput: 'Krakow',
    });

    renderCityField();

    expect(screen.getByText('Krakow')).toBeInTheDocument();
    expect(screen.getByText('Warsaw')).toBeInTheDocument();
  });
});
