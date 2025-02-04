import React from 'react';
import { render, screen } from '@testing-library/react';
import { I18nextProvider } from 'react-i18next';
import i18n from 'i18n';
import ChooseProductForm from './ChooseProductForm';

describe('ChooseProductForm', () => {
  it('should match snapshot', () => {
    const { asFragment } = render(
      <I18nextProvider i18n={i18n}>
        <ChooseProductForm />
      </I18nextProvider>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render form fields', () => {
    render(
      <I18nextProvider i18n={i18n}>
        <ChooseProductForm />
      </I18nextProvider>,
    );
    expect(screen.getByTestId('main-form')).toBeInTheDocument();
  });

  it('should render dropdowns', () => {
    render(
      <I18nextProvider i18n={i18n}>
        <ChooseProductForm />
      </I18nextProvider>,
    );
    expect(screen.getAllByRole('combobox')).toMatchSnapshot();
  });
});
