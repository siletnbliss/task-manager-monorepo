import { IconLogout } from '@tabler/icons-react';
import { ActionIcon } from '@mantine/core';
import { signOutAction } from '../actions/signOut';

export function SignOutButton() {
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
