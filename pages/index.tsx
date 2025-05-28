import fs from 'fs';
import path from 'path';
import { useState } from 'react';
import { GetStaticProps } from 'next';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import matter from 'gray-matter';
import { mdxComponents } from '@/components/mdx-components';
import { useEffect } from "react";
import TabbedSections from '@/components/tabbed-sections';
import DynamicBanner from '@/components/dynamic-banner';
import ProjectAccordion from '@/components/project-accordion';
import { loadProjects, ProjectEntry } from '@/components/load-projects';
import LandingPage from '@/components/landing-page';
import { loadLanding, LandingEntry } from '@/components/load-landing';
import { loadTabs, TabEntry } from '@/components/load-tabs';
import { loadLinks, LinkEntry } from '@/components/load-navbar';
import Navbar from '@/components/navbar';
import { loadCitation, CitationEntry } from '@/components/load-citation';
import Citation from '@/components/citation';
import Footer from '@/components/footer';
import { loadFooterLinks, FooterLink } from '@/components/load-footer';

interface HomeProps {
  navbarContent: MDXRemoteSerializeResult;
  citingContent: MDXRemoteSerializeResult;
  footerContent: MDXRemoteSerializeResult;
  projects: ProjectEntry[];
  landingContent: LandingEntry;
  tabs: TabEntry[];
  navbarLinks: LinkEntry[];
  citationEntry: CitationEntry;
  footerLinks: FooterLink[];
}

export default function Home({
  citingContent,
  footerContent,
  projects,
  landingContent,
  tabs,
  navbarLinks,
  citationEntry,
  footerLinks
}: HomeProps) {
  const [hasScrolled, setHasScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      const navbar = document.getElementById("navbar");
      if (!navbar) return;

      if (window.scrollY > 100) {
        navbar.classList.add("sticky", "top-0", "bg-white", "shadow", "z-50");
      } else {
        navbar.classList.remove("sticky", "top-0", "bg-white", "shadow", "z-50");
      }
      setHasScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <main className="pt-[15vh] mt-16 px-6 py-2 min-h-screen overflow-y-auto">
        <section
          id="navbarsection"
          className="fixed top-0 left-0 w-full z-50 h-[64px] bg-white shadow"
        >
          <Navbar links={navbarLinks} />
        </section>

        <section className="fixed top-16 left-0 w-full z-40 h-[15vh] bg-white">
          <DynamicBanner />
        </section>
        
        <section id="landing">
          <LandingPage entry={landingContent} />
        </section>
        

        <div id="about" className="h-3 scroll-mt-[35vh]"></div>
        <TabbedSections sections={tabs}/>

        <br />

        <div id="projects" className="h-3 scroll-mt-[35vh]"></div>
        <ProjectAccordion projects={projects} />

        <br />

        <div id="citation" className="h-3 scroll-mt-[35vh]"></div>
        <Citation entry={citationEntry} />

        <br />
        <br />
        
      </main>
      <footer className="w-full bg-[rgba(0,0,0,0.12)] shadow">
        <Footer links={footerLinks} />
      </footer>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const load = async (filename: string) => {
    const filePath = path.join(process.cwd(), "content", filename);
    const raw = fs.readFileSync(filePath, "utf8");
    const { content } = matter(raw);
    return await serialize(content);
  };

  const projects = await loadProjects();
  const landingContent = await loadLanding()[0];
  const tabs = loadTabs();
  const navbarLinks = loadLinks();
  const citationEntry = loadCitation();
  const footerLinks = loadFooterLinks();

  return {
    props: {
      projects,
      landingContent,
      tabs,
      navbarLinks,
      citationEntry,
      footerLinks,
    },
  };
};
