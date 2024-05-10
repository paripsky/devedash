import Link from "next/link";
import AuthButton from "./AuthButton";
import { Group, Text } from "@mantine/core";
import { ThemeToggle } from "./ThemeToggle";

export function Navbar() {
  return <nav>
    <Group justify="space-between" py="xs">
      <Text
        component={Link}
        href="/app"
        size="xl"
        fw={900}
        variant="gradient"
        gradient={{ from: 'blue', to: 'cyan', deg: 90 }}
      >
        Devedash
      </Text>
      <Group>
        <ThemeToggle />
        <AuthButton />
      </Group>
    </Group>
  </nav>
}
