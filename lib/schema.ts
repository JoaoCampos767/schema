import { cacheTag, cacheLife } from "next/cache";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

export async function getHeader() {
  "use cache";
  cacheTag("schema");
  cacheLife("hours");

  const res = await fetch(`${BASE_URL}/api/header`);
  return res.json();
}

export async function getBody() {
  "use cache";
  cacheTag("schema");
  cacheLife("hours");

  const res = await fetch(`${BASE_URL}/api/body`);
  return res.json();
}

export async function getFooter() {
  "use cache";
  cacheTag("schema");
  cacheLife("hours");

  const res = await fetch(`${BASE_URL}/api/footer`);
  return res.json();
}
