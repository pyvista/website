export interface ThemedImage {
  light: string;
  dark: string;
}

const themedImage = (name: string, extension = 'jpg'): ThemedImage => ({
  light: `/images/${name}-light.${extension}`,
  dark: `/images/${name}-dark.${extension}`,
});

export type ProjectKind = 'official' | 'community';

export interface EcosystemProject {
  name: string;
  href: string;
  secondaryHref?: string;
  secondaryLabel?: string;
  badge: string;
  kind: ProjectKind;
  description: string;
}

export const siteMeta = {
  title: 'PyVista | 3D plotting & analysis made easy',
  description:
    'PyVista is a Python library for 3D visualization and mesh analysis that works naturally with NumPy, pandas, xarray, and the rest of the scientific Python ecosystem.',
};

export const navLinks = [
  { href: '#why-pyvista', label: 'Why PyVista' },
  { href: '#example', label: 'Example' },
  { href: '#ecosystem', label: 'Ecosystem' },
  { href: '#citation', label: 'Publications' },
];

export const hero = {
  mission:
    'Make 3D analysis and visualization feel like the rest of scientific Python, so you can focus on the research instead of wrangling spatial data structures and 3D rendering.',
  title: '3D plotting & analysis made',
  titleEmphasis: 'easy.',
  installCommand: "pip install 'pyvista[all]'",
};

export const heroScreenshots = [
  {
    image: themedImage('hero-volume-rendering'),
    alt: 'Volume rendering created with PyVista',
    label: 'Volume rendering',
    href: 'https://docs.pyvista.org/examples/01-filter/crop_labeled',
  },
  {
    image: themedImage('hero-pbr'),
    alt: 'Physically based rendering created with PyVista',
    label: 'Physically based rendering',
    href: 'https://docs.pyvista.org/examples/02-plot/pbr.html',
  },
  {
    image: themedImage('hero-gltf'),
    alt: 'glTF scene imported and rendered with PyVista',
    label: 'glTF support',
    href: 'https://docs.pyvista.org/examples/00-load/load_gltf',
  },
];

export const exampleSpotlight = {
  image: themedImage('example-aero-bracket'),
  alt: 'Aero bracket visualized with PyVista',
  label: 'Aero bracket',
  href: 'https://docs.pyvista.org/api/examples/_autosummary/pyvista.examples.downloads.download_aero_bracket.html',
};

export const kitchenSpotlight = {
  image: themedImage('example-kitchen-airflow'),
  alt: 'Kitchen CFD scene with furniture geometry and streamtubes colored by velocity',
  label: 'Kitchen airflow: furniture + streamtubes',
  href: 'https://docs.pyvista.org/api/examples/_autosummary/pyvista.examples.downloads.download_kitchen.html',
};

export const bunnySpotlight = {
  image: themedImage('example-bunny'),
  alt: 'Stanford bunny STL rendered with PyVista',
  label: 'bunny.stl rendered with mesh.plot()',
  href: 'https://docs.pyvista.org/getting-started/why.html',
};

export const exampleGallery = [
  {
    image: themedImage('example-pump-bracket', 'gif'),
    alt: 'Animated pump bracket modal analysis visualized with PyVista',
    label: 'Animated modal analysis',
    href: 'https://docs.pyvista.org/examples/99-advanced/pump_bracket.html',
  },
  {
    image: themedImage('example-cfd-data', 'gif'),
    alt: 'Animated CFD data visualized with PyVista using pulsing streamtubes and volume rendering',
    label: 'CFD data',
    href: 'https://docs.pyvista.org/examples/99-advanced/openfoam_tubes',
  },
];

export interface TrustBadge {
  id: string;
  label: string;
  href: string;
}

export const trustBadges: TrustBadge[] = [
  {
    id: 'python',
    label: 'Python 3.10+',
    href: 'https://pypi.org/project/pyvista/',
  },
  {
    id: 'license',
    label: 'MIT License',
    href: 'https://github.com/pyvista/pyvista/blob/main/LICENSE',
  },
  {
    id: 'joss',
    label: 'Published in JOSS',
    href: 'https://doi.org/10.21105/joss.01450',
  },
];

export const numfocus = {
  href: 'https://numfocus.org/sponsored-projects/affiliated-projects',
  image: 'https://raw.githubusercontent.com/numfocus/templates/master/images/numfocus-logo.png',
  alt: 'NumFOCUS affiliated projects',
};

export const featureCards = [
  {
    eyebrow: 'Scientific Python interop',
    title: 'Mesh data that acts like NumPy data.',
    body: "PyVista's dataset classes expose points, cells, and attached fields as NumPy arrays, often sharing memory with the underlying object. Hand them to pandas, xarray, scikit-image, or SciPy and keep the same objects through analysis, transformation, and plotting.",
  },
  {
    eyebrow: 'More than plotting',
    title: 'Write research code, not graphics code.',
    body: 'Threshold, slice, warp, contour, clip, decimate, interpolate, and run boolean operations with one-line methods on the dataset. Chain them together, inspect intermediate results, and drop the output back into NumPy or pandas when you are done.',
  },
  {
    eyebrow: 'From notebooks to applications',
    title: 'One library, the whole journey.',
    body: 'The same code runs in Jupyter for exploration, on the server behind a trame or Panel web app, inside a PyQt desktop tool, and in CI as an image regression test. No rewrites when the use case grows.',
  },
];

