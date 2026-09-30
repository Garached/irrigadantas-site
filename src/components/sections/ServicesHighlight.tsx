import { Card } from "@/components/ui/Card";
import { ButtonLink } from "@/components/ui/ButtonLink";

const highlights = [
  {
    title: "Irrigação de jardins",
    text: "Projeto e instalação de irrigação automática para jardins residenciais.",
  },
  {
    title: "Bombas",
    text: "Bombas para poços, piscinas, pressurização e outras aplicações.",
  },
  {
    title: "Material hidráulico",
    text: "Tubos, conexões, registros e tudo para a sua instalação.",
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
