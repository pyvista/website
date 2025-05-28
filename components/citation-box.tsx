'use client';

import { useState } from 'react';
import { ClipboardCopy } from 'lucide-react';

const CitationBox = () => {
  const [copied, setCopied] = useState(false);

  const bibtex = `@article{sullivan2019pyvista,
  doi = {10.21105/joss.01450},
  url = {https://doi.org/10.21105/joss.01450},
  year = {2019},
  month = {May},
  publisher = {The Open Journal},
  volume = {4},
  number = {37},
  pages = {1450},
  author = {Bane Sullivan and Alexander Kaszynski},
  title = {{PyVista}: 3D plotting and mesh analysis through a streamlined interface for the {Visualization Toolkit} (VTK)},
  journal = {Journal of Open Source Software}
}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(bibtex);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="text-center space-y-6">
      <button
        onClick={copyToClipboard}
        className="inline-flex items-center gap-2 px-5 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
      >
        <ClipboardCopy className="w-4 h-4" />
        {copied ? "Copied!" : "Copy BibTeX Citation"}
      </button>
    </div>
  );
};

export default CitationBox;
