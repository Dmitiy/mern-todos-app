import type { Route } from './+types/home';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Country' },
    { name: 'description', content: 'Welcome to Country page!' },
  ];
}

export default function Country() {
  return <div>Country page</div>;
}
