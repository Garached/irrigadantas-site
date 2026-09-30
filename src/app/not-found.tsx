import { ButtonLink } from "@/components/ui/ButtonLink";

export default function NotFound() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-24 text-center">
      <h1 className="text-3xl font-bold text-brand-900">Página não encontrada</h1>
      <p className="mt-3 text-zinc-600">O endereço que você acessou não existe ou foi alterado.</p>
      <div className="mt-8">
        <ButtonLink href="/">Voltar para o início</ButtonLink>
      </div>
    </section>
  );
}
