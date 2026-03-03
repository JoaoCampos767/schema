export interface FooterProps {
  copyright: string;
  links?: Array<{ label: string; href: string }>;
  socialMedia?: Array<{ platform: string; url: string }>;
  backgroundColor?: string;
}
