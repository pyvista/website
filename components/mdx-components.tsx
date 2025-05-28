import type { MDXComponents } from 'mdx/types';
import { Github, Slack, Mail, PackageOpen, Boxes, BookText, HeartPulse } from 'lucide-react';
import CitationBox from './citation-box';
import { ClipboardCopy } from 'lucide-react';
import DynamicBanner from '@/components/dynamic-banner';

export const mdxComponents: MDXComponents = {
  CitationBox,
  DynamicBanner,
  ClipboardCopy,  
  h1: (props) => <h1 className="text-4xl font-bold mb-6" {...props} />,
  h2: (props) => <h2 className="text-3xl font-semibold mb-4" {...props} />,
  h3: (props) => <h3 className="text-2xl font-semibold mb-4" {...props} />,
  h4: (props) => <h4 className="text-xl font-semibold mb-2" {...props} />,
  p: (props) => <p className="text-lg leading-relaxed mb-4" {...props} />,
  a: (props) => <a className="text-indigo-600 hover:text-indigo-800 underline" {...props} />,
  ul: (props) => <ul className="list-disc list-inside mb-4" {...props} />,
  li: (props) => <li className="mb-1" {...props} />,
  img: (props) => <img className="rounded" {...props} />,
  Github,
  Slack,
  Mail,
  Boxes,
  PackageOpen,
  BookText,
  HeartPulse
};