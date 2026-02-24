import { draftMode } from "next/headers";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get("token");

  if (token !== process.env.DRAFT_MODE_SECRET) {
    return new Response("Token inválido", { status: 401 });
  }

  const dm = await draftMode();
  dm.enable();

  const response = new Response("Draft ativado", { status: 200 });
  // Sobrescreve o cookie para aceitar cross-site em dev
  response.headers.append(
    "Set-Cookie",
    "__prerender_bypass=; SameSite=None; Secure=false; Path=/",
  );

  return response;
}
