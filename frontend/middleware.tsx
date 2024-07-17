import { NextRequest, NextResponse } from "next/server";

let locales = ["fr", "en"];
let defaultLocale = "fr";

function getLocale(request: NextRequest) {
  let language = "fr";
  if (locales.includes(language)) return language;
  return defaultLocale;
};

export function middleware(request: NextRequest) {
  // Check if there is any supported locale in the pathname
  const { pathname } = request.nextUrl;
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) {
    // add other rules here
    return;
  };

  // Redirect if there is no local/((?!api|_next/static|_next/image|image|favicon.ico).*)e
  const locale = getLocale(request);
  request.nextUrl.pathname = `/${locale}${pathname}`;
  return NextResponse.redirect(request.nextUrl);
};

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     */
    "/((?!api|_next/static|_next/image|image|favicon.ico|manifest.webmanifest|robots.txt).*)",
  ],
};