'use client'
import React from 'react';
import { Provider } from 'react-redux';
import { persistor, store } from '../../redux';
import { PersistGate } from 'redux-persist/integration/react';

export default function StoreWrapper({ children }: { children: React.ReactNode }) {

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        { children }
      </PersistGate>
    </Provider>
  );
}