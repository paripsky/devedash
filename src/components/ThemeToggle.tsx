'use client';
import dynamic from 'next/dynamic'
import { ActionIcon, useComputedColorScheme, useMantineColorScheme } from "@mantine/core";
import { IconMoon, IconSun } from "@tabler/icons-react";

function ThemeToggleComponent() {
  const { setColorScheme, clearColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme('light');

  const toggleColorScheme = () => {
    setColorScheme(computedColorScheme === 'dark' ? 'light' : 'dark');
  };

  return <ActionIcon size="lg" variant="default" onClick={toggleColorScheme}>
    {computedColorScheme === 'light' ? <IconMoon size="1rem" /> : <IconSun size="1rem" />}
  </ActionIcon>;
}

export const ThemeToggle = dynamic(() => Promise.resolve(ThemeToggleComponent), { ssr: false });
