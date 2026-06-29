import { useEffect } from "react";
import { sections } from "./sections.ts";

interface SidebarProps {
  sections: string[];
  selected: string;
  onSelect: (section: string) => void;
}

export default function Sidebar({
  sections: availableSections,
  selected,
  onSelect,
}: SidebarProps) {
  const visibleSections = sections.filter((section) =>
    availableSections.includes(section.key),
  );

  return (
    <aside className="flex w-72 flex-col border-r border-secondary-300 bg-white">
      <div className="border-b border-secondary-300 p-8">
        <h1 className="type-medium">Contextual CMS</h1>

        <p className="mt-2 text-sm text-ink-muted">
          Administrador de contenido
        </p>
      </div>

      <nav className="flex-1 overflow-y-auto p-3">
        {visibleSections.map((section) => {
          const active = selected === section.key;

          return (
            <button
              key={section.key}
              onClick={() => onSelect(section.key)}
              className={`
                mb-1 flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left transition-all
                ${
                  active
                    ? "bg-primary-500 text-white"
                    : "text-ink hover:bg-secondary-200"
                }
              `}
            >
              <span>{section.icon}</span>

              <span>{section.label}</span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
}
