import axios from 'axios';
import { getSession, signOut } from 'next-auth/react';

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(async (config) => {
  // Only attach token on client side
  if (typeof window !== 'undefined') {
    const session = await getSession();
    if (session?.accessToken) {
      config.headers.Authorization = `Bearer ${session.accessToken}`;
    }
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (typeof window !== 'undefined' && [401, 403].includes(error.response?.status)) {
      console.warn('Unauthorized - signing out...');

      await signOut({ callbackUrl: '/' });

      return Promise.reject(error);
    }

    return Promise.reject(error);
  }
);
