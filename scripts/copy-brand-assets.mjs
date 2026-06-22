// Copies CoDimensional brand logo assets out of the public
// @codimensional/brand package into public/branding/ so they resolve at a
// fixed URL (referenced as a literal src by the steward banner). The package
// is the single source of truth; the copied files are generated artifacts and
// are gitignored. Runs as an npm pre{dev,build,start} step.
import { mkdir, copyFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const require = createRequire(import.meta.url);
const root = dirname(fileURLToPath(new URL('../package.json', import.meta.url)));

// [resolvable package spec, destination path under the repo root]
const targets = [
  // Light-surface banner (transparent bg, dark glyphs) for the light theme.
  [
    '@codimensional/brand/logos/light/codim_banner_dark_outline.png',
    'public/branding/codim-light.png',
  ],
  // Dark-surface banner (transparent bg, light glyphs) for the dark theme.
  [
    '@codimensional/brand/logos/dark/codim_banner_white_outline.png',
    'public/branding/codim-dark.png',
  ],
];

for (const [spec, rel] of targets) {
  const dest = `${root}/${rel}`;
  await mkdir(dirname(dest), { recursive: true });
  await copyFile(require.resolve(spec), dest);
  console.log(`brand asset: ${rel}`);
}
