'use client'
import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../../redux';

export default function StoreWrapper({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      { children }
    </Provider>
  );
}