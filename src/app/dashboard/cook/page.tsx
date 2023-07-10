'use client'
import React, { useState } from 'react';
import { Layout, theme } from 'antd';
import {
  UserOutlined,
  CalendarOutlined,
  ShoppingCartOutlined,
  WarningOutlined
} from '@ant-design/icons';
import SideBar, { getItem } from '@/app/components/sideBar';
import { MenuItem } from '@/app/types/sideBar';

const { Header, Content } = Layout;

const items: MenuItem[] = [
  getItem('Served Order', '1', <ShoppingCartOutlined />),
  getItem('Menu Calendar', '2', <CalendarOutlined />),
  getItem('Critical Inventory', '3', <WarningOutlined />),
  getItem('Profile', '4', <UserOutlined />),
];

const CookDashboard: React.FC = () => {
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

export default CookDashboard;