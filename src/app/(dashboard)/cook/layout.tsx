'use client'
import React, { useEffect } from 'react';
import Layout from 'antd/es/layout';
import {
  UserOutlined,
  CalendarOutlined,
  ShoppingCartOutlined,
  WarningOutlined,
  HomeOutlined
} from '@ant-design/icons';
import SideBar from '@/app/components/sidebar';
import { useRouter } from 'next/navigation';
import { useAppSelector } from '@/redux/hooks';
import { selectUserToken } from '@/redux/selectors/user';

const menuItems = [
  { key: '1', label: 'Home', icon: <HomeOutlined />, href: "/cook/home" },
  { key: '2', label: 'Served Orders', icon: <ShoppingCartOutlined />, href: "/cook/servedOrders" },
  { key: '3', label: 'Menu Calendar', icon: <CalendarOutlined />, href: "/cook/calendar" },
  { key: '4', label: 'Critical Inventory', icon: <WarningOutlined />, href: "/cook/critical" },
  { key: '5', label: 'Profile', icon: <UserOutlined />, href: "/cook/profile" },
];

function CookDashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const userToken = useAppSelector(selectUserToken());

  useEffect(() => {
    if(!userToken) router.replace("/auth");
  }, [userToken]);

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