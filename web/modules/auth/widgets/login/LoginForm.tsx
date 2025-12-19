import Link from 'next/link';
import { Anchor, Button, Checkbox, Group, PasswordInput, Stack, TextInput } from '@mantine/core';
import { UseFormReturnType } from '@mantine/form';

interface LoginFormProps {
  form: UseFormReturnType<any>;
  onSubmit: (e?: React.FormEvent) => void;
}

export function LoginForm({ form, onSubmit }: LoginFormProps) {
  return (
    <form onSubmit={onSubmit}>
      <Stack>
        <TextInput
          label="Email"
          placeholder="you@taskman.app"
          required
          radius="md"
          {...form.getInputProps('email')}
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
        <Anchor component={Link} href="/forgot-password" size="sm" c="dimmed">
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
      >
        Sign in to TaskMan
      </Button>
    </form>
  );
}
