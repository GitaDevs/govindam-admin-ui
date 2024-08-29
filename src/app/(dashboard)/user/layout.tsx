'use client'
import React, { useEffect, useState } from 'react';
import Layout from "antd/es/layout";
import theme from "antd/es/theme";
import {
  UserOutlined,
  ShoppingCartOutlined,
  CalendarOutlined,
  HomeOutlined,
} from '@ant-design/icons';
import SideBar, { getItem } from '@/app/components/sidebar';
import { MenuItem } from '@/app/types/sideBar';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { isUserSubscribed } from '@/redux/selectors/user';
import { getUserActiveSubscription } from '@/redux/thunk/user';

const items: MenuItem[] = [
  getItem('Subscriptions', '1', <ShoppingCartOutlined />, "/user/subscription"),
  getItem('Profile', '2', <UserOutlined />, "/user/profile"),
];

const subscribedItems: MenuItem[] = [
  getItem('Home', '1', <HomeOutlined />, "/user/home"),
  getItem('Subscriptions', '2', <CalendarOutlined />, "/user/subscription"),
  getItem('Ratings', '3', <ShoppingCartOutlined />, "/user/ratings"),
  getItem('Profile', '4', <UserOutlined />, "/user/profile"),
];

function CustomerDashboard({ children }: { children: React.ReactNode }) {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const dispatch = useAppDispatch();
  const isUserSubActive = useAppSelector(isUserSubscribed());

  useEffect(() => {
    dispatch(getUserActiveSubscription());
  }, []);

  return(
    <Layout>
      <SideBar menuItems={isUserSubActive ? subscribedItems : items} />

      <div className='centerAlignTop w-100'>
        { children }
      </div>
    </Layout>
  )
};

export default CustomerDashboard;