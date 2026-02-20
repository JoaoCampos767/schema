import body from "@/schemas/schema-body.json";
import { NextResponse } from "next/server";

export async function GET() {
  await new Promise((resolve) => setTimeout(resolve, 3000));
  return NextResponse.json(body);
}
