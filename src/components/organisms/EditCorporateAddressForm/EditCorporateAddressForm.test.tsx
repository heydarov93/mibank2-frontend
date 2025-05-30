import { act, fireEvent, render, screen } from '@testing-library/react';

import { EditCorporateAddressForm } from './EditCorporateAddressForm';

describe('EditCorporateAddressForm', () => {
  let container: HTMLElement;

  beforeEach(() => {
    container = render(<EditCorporateAddressForm />).container;
  });

  it('has all fields prefilled with address data', () => {
    const inputs = container.querySelectorAll('input');
    const allInputsHaveValue = Array.from(inputs).every(
      (input) => input.value !== '',
    );

    expect(allInputsHaveValue).toBe(true);
  });

  it('has disabled country select field', () => {
    const select = screen.getByTestId('country-select');
    const input = select.querySelector('input');

    expect(input).toBeDisabled();
  });

  it('has disabled "Save" button if nothing changed', () => {
    expect(screen.getByTestId('save-button')).toBeDisabled();
  });

  it('has disabled "Save" button if something changed but data is invalid or empty', async () => {
    const streetField = screen.getByTestId('street-field');
    const input = streetField.querySelector('input') as HTMLInputElement;

    await act(() => fireEvent.change(input, { target: { value: '+-/ak2' } }));

    expect(screen.getByTestId('save-button')).toBeDisabled();

    await act(() => fireEvent.change(input, { target: { value: '' } }));

    expect(screen.getByTestId('save-button')).toBeDisabled();
  });

  it('has enabled "Save" button if something changed and form is valid', async () => {
    const streetField = screen.getByTestId('street-field');
    const input = streetField.querySelector('input') as HTMLInputElement;

    await act(() =>
      fireEvent.change(input, { target: { value: 'Street Name' } }),
    );

    expect(screen.getByTestId('save-button')).toBeEnabled();
  });
});
