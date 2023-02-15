import {configureStore} from '@reduxjs/toolkit';

import pokeReducer from './poke/reducer';

export const store = configureStore({
  reducer: {
    poke: pokeReducer,
  },

  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({serializableCheck: false, immutableCheck: false}),
});

export type RootStore = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
