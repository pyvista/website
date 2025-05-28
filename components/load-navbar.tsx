import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface LinkEntry {
  label: string;
  url: string;
  order: number;
}

export function loadLinks(): LinkEntry[] {
  const dir = path.join(process.cwd(), 'content', 'navbar');
  const files = fs.readdirSync(dir).filter(file => file.startsWith('link-') && file.endsWith('.mdx'));

  return files.map(file => {
    const filePath = path.join(dir, file);
    const raw = fs.readFileSync(filePath, 'utf8');
    const { data } = matter(raw);

    if (!data.label || !data.url || typeof data.order !== 'number') {
      throw new Error(`Missing required frontmatter fields in ${file}`);
    }

    return {
      label: data.label,
      url: data.url,
      order: data.order
    };
  }).sort((a, b) => a.order - b.order);
}
