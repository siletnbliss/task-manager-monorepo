import { useRouter } from 'next/navigation';
import { useForm } from '@mantine/form';
import { useApiMutation } from '@/modules/common/hooks/useApiMutation';
import { RegisterDto } from '../../model/auth';

export const useRegister = () => {
  const form = useForm({
    initialValues: {
      username: '',
      password: '',
      terms: false,
    },
    validate: {
      username: (val) => (val.length < 3 ? 'Username must be at least 3 characters' : null),
      password: (val) => (val.length < 6 ? 'Password must be at least 6 characters' : null),
      terms: (val) => (val ? null : 'You must accept terms and conditions'),
    },
  });
  const router = useRouter();
  const { mutate, isPending } = useApiMutation<{}, RegisterDto>(
    {
      method: 'POST',
      url: 'auth/register',
    },
    {
      successMessage: 'Registration successful! You can now log in.',
      onSuccess: () => {
        router.push('/');
      },
    }
  );

  const handleSubmit = (values: typeof form.values) => {
    mutate({
      body: {
        username: values.username,
        password: values.password,
      },
    });
  };

  return {
    form,
    handleSubmit: form.onSubmit(handleSubmit),
    isSubmitting: isPending,
  };
};
