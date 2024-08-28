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

const menuItems = [
  { key: '1', label: 'Home', icon: <HomeOutlined />, href: "/cook/home" },
  { key: '2', label: 'Served Orders', icon: <ShoppingCartOutlined />, href: "/cook/servedOrders" },
  { key: '3', label: 'Menu Calendar', icon: <CalendarOutlined />, href: "/cook/calendar" },
  { key: '4', label: 'Critical Inventory', icon: <WarningOutlined />, href: "/cook/critical" },
  { key: '5', label: 'Profile', icon: <UserOutlined />, href: "/cook/profile" },
];

function CookDashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [userToken, setUserToken] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      setUserToken(localStorage.getItem('jwt'));
    }
  }, []);

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