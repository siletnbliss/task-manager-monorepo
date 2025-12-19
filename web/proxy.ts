// middleware.ts
import { auth } from '@/auth'; // Adjust path to your auth.ts

export default auth;

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
