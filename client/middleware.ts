import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('access_token')?.value;
  const { pathname } = request.nextUrl;

  const isAuthPage = pathname.startsWith('/auth/login') || pathname.startsWith('/auth/signup');
  const isProtectedPage = pathname.startsWith('/dashboard');

  // user not logged in → block protected pages
  if (!token && isProtectedPage) {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }

  // use is logged in → block auth pages
  if (token && isAuthPage) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}
