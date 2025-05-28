import { useState } from 'react';

const linkMap: Record<string, string> = {
  "and followers on Slack": `and followers on <a href="https://slack.pyvista.org/" class="text-blue-600 hover:text-blue-900">Slack</a>`,
  "our developers": `<a href="https://github.com/pyvista/pyvista/blob/master/AUTHORS.rst" class="text-blue-600 hover:text-blue-900">our developers</a>`,
  "The flagship PyVista": `The flagship <a href="https://github.com/pyvista/pyvista" class="text-blue-600 hover:text-blue-900">PyVista</a>`,
  "built on top of the Visualization Toolkit (VTK)": `built on top of the <a href="https://www.vtk.org/" class="text-blue-600 hover:text-blue-900">Visualization Toolkit (VTK)</a>`,
};

function formatRichText(text: string): string {
  let result = text;

  // Auto mailto
  result = result.replace(
    /([\w.-]+@[\w.-]+\.\w+)/g,
    '<a href="mailto:$1" class="text-blue-600 hover:text-blue-900">$1</a>'
  );

  for (const [key, value] of Object.entries(linkMap)) {
    const regex = new RegExp(key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
    result = result.replace(regex, value);
  }

  return result;
}

interface TabbedSectionsProps {
  sections: {
    key: string;
    label: string;
    title: string;
    description: string;
    image: string;
  }[];
}

export default function TabbedSections({ sections }: TabbedSectionsProps) {
  const [activeTab, setActiveTab] = useState(sections[0].key);
  const activeIndex = sections.findIndex((s) => s.key === activeTab);
  const current = sections[activeIndex];

  return (
    <section className="my-0">
      <div className="flex justify-center gap-4 mb-8 border-b border-gray-300">
        {sections.map(({ key, label }) => (
          <button
            key={key}
            className={`pb-2 text-lg font-medium transition border-b-2 ${
              activeTab === key
                ? "border-indigo-600 text-indigo-600"
                : "border-transparent text-gray-600 hover:text-indigo-500"
            }`}
            onClick={() => setActiveTab(key)}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="w-[78%] min-h-[525px] mx-auto px-4">
        <h2 className="text-2xl text-center font-bold mb-4">{current.title}</h2>
        {current && (
          <div
            className={`flex flex-col md:flex ${
              activeIndex % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
            } gap-6 items-center`}
          >
            <div className="w-full md:w-1/2 order-1 md:order-none">
              {current.image.includes('slack.png') ? (
                <a
                  href="https://slack.pyvista.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:opacity-80 transition block text-center"
                >
                  <img
                    src={current.image}
                    alt={current.label}
                    className="w-2/3 mx-auto"
                  />
                </a>
              ) : (
                <img
                  src={current.image}
                  alt={current.label}
                  className="w-2/3 mx-auto"
                />
              )}
            </div>
            <div
              className="w-full md:w-1/2 order-2 md:order-none text-gray-700 whitespace-pre-line"
              dangerouslySetInnerHTML={{ __html: formatRichText(current.description) }}
            />
          </div>
        )}
      </div>
    </section>
  );
}