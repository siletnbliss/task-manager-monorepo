'use server';

import { signIn } from '@/auth';

export async function signInAction(cred: { username: string; password: string }) {
  await signIn('credentials', {
    redirect: false,
    username: cred.username,
    password: cred.password,
  });
}
