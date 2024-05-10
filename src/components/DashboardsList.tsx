import { SimpleGrid } from '@mantine/core';
import type { Dashboard } from '@/types/Dashboard';
import { DashboardItem } from './DashboardItem';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { createClient } from '@/utils/supabase/server';

export async function DashboardsList({ dashboards }: { dashboards: Dashboard[] }) {
  const updateDashboard = async (dashboard: Partial<Dashboard>) => {
    'use server';
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);
    const { error } = await supabase
      .from('dashboards')
      .update({
        name: dashboard.name,
        color: dashboard.color,
        updated_at: new Date(),
      })
      .eq('id', dashboard.id);

    if (error) {
      console.error(error);
      throw error;
    }

    revalidatePath('/app');
  };

  const deleteDashboard = async (dashboardId: string) => {
    'use server';
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);
    const { error } = await supabase
      .from('dashboards')
      .delete()
      .eq('id', dashboardId);

    if (error) {
      console.error(error);
      throw error;
    }

    revalidatePath('/app');
  };

  return (
    <SimpleGrid
      cols={{ base: 1, sm: 2, lg: 4 }}
      spacing={{ base: 10, sm: 'xl' }}
      verticalSpacing={{ base: 'md', sm: 'xl' }}>
      {dashboards.map(dashboard => (
        <DashboardItem key={dashboard.id} dashboard={dashboard} updateDashboard={updateDashboard} deleteDashboard={deleteDashboard} />
      ))}
    </SimpleGrid>
  );
}