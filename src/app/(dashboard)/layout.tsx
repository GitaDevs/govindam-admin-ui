'use client'
import React from 'react';
import { Layout } from 'antd';

const { Header } = Layout;

export default function DashboardLayout ({
  children,
}: { children: React.ReactNode }) {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ display: 'flex', alignItems: 'flex-end' }}>
        <div className="demo-logo" />
      </Header>
      <Layout>
        { children }
      </Layout>
    </Layout>
  );
};