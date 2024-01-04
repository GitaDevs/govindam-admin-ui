'use client'
import React from 'react';
import { Layout } from 'antd';
import CustomModal from '../components/modal';
import Toast from '../components/toast';
import StoreWrapper from '../containers/storeWrapper';

const { Header } = Layout;

export default function DashboardLayout ({
  children,
}: { children: React.ReactNode }) {

  return (
    <StoreWrapper>
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
    </StoreWrapper>
  )
};