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
import SideBar from '@/app/components/sidebar';

const menuItems = [
  { key: '1', label: 'Home', icon: <DashboardOutlined />, href: "/cook/home" },
  { key: '2', label: 'Served Order', icon: <ShoppingCartOutlined />, href: "/cook/servedOrders" },
  { key: '3', label: 'Menu Calendar', icon: <CalendarOutlined />, href: "/cook/calendar" },
  { key: '4', label: 'Critical Inventory', icon: <WarningOutlined />, href: "/cook/critical" },
  { key: '5', label: 'Profile', icon: <UserOutlined />, href: "/cook/profile" },
];

function CookDashboardLayout({ children }: { children: React.ReactNode }) {

  return(
    <Layout>
      <SideBar menuItems={menuItems} />

      <div className='centerAlignTop w-100'>
        { children }
      </div>
    </Layout>
  )
};

export default CookDashboardLayout;