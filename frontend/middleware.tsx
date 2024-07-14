import { NextResponse } from "next/server";
 
let locales = ["fr", "en"]

function getLocale(request) {
  let language = "fr";
  let defaultLocale = "fr";
  if (locales.includes(language)) return language;
  return defaultLocale
}
 
export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.includes("/favicon.ico")) return NextResponse.next();
  // return NextResponse.redirect(request.nextUrl)
  return NextResponse.next()
}
 
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     */
    '/((?!api|_next/static|_next/image).*)',
  ],
}