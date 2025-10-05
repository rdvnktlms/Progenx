import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Oyun sayfalarını kontrol et
  if (pathname.startsWith('/oyunlar/')) {
    // Admin sayfalarını hariç tut
    if (pathname.startsWith('/admin/')) {
      return NextResponse.next();
    }
    
    // Oyun sayfalarına erişimi engelle (client-side kontrol için)
    return NextResponse.next();
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ['/oyunlar/:path*']
};
