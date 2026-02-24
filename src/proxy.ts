import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

const publicRoutes = ["/", "/login"];

const isPublicRoute = (path: string) =>
  publicRoutes.includes(path) || path.startsWith("/api/auth");

const isAuthPage = (path: string) => path === "/login";

const isApiRoute = (path: string) => path.startsWith("/api");

export default function proxy(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const sessionToken = getSessionCookie(request.headers);
  const isPublic = isPublicRoute(path);

  if (!sessionToken && !isPublic) {
    if (isApiRoute(path)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }

  if (sessionToken && isAuthPage(path)) {
    return NextResponse.redirect(new URL("/dashboard", request.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
