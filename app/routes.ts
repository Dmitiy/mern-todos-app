import {
  type RouteConfig,
  index,
  prefix,
  route,
} from '@react-router/dev/routes';

export default [
  index('routes/home.tsx'),
  route('about', 'routes/about.tsx'),
  route('todos', 'routes/todos.tsx'),

  route('login', 'routes/login.tsx'),
  route('signUp', 'routes/signup.tsx'),
  route('settings', 'routes/settings.tsx'),
] satisfies RouteConfig;
