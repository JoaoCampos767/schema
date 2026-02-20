import {
  DynamicComponent,
  SectionConfig,
} from "@/components/DynamicLayoutRenderer";
import { Suspense } from "react";

export const dynamic = "force-dynamic";

async function AsyncHeader() {
  const header = await fetch("http://localhost:3000/api/header", {
    cache: "no-store",
  }).then((r) => r.json());
  return <DynamicComponent component={header.component} props={header.props} />;
}

async function AsyncBody() {
  const body = await fetch("http://localhost:3000/api/body", {
    cache: "no-store",
  }).then((r) => r.json());
  return (
    <main className="flex-1">
      {body.sections.map((section: SectionConfig) => (
        <DynamicComponent
          key={section.id}
          component={section.component}
          props={section.props}
        />
      ))}
    </main>
  );
}

async function AsyncFooter() {
  const footer = await fetch("http://localhost:3000/api/footer", {
    cache: "no-store",
  }).then((r) => r.json());
  return <DynamicComponent component={footer.component} props={footer.props} />;
}

function HeaderSkeleton() {
  return (
    <div className="w-full h-20 bg-gray-200 animate-pulse flex items-center px-8">
      <div className="w-32 h-8 bg-gray-300 rounded" />
      <div className="ml-auto flex gap-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="w-20 h-4 bg-gray-300 rounded" />
        ))}
      </div>
    </div>
  );
}

function BodySkeleton() {
  return (
    <div className="flex-1 p-8 space-y-8">
      <div className="w-full h-96 animate-pulse rounded-lg bg-gray-200" />
      <div className="grid grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="h-64 bg-gray-200 animate-pulse rounded" />
        ))}
      </div>
      <div className="w-full h-96 animate-pulse rounded-lg bg-gray-200" />
    </div>
  );
}

export default function Page() {
  return (
    <div className="min-h-screen flex flex-col">
      <Suspense fallback={<HeaderSkeleton />}>
        <AsyncHeader />
      </Suspense>

      <Suspense fallback={<BodySkeleton />}>
        <AsyncBody />
      </Suspense>

      <Suspense fallback={<div className="h-32 animate-pulse w-full" />}>
        <AsyncFooter />
      </Suspense>
    </div>
  );
}
