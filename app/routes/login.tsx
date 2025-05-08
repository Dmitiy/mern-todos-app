import Button from '@/ui/button';
import Input from '@/ui/input';
import { data, redirect, useFetcher } from 'react-router';
import type { Route } from './+types/login';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Login' },
    { name: 'description', content: 'Welcome to Login page!' },
  ];
}

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const email = String(formData.get('email'));
  const password = String(formData.get('password'));

  const errors: { email?: string; password?: string } = {};

  if (!email.includes('@')) {
    errors.email = 'Invalid email address';
  }

  if (password.length < 3) {
    errors.password = 'Password should be at least 3 characters';
  }

  if (Object.keys(errors).length > 0) {
    return data({ errors }, { status: 400 });
  }
  // TODO: - check is existing user on db
  // - if not existing then redirect to registration form
  // else redirect to some page with access

  if (email === 'a@a.ru' && password === '123') {
    return redirect('/settings');
  }

  // Redirect to home if validation is successful
}

function Login(_: Route.ComponentProps) {
  let fetcher = useFetcher();
  let errors = fetcher.data?.errors;
  return (
    <fetcher.Form method='post'>
      <p>
        <Input type='email' name='email' defaultValue='a@a.ru' /> Email:
        {errors?.email ? <em>{errors.email}</em> : null}
      </p>
      <p>
        <Input type='password' name='password' /> Password:
        {errors?.password ? <em>{errors.password}</em> : null}
      </p>

      <Button type='submit'>Sign Up</Button>
    </fetcher.Form>
  );
}

export default Login;
