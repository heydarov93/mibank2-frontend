import { render, screen, fireEvent } from '@testing-library/react';
import i18n from 'i18next';
import { FormProvider, useForm } from 'react-hook-form';
import { initReactI18next } from 'react-i18next';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

import { DocumentInfo } from './DocumentInfo';

import store from 'store';

import '@testing-library/jest-dom';

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        'RegistrationPage.documentInfoTitle': 'Document Information',
      },
    },
  },
  lng: 'en',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

const renderWithProviders = () => {
  const Wrapper = () => {
    const methods = useForm();

    return (
      <Provider store={store}>
        <MemoryRouter>
          <FormProvider {...methods}>
            <DocumentInfo onBack={jest.fn()} />
          </FormProvider>
        </MemoryRouter>
      </Provider>
    );
  };

  render(<Wrapper />);
};

describe('DocumentInfo Component', () => {
  beforeEach(() => {
    renderWithProviders();
  });

  it('renders the component correctly', () => {
    expect(screen.getByTestId('document-info-title')).toBeInTheDocument();

    expect(
      screen.getByLabelText('RegistrationPage.inputName.labelPassportNumber'),
    ).toBeInTheDocument();
    expect(
      screen.getByLabelText(
        'RegistrationPage.inputName.labelPassportIssueDate',
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByLabelText(
        'RegistrationPage.inputName.labelPassportExpirationDate',
      ),
    ).toBeInTheDocument();
  });

  it('validates form fields and calls dispatch on submit', () => {
    const submitButton = screen.getByText('SignupPage.buttonLabelContinue');
    expect(submitButton).toBeDisabled();
    const documentNumberInput = screen.getByPlaceholderText(
      'RegistrationPage.placeholder.name',
    );
    fireEvent.change(documentNumberInput, { target: { value: 'AB1234567' } });
  });
});
