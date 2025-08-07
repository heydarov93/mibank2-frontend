import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ICreateCardFormData } from 'models/ICard';
import { SLICE_NAMES } from 'store/constants/sliceNames';

const initialState: ICreateCardFormData = {
  cashbackRate: null,
  monthlyFee: null,
  dailyOperationalLimit: null,
  foreignTransactionLimit: null,
  cardIssuer: '',
  cardType: '',
};

const CreateCardSlice = createSlice({
  name: SLICE_NAMES.CREATE_CARD,
  initialState,
  reducers: {
    setCardFormData(state, action: PayloadAction<ICreateCardFormData>) {
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
