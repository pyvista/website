'use client';

import { useState } from 'react';
import { Github, BookText, HeartPulse, FlaskConical, Wrench, ChevronDown, ChevronUp } from 'lucide-react';
import type { ProjectEntry } from '@/components/load-projects';

const statusMap: Record<
  ProjectEntry["status"],
  { icon: JSX.Element; color: string; label: string }
> = {
  stable: {
    icon: <HeartPulse className="w-5 h-5 mr-1" />,
    color: "text-green-600",
    label: "Stable",
  },
  beta: {
    icon: <FlaskConical className="w-5 h-5 mr-1" />,
    color: "text-orange-500",
    label: "Beta",
  },
  development: {
    icon: <Wrench className="w-5 h-5 mr-1" />,
    color: "text-purple-600",
    label: "In Development",
  },
};

export default function ProjectAccordion({ projects }: { projects: ProjectEntry[] }) {
  const [expanded, setExpanded] = useState<string | null>(null);

  const toggle = (slug: string) => {
    setExpanded(expanded === slug ? null : slug);
  };

  const sortedProjects = [...projects].sort((a, b) => {
    if (a.title === "PyVista") return -1;
    if (b.title === "PyVista") return 1;
    return 0;
  });

  return (
    <div className="max-w-[78%] mx-auto px-4 space-y-4">
      <h1 className="text-4xl text-center font-bold mb-4 drop-shadow-md">Projects</h1>
      <p className="text-lg text-center font-medium">PyVista is an ecosystem with many interrelated projects and repositories. The following are a list of projects the PyVista developers support</p>
      {sortedProjects.map((project) => (
        <div key={project.slug} className="border rounded-lg shadow transition-all duration-300">
          <button
            onClick={() => toggle(project.slug)}
            className="w-full flex justify-between items-center px-6 py-4 text-left text-lg font-semibold bg-white hover:bg-gray-50"
          >
            <div>
              <h3>{project.title}</h3>
              {expanded ? null : <p className="text-sm text-gray-600">{project.shortDescription}</p>}
            </div>
            {expanded === project.slug ? <ChevronUp /> : <ChevronDown />}
          </button>

          {expanded === project.slug && (
            <div className="px-6 pb-6 pt-2 bg-gray-50">
              {project.image !== "N/A" && (
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-[35%] mx-auto mb-4 rounded"
                />
              )}

              <p className="text-sm whitespace-pre-line text-gray-800 mb-4">
                {project.longDescription}
              </p>

              <div className="flex flex-wrap gap-6 items-center justify-center text-sm">
                {project.github !== "N/A" && (
                  <a href={project.github} className="flex items-center gap-2 text-blue-600 hover:underline">
                    <Github className="w-5 h-5" />
                    GitHub
                  </a>
                )}
                {project.docs !== "N/A" && (
                  <a href={project.docs} className="flex items-center gap-2 text-yellow-600 hover:underline">
                    <BookText className="w-5 h-5" />
                    Docs
                  </a>
                )}
                <span className={`inline-flex items-center gap-2 font-medium ${statusMap[project.status].color}`}>
                  {statusMap[project.status].icon}
                  {statusMap[project.status].label}
                </span>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}