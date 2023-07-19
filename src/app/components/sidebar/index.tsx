'use client'
import React, { useEffect, useState } from 'react';
import { Layout, Menu, Grid, theme, MenuProps } from 'antd';
import { isLargeScreen } from '@/app/helpers/miscellaneous';
import { ScreenSize } from '@/app/types/screen';
import { MenuItem, SidebarProps } from '../../types/sideBar';
import style from "./style.module.css"

const { useBreakpoint } = Grid;
const { Sider } = Layout;

export function getItem(
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

const SideBar: React.FC<SidebarProps> = ({ menuItems }) => {
  const screens = useBreakpoint();
  const [collapsed, setCollapsed] = useState(true);

  const getSidebar = () => {
    if(isLargeScreen(screens as ScreenSize)) {
      return (
        <Sider className={style.zIndex} collapsible={false} collapsed={false}>
          <div className="demo-logo-vertical" />
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={menuItems} />
        </Sider>
      );
    } else {
      return (
        <Sider className={style.zIndex} style={{ position:'absolute', height: '100%'}} zeroWidthTriggerStyle={{top: '-52px'}} collapsedWidth={0} collapsible={true} collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
          <div className="demo-logo-vertical" />
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={menuItems} />
        </Sider>
      )
    }
  }

  return getSidebar();
}

export default SideBar;