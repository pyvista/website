import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://pyvista.org',
  output: 'static',
  integrations: [sitemap()],
});
