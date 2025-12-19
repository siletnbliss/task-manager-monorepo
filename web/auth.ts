import { AxiosError } from 'axios';
import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { axiosInstance } from './modules/common/lib/axios';
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

          const { data } = await axiosInstance.post<LoginApiResponse>('/auth/login', {
            username: credentials.username,
            password: credentials.password,
          });

          if (data.success && data.responseObject?.access_token) {
            return {
              id: String(data.responseObject.id),
              name: credentials.username as string,
              accessToken: data.responseObject.access_token,
            };
          }

          return null;
        } catch (error) {
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
      console.log({ isLoggedIn, isOnDashboard, isOnLoginPage });
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
