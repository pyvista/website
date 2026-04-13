# PyVista Website

[Astro](https://astro.build/) source for the PyVista landing page at
[pyvista.org](https://pyvista.org).

## Development

Install dependencies:

```bash
npm install
```

Start the local development server:

```bash
npm run dev -- --host
```

Build the static site:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview -- --host
```

## Marketing screenshots

The hero renders and example animations under `public/images/` are produced
locally by a PyVista script and committed to the repo:

```bash
npm run render:screenshots
```

The script requires [`uv`](https://docs.astral.sh/uv/) (used to install
PyVista and imageio into an ephemeral environment). Outputs go to
`public/images/*-{light,dark}.{jpg,gif}` and are referenced from
`src/data/site.ts`.

## Linting & formatting

All styling, linting, and formatting is enforced through
[pre-commit](https://pre-commit.com/):

```bash
pre-commit install          # install hooks (once)
pre-commit run --all-files  # run on the whole repo
```

The configuration runs Prettier (JS / TS / Astro / CSS / JSON / YAML / Markdown),
Ruff (Python lint + format), and a handful of hygiene hooks.

## Deployments

Both the main branch and every pull request are deployed through Netlify by
`.github/workflows/build.yaml`:

- Pushes to `main` publish to the production site at `pyvista.org`.
- Pull requests publish a preview URL attached to the PR as a deployment
  status and as a sticky PR comment.

The workflow uses the `NETLIFY_AUTH_TOKEN` and `NETLIFY_SITE_ID` repository
secrets.
