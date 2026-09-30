import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { Card } from "@/components/ui/Card";
import { CtaQuote } from "@/components/sections/CtaQuote";

export const metadata: Metadata = {
  title: "Serviços",
  description: "Instalação de irrigação automática para jardins residenciais em Araraquara e região.",
};

const steps = [
  { title: "1. Conversa inicial", text: "Você conta como é o seu jardim e o que precisa." },
  { title: "2. Visita e projeto", text: "Avaliamos o local e planejamos a melhor solução de irrigação." },
  { title: "3. Orçamento", text: "Você recebe o orçamento com os materiais e o serviço." },
  { title: "4. Instalação", text: "Nossa equipe instala o sistema e explica como usar." },
];

export default function ServicosPage() {
  return (
    <>
      <PageHeader
        title="Instalação de irrigação para jardins"
        subtitle="Jardim sempre verde, sem desperdício de água e sem precisar regar na mão."
      />

      <section className="mx-auto max-w-6xl px-4 py-12">
        <h2 className="text-2xl font-bold text-brand-900">Vantagens da irrigação automática</h2>
        <ul className="mt-4 grid gap-3 text-zinc-700 sm:grid-cols-2">
          <li>✓ Rega na hora certa, mesmo quando você não está em casa</li>
          <li>✓ Economia de água com a quantidade ideal para cada planta</li>
          <li>✓ Menos tempo cuidando do jardim</li>
          <li>✓ Sistema adaptado ao formato do seu jardim</li>
        </ul>
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
