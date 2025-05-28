import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface ProjectEntry {
  title: string;
  image: string;
  status: "stable" | "beta" | "development";
  github: string;
  docs: string;
  shortDescription: string;
  longDescription: string;
  slug: string;
}

export function loadProjects(): ProjectEntry[] {
  const contentDir = path.join(process.cwd(), "content/projects");

  const files = fs
    .readdirSync(contentDir)
    .filter(file => file.startsWith("project-") && file.endsWith(".mdx"));

  const projects = files.map(filename => {
    const filePath = path.join(contentDir, filename);
    const raw = fs.readFileSync(filePath, "utf8");

    const { data, content } = matter(raw);

    const requiredFields = ["title", "image", "status", "github", "docs", "shortDescription"];
    for (const field of requiredFields) {
      if (!data[field]) {
        throw new Error(`Missing required frontmatter field "${field}" in ${filename}`);
      }
    }

    return {
      title: data.title,
      image: data.image,
      status: data.status,
      github: data.github,
      docs: data.docs,
      shortDescription: data.shortDescription,
      longDescription: data.longDescription,
      slug: filename.replace(/^project-/, '').replace(/\.mdx$/, '')
    } satisfies ProjectEntry;
  });

  return projects;
}