'use client'
import React, { useState } from 'react';
import Layout from "antd/es/layout";
import theme from "antd/es/theme";
import {
  UserOutlined,
  ShoppingCartOutlined,
  DashboardOutlined,
} from '@ant-design/icons';
import SideBar, { getItem } from '@/app/components/sidebar';
import { MenuItem } from '@/app/types/sideBar';
import { useAppSelector } from '@/redux/hooks';
import { isUserSubscribed } from '@/redux/selectors/user';

const items: MenuItem[] = [
  getItem('Subscriptions', '1', <ShoppingCartOutlined />, "/user/subscription"),
  getItem('Profile', '2', <UserOutlined />, "/user/profile"),
];

const subItems: MenuItem[] = [
  getItem('Home', '1', <DashboardOutlined />, "/user/home"),
  getItem('Subscriptions', '2', <ShoppingCartOutlined />, "/user/subscription"),
  // getItem('Order', '3', <ShoppingCartOutlined />, "/user/subscription"),
  // getItem('Feedback', '4', <CommentOutlined />, "/user/feedback"),
  getItem('Profile', '3', <UserOutlined />, "/user/profile"),
];

function CustomerDashboard({ children }: { children: React.ReactNode }) {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const isUserSubActive = useAppSelector(isUserSubscribed());

  return(
    <Layout>
      <SideBar menuItems={isUserSubActive ? subItems : items} />

      <div className='centerAlignTop w-100'>
        { children }
      </div>
    </Layout>
  )
};

export default CustomerDashboard;