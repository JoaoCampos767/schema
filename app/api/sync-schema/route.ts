import fs from "fs";
import path from "path";
import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

type Area = "header" | "body" | "footer";
const AREAS: Area[] = ["header", "body", "footer"];

async function fetchAndSaveSchema(area: Area): Promise<void> {
  const response = await fetch(`${process.env.API_URL}/${area}`, {
    headers: {
      Authorization: `Bearer ${process.env.API_TOKEN}`,
    },
  });
  if (!response.ok) {
    throw new Error(
      `Falha ao buscar schema "${area}": ${response.status} ${response.statusText}`,
    );
  }

  const schema = await response.json();

  if (!schema || typeof schema !== "object") {
    throw new Error(`Schema inválido recebido para "${area}"`);
  }

  const filePath = path.join(process.cwd(), "schemas", `${area}.json`);
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, JSON.stringify(schema, null, 2), "utf-8");

  revalidateTag(`schema-${area}`, "default"); // tag específica por área
  revalidateTag("schemas", "default"); // tag geral
}

// POST /api/sync-schema
// body: { area: "header" | "body" | "footer" } ou { area: "all" }
export async function POST(req: NextRequest) {
  const { area } = await req.json();

  // Sincroniza todos de uma vez
  if (area === "all") {
    const results = await Promise.allSettled(
      AREAS.map((a) => fetchAndSaveSchema(a)),
    );

    const errors = results
      .map((r, i) =>
        r.status === "rejected"
          ? { area: AREAS[i], error: r.reason?.message }
          : null,
      )
      .filter(Boolean);

    if (errors.length > 0) {
      return NextResponse.json({ ok: false, errors }, { status: 207 });
    }

    return NextResponse.json({ ok: true, synced: AREAS });
  }

  // Sincroniza uma área específica
  if (!AREAS.includes(area)) {
    return NextResponse.json({ error: "area inválida" }, { status: 400 });
  }

  try {
    await fetchAndSaveSchema(area);
    return NextResponse.json({ ok: true, synced: area });
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Erro desconhecido";
    console.error(message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
