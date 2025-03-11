import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore, EnhancedStore } from '@reduxjs/toolkit';
import { I18nextProvider } from 'react-i18next';
import i18n from 'i18n';
import ChooseProductForm from './ChooseProductForm';
import productStepperReducer from 'store/reducers/ProductStepperSlice';
import chooseProductReducer from 'store/reducers/ChooseProductSlice';

interface ProductStepperState {
  step: number;
}

interface ChooseProductState {
  product: string;
  type: string;
  currency: string;
  name: string;
  description: string;
}

interface RootState {
  productStepper: ProductStepperState;
  chooseProduct: ChooseProductState;
}

const setupStore = (
  preloadedState: Partial<RootState> = {},
): EnhancedStore<RootState> => {
  return configureStore({
    reducer: {
      productStepper: productStepperReducer,
      chooseProduct: chooseProductReducer,
    },
    preloadedState: {
      productStepper: {
        step: 0,
        ...preloadedState.productStepper,
      },
      chooseProduct: {
        product: '',
        type: '',
        currency: '',
        name: '',
        description: '',
        ...preloadedState.chooseProduct,
      },
    } as RootState,
  });
};

describe('ChooseProductForm - Visual Rendering', () => {
  let store: EnhancedStore<RootState>;

  beforeEach(() => {
    store = setupStore();
  });

  it('renders correctly and matches snapshot with default empty state', () => {
    const { asFragment } = render(
      <Provider store={store}>
        <I18nextProvider i18n={i18n}>
          <ChooseProductForm />
        </I18nextProvider>
      </Provider>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders correctly and matches snapshot with prefilled values', () => {
    store = setupStore({
      chooseProduct: {
        product: 'Deposit',
        type: 'Team Deposit',
        currency: 'PLN',
        name: 'Team Savings',
        description: 'A deposit for team savings.',
      },
    });
    const { asFragment } = render(
      <Provider store={store}>
        <I18nextProvider i18n={i18n}>
          <ChooseProductForm />
        </I18nextProvider>
      </Provider>,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
