export interface HeaderProps {
  logoUrl: string;
  storeName: string;
  menuItems: Array<{ label: string; href: string }>;
  backgroundColor?: string;
  textColor?: string;
}
