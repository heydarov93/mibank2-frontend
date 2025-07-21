import storage from 'redux-persist/lib/storage';

import { PERSIST_CONFIG } from 'store/constants/persistConfig';
import { API_REDUCER_PATHS } from 'store/constants/slices';

export const rootPersistConfig  = {
  key: PERSIST_CONFIG.ROOT_KEY,
  storage,
  whitelist: PERSIST_CONFIG.WHITELIST,
  blacklist: API_REDUCER_PATHS,
};
