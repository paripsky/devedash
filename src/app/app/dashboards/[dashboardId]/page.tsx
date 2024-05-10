import { AddWidget } from "@/components/AddWidget";
import { WidgetsList } from "@/components/WidgetsList";
import { Dashboard } from "@/types/Dashboard";
import { Widget } from "@/types/Widget";
import { createClient } from "@/utils/supabase/server";
import { Stack, Title } from "@mantine/core";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function DashboardPage({
  params,
}: { params: { dashboardId: string } }) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const { data: dashboardData } = await supabase
    .from('dashboards')
    .select('id, name, created_at')
    .eq('id', params.dashboardId);
  const [dashboard] = dashboardData as Dashboard[] ?? [];
  const { data: widgetsData } = await supabase
    .from('widgets')
    .select('id, name, template, files, created_at, updated_at')
    .eq('dashboard_id', params.dashboardId)
    .order('updated_at', { ascending: false });
  const widgets = widgetsData as Widget[];

  if (!dashboard) {
    redirect('/app');
  }

  return (
    <Stack mt="xl">
      <Title>{dashboard.name}</Title>
      <AddWidget dashboardId={params.dashboardId} widgets={widgets} />
      {!!widgets.length && <WidgetsList widgets={widgets} />}
    </Stack>
  )
}