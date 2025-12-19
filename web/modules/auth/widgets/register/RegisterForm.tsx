import { Button, Checkbox, PasswordInput, Stack, TextInput } from '@mantine/core';
import { UseFormReturnType } from '@mantine/form';

interface RegisterFormProps {
  form: UseFormReturnType<any>;
  onSubmit: (e?: React.FormEvent<HTMLFormElement>) => void;
  isSubmitting?: boolean;
}

export function RegisterForm({ form, onSubmit, isSubmitting }: RegisterFormProps) {
  return (
    <form onSubmit={onSubmit}>
      <Stack>
        <TextInput
          label="Username"
          placeholder="TaskMaster99"
          required
          radius="md"
          {...form.getInputProps('username')}
        />

        <PasswordInput
          label="Password"
          placeholder="Create a password"
          required
          radius="md"
          {...form.getInputProps('password')}
        />

        <Checkbox
          label="I accept terms and conditions"
          mt="xs"
          size="sm"
          {...form.getInputProps('terms', { type: 'checkbox' })}
        />
      </Stack>

      <Button
        loading={isSubmitting}
        disabled={form.values.terms === false}
        fullWidth
        mt="xl"
        size="md"
        radius="md"
        type="submit"
        variant="gradient"
        gradient={{ from: 'indigo', to: 'cyan' }}
      >
        Create account
      </Button>
    </form>
  );
}
