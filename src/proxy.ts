import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

const internalRewriteHeader = 'x-klong-locale-rewrite';

export default function proxy(request: NextRequest) {
  if (request.headers.get(internalRewriteHeader) === '1') {
    return NextResponse.next();
  }

  const pathname = request.nextUrl.pathname;
  const pathLocale = pathname.split('/')[1];

  if (pathLocale === 'en') return NextResponse.next();

  if (pathLocale === 'zh-CN') {
    const url = request.nextUrl.clone();
    url.pathname = pathname.slice('/zh-CN'.length) || '/';

    const response = NextResponse.redirect(url);
    response.cookies.set('FD_LOCALE', 'zh-CN', { path: '/' });
    return response;
  }

  const url = request.nextUrl.clone();
  url.pathname = `/zh-CN${pathname === '/' ? '' : pathname}`;

  const headers = new Headers(request.headers);
  headers.set(internalRewriteHeader, '1');

  return NextResponse.rewrite(url, {
    request: { headers },
  });
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)'],
};
