import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { Card } from "@/components/ui/Card";
import { CtaQuote } from "@/components/sections/CtaQuote";
import { Brands } from "@/components/sections/Brands";

export const metadata: Metadata = {
  title: "Produtos",
  description: "Produtos para irrigação, bombas e material hidráulico em Araraquara (SP).",
};

// TODO: confirmar com a empresa os principais produtos e marcas (README, "A confirmar").
const categories = [
  {
    title: "Irrigação",
    items: ["Aspersores e sprays", "Gotejamento e microaspersão", "Controladores e válvulas", "Tubos e conexões para irrigação"],
  },
  {
    title: "Bombas",
    items: ["Bombas para poço", "Bombas para piscina", "Pressurizadores", "Bombas submersas"],
  },
  {
    title: "Material hidráulico",
    items: ["Tubos e conexões", "Registros e válvulas", "Caixas d'água e acessórios", "Mangueiras"],
  },
];

export default function ProdutosPage() {
  return (
    <>
      <PageHeader
        title="Produtos"
        subtitle="Tudo para irrigação e instalações hidráulicas. Consulte disponibilidade na loja ou pelo WhatsApp."
      />
      <section className="mx-auto grid max-w-6xl gap-6 px-4 py-12 md:grid-cols-3">
        {categories.map((c) => (
          <Card key={c.title} title={c.title}>
            <ul className="list-inside list-disc space-y-1">
              {c.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </Card>
        ))}
      </section>
      <Brands />
      <CtaQuote />
    </>
  );
}
