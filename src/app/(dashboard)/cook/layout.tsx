'use client'
import React, { useState } from 'react';
import { Layout, Space, theme } from 'antd';
import {
  UserOutlined,
  CalendarOutlined,
  ShoppingCartOutlined,
  WarningOutlined,
  DashboardOutlined
} from '@ant-design/icons';
import SideBar, { getItem } from '@/app/components/sideBar';
import { MenuItem } from '@/app/types/sideBar';

const items: MenuItem[] = [
  getItem('Home', '1', <DashboardOutlined />),
  getItem('Served Order', '2', <ShoppingCartOutlined />),
  getItem('Menu Calendar', '3', <CalendarOutlined />),
  getItem('Critical Inventory', '4', <WarningOutlined />),
  getItem('Profile', '5', <UserOutlined />),
];

function CookDashboardLayout({ children }: { children: React.ReactNode }) {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return(
    <Layout>
      <SideBar menuItems={items} />

      <Space className='centerAlignTop w-100'>
        <Layout>
            { children }
        </Layout>
      </Space>
    </Layout>
  )
};

export default CookDashboardLayout;