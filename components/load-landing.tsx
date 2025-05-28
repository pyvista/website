import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface LandingEntry {
  header: string;
  subheader: string;
  factOneLogo: string;
  factOneTitle: string;
  factOneFact: string;
  factTwoLogo: string;
  factTwoTitle: string;
  factTwoFact: string;
  factThreeLogo: string;
  factThreeTitle: string;
  factThreeFact: string;
  getStarted: string;
  getStartedLink: string;
  slug: string;
}

export function loadLanding(): LandingEntry[] {
  const contentDir = path.join(process.cwd(), "content/landing");

  const files = fs
    .readdirSync(contentDir)
    .filter((file) => file.startsWith("landing-") && file.endsWith(".mdx"));

  const landingEntries = files.map((filename) => {
    const filePath = path.join(contentDir, filename);
    const raw = fs.readFileSync(filePath, "utf8");
    const { data, content } = matter(raw);

    const requiredFields = [
      "header",
      "subheader",
      "factOneLogo",
      "factOneTitle",
      "factOneFact",
      "factTwoLogo",
      "factTwoTitle",
      "factTwoFact",
      "factThreeLogo",
      "factThreeTitle",
      "factThreeFact",
      "getStarted",
      "getStartedLink",
    ];

    for (const field of requiredFields) {
      if (!data[field]) {
        throw new Error(`Missing required frontmatter field "${field}" in ${filename}`);
      }
    }

    return {
      header: data.header,
      subheader: data.subheader,
      factOneLogo: data.factOneLogo,
      factOneTitle: data.factOneTitle,
      factOneFact: data.factOneFact,
      factTwoLogo: data.factTwoLogo,
      factTwoTitle: data.factTwoTitle,
      factTwoFact: data.factTwoFact,
      factThreeLogo: data.factThreeLogo,
      factThreeTitle: data.factThreeTitle,
      factThreeFact: data.factThreeFact,
      getStarted: data.getStarted,
      getStartedLink: data.getStartedLink,
      slug: filename.replace(/^landing-/, '').replace(/\.mdx$/, ''),
    } satisfies LandingEntry;
  });

  return landingEntries;
}
