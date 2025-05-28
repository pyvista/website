import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface FooterLink {
  label: string;
  link: string;
}

export function loadFooterLinks(): FooterLink[] {
  const dir = path.join(process.cwd(), 'content', 'footer');

  const files = fs.readdirSync(dir)
    .filter(file => file.startsWith('footer-link-') && file.endsWith('.mdx'))
    .sort((a, b) => {
      const aNum = parseInt(a.replace(/\D/g, ''));
      const bNum = parseInt(b.replace(/\D/g, ''));
      return aNum - bNum;
    });

  return files.map(file => {
    const filePath = path.join(dir, file);
    const raw = fs.readFileSync(filePath, 'utf8');
    const { data } = matter(raw);

    if (!data.label || !data.link) {
      throw new Error(`Missing label or link in ${file}`);
    }

    return {
      label: data.label,
      link: data.link
    };
  });
}
