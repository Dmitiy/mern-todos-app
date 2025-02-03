import { type RouteConfig, route } from '@react-router/dev/routes';
import { redirect, useFetcher, data } from 'react-router';
import type { Route } from './+types/login';
import Input from '@/ui/input';
import Button from '@/ui/button';

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

  // Redirect to home if validation is successful
  // return redirect('/login');
}

function Login({
  loaderData,
  actionData,
  params,
  matches,
}: Route.ComponentProps) {
  let fetcher = useFetcher();
  let errors = fetcher.data?.errors;
  return (
    <fetcher.Form method='post'>
      <p>
        <Input type='email' name='email' /> Email:
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
