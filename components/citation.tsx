import { useMemo } from 'react';
import CitationBox from './citation-box';

interface CitationEntry {
  content: string;
}

const citationLinkMap: Record<string, string> = {
  "https://doi.org/10.21105/joss.01450": '<a href="https://doi.org/10.21105/joss.01450" class="text-blue-600 hover:text-blue-900">https://doi.org/10.21105/joss.01450</a>'
};

function formatCitation(content: string): string {
  let result = content;

  // Replace known keywords/URLs
  for (const [key, html] of Object.entries(citationLinkMap)) {
    const regex = new RegExp(key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
    result = result.replace(regex, html);
  }

  // Convert line breaks to <p> for each paragraph
  return result
    .split(/\n{2,}/)
    .map(p => `<p class="mb-4">${p.replace(/\n/g, '<br />')}</p>`)
    .join('');
}

export default function Citation({ entry }: { entry: CitationEntry }) {
  const html = useMemo(() => formatCitation(entry.content), [entry]);

  return (
    <div className="text-center">
      <h1 className="text-4xl text-center font-bold mb-4 drop-shadow-md">Citation</h1>
      <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: html }} />
      <CitationBox />
    </div>
  );
}