'use client';

import Link from 'next/link';
import { Anchor, Container, Divider, Paper, Text, Title } from '@mantine/core';
import { SocialButtons } from '@/modules/auth/components/SocialButtons';
import { RegisterForm } from '@/modules/auth/widgets/register/RegisterForm';
import { useRegister } from '@/modules/auth/widgets/register/useRegister';

export default function RegisterPage() {
  const { form, handleSubmit } = useRegister();

  return (
    <Container size={420}>
      <Title ta="center" fw={900}>
        Join TaskMan
      </Title>

      <Text c="dimmed" size="sm" ta="center" mt={5}>
        Already have an account?{' '}
        <Anchor size="sm" component={Link} href="/">
          Login
        </Anchor>
      </Text>

      <Paper withBorder w={420} shadow="md" p={30} mt={30} radius="md">
        <Text size="xs" fw={500} c="dimmed" ta="center" mb="md">
          REGISTER WITH
        </Text>

        <SocialButtons />

        <Divider label="Or register with credentials" labelPosition="center" my="lg" />

        <RegisterForm form={form} onSubmit={handleSubmit} />
      </Paper>
    </Container>
  );
}
