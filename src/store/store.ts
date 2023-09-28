import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { api } from '../services/api';
import { NameSlice } from '../const';
import { authReducer } from './auth-process/auth-process';
import { questsReducer } from './quests-data/quests-data';

const rootReducer = combineReducers({
  [NameSlice.Auth]: authReducer,
  [NameSlice.Quests]: questsReducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: { extraArgument: api }}),
});

export { store };
