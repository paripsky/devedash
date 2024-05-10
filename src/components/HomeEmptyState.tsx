import { Group, Stack, Text, Title, rem } from "@mantine/core";
import { LoginWithGithubButton } from "./LoginWithGithubButton";

export function HomeEmptyState() {
  return <Stack>
    <Title order={2}>Welcome to Develog!</Title>
    <Group gap={rem(8)}>
      <Text>Login to get started:</Text>
      <LoginWithGithubButton />
    </Group>
  </Stack>
}