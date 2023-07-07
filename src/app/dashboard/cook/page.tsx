'use client'
import React, { useState } from 'react';
import {
  UserOutlined,
  CalendarOutlined,
  ShoppingCartOutlined,
  WarningOutlined
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Layout, Menu, theme, Grid, Drawer } from 'antd';
import { isLargeScreen } from '@/app/helpers/miscellaneous';
import { ScreenSize } from '@/app/types/screen';
import styles from "./style.module.css";

const { Header, Content, Footer, Sider } = Layout;
const { useBreakpoint } = Grid;

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem('Served Order', '1', <ShoppingCartOutlined />),
  getItem('Menu Calendar', '2', <CalendarOutlined />),
  getItem('Critical Inventory', '3', <WarningOutlined />),
  getItem('Profile', '4', <UserOutlined />),
];

const items1: MenuProps['items'] = ['1', '2', '3'].map((key) => ({
  key,
  label: `nav ${key}`,
}));

const CookDashboard: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const screens = useBreakpoint();

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const getSidebar = () => {
    const isLarge = isLargeScreen(screens as ScreenSize);

    if(isLargeScreen(screens as ScreenSize)) {
      return (
        <Sider collapsible={false} collapsed={false}>
          <div className="demo-logo-vertical" />
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
        </Sider> 
      );
    } else {
      return (
        <Sider style={{ position:'absolute', height: '100%'}} zeroWidthTriggerStyle={{top: '-52px'}} collapsedWidth={0} collapsible={true} collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
          <div className="demo-logo-vertical" />
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
        </Sider>      
      )
    }
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ display: 'flex', alignItems: 'flex-end' }}>
        <div className="demo-logo" />
        {/* <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']} items={items1} /> */}
      </Header>
      <Layout>
        { getSidebar() }
        <Layout>
          <Header style={{ padding: 0, background: colorBgContainer }} />
          <Content>
            <div style={{ padding: 24, background: colorBgContainer }}>
              Hare Krishna
            </div>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default CookDashboard;