// app/api/auth/logout/route.js  (or route.ts)
import { NextResponse } from 'next/server';
import { logout } from '@helpers/auth';

export async function POST(request) {
  await logout();

  // Build a proper absolute URL based on the current request
  const redirectUrl = new URL('/admin/login', request.url);

  return NextResponse.redirect(redirectUrl);
}