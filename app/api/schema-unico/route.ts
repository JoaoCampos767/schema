import schema from "@/schemas/layout-schema.json";
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json(schema);
}
