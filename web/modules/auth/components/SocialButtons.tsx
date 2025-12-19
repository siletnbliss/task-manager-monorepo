import { IconBrandGoogle, IconBrandTwitter } from '@tabler/icons-react';
import { Button, Group } from '@mantine/core';

export function SocialButtons() {
  return (
    <Group grow mb="md" mt="md">
      <Button leftSection={<IconBrandGoogle size={18} />} variant="default" radius="xl">
        Google
      </Button>
      <Button leftSection={<IconBrandTwitter size={18} />} variant="default" radius="xl">
        Twitter
      </Button>
    </Group>
  );
}
