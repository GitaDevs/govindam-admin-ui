'use client'
import React, { useEffect } from 'react';
import { Layout } from 'antd';
import CustomModal from '../components/modal';
import { Provider } from 'react-redux';
import { persistor, store } from '../../redux';
import { PersistGate } from 'redux-persist/integration/react';
import Toast from '../components/toast';

const { Header } = Layout;

export default function DashboardLayout ({
  children,
}: { children: React.ReactNode }) {

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <CustomModal />
        <Toast />
        <Layout style={{ minHeight: '100vh' }}>
          <Header style={{ display: 'flex', alignItems: 'flex-end' }}>
            <div className="demo-logo" />
          </Header>
          <Layout>
            { children }
          </Layout>
        </Layout>    
      </PersistGate>
    </Provider>
  );
};