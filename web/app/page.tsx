'use client';

import Link from 'next/link';
import { Anchor, Container, Divider, Paper, Text, Title } from '@mantine/core';
import { SocialButtons } from '@/modules/auth/components/SocialButtons';
import { LoginForm } from '@/modules/auth/widgets/login/LoginForm';
import { useLogin } from '@/modules/auth/widgets/login/useLogin';

export default function LoginPage() {
  const { form, handleSubmit } = useLogin();

  return (
    <Container size={420} my={80}>
      <Title ta="center" fw={900}>
        Welcome back to TaskMan!
      </Title>

      <Text c="dimmed" size="sm" ta="center" mt={5}>
        Do not have an account yet?{' '}
        <Anchor size="sm" component={Link} href="/register">
          Create account
        </Anchor>
      </Text>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <Text size="xs" fw={500} c="dimmed" ta="center" mb="md">
          SIGN IN WITH
        </Text>

        <SocialButtons />

        <Divider label="Or continue with email" labelPosition="center" my="lg" />

        <LoginForm form={form} onSubmit={handleSubmit} />
      </Paper>
    </Container>
  );
}
