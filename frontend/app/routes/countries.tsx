import type { Route } from './+types/home';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Countries' },
    { name: 'description', content: 'Welcome to Countries page!' },
  ];
}

export default function Countries() {
  return <div>Countries page</div>;
}
