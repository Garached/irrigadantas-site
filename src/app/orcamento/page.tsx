import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { QuoteForm } from "@/components/forms/QuoteForm";
import { ContactAlternatives } from "@/components/sections/ContactAlternatives";

export const metadata: Metadata = {
  title: "Solicite um orçamento",
  description: "Peça um orçamento de irrigação para o seu jardim, bombas ou material hidráulico.",
};

export default function OrcamentoPage() {
  return (
    <>
      <PageHeader
        title="Solicite um orçamento"
        subtitle="Conte o que você precisa. Quanto mais detalhes, mais preciso fica o orçamento."
      />
      <section className="mx-auto max-w-3xl space-y-8 px-4 py-12">
        <ContactAlternatives title="Prefere pedir o orçamento pelo WhatsApp ou por telefone?" />
        <QuoteForm />
      </section>
    </>
  );
}
