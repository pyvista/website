import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface CitationEntry {
  content: string;
}

export function loadCitation(): CitationEntry {
  const dir = path.join(process.cwd(), 'content');
  const files = fs.readdirSync(dir).filter(f => f.startsWith('citation') && f.endsWith('.mdx'));
  if (!files.length) throw new Error("No citation files found");

  const filePath = path.join(dir, files[0]);
  const raw = fs.readFileSync(filePath, 'utf8');
  const { data } = matter(raw);

  if (!data.content) {
    throw new Error("Missing required 'content' in citation MDX");
  }

  return {
    content: data.content
  };
}