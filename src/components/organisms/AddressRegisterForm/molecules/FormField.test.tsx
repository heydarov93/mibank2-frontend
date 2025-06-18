import { ThemeProvider } from '@mui/material/styles';
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { FormField, FormFieldProps } from './FormField';

import { ILegalAddress, ISelectOption } from 'models/IRegistration';
import { theme } from 'theme/theme';

jest.mock('models/IRegistration', () => ({
  ILegalAddress: {},
  ISelectOption: {},
}));

const renderFormField = (props: FormFieldProps) => {
  const TestComponent = () => {
    const methods = useForm<ILegalAddress>({
      defaultValues: {
        country: '',
        city: '',
        street: '',
        building: '',
        office: '',
        postcode: '',
      },
    });

    return (
      <ThemeProvider theme={theme}>
        <FormProvider {...methods}>
          <FormField {...props} />
        </FormProvider>
      </ThemeProvider>
    );
  };

  return render(<TestComponent />);
};

const TestWithError = () => {
  const methods = useForm<ILegalAddress>();

  useEffect(() => {
    methods.setError('street', { message: 'Street is required' });
  }, [methods]);

  return (
    <ThemeProvider theme={theme}>
      <FormProvider {...methods}>
        <FormField name="street" control={methods.control} label="Street" />
      </FormProvider>
    </ThemeProvider>
  );
};

describe('FormField Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders text field with label', () => {
    renderFormField({
      label: 'Street',
      placeholder: 'Enter street',
      name: 'street',
    });

    expect(screen.getByText('Street')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter street')).toBeInTheDocument();
  });

  it('renders select field with options', () => {
    const options: ISelectOption[] = [
      { value: 'Poland', label: 'Poland' },
      { value: 'Germany', label: 'Germany' },
    ];

    renderFormField({
      label: 'Country',
      name: 'country',
      type: 'select',
      options,
    });

    expect(screen.getByText('Country')).toBeInTheDocument();
    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });

  it('disables field when disabled prop is true', () => {
    renderFormField({
      label: 'Street',
      name: 'street',
      disabled: true,
    });

    const input = screen.getByRole('textbox');
    expect(input).toBeDisabled();
  });

  it('disables select when disabled prop is true', () => {
    const options: ISelectOption[] = [{ value: 'poland', label: 'Poland' }];

    renderFormField({
      label: 'City',
      name: 'city',
      type: 'select',
      disabled: true,
      options,
    });

    const select = screen.getByRole('combobox');
    expect(select).toHaveAttribute('aria-disabled', 'true');
  });

  it('allows typing in text field', async () => {
    renderFormField({
      label: 'Street',
      name: 'street',
    });

    const input = screen.getByRole('textbox');
    await userEvent.type(input, 'Test value');
    expect(input).toHaveValue('Test value');
  });

  it('allows selecting option in select field', async () => {
    const options: ISelectOption[] = [
      { value: 'germany', label: 'Germany' },
      { value: 'poland', label: 'Poland' },
    ];

    renderFormField({
      label: 'Country',
      name: 'country',
      type: 'select',
      options,
    });

    const select = screen.getByRole('combobox');

    act(() => fireEvent.mouseDown(select));
    const option = screen.getByText('Germany');
    act(() => fireEvent.click(option));

    await waitFor(() =>
      expect(select).toHaveAttribute('aria-expanded', 'false'),
    );
  });

  it('shows error message when error exists', () => {
    render(<TestWithError />);

    expect(screen.getByTestId('error')).toHaveTextContent('Street is required');
  });
});
