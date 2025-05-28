import { FooterLink } from './load-footer';
import { Github, Mail, Slack } from 'lucide-react';

interface FooterProps {
  links: FooterLink[];
}

export default function Footer({ links }: FooterProps) {
  const columns: FooterLink[][] = [];

  const maxPerCol = links.length <= 8 ? Math.ceil(links.length / 2) : Math.ceil(links.length / 3);
  for (let i = 0; i < links.length; i += maxPerCol) {
    columns.push(links.slice(i, i + maxPerCol));
  }

  return (
    <footer className="w-full shadow px-6 py-6 flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
      {/* Logo */}
      <div className="flex justify-center md:justify-start w-full md:w-1/3">
        <img
          src="/images/pyvista-logo.png"
          alt="PyVista Logo"
          className="w-[30%] md:w-[40%] max-w-[150px]"
        />
      </div>

      {/* Link Columns */}
      <div className="flex-1 flex justify-center gap-8 flex-wrap text-sm">
        {columns.map((col, i) => (
          <div key={i} className="flex flex-col items-start space-y-1 min-w-[120px]">
            {col.map((link, j) => (
              <a key={j} href={link.link} className="hover:underline">
                {link.label}
              </a>
            ))}
          </div>
        ))}
      </div>

      {/* Copyright + Socials */}
      <div className="text-sm text-center md:text-right flex flex-col items-center md:items-end space-y-2 w-full md:w-1/3">
        <div className="flex justify-center gap-4 mb-2">
          <a href="https://github.com/pyvista" className="hover:text-blue-700">
            <Github className="w-6 h-6" />
          </a>
          <a href="https://slack.pyvista.org/" className="hover:text-purple-700">
            <Slack className="w-6 h-6" />
          </a>
          <a href="mailto:support@pyvista.org" className="hover:text-green-700">
            <Mail className="w-6 h-6" />
          </a>
        </div>
        <p>© Copyright 2025, PyVista Developers.</p>
        <p>
          Created using Next.js from source code at{' '}
          <a href="https://github.com/pyvista/website" className="text-blue-600 hover:underline">
            pyvista/website
          </a>.
        </p>
        <p>Last updated on 2025-05-13.</p>
      </div>
    </footer>
  );
}