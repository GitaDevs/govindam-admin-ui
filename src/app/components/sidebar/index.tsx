'use client'
import React, { useState } from 'react';
import Grid from 'antd/es/grid';
import Layout from 'antd/es/layout';
import Menu from 'antd/es/menu';
import { isLargeScreen } from '@/app/helpers/miscellaneous';
import { ScreenSize } from '@/app/types/screen';
import { MenuItem, SidebarProps } from '../../types/sideBar';
import style from "./style.module.css"
import Link from 'next/link';
import { LogoutOutlined } from '@ant-design/icons';
import { useAppDispatch } from '@/redux/hooks';
import { logoutUser } from '@/redux/actions/user';
import { redirect } from 'next/navigation';

const { useBreakpoint } = Grid;
const { Sider } = Layout;

export function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  href?: string,
  children?: MenuItem[],
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    href
  } as MenuItem;
}

const SideBar: React.FC<SidebarProps> = ({ menuItems }) => {
  const dispatch = useAppDispatch();
  const screens = useBreakpoint();
  const [collapsed, setCollapsed] = useState(true);

  const logout = () => {
    dispatch(logoutUser());
    redirect("/auth")
  }

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
            <Menu.Item key={'logout'} icon={<LogoutOutlined />}>
              <Link href={"/auth" || ""} onClick={logout}>
                {"Logout"}
              </Link>
            </Menu.Item>
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
            <Menu.Item key={'logout'} icon={<LogoutOutlined />}>
              <Link href={"/auth" || ""} onClick={logout}>
                {"Logout"}
              </Link>
            </Menu.Item>            
          </Menu>          
        </Sider>
      )
    }
  }

  return getSidebar();
}

export default SideBar;