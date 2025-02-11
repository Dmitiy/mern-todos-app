import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from 'react-router';

import Menu from '@/components/menu';
import Navbar from '@components/navbar';
import type { Route } from './+types/root';
import Logo from './components/logo';
import stylesheet from './index.css?url';
import Copyright from './ui/copyright';
import MouseWheel from './ui/mouseWheel';
import ProgressBarCompletion from './ui/progressBarCompletion';

export const links: Route.LinksFunction = () => [
  { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
  {
    rel: 'preconnect',
    href: 'https://fonts.gstatic.com',
    crossOrigin: 'anonymous',
  },
  {
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap',
  },
  { rel: 'stylesheet', href: stylesheet },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='ru'>
      <head>
        <meta charSet='utf-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return (
    <div className='page layout'>
      <header className='header'>
        <Navbar />
      </header>
      <aside className='aside layout'>
        <Logo className='logoContainer' />
        <Menu className='menuContainer' />
        <Copyright className='asideFooter' title='Inspired by Dmitrysev' />
      </aside>
      <main className='main layout'>
        <Outlet />
      </main>
      <footer className='footer'>
        <MouseWheel />
      </footer>
    </div>
  );
}

// HydrateFallback is rendered while the client loader is running
export function HydrateFallback() {
  return (
    <div>
      <ProgressBarCompletion />
    </div>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = 'Oops!';
  let details = 'An unexpected error occurred.';
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? '404' : 'Error';
    details =
      error.status === 404
        ? 'The requested page could not be found.'
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className=''>
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className=''>
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
