import { ButtonLink } from "@/components/ui/ButtonLink";
import { whatsappUrl } from "@/lib/site-config";

export function Hero() {
  return (
    <section className="bg-gradient-to-br from-brand-700 to-water-700 text-white">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:py-24">
        <p className="font-semibold tracking-wide text-brand-100 uppercase">Araraquara - SP</p>
        <h1 className="mt-3 max-w-3xl text-4xl leading-tight font-bold sm:text-5xl">
          Irrigação para o seu jardim, do projeto à instalação
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-brand-50">
          Sistemas de irrigação, bombas e material hidráulico com atendimento de quem entende do assunto.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="/orcamento" variant="light">
            Solicite um orçamento
          </ButtonLink>
          <a
            href={whatsappUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-full border-2 border-white px-6 py-3 font-semibold hover:bg-white/10"
          >
            Fale pelo WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
