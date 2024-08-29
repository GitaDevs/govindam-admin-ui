'use client'
import React from 'react';
import Layout from 'antd/es/layout';
import CustomModal from '../components/modal';
import Toast from '../components/toast';
import StoreWrapper from '../containers/storeWrapper';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor } from '../../redux';

const { Header } = Layout;

export default function DashboardLayout ({
  children,
}: { children: React.ReactNode }) {

  return (
    <StoreWrapper>
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
    </StoreWrapper>
  )
};