/* eslint-disable @typescript-eslint/no-explicit-any */
import NextAuth from 'next-auth';

import { authOptions } from '@/lib/auth';

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

// Add this error handling
export function GET(request: Request) {
  return handler(request).catch(error => {
    console.error('NextAuth error:', error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  });
}

export function POST(request: Request) {
  return handler(request).catch(error => {
    console.error('NextAuth error:', error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  });
}
