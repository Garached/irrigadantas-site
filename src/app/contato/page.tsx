import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { ContactInfo } from "@/components/sections/ContactInfo";
import { LocationMap } from "@/components/sections/LocationMap";
import { QuoteForm } from "@/components/forms/QuoteForm";
import { StorefrontPhotos } from "@/components/sections/StorefrontPhotos";

export const metadata: Metadata = {
  title: "Contato e localização",
  description: "Endereço, telefone, WhatsApp e horário de atendimento da nova loja da Irriga Dantas em Araraquara.",
};

export default function ContatoPage() {
  return (
    <>
      <PageHeader title="Contato e localização" subtitle="Venha conhecer a nossa nova loja." />

      <section className="mx-auto grid max-w-6xl gap-10 px-4 py-12 md:grid-cols-2">
        <ContactInfo />
        <LocationMap />
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-12">
        <h2 className="mb-6 text-2xl font-bold text-brand-900">Nossa nova loja</h2>
        <StorefrontPhotos />
      </section>

      <section className="mx-auto max-w-3xl px-4 pb-16">
        <h2 className="text-2xl font-bold text-brand-900">Solicite um orçamento</h2>
        <p className="mt-2 mb-6 text-zinc-600">Preencha o formulário e responderemos o mais rápido possível.</p>
        <QuoteForm />
      </section>
    </>
  );
}
