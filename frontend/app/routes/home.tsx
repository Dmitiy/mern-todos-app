import type { Route } from './+types/home';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Home page' },
    { name: 'description', content: 'Welcome to Home page' },
  ];
}

export default function Home() {
  return <h1>Welcome to Home page</h1>;
}
