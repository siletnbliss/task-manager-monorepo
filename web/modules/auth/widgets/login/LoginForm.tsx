import Link from 'next/link';
import { Anchor, Button, Checkbox, Group, PasswordInput, Stack, TextInput } from '@mantine/core';
import { UseFormReturnType } from '@mantine/form';

interface LoginFormProps {
  form: UseFormReturnType<any>;
  onSubmit: (e?: React.FormEvent<HTMLFormElement>) => void;
  isSubmitting?: boolean;
}

export function LoginForm({ form, onSubmit, isSubmitting }: LoginFormProps) {
  return (
    <form onSubmit={onSubmit}>
      <Stack>
        <TextInput
          label="Username"
          placeholder="your-username"
          required
          radius="md"
          {...form.getInputProps('username')}
        />

        <PasswordInput
          label="Password"
          placeholder="Your password"
          required
          radius="md"
          {...form.getInputProps('password')}
        />
      </Stack>

      <Group justify="space-between" mt="lg">
        <Checkbox
          label="Keep me logged in"
          {...form.getInputProps('keepLoggedIn', { type: 'checkbox' })}
        />
        <Anchor component={Link} href="/" size="sm" c="dimmed">
          Forgot password?
        </Anchor>
      </Group>

      <Button
        fullWidth
        mt="xl"
        size="md"
        radius="md"
        type="submit"
        variant="gradient"
        gradient={{ from: 'indigo', to: 'cyan' }}
        loading={isSubmitting}
      >
        Sign in to TaskMan
      </Button>
    </form>
  );
}
