import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { api } from '../services/api';
import { NameSlice } from '../const';
import { authReducer } from './auth-process/auth-process';
import { questsReducer } from './quests-data/quests-data';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const rootReducer = combineReducers({
  [NameSlice.Auth]: authReducer,
  [NameSlice.Quests]: questsReducer,
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: [NameSlice.Auth]
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: { extraArgument: api },
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export { store };
