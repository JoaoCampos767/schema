import { BannerProps } from "./banner";
import { BodyProps } from "./body";
import { FooterProps } from "./footer";
import { HeaderProps } from "./header";

import FooterSimple from "@/components/footers/FooterSimple";
import HeaderModern from "@/components/headers/HeaderModern";
import HeroBanner from "@/components/sections/HeroBanner";
import ProductGrid from "@/components/sections/ProductGrid";

export type ComponentProps =
  | HeaderProps
  | BannerProps
  | BodyProps
  | FooterProps;

// Mapeamento dos componentes disponíveis
export const COMPONENT_MAP: Record<
  string,
  React.ComponentType<ComponentProps>
> = {
  HeaderModern: HeaderModern as React.ComponentType<ComponentProps>,
  HeroBanner: HeroBanner as React.ComponentType<ComponentProps>,
  ProductGrid: ProductGrid as React.ComponentType<ComponentProps>,
  FooterSimple: FooterSimple as React.ComponentType<ComponentProps>,
};

export interface ComponentConfig {
  component: string;
  props: ComponentProps;
}

export interface SectionConfig extends ComponentConfig {
  id: string;
}

export interface LayoutSchema {
  version: string;
  storeId: string;
  layout: {
    header: ComponentConfig;
    body: {
      sections: SectionConfig[];
    };
    footer: ComponentConfig;
  };
}

export interface SchemaProps {
  schema: LayoutSchema;
}
