"use client";

// Abas das categorias de projetos.
// Todas as abas ficam no HTML da página; as não selecionadas só ficam escondidas
// (atributo "hidden"). Assim o Google enxerga todos os projetos.
import { useRef, useState } from "react";

type Panel = {
  id: string;
  label: string;
  content: React.ReactNode;
};

type Props = {
  panels: Panel[];
  // Nome das abas para leitores de tela (ex.: "Categorias de serviços").
  label?: string;
};

export function ProjectTabs({ panels, label = "Categorias de projetos" }: Props) {
  const [active, setActive] = useState(panels[0].id);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // Setas do teclado trocam de aba (padrão de acessibilidade para abas).
  const onKeyDown = (e: React.KeyboardEvent, i: number) => {
    const step = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
    if (!step) return;
    const nextIndex = (i + step + panels.length) % panels.length;
    setActive(panels[nextIndex].id);
    tabRefs.current[nextIndex]?.focus();
  };

  return (
    <div>
      <div role="tablist" aria-label={label} className="flex flex-wrap gap-2">
        {panels.map((panel, i) => {
          const selected = panel.id === active;
          return (
            <button
              key={panel.id}
              ref={(el) => {
                tabRefs.current[i] = el;
              }}
              type="button"
              role="tab"
              id={`aba-${panel.id}`}
              aria-selected={selected}
              aria-controls={`painel-${panel.id}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(panel.id)}
              onKeyDown={(e) => onKeyDown(e, i)}
              className={`rounded-full px-5 py-2.5 font-semibold transition-colors ${
                selected ? "bg-brand-600 text-white" : "bg-zinc-100 text-zinc-700 hover:bg-zinc-200"
              }`}
            >
              {panel.label}
            </button>
          );
        })}
      </div>

      {panels.map((panel) => (
        <div
          key={panel.id}
          role="tabpanel"
          id={`painel-${panel.id}`}
          aria-labelledby={`aba-${panel.id}`}
          hidden={panel.id !== active}
          className="mt-8"
        >
          {panel.content}
        </div>
      ))}
    </div>
  );
}
