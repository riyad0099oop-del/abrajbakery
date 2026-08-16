import createIntlMiddleware from 'next-intl/middleware';
import {routing} from './i18n/routing';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const intlMiddleware = createIntlMiddleware(routing);

export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Protect admin routes
  if (pathname.includes('/admin') && !pathname.includes('/admin/login')) {
    const token = request.cookies.get('admin_token')?.value;
    let isAuthenticated = false;
    
    if (token) {
      try {
        const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'abraj-super-secret-key-2026');
        await jwtVerify(token, secret);
        isAuthenticated = true;
      } catch (e) {
        isAuthenticated = false;
      }
    }
    
    if (!isAuthenticated) {
      // Redirect to login while maintaining locale
      const match = pathname.match(/^\/(ar|en)/);
      const locale = match ? match[1] : 'ar';
      const loginUrl = new URL(`/${locale}/admin/login`, request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  // Continue to next-intl middleware
  return intlMiddleware(request);
}

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
};
