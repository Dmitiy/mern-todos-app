import type { Route } from './+types/todos';

import Todos from '@/components/todos';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Todos' },
    { name: 'description', content: 'Welcome to Todos page!' },
  ];
}

export async function clientLoader() {
  const res = await fetch(`/api/v1/todos`);
  const data = await res.json();
  return data;
}

clientLoader.hydrate = true as const;

function TodosLayout({ loaderData }: Route.ComponentProps) {
  return (
    <div className='todos'>
      <h2>Welcome to Todos page!</h2>
      <Todos data={loaderData} />
    </div>
  );
}

export default TodosLayout;
