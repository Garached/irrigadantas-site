import { Card } from "@/components/ui/Card";
import { ButtonLink } from "@/components/ui/ButtonLink";

// Agrícola primeiro (público principal); residencial em segundo; a loja por último.
const highlights = [
  {
    title: "Agrícola e Produção",
    text: "Irrigação para viveiros, nebulização e microaspersão para estufas, filtragem e abastecimento, tanques de lona, casas de bombas, automação e fertirrigação.",
  },
  {
    title: "Residencial e Comercial",
    text: "Irrigação automática para jardins e jardins verticais.",
  },
  {
    title: "Bombas e material hidráulico",
    text: "Bombas, tubos, conexões, registros e tudo para a sua instalação.",
  },
];

export function ServicesHighlight() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16">
      <h2 className="text-3xl font-bold text-brand-900">O que fazemos</h2>
      <div className="mt-8 grid gap-6 md:grid-cols-3">
        {highlights.map((h) => (
          <Card key={h.title} title={h.title}>
            {h.text}
          </Card>
        ))}
      </div>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <ButtonLink href="/servicos">Conheça os serviços</ButtonLink>
        <ButtonLink href="/produtos" variant="secondary">
          Ver produtos
        </ButtonLink>
      </div>
    </section>
  );
}
