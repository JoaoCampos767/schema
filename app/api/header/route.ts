import header from "@/schemas/header.json";
import { NextResponse } from "next/server";

export async function GET() {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return NextResponse.json(header);
}
