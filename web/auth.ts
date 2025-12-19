import axios, { AxiosError } from 'axios';
import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { BaseApiResponse } from './modules/common/model/api';

type LoginApiResponse = BaseApiResponse<{
  id: number;
  access_token: string;
}>;
export const { handlers, signIn, signOut, auth } = NextAuth({
  trustHost: true,
  providers: [
    Credentials({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async (credentials) => {
        try {
          if (!credentials?.username || !credentials?.password) {
            return null;
          }

          const { data } = await axios.post<LoginApiResponse>(
            '/auth/login',
            {
              username: credentials.username,
              password: credentials.password,
            },
            { baseURL: process.env.API_URL_INTERNAL || process.env.NEXT_PUBLIC_API_BASE_URL }
          );

          if (data.success && data.responseObject?.access_token) {
            return {
              id: String(data.responseObject.id),
              name: credentials.username as string,
              accessToken: data.responseObject.access_token,
            };
          }

          return null;
        } catch (error) {
          console.error(
            'Error during authorization:',
            (error as AxiosError | undefined)?.response?.data
          );
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.accessToken;
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken as string;
      return session;
    },
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith('/app');
      const isOnLoginPage = nextUrl.pathname.startsWith('/');
      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      }

      if (isOnLoginPage) {
        if (isLoggedIn) {
          return Response.redirect(new URL('/app', nextUrl));
        }
      }

      return true;
    },
  },
  pages: {
    signIn: '/',
    signOut: '/',
  },
  session: {
    strategy: 'jwt',
  },
});
