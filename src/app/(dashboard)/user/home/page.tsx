'use client'
import React, { useState } from 'react';
import { Layout, theme } from 'antd';
import {
  UserOutlined,
  CalendarOutlined,
  ShoppingCartOutlined,
  WarningOutlined
} from '@ant-design/icons';
import SideBar, { getItem } from '@/app/components/sidebar/sideBar';
import { MenuItem } from '@/app/types/sideBar';

const { Header, Content } = Layout;

const items: MenuItem[] = [
  getItem('My Subscription', '1', <ShoppingCartOutlined />),
  getItem('Profile', '4', <UserOutlined />),
];

const CustomerDashboard: React.FC = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return(
    <Layout>
      <SideBar menuItems={items} />

      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }} />
        <Content>
        </Content>
      </Layout>
    </Layout>
  )
};

export default CustomerDashboard;