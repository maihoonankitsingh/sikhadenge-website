import { destroySession } from "../../../../src/server/auth/session";

export async function POST() {
  await destroySession();
  return new Response(null, { status: 204 });
}
