import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Netlify sets these build-time env vars for every deploy:
//   DEPLOY_PRIME_URL — the primary URL of the current deploy (branch/PR preview
//                     URL on preview builds, production domain on main).
//   URL             — the site's primary URL from site settings.
// Falling through to the production domain keeps `astro dev` and local builds
// generating sensible absolute URLs.
const site = process.env.DEPLOY_PRIME_URL || process.env.URL || 'https://pyvista.org';

export default defineConfig({
  site,
  output: 'static',
  integrations: [sitemap()],
});
