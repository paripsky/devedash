import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';
import { LoginWithGithubButton } from './LoginWithGithubButton';
import { UserButton } from './UserButton';

export default async function AuthButton() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user ? <UserButton user={user} /> : <LoginWithGithubButton />;
}
