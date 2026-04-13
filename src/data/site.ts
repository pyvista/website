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
    'PyVista is a Pythonic interface to VTK for 3D plotting, mesh analysis, and scientific visualization across research and engineering workflows.',
};

export const navLinks = [
  { href: '#why-pyvista', label: 'Why PyVista' },
  { href: '#example', label: 'Example' },
  { href: '#ecosystem', label: 'Ecosystem' },
  { href: '#citation', label: 'Cite' },
];

export const hero = {
  mission:
    'Our goal is to make 3D visualization and analysis approachable to domain scientists so they can focus on the research questions at hand, not the nuances of 3D graphics and processing.',
  title: '3D plotting & analysis made',
  titleEmphasis: 'easy.',
  body: 'PyVista is Pythonic VTK: a high-level API for spatial datasets, mesh analysis, and 3D plotting that helps teams move from exploratory notebooks to polished applications without leaving the scientific Python ecosystem.',
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

export const trustBadges = [
  {
    label: 'Python 3.10+',
    href: 'https://pypi.org/project/pyvista/',
  },
  {
    label: 'MIT License',
    href: 'https://github.com/pyvista/pyvista/blob/main/LICENSE',
  },
  {
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
    title: 'Fits naturally into modern array-based workflows.',
    body: 'PyVista works naturally with NumPy-style data, supports direct memory sharing where possible, and integrates cleanly with the broader scientific Python stack.',
  },
  {
    eyebrow: 'Mesh-first workflows',
    title: 'Built for spatial datasets and large geometries.',
    body: 'Work directly with surfaces, volumes, finite element meshes, and point clouds using tools designed for practical research and engineering analysis.',
  },
  {
    eyebrow: 'From notebooks to products',
    title: 'The same library scales across contexts.',
    body: 'Use PyVista in Jupyter, web apps, desktop tools, regression tests, documentation, and more with one consistent Python API across each context.',
  },
];

export const resourceCards = [
  {
    title: 'Tutorial',
    href: 'https://tutorial.pyvista.org/',
    description:
      'Start with the PyVista tutorial for a guided, practical introduction that walks through core workflows step by step.',
    cta: 'Start the tutorial',
  },
  {
    title: 'Documentation',
    href: 'https://docs.pyvista.org/',
    description:
      'Use the main docs for installation, how-to guides, the API reference, and the full project documentation.',
    cta: 'Read the docs',
  },
  {
    title: 'Examples gallery',
    href: 'https://docs.pyvista.org/examples/',
    description:
      'Browse PyVista examples covering plotting, filters, widgets, volume rendering, meshing, and more.',
    cta: 'Browse examples',
  },
  {
    title: 'API reference',
    href: 'https://docs.pyvista.org/api/',
    description:
      'Go straight to the plotting, filtering, dataset, and utility APIs that power PyVista.',
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
      'Python bindings for MeshFix so damaged or non-watertight surface meshes can be repaired before downstream PyVista visualization and analysis.',
  },
  {
    name: 'pytest-pyvista',
    href: 'https://github.com/pyvista/pytest-pyvista',
    badge: 'Official project',
    kind: 'official',
    description:
      'Regression testing helpers for PyVista plots so visualization-heavy projects can validate outputs with confidence.',
  },
  {
    name: 'pyvista-zstd',
    href: 'https://github.com/pyvista/pyvista-zstd',
    badge: 'Official project',
    kind: 'official',
    description:
      'Zstandard-based compression for PyVista datasets to make large geometry workflows lighter to store and move.',
  },
  {
    name: 'scikit-gmsh',
    href: 'https://github.com/pyvista/scikit-gmsh',
    badge: 'Official project',
    kind: 'official',
    description:
      'Mesh generation with Gmsh that connects naturally to downstream PyVista visualization and inspection.',
  },
  {
    name: 'torch-points3d',
    href: 'https://github.com/torch-points3d/torch-points3d',
    secondaryHref: 'https://torch-points3d.readthedocs.io/en/latest/',
    secondaryLabel: 'Docs',
    badge: 'Community project',
    kind: 'community',
    description:
      'A deep learning framework for point clouds and unstructured 3D data that pairs naturally with PyVista for inspection and visualization.',
  },
  {
    name: 'MNE-Python',
    href: 'https://github.com/mne-tools/mne-python',
    secondaryHref: 'https://mne.tools/stable/',
    secondaryLabel: 'Docs',
    badge: 'Community project',
    kind: 'community',
    description:
      'Widely used neuroscience tooling that includes PyVista-backed 3D visualization for MEG and EEG workflows.',
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
    description: 'Join the PyVista community for real-time conversation.',
  },
  {
    title: 'Professional support',
    href: 'mailto:support@pyvista.org',
    description: 'Reach the PyVista network for consulting, support, and collaboration.',
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
