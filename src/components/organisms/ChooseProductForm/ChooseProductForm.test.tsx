import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore, EnhancedStore } from '@reduxjs/toolkit';
import { I18nextProvider } from 'react-i18next';
import i18n from 'i18n';
import ChooseProductForm from './ChooseProductForm';
import productStepperReducer from 'store/reducers/ProductStepperSlice';

const setupStore = (): EnhancedStore => {
  return configureStore({
    reducer: { productStepper: productStepperReducer },
  });
};

describe('ChooseProductForm', () => {
  let store: ReturnType<typeof setupStore>;

  beforeEach(() => {
    store = setupStore();
    jest.spyOn(store, 'dispatch');
  });

  it('renders correctly and matches snapshot', () => {
    const { asFragment } = render(
      <Provider store={store}>
        <I18nextProvider i18n={i18n}>
          <ChooseProductForm />
        </I18nextProvider>
      </Provider>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders the form and submits correctly', () => {
    render(
      <Provider store={store}>
        <I18nextProvider i18n={i18n}>
          <ChooseProductForm />
        </I18nextProvider>
      </Provider>,
    );

    const form = screen.getByTestId('main-form');
    expect(form).toBeInTheDocument();
  });
});
