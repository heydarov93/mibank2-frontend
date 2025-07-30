import { configureStore, EnhancedStore } from '@reduxjs/toolkit';
import { render } from '@testing-library/react';
import { I18nextProvider } from 'react-i18next';
import { Provider } from 'react-redux';

import { ChooseProductForm } from './ChooseProductForm';

import { i18n } from 'config';
import chooseProductReducer from 'store/slices/products/ChooseProductSlice';
import productStepperReducer from 'store/slices/products/ProductStepperSlice';

interface ProductStepperState {
  step: number;
}

interface ChooseProductState {
  productType: string;
  subtype: string;
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
        productType: '',
        subtype: '',
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
        productType: 'Deposit',
        subtype: 'Team Deposit',
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
