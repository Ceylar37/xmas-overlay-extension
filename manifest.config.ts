import { defineManifest } from '@crxjs/vite-plugin';

import packageJson from './package.json';
const { version } = packageJson;

const [major, minor, patch] = version.replace(/[^\d.-]+/g, '').split(/[.-]/);

export default defineManifest({
  name: 'Xmas-Overlay',
  description: 'Adds a Christmas overlay to the page',
  manifest_version: 3,
  action: {
    default_popup: 'index.html'
  },
  permissions: ['tabs', 'storage', 'nativeMessaging'],
  host_permissions: ['<all_urls>'],
  background: {
    service_worker: 'src/service-worker/service-worker.ts',
    type: 'module'
  },
  content_scripts: [
    {
      matches: ['<all_urls>'],
      js: ['src/content-scripts/snowflakes.ts', 'src/content-scripts/christmas-lights.ts'],
      run_at: 'document_start'
    }
  ],
  version: `${major}.${minor}.${patch}`,
  version_name: version
});
