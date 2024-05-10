'use client';
import { createClient } from '@/utils/supabase/client';
import { Button, ButtonProps } from '@mantine/core';
import { IconBrandGithub } from '@tabler/icons-react';

export function LoginWithGithubButton({ text = 'Login', ...buttonProps }: { text?: string } & ButtonProps) {
  async function signInWithGithub() {
    const redirectUrl = new URL(window.location.origin);
    redirectUrl.pathname = '/auth/callback';
    const supabase = createClient();
    await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: redirectUrl.toString(),
      },
    });
  }

  return (
    <Button variant="outline" onClick={signInWithGithub} leftSection={<IconBrandGithub />} {...buttonProps}>
      {text}
    </Button>
  );
}
