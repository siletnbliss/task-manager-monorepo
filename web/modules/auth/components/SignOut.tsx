'use client';

import { IconLogout } from '@tabler/icons-react';
import { useSession } from 'next-auth/react';
import { ActionIcon } from '@mantine/core';
import { signOutAction } from '../actions/signOut';

export function SignOutButton() {
  const { data } = useSession();
  if (!data?.user) {
    return null;
  }
  return (
    <ActionIcon
      onClick={signOutAction}
      variant="default"
      size="xl"
      radius="md"
      aria-label="Sign out"
    >
      <IconLogout />
    </ActionIcon>
  );
}
