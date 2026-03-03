"use client";
import { COMPONENT_MAP, ComponentProps, SchemaProps } from "@/types/schema";

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

export default function DynamicLayoutRenderer({ schema }: SchemaProps) {
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
