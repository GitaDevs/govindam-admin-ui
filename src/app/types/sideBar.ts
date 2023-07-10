import { MenuProps } from "antd";

export type MenuItem = Required<MenuProps>['items'][number];

export type SidebarProps = {
  menuItems: MenuItem[];
};