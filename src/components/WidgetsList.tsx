import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';
import { WidgetItem } from './WidgetItem';
import type { Widget } from '@/types/Widget';
import { revalidatePath } from 'next/cache';
import { Stack } from '@mantine/core';

export async function WidgetsList({ widgets }: { widgets: Widget[] }) {
  const updateWidget = async (widget: Partial<Widget>) => {
    'use server';
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);
    const { error } = await supabase
      .from('widgets')
      .update({
        name: widget.name,
        template: widget.template,
        files: widget.files,
        updated_at: new Date(),
      })
      .eq('id', widget.id);

    if (error) {
      console.error(error);
      throw error;
    }

    revalidatePath(`/app/dashboards/${widget.dashboard_id}`);
  };

  const deleteWidget = async (widgetId: string, dashboardId: string) => {
    'use server';
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);
    const { error } = await supabase
      .from('widgets')
      .delete()
      .eq('id', widgetId);

    if (error) {
      console.error(error);
      throw error;
    }

    revalidatePath(`/app/dashboards/${dashboardId}`);
  };

  return (
    <Stack my="md">
      {widgets.map((widget) => (
        <WidgetItem key={widget.id} widget={widget} updateWidget={updateWidget} deleteWidget={deleteWidget} />
      ))}
    </Stack>
  );
}
