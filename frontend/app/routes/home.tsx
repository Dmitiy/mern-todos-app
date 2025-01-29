import type { Route } from './+types/home';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Home page' },
    { name: 'description', content: 'Welcome to Home page' },
  ];
}

export default function Home() {
  return (
    <>
      <h1>Welcome to Home page</h1>
      <div>
        <h2>Desktop</h2>
        <ul>
          <li>800 × 600,</li>
          <li>1024 × 768,</li>
          <li>1280 × 1024,</li>
          <li>1366 × 1024,</li>
          <li>HD 1280×720 (16:9)</li>
          <li>WXGA 1366×768 (16:9)</li>
          <li>Full HD 1920×1080 (16:9)</li>
          <li>WQHD 2560×1440 (16:9)</li>
          <li>UWQHD 3100×1440 (21:9)</li>
          <li>4K UHD 3840×2160 (16:9)</li>
          <li>8K UHD 7680×4320 (16:9)</li>
        </ul>
      </div>
    </>
  );
}
