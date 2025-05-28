This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/pages/api-reference/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/pages/building-your-application/routing/api-routes) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/pages/building-your-application/routing/api-routes) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/pages/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn-pages-router) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on GitHub Pages


Check out our [Next.js deployment documentation](https://nextjs.org/docs/pages/building-your-application/deploying) for more details.

# MDX File Addition Templates
Use the below templates, copied from 3 dashes all the way to te next three, to add a new project, tab, or update the 
landing section and add it to the corresponding folder. In order for the page to pull the project into the projects 
section you must name the file "project-projectName.mdx".

## NAVBAR [Please copy and paste the following template to create new links. This does require corresponding changes to the index.tsx file.]

---
label: <Link name>
url: "#sectionID"
order: <Number after the latest order number in link-citation.mdx> (If this should appear before any of the others changes to the other scripts will need to be made.)
---

## LANDING SECTION [Below the Banner Image](Make changes accordingly in the landing-page.mdx file. Change anything after the colon (:))
---
header: The PyVista Project
subheader: Our goal is to make 3D visualization and analysis approachable to domain-scientists so they can focus on the research questions at hand.
factOneLogo: PackageOpen
factOneTitle: Open-Source
factOneFact: Entirely open-source with the permissive MIT License
factTwoLogo: /images/python-logo-only.png
factTwoTitle: Python
factTwoFact: Streamlined, easy to use Python interface available on PyPI
factThreeLogo: Boxes
factThreeTitle: 3D Data Structures
factThreeFact: 3D finite element/volume data structures at the core
getStarted: Get started with PyVista
getStartedLink: https://docs.pyvista.org/getting-started/
---

## TABS [Copy this section and add it to a new file labeled "tab-<NAME OF TAB>.mdx]
---
label: [This is the name of the tab that appears above the section.]
title: [This is the section title.]
description: |
  [Add any and all paragraphs in a single line.]
image: /images/<Add your image to the images folder and add the name including the .[png, jpg]>
---

For links in the tabs section please add to the "tabbed-sections.tsx" object listed below just after the imports:

const linkMap: Record<string, string> = {
  "and followers on Slack": `and followers on <a href="https://slack.pyvista.org/" class="text-blue-600 hover:text-blue-900">Slack</a>`,
  "our developers": `<a href="https://github.com/pyvista/pyvista/blob/master/AUTHORS.rst" class="text-blue-600 hover:text-blue-900">our developers</a>`,
  "The flagship PyVista": `The flagship <a href="https://github.com/pyvista/pyvista" class="text-blue-600 hover:text-blue-900">PyVista</a>`,
  "built on top of the Visualization Toolkit (VTK)":`built on top of the <a href="https://www.vtk.org/" class="text-blue-600 hover:text-blue-900">Visualization Toolkit (VTK)</a>`,
};
* Add the text that would need a link. 
  * Be sure to add enough text so it's clear exactly what text needs to be added, then after your colon add a set of ``'s.
  * Add the text that doesn't need a link first, then add the a tag. 
  * Please copy/paste to easily add the text you'd like to update.

## PROJECTS [Copy this section and add it to a new file labeled "project-<NAME OF PROJECT>.mdx"]
---
title: 
image: /images/*
status: stable
github: 
docs: 
shortDescription: **
longDescription: **
---
* If there isn't an image, or docs link associated with the project, add "N/A".
    * For Image, replace "/images/" with "N/A"
* For the short and long descriptions, in order for the paragraphs to format correctly, each 
  paragraph should fill an entire line, extending as long as it needs to be extended. Adding a 
  new line before the paragraph ends will cause visual discrepancies.

## CITATION [Make changes in the citation.mdx doc]
---
content: |
  There is a paper about PyVista!

  If you are using PyVista in your scientific research, please help our scientific visibility by citing our work!

  Sullivan et al., (2019). PyVista: 3D plotting and mesh analysis through a streamlined interface for the Visualization Toolkit (VTK). Journal of Open Source Software, 4(37), 1450, https://doi.org/10.21105/joss.01450
---
* Links will need to be added to the linkmap in the citation.tsx file much like the Tabs section.

## FOOTER [Copy this setion and add it to a new file labeled "footer-link-x.mdx"] (X will be the next number in the content/footer folder.)e

---
label: <The name of the link>
link: <The URL for the link>
---