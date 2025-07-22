import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';

import { BusinessSignUpForm } from './BusinessSignUpForm';

import store from 'store';

const mockNavigate = jest.fn();
jest.mock('react-router', () => {
  return {
    useNavigate: () => mockNavigate,
  };
});

describe('BusinessSignUpForm', () => {
  it('snapshot should match', () => {
    const { asFragment } = render(
      <Provider store={store}>
        <BusinessSignUpForm />
      </Provider>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should enable the submit button only when the form is valid', async () => {
    const { container } = render(
      <Provider store={store}>
        <BusinessSignUpForm />
      </Provider>,
    );

    const companyName = container.querySelector(
      'input[name="companyName"]',
    ) as HTMLInputElement;
    const companyEmail = container.querySelector(
      'input[name="companyEmail"]',
    ) as HTMLInputElement;
    const nip = container.querySelector(
      'input[name="nip"]',
    ) as HTMLInputElement;
    const ownerName = container.querySelector(
      'input[name="ownerName"]',
    ) as HTMLInputElement;
    const continueButton = screen.getByTestId('save-button');

    const fields = [companyName, companyEmail, nip, ownerName];
    fields.forEach((field) => {
      expect(field).toBeInTheDocument();
    });

    expect(continueButton).toBeDisabled();

    fireEvent.change(companyName, {
      target: { value: 'Company LLC' },
    });
    fireEvent.change(companyEmail, {
      target: { value: 'example@company.com' },
    });
    fireEvent.change(nip, {
      target: { value: 'PL-NIP-1234567891' },
    });
    fireEvent.change(ownerName, {
      target: { value: 'John Doe' },
    });

    fields.forEach((field) => fireEvent.blur(field));

    await waitFor(() => {
      expect(continueButton).not.toBeDisabled();
    });
  });
});
