import { NextRequest, NextResponse } from "next/server";
import header from "@/schemas_old/schema-header.json";
import body from "@/schemas_old/schema-body.json";
import footer from "@/schemas_old/schema-footer.json";

// Simulando o que a API C# vai retornar
const mockSchemas: Record<string, object> = {
  header: header,
  footer: footer,
  body: body,
};

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ area: string }> },
) {
  const { area } = await context.params;

  if (!mockSchemas[area]) {
    return NextResponse.json(
      { error: "Schema não encontrado" },
      { status: 404 },
    );
  }

  await new Promise((resolve) => setTimeout(resolve, 200));

  return NextResponse.json(mockSchemas[area]);
}
