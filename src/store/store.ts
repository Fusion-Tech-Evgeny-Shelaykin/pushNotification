import {configureStore} from '@reduxjs/toolkit';

import pokeReducer from './poke/reducer';

const middlewares = [];

if (__DEV__) {
  const createDebugger = require('redux-flipper').default;
  middlewares.push(createDebugger());
}

export const store = configureStore({
  reducer: {
    poke: pokeReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat([...middlewares]),
});

export type RootStore = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
