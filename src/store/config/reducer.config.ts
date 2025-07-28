import { combineReducers, ReducersMapObject } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';

import { rootPersistConfig } from './persist.config';

import { API_SLICES } from 'store/constants/slices';
import { sliceReducers } from 'store/slices';

const apiReducers: ReducersMapObject = Object.fromEntries(
  API_SLICES.map((slice) => [slice.reducerPath, slice.reducer]),
);

const rootReducer = combineReducers({
  ...sliceReducers,
  ...apiReducers,
});

export const persistedReducer = persistReducer(rootPersistConfig, rootReducer);

export type RootState = ReturnType<typeof rootReducer>;
