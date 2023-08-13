'use client'
import React, { useState } from 'react';
import { Layout, Menu, Grid } from 'antd';
import { isLargeScreen } from '@/app/helpers/miscellaneous';
import { ScreenSize } from '@/app/types/screen';
import { MenuItem, SidebarProps } from '../../types/sideBar';
import style from "./style.module.css"
import Link from 'next/link';

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
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
            {
              menuItems.map(item => (
                  <Menu.Item 
                    key={item.key}
                    icon={item.icon}
                  >
                    <Link href={item.href || ""}>
                      {item.label}
                    </Link>
                  </Menu.Item>
              ))
            }
          </Menu>
        </Sider>
      );
    } else {
      return (
        <Sider className={style.zIndex} style={{ position:'absolute', height: '100%'}} zeroWidthTriggerStyle={{top: '-52px'}} collapsedWidth={0} collapsible={true} collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
          <div className="demo-logo-vertical" />
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
            {
              menuItems.map(item => (
                  <Menu.Item 
                    key={item.key}
                    icon={item.icon}
                  >
                    <Link href={item.href || ""}>
                      {item.label}
                    </Link>
                  </Menu.Item>
              ))
            }
          </Menu>          
        </Sider>
      )
    }
  }

  return getSidebar();
}

export default SideBar;