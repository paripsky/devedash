'use client';
import type { User } from '@supabase/supabase-js';
import { createClient } from '@/utils/supabase/client';
import { Avatar, UnstyledButton } from '@mantine/core';
import { Menu, Text, rem } from '@mantine/core';
import {
  IconSettings,
  IconSearch,
  IconLogout,
} from '@tabler/icons-react';

export function UserButton({ user }: { user: User }) {
  async function signOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    window.location.href = '/';
  }

  return (
    <Menu shadow="md" width={200} position="bottom-end">
      <Menu.Target>
        <UnstyledButton>
          <Avatar src={user.user_metadata.avatar_url}
            alt={user.user_metadata.user_name}>
            {user.user_metadata.name
              .split(' ')
              .map((w: string) => w.slice(0, 1))
              .join('')}
          </Avatar>
        </UnstyledButton>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Label>{user.user_metadata.name} {user.email}</Menu.Label>
        <Menu.Item leftSection={<IconSettings style={{ width: rem(14), height: rem(14) }} />}>
          Settings
        </Menu.Item>
        <Menu.Item
          leftSection={<IconSearch style={{ width: rem(14), height: rem(14) }} />}
          rightSection={
            <Text size="xs" c="dimmed">
              ⌘K
            </Text>
          }
        >
          Search
        </Menu.Item>

        <Menu.Divider />

        <Menu.Label>Danger zone</Menu.Label>
        <Menu.Item
          color="red"
          onClick={signOut}
          leftSection={<IconLogout style={{ width: rem(14), height: rem(14) }} />}
        >
          Sign Out
        </Menu.Item>
      </Menu.Dropdown>
    </Menu >
  );
}
