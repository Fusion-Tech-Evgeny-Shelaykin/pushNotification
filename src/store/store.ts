import {configureStore} from '@reduxjs/toolkit';
import pokeReducer from './poke/reducer';

export const store = configureStore({
  reducer: {
    poke: pokeReducer,
  },
});

export type RootStore = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
