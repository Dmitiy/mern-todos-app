import { type RouteConfig, route } from '@react-router/dev/routes';
import { redirect, useFetcher, data } from 'react-router';
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
        Email:
        <input type='email' name='email' />
        {errors?.email ? <em>{errors.email}</em> : null}
      </p>

      <p>
        Password:
        <input type='password' name='password' />
        {errors?.password ? <em>{errors.password}</em> : null}
      </p>

      <div>
        <h1>Welcome to My Route with Props!</h1>
        <p>Loader Data: {JSON.stringify(loaderData)}</p>
        <p>Action Data: {JSON.stringify(actionData)}</p>
        <p>Route Parameters: {JSON.stringify(params)}</p>
        <p>Matched Routes: {JSON.stringify(matches)}</p>
      </div>

      <button type='submit'>Sign Up</button>
    </fetcher.Form>
  );
}

export default Login;
