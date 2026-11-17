import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { CtaQuote } from "@/components/sections/CtaQuote";

export const metadata: Metadata = {
  title: "Sobre a empresa",
  description: "Conheça a Irriga Dantas, loja de irrigação, bombas e material hidráulico em Araraquara (SP).",
};

export default function SobrePage() {
  return (
    <>
      <PageHeader title="Sobre a Irriga Dantas" />
      <section className="mx-auto max-w-3xl space-y-4 px-4 py-12 text-lg text-zinc-700">
        <p>
          A Irriga Dantas é uma loja de irrigação, bombas e material hidráulico em Araraquara (SP),
          que atende produtores, empresas e clientes residenciais.
        </p>
        <p>
          Agora estamos em um novo endereço, com uma loja nova para receber você ainda melhor.
        </p>
        {/* TODO: escrever a história da empresa com a família/equipe (fundação, valores, fotos). */}
        <p className="rounded-lg bg-zinc-100 p-4 text-base text-zinc-500">
          [Texto sobre a história da empresa a ser escrito junto com a Irriga Dantas.]
        </p>
      </section>
      <CtaQuote />
    </>
  );
}
