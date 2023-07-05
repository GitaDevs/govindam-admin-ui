'use client'
import styles from './page.module.css'
import { persistor, store } from '../redux';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux'

export default function Home() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <main className={styles.main}>
          Main Page!!
        </main>
      </PersistGate>
    </Provider>
  )
}
