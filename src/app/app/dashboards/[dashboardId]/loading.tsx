import { Button, Group, Loader, Skeleton, Stack, Title } from "@mantine/core";

export default function DashboardLoading() {
  return (
    <Stack mt="xl">
      <Skeleton h={50} w={250} />
      <Group justify="end">
        <Skeleton h={50} w={100} />
      </Group>
      <Stack my="md">
        <Skeleton h={150} />
        <Skeleton h={150} />
        <Skeleton h={150} />
      </Stack>
    </Stack>
  );
}