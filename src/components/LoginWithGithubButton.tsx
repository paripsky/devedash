'use client';
import { DEFAULT_URL } from '@/utils/defaultURL';
import { createClient } from '@/utils/supabase/client';
import { Button, ButtonProps } from '@mantine/core';
import { IconBrandGithub } from '@tabler/icons-react';

export function LoginWithGithubButton({ text = 'Login', ...buttonProps }: { text?: string } & ButtonProps) {
  async function signInWithGithub() {
    const supabase = createClient();
    await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: `${DEFAULT_URL}/auth/callback`,
      },
    });
  }

  return (
    <Button variant="outline" onClick={signInWithGithub} leftSection={<IconBrandGithub />} {...buttonProps}>
      {text}
    </Button>
  );
}
