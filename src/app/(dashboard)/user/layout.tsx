'use client'
import React, { useState } from 'react';
import { Layout, theme } from 'antd';
import {
  UserOutlined,
  ShoppingCartOutlined,
  DashboardOutlined,
  CommentOutlined,
} from '@ant-design/icons';
import SideBar, { getItem } from '@/app/components/sidebar';
import { MenuItem } from '@/app/types/sideBar';

const { Header, Content } = Layout;

const items: MenuItem[] = [
  getItem('Home', '1', <DashboardOutlined />, "/user/home"),
  getItem('Subscriptions', '2', <ShoppingCartOutlined />, "/user/subscriptions"),
  getItem('Order', '3', <ShoppingCartOutlined />, "/user/subscriptions"),
  getItem('Feedback', '4', <CommentOutlined />, "/user/feedback"),
  getItem('Profile', '5', <UserOutlined />, "user/profile"),
];

function CustomerDashboard({ children }: { children: React.ReactNode }) {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return(
    <Layout>
      <SideBar menuItems={items} />

      <div className='centerAlignTop w-100'>
        { children }
      </div>
    </Layout>
  )
};

export default CustomerDashboard;