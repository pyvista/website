import { useState } from 'react';
import { Github, Slack, Mail, Menu, X } from 'lucide-react';

interface LinkEntry {
  label: string;
  url: string;
}

interface NavbarProps {
  links: LinkEntry[];
}

export default function Navbar({ links }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

const scrollToSection = (id: string) => {
  const el = document.getElementById(id);
  if (!el) return;

  const isAtTop = window.scrollY <= 0;
  const offsetFactor = isAtTop ? 0.67 : 0.25;
  const yOffset = -window.innerHeight * offsetFactor;

  const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;

  window.scrollTo({ top: y, behavior: 'smooth' });
};

  return (
    <nav className="sticky top-0 z-50 bg-white shadow">
      <div className="flex justify-between items-center px-6 py-3">
        <button
          className="md:hidden"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Menu"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        <div className="hidden md:flex gap-6 text-md font-medium">
          {links.map((link) => (
            <button key={link.label} onClick={() => scrollToSection(link.url)} className="hover:text-blue-600 my-1">{link.label}</button>
          ))}
        </div>

        <div className="hidden md:flex justify-end items-center gap-4">
          <a href="https://github.com/pyvista">
            <Github className="w-6 h-6 hover:text-blue-700" />
          </a>
          <a href="https://slack.pyvista.org/">
            <Slack className="w-6 h-6 hover:text-purple-700" />
          </a>
          <a href="mailto:support@pyvista.org">
            <Mail className="w-6 h-6 hover:text-green-700" />
          </a>
        </div>
      </div>

      {isOpen && (
        <div className="flex flex-col items-start gap-2 px-6 pb-4 md:hidden border-t border-gray-200">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.url}
              className="block text-md font-medium text-gray-700 hover:text-blue-600"
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <div className="flex gap-4 mt-4">
            <a href="https://github.com/pyvista">
              <Github className="w-5 h-5 hover:text-blue-700" />
            </a>
            <a href="https://slack.pyvista.org/">
              <Slack className="w-5 h-5 hover:text-purple-700" />
            </a>
            <a href="mailto:support@pyvista.org">
              <Mail className="w-5 h-5 hover:text-green-700" />
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}