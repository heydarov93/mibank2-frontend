import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { CardFormData } from 'models/IProductInfo';

const initialState: CardFormData = {
  cashbackRate: null,
  monthlyFee: null,
  dailyOperationalLimit: null,
  foreignTransactionLimit: null,
  cardIssuer: '',
  cardType: '',
};

const CreateCardSlice = createSlice({
  name: 'createCard',
  initialState,
  reducers: {
    setCardFormData(state, action: PayloadAction<CardFormData>) {
      state.cardIssuer = action.payload.cardIssuer;
      state.cardType = action.payload.cardType;
      state.cashbackRate = action.payload.cashbackRate;
      state.dailyOperationalLimit = action.payload.dailyOperationalLimit;
      state.foreignTransactionLimit = action.payload.foreignTransactionLimit;
      state.monthlyFee = action.payload.monthlyFee;
    },

    resetCardData() {
      return initialState;
    },
  },
});

export const { setCardFormData, resetCardData } = CreateCardSlice.actions;
export default CreateCardSlice.reducer;
