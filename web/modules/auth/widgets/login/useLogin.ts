import { useRouter } from 'next/navigation';
import { useForm } from '@mantine/form';
import { useApiMutation } from '@/modules/common/hooks/useApiMutation';
import { signInAction } from '../../actions/signIn';
import { LoginDto } from '../../model/auth';

export const useLogin = () => {
  const form = useForm({
    initialValues: {
      username: '',
      password: '',
      keepLoggedIn: true,
    },
    validate: {
      username: (val) => (val.length < 3 ? 'Username must be at least 3 characters' : null),
      password: (val) => (val.length < 6 ? 'Password must be at least 6 characters' : null),
    },
  });

  const router = useRouter();
  const { mutate, isPending } = useApiMutation<{}, LoginDto>(
    {
      callback: async () => {
        const result = await signInAction({
          username: form.values.username,
          password: form.values.password,
        });
        return result;
      },
    },
    {
      successMessage: 'Login successful! Redirecting to dashboard...',
      onSuccess: () => {
        router.push('/app');
      },
      errorMessage: 'Login failed. Please check your credentials and try again.',
    }
  );

  const handleSubmit = async (values: typeof form.values) => {
    mutate({});
  };

  return {
    form,
    handleSubmit: form.onSubmit(handleSubmit),
    isSubmitting: isPending,
  };
};
