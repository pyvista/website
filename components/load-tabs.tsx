import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface TabEntry {
  key: string;
  label: string;
  title: string;
  description: string;
  image: string;
}

export function loadTabs(): TabEntry[] {
  const tabsDir = path.join(process.cwd(), "content/tabs");
  const files = fs
    .readdirSync(tabsDir)
    .filter((file) => file.startsWith("tab-") && file.endsWith(".mdx"));

  const tabs: TabEntry[] = [];

  for (const file of files) {
    const filePath = path.join(tabsDir, file);
    const raw = fs.readFileSync(filePath, "utf8");
    const { data } = matter(raw);

    const required = ["label", "title", "description", "image"];
    for (const field of required) {
      if (!data[field]) {
        throw new Error(`Missing required frontmatter field "${field}" in ${file}`);
      }
    }

    tabs.push({
      key: file.replace(/^tab-/, '').replace(/\.mdx$/, ''),
      label: data.label,
      title: data.title,
      description: data.description,
      image: data.image,
    });
  }

  return tabs;
}
