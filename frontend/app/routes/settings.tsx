import SettingsLayout from '@/layouts/settings/settings-layout';
import type { Route } from './+types/settings';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Settings' },
    { name: 'description', content: 'Welcome to Settings page!' },
  ];
}

function Settings() {
  return <SettingsLayout />;
}

export default Settings;
