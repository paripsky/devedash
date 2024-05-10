import { AddDashboard } from '@/components/AddDashboard';
import { DashboardsList } from '@/components/DashboardsList';
import { HomeEmptyState } from '@/components/HomeEmptyState';
import { Dashboard } from '@/types/Dashboard';
import { createClient } from '@/utils/supabase/server';
import { Group, Stack, Title, rem } from '@mantine/core';
import { cookies } from 'next/headers';

export default async function Index() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return <HomeEmptyState />;


  const { data } = await supabase
    .from('dashboards')
    .select('id, name, color, created_at, updated_at');
  const dashboards = data as Dashboard[];

  return (<Stack>
    <Group justify="space-between" mt={rem(32)}>
      <Title order={3}>Dashboards</Title>
      <AddDashboard />
    </Group>
    <DashboardsList dashboards={dashboards} />
  </Stack>);
}
