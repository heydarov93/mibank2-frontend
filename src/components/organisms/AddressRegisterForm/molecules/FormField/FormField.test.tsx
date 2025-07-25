import { ThemeProvider } from '@mui/material/styles';
import { act, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { FormField, FormFieldProps } from './FormField';

import { ILegalAddress, ISelectOption } from 'models/IRegistration';
import { theme } from 'theme/theme';

const TestComponent = (props: FormFieldProps) => {
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

const renderFormField = async (props: FormFieldProps) => {
  await act(async () => {
    render(<TestComponent {...props} />);
  });
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

  it('renders text field with label', async () => {
    renderFormField({
      label: 'Street',
      placeholder: 'Enter street',
      name: 'street',
    });

    await waitFor(() => {
      expect(screen.getByText('Street')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Enter street')).toBeInTheDocument();
    });
  });

  it('renders select field with options', async () => {
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

    await waitFor(() => {
      expect(screen.getByText('Country')).toBeInTheDocument();
      expect(screen.getByRole('combobox')).toBeInTheDocument();
    });
  });

  it('disables field when disabled prop is true', async () => {
    renderFormField({
      label: 'Street',
      name: 'street',
      disabled: true,
    });

    await waitFor(() => expect(screen.getByRole('textbox')).toBeDisabled());
  });

  it('disables select when disabled prop is true', async () => {
    const options: ISelectOption[] = [{ value: 'poland', label: 'Poland' }];

    renderFormField({
      label: 'City',
      name: 'city',
      type: 'select',
      disabled: true,
      options,
    });

    await waitFor(() =>
      expect(screen.getByRole('combobox')).toHaveAttribute(
        'aria-disabled',
        'true',
      ),
    );
  });

  it('allows typing in text field', async () => {
    renderFormField({
      label: 'Street',
      name: 'street',
    });

    await waitFor(() => {
      const input = screen.getByRole('textbox');
      act(() => {
        userEvent.type(input, 'Test value');
      });
      expect(input).toHaveValue('Test value');
    });
  });

  it('allows selecting option in select field', async () => {
    const options: ISelectOption[] = [
      { value: 'germany', label: 'Germany' },
      { value: 'poland', label: 'Poland' },
    ];

    await renderFormField({
      label: 'Country',
      name: 'country',
      type: 'select',
      options,
    });

    const select = await waitFor(() => screen.getByRole('combobox'));
    act(() => userEvent.click(select));

    const option = await waitFor(() => screen.getByText('Germany'));
    act(() => userEvent.click(option));

    await waitFor(() => expect(select).toHaveTextContent('Germany'));
  });

  it('shows error message when error exists', () => {
    render(<TestWithError />);

    expect(screen.getByTestId('error')).toHaveTextContent('Street is required');
  });
});
