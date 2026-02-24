import "server-only";
import { cache } from "react";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { getSessionCookie } from "better-auth/cookies";

export const verifySession = cache(async () => {
  const requestHeaders = await headers();
  const sessionToken = getSessionCookie(requestHeaders);

  if (!sessionToken) {
    return null;
  }

  return { isAuth: true, token: sessionToken };
});

export const getVerifiedSession = cache(async () => {
  const session = await verifySession();

  if (!session) {
    redirect("/login");
  }

  return session;
});
