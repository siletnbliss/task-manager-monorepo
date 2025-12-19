import { useQuery, UseQueryOptions, UseQueryResult } from '@tanstack/react-query';
import { AxiosError, AxiosRequestConfig } from 'axios';
import { axiosInstance } from '@/modules/common/lib/axios';

interface ApiQueryConfig {
  url: string;
  params?: Record<string, any>;
  urlParams?: Record<string, string | number>;
}

export function useApiQuery<TData = any, TError = any>(
  config: ApiQueryConfig,
  options?: {
    queryKey?: any[];
  } & Omit<UseQueryOptions<TData, AxiosError<TError>>, 'queryKey' | 'queryFn'>
): UseQueryResult<TData, AxiosError<TError>> {
  const { url, params, urlParams } = config;

  let finalUrl = url;
  if (urlParams) {
    Object.entries(urlParams).forEach(([key, value]) => {
      finalUrl = finalUrl.replace(`:${key}`, String(value));
    });
  }

  const queryKey = [finalUrl, params, ...(options?.queryKey || [])];

  return useQuery<TData, AxiosError<TError>>({
    queryKey,
    queryFn: async () => {
      const requestConfig: AxiosRequestConfig = {
        method: 'GET',
        url: finalUrl,
        params,
      };
      const response = await axiosInstance(requestConfig);
      return response.data;
    },
    ...options,
  });
}
