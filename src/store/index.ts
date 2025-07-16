import { configureStore } from '@reduxjs/toolkit';
import { persistStore } from 'redux-persist';

import { persistedReducer } from './config/reducer.config';
import { IGNORED_ACTIONS } from './constants/ignoredActions';
import { API_MIDDLEWARES } from './constants/middlewares';

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: IGNORED_ACTIONS,
      },
    }).concat(API_MIDDLEWARES),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
