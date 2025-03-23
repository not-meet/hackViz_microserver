// middleware.js (place in your project root)
import { NextResponse } from 'next/server';

export function middleware(request) {
  // Get the response
  const response = NextResponse.next();

  // Add the CORS headers to the response
  response.headers.set('Access-Control-Allow-Credentials', 'true');
  response.headers.set('Access-Control-Allow-Origin', '*'); // Or specify your domain instead of *
  response.headers.set('Access-Control-Allow-Methods', 'GET,DELETE,PATCH,POST,PUT,OPTIONS');
  response.headers.set('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization');

  return response;
}

// Configure which routes this middleware applies to
export const config = {
  matcher: '/api/:path*',  // This applies to all API routes
};
