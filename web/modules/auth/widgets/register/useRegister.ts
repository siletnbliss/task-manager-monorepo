import { useForm } from '@mantine/form';

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

  const handleSubmit = (values: typeof form.values) => {
    // TODO: api call
    console.log('Registering:', values);
  };

  return {
    form,
    handleSubmit: form.onSubmit(handleSubmit),
  };
};
