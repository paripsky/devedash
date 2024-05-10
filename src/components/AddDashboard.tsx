import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { AddDashboardForm } from "./AddDashboardForm";

export function AddDashboard() {
  const onSave = async (formData: FormData) => {
    'use server';
    const name = formData.get('name');
    const color = formData.get('color');
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);
    const {
      data: { user },
    } = await supabase.auth.getUser();
    const { data, error } = await supabase.from('dashboards').insert({
      user_id: user?.id,
      name,
      color,
    });

    if (error) {
      console.error(error);
      throw error;
    }

    revalidatePath('/app');
  };

  return <AddDashboardForm onSave={onSave} />;
}
