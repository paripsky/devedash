import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import './globals.css';

import { Inter as FontSans } from 'next/font/google';
import { DEFAULT_URL } from '@/utils/defaultURL';
import { ColorSchemeScript, Container, MantineProvider } from '@mantine/core';

import type { Metadata } from 'next';

import { Notifications } from '@mantine/notifications';
import { ModalsProvider } from '@mantine/modals';

export const metadata: Metadata = {
  metadataBase: new URL(DEFAULT_URL),
  title: 'Devedash',
  description: 'Build your own dashboard',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
      </head>
      <body>
        <MantineProvider>
          <ModalsProvider>
            <Notifications />
            <Container maw={1280}>
              {children}
            </Container>
          </ModalsProvider>
        </MantineProvider>
      </body>
    </html >
  );
}
