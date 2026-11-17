import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { Card } from "@/components/ui/Card";
import { CtaQuote } from "@/components/sections/CtaQuote";
import { ProjectTabs } from "@/components/projects/ProjectTabs";
import { projectCategories, services, type ProjectCategory } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Serviços",
  description:
    "Irrigação para viveiros, nebulização e microaspersão para estufas, fertirrigação, casas de bombas, filtragem e tanques de lona em Araraquara e região. Também irrigação de jardins.",
};

// Etapas genéricas: servem tanto para projetos agrícolas quanto residenciais.
const steps = [
  {
    title: "1. Conversa inicial",
    text: "Você conta o que precisa: o tipo de área, o que será irrigado e a fonte de água disponível.",
  },
  { title: "2. Visita e projeto", text: "Avaliamos o local e planejamos a solução adequada." },
  { title: "3. Orçamento", text: "Você recebe o orçamento com os materiais e o serviço." },
  { title: "4. Instalação", text: "Nossa equipe instala o sistema e explica como operar." },
];

// Vantagens que só fazem sentido para jardins; aparecem dentro da aba residencial.
const gardenBenefits = [
  "Rega na hora certa, mesmo quando você não está em casa",
  "Economia de água com a quantidade ideal para cada planta",
  "Menos tempo cuidando do jardim",
  "Sistema adaptado ao formato do seu jardim",
];

function CategoryServices({ category }: { category: ProjectCategory }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {services
        .filter((s) => s.category === category)
        .map((s) => (
          <Card key={s.slug} title={s.title}>
            {s.description}
          </Card>
        ))}
    </div>
  );
}

// Serviços vêm de src/lib/site-config.ts.
export default function ServicosPage() {
  const panels = projectCategories.map((category) => ({
    id: category.id,
    label: category.label,
    content: (
      <>
        <h2 className="sr-only">{category.label}</h2>
        <CategoryServices category={category.id} />
        {category.id === "residencial" && (
          <div className="mt-10">
            <h3 className="text-xl font-bold text-brand-900">Vantagens da irrigação automática no jardim</h3>
            <ul className="mt-4 grid gap-3 text-zinc-700 sm:grid-cols-2">
              {gardenBenefits.map((b) => (
                <li key={b}>✓ {b}</li>
              ))}
            </ul>
          </div>
        )}
      </>
    ),
  }));

  return (
    <>
      <PageHeader
        title="Serviços"
        subtitle="Projeto e instalação de irrigação para produção agrícola, viveiros e estufas, e também para jardins residenciais e comerciais."
      />

      <section className="mx-auto max-w-6xl px-4 py-12">
        <ProjectTabs panels={panels} label="Categorias de serviços" />
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-12">
        <h2 className="text-2xl font-bold text-brand-900">Como funciona</h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s) => (
            <Card key={s.title} title={s.title}>
              {s.text}
            </Card>
          ))}
        </div>
        {/* TODO: confirmar a área de atendimento para instalações (README, "A confirmar"). */}
        <p className="mt-6 text-sm text-zinc-500">Área de atendimento: A CONFIRMAR.</p>
      </section>

      <CtaQuote />
    </>
  );
}
