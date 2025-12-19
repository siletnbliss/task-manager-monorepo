import { useForm } from '@mantine/form';

export const useLogin = () => {
  const form = useForm({
    initialValues: {
      email: '',
      password: '',
      keepLoggedIn: true,
    },
    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : 'Invalid email'),
      password: (val) => (val.length < 6 ? 'Password must be at least 6 characters' : null),
    },
  });

  const handleSubmit = (values: typeof form.values) => {
    // TODO: api call
    console.log('Submitting:', values);
  };

  return {
    form,
    handleSubmit: form.onSubmit(handleSubmit),
  };
};
