import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { AddWidgetForm } from './AddWidgetForm';
import { Widget } from '@/types/Widget';

export function AddWidget({ dashboardId, widgets }: { dashboardId: string; widgets: Widget[]; }) {
  const onSave = async (formData: FormData) => {
    'use server';
    const name = formData.get('name');
    const template = formData.get('template');
    const dashboardId = formData.get('dashboardId');
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);
    const {
      data: { user },
    } = await supabase.auth.getUser();
    const { data, error } = await supabase.from('widgets').insert({
      user_id: user?.id,
      name,
      template,
      dashboard_id: dashboardId,
    });

    if (error) throw error;

    revalidatePath(`/app/dashboards/${dashboardId}`);
  };

  return <AddWidgetForm onSave={onSave} dashboardId={dashboardId} widgets={widgets} />;
}
