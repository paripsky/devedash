import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import './globals.css';

import { ColorSchemeScript, Container, MantineProvider } from '@mantine/core';

import type { Metadata } from 'next';

import { Notifications } from '@mantine/notifications';
import { ModalsProvider } from '@mantine/modals';

export const metadata: Metadata = {
  metadataBase: new URL('https://devedash.vercel.app'),
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
