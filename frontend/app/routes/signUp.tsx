import type { Route } from './+types/signUp';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Registration' },
    { name: 'description', content: 'Welcome to Registration page!' },
  ];
}

function Registration() {
  return <div>Registration page</div>;
}

export default Registration;
