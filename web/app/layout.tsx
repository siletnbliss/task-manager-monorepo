import '@mantine/core/styles.css';

import React from 'react';
import {
  Box,
  ColorSchemeScript,
  Container,
  Group,
  mantineHtmlProps,
  MantineProvider,
} from '@mantine/core';
import { ThemeToggle } from '@/modules/common/components/theme-switch/ThemeToggle';
import { theme } from '../theme';

export const metadata = {
  title: 'TaskMan - Manage Your Tasks Efficiently',
  description:
    'A powerful task management application to organize and prioritize your work seamlessly.',
};

export default function RootLayout({ children }: { children: any }) {
  return (
    <html lang="en" {...mantineHtmlProps}>
      <head>
        <ColorSchemeScript />
        <link rel="shortcut icon" href="/favicon.svg" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
      </head>
      <body>
        <MantineProvider theme={theme}>
          <Container
            size="xl"
            px="md"
            py={'lg'}
            mx="auto"
            h={'100vh'}
            style={{
              display: 'flex',
              flexDirection: 'column',
              overflow: 'auto',
            }}
          >
            <Group justify="end" pb={'md'}>
              <ThemeToggle />
            </Group>
            <Box
              flex={1}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {children}
            </Box>
          </Container>
        </MantineProvider>
      </body>
    </html>
  );
}