export const resourceCards = [
  {
    title: 'Tutorial',
    href: 'https://tutorial.pyvista.org/',
    description: "A guided introduction that walks through PyVista's core workflows.",
    cta: 'Start the tutorial',
  },
  {
    title: 'Documentation',
    href: 'https://docs.pyvista.org/',
    description:
      'Installation, how-to guides, the API reference, and the full project documentation.',
    cta: 'Read the docs',
  },
  {
    title: 'Examples gallery',
    href: 'https://docs.pyvista.org/examples/',
    description:
      'Runnable examples across plotting, filters, widgets, volume rendering, and meshing.',
    cta: 'Browse examples',
  },
  {
    title: 'API reference',
    href: 'https://docs.pyvista.org/api/',
    description: 'The full plotting, filtering, dataset, and utility API.',
    cta: 'Open the API',
  },
];

export const ecosystemProjects: EcosystemProject[] = [
  {
    name: 'PyMeshFix',
    href: 'https://github.com/pyvista/pymeshfix',
    secondaryHref: 'https://pymeshfix.pyvista.org/',
    secondaryLabel: 'Docs',
    badge: 'Official project',
    kind: 'official',
    description:
      'Repair damaged or non-watertight surface meshes before handing them off to PyVista for analysis and visualization.',
  },
  {
    name: 'pytest-pyvista',
    href: 'https://github.com/pyvista/pytest-pyvista',
    badge: 'Official project',
    kind: 'official',
    description:
      'A pytest plugin for image-based regression testing of PyVista plots in visualization-heavy projects.',
  },
  {
    name: 'pyvista-zstd',
    href: 'https://github.com/pyvista/pyvista-zstd',
    badge: 'Official project',
    kind: 'official',
    description:
      'Zstandard compression for PyVista datasets that keeps large geometries light to store and move.',
  },
  {
    name: 'scikit-gmsh',
    href: 'https://github.com/pyvista/scikit-gmsh',
    badge: 'Official project',
    kind: 'official',
    description:
      'Mesh generation with Gmsh that hands off directly to PyVista for inspection and visualization.',
  },
  {
    name: 'torch-points3d',
    href: 'https://github.com/torch-points3d/torch-points3d',
    secondaryHref: 'https://torch-points3d.readthedocs.io/en/latest/',
    secondaryLabel: 'Docs',
    badge: 'Community project',
    kind: 'community',
    description:
      'Deep learning on point clouds and unstructured 3D data, with PyVista for inspection and visualization.',
  },
  {
    name: 'MNE-Python',
    href: 'https://github.com/mne-tools/mne-python',
    secondaryHref: 'https://mne.tools/stable/',
    secondaryLabel: 'Docs',
    badge: 'Community project',
    kind: 'community',
    description:
      'A neuroscience toolkit for MEG and EEG, with PyVista for 3D visualization of brain activity.',
  },
];

export const communityLinks = [
  {
    title: 'GitHub',
    href: 'https://github.com/pyvista/pyvista',
    description: 'Source code, issues, releases, and the contribution workflow.',
  },
  {
    title: 'Discussions',
    href: 'https://github.com/pyvista/pyvista/discussions',
    description: 'Ask questions, share projects, and get help from the community.',
  },
  {
    title: 'Slack',
    href: 'https://slack.pyvista.org',
    description: 'Join the PyVista community for real-time chat and collaboration.',
  },
  {
    title: 'Professional support',
    href: 'mailto:support@pyvista.org',
    description:
      'Consulting, custom development, and support from PyVista maintainers and partners.',
  },
];

export const citation = {
  doi: 'https://doi.org/10.21105/joss.01450',
  paper: 'https://joss.theoj.org/papers/10.21105/joss.01450',
  text: 'Sullivan, B., & Kaszynski, A. (2019). PyVista: 3D plotting and mesh analysis through a streamlined interface for the Visualization Toolkit (VTK). Journal of Open Source Software, 4(37), 1450. https://doi.org/10.21105/joss.01450',
  bibtex: `@article{sullivan2019pyvista,
  doi = {10.21105/joss.01450},
  url = {https://doi.org/10.21105/joss.01450},
  year = {2019},
  month = {May},
  publisher = {The Open Journal},
  volume = {4},
  number = {37},
  pages = {1450},
  author = {Bane Sullivan and Alexander Kaszynski},
  title = {{PyVista}: {3D} plotting and mesh analysis through a streamlined interface for the {Visualization Toolkit} ({VTK})},
  journal = {Journal of Open Source Software}
}`,
};
