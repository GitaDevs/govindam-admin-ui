export type MenuItem = {
  key: string;
  label: string;
  icon?: React.ReactNode;
  href?: string;
}

export type SidebarProps = {
  menuItems: MenuItem[];
};