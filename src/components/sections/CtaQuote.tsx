import { ButtonLink } from "@/components/ui/ButtonLink";

// Faixa de chamada para orçamento, reutilizada no fim de várias páginas.
export function CtaQuote() {
  return (
    <section className="bg-brand-50">
      <div className="mx-auto flex max-w-6xl flex-col items-start gap-6 px-4 py-12 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-brand-900">Tem um projeto de irrigação?</h2>
          <p className="mt-2 text-zinc-600">Conte o que você precisa e nós preparamos um orçamento.</p>
        </div>
        <ButtonLink href="/orcamento">Solicite um orçamento</ButtonLink>
      </div>
    </section>
  );
}
