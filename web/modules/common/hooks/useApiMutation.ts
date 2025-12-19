import { useMutation, UseMutationOptions, UseMutationResult } from '@tanstack/react-query';
import { AxiosError, AxiosRequestConfig } from 'axios';
import { notifications } from '@mantine/notifications';
import { axiosInstance } from '../lib/axios';

type HttpMethod = 'POST' | 'PUT' | 'PATCH' | 'DELETE';

interface ApiMutationConfig {
  method: HttpMethod;
  url: string;
}

interface MutationVariables<TBody = any> {
  body?: TBody;
  params?: Record<string, any>;
  urlParams?: Record<string, string | number>;
}

export function useApiMutation<TData = any, TBody = any, TError = any>(
  config: ApiMutationConfig,
  options?: {
    successMessage?: string;
    errorMessage?: string;
    onSuccess?: (data: TData) => void;
    onError?: (error: AxiosError<TError>) => void;
  } & Omit<UseMutationOptions<TData, AxiosError<TError>, MutationVariables<TBody>>, 'mutationFn'>
): UseMutationResult<TData, AxiosError<TError>, MutationVariables<TBody>> {
  const { method, url } = config;

  return useMutation({
    mutationFn: async ({ body, params, urlParams }: MutationVariables<TBody>) => {
      let finalUrl = url;
      if (urlParams) {
        Object.entries(urlParams).forEach(([key, value]) => {
          finalUrl = finalUrl.replace(`:${key}`, String(value));
        });
      }

      const requestConfig: AxiosRequestConfig = {
        method,
        url: finalUrl,
        params,
        data: body,
      };

      const response = await axiosInstance(requestConfig);
      return response.data;
    },
    ...options,
    onSuccess: (data, variables, context) => {
      // Trigger Success Notification
      if (options?.successMessage) {
        notifications.show({
          title: 'Success',
          message: options.successMessage,
          color: 'green',
          withBorder: true,
        });
      }

      if (options?.onSuccess) {
        options.onSuccess(data);
      }
    },
    onError: (error, variables, context) => {
      // Trigger Error Notification
      const message =
        options?.errorMessage ||
        (error.response?.data as any)?.message ||
        'An unexpected error occurred';

      notifications.show({
        title: 'Error',
        message,
        color: 'red',
        withBorder: true,
      });

      if (options?.onError) {
        options.onError(error);
      }
    },
  });
}
