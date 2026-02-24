"use client";
import { useEffect, useState } from "react";
import DynamicLayoutRenderer from "@/components/DynamicLayoutRenderer";

const EDITOR_ORIGIN = process.env.NEXT_PUBLIC_EDITOR_ORIGIN!;

export default function PreviewClient() {
  const [schema, setSchema] = useState<any>(null);

  useEffect(() => {
    console.log("PreviewClient montou, EDITOR_ORIGIN:", EDITOR_ORIGIN);

    const handleMessage = (event: MessageEvent) => {
      console.log("mensagem recebida:", event.origin, event.data);
      if (event.origin !== EDITOR_ORIGIN) return;
      if (event.data.type === "UPDATE_SCHEMA") {
        setSchema(event.data.payload);
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  if (!schema)
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-400">
        <p>Aguardando conexão com o editor...</p>
      </div>
    );

  return <DynamicLayoutRenderer schema={schema} />;
}
