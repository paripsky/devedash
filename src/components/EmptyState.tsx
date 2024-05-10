'use client';

import { Button, Stack, Title, rem } from "@mantine/core";
import { IconArchive } from "@tabler/icons-react";

export type EmptyStateProps = {
  title: string;
  actionText: string;
  onClick: () => void;
}

export function EmptyState({ title, onClick, actionText }: EmptyStateProps) {
  return (
    <Stack align="center">
      <Title order={3}>{title}</Title>
      <IconArchive style={{ width: rem(128), height: rem(128) }} />
      <Button variant="outline" onClick={onClick}>{actionText}</Button>
    </Stack>
  )
}