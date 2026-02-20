"use client";
import React from "react";
import FooterSimple from "./footers/FooterSimple";
import HeaderModern from "./headers/HeaderModern";
import HeroBanner from "./sections/HeroBanner";
import ProductGrid from "./sections/ProductGrid";

// Tipos para os props dos componentes
export interface HeaderModernProps {
  logoUrl: string;
  storeName: string;
  menuItems: Array<{ label: string; href: string }>;
  backgroundColor?: string;
  textColor?: string;
}

export interface HeroBannerProps {
  title: string;
  subtitle: string;
  imageUrl?: string;
  buttonText: string;
  buttonLink?: string;
}

export interface ProductGridProps {
  title: string;
  columns: number;
  products: Array<{
    id: number;
    name: string;
    price: number;
    image: string;
  }>;
}

export interface FooterSimpleProps {
  copyright: string;
  links?: Array<{ label: string; href: string }>;
  socialMedia?: Array<{ platform: string; url: string }>;
  backgroundColor?: string;
}

// Tipo union de todos os props possíveis
export type ComponentProps =
  | HeaderModernProps
  | HeroBannerProps
  | ProductGridProps
  | FooterSimpleProps;

// Mapeamento dos componentes disponíveis
const COMPONENT_MAP: Record<string, React.ComponentType<ComponentProps>> = {
  HeaderModern: HeaderModern as React.ComponentType<ComponentProps>,
  HeroBanner: HeroBanner as React.ComponentType<ComponentProps>,
  ProductGrid: ProductGrid as React.ComponentType<ComponentProps>,
  FooterSimple: FooterSimple as React.ComponentType<ComponentProps>,
};

export function DynamicComponent({
  component,
  props,
}: {
  component: string;
  props: ComponentProps;
}) {
  const Component = COMPONENT_MAP[component];

  if (!Component) {
    console.warn(`Componente "${component}" não encontrado`);
    return null;
  }

  return <Component {...props} />;
}

interface ComponentConfig {
  component: string;
  props: ComponentProps;
}

export interface SectionConfig extends ComponentConfig {
  id: string;
}

interface LayoutSchema {
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

interface Props {
  schema: LayoutSchema;
}

export default function DynamicLayoutRenderer({ schema }: Props) {
  const { layout } = schema;

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      {layout.header && (
        <DynamicComponent
          component={layout.header.component}
          props={layout.header.props}
        />
      )}

      {/* Body Sections */}
      <main className="flex-1">
        {layout.body.sections.map((section) => (
          <DynamicComponent
            key={section.id}
            component={section.component}
            props={section.props}
          />
        ))}
      </main>

      {/* Footer */}
      {layout.footer && (
        <DynamicComponent
          component={layout.footer.component}
          props={layout.footer.props}
        />
      )}
    </div>
  );
}
