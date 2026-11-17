import Link from "next/link";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { ProjectPhoto } from "@/components/ui/ProjectPhoto";
import { publicFileExists } from "@/lib/public-file";
import { heroProjectSlug, projects, whatsappUrl } from "@/lib/site-config";

// Imagem principal: a 1ª foto do projeto definido em heroProjectSlug (site-config.ts).
// Sem foto (lista vazia ou arquivo inexistente), mostra um bloco cinza no lugar.
function heroPhoto() {
  const project = projects.find((p) => p.slug === heroProjectSlug);
  const file = project?.photos[0];
  const src = project && file ? `/images/projetos/${project.slug}/${file}` : "";
  return {
    src: publicFileExists(src) ? src : "",
    alt: project ? `${project.title} — Irriga Dantas` : "Projeto de irrigação da Irriga Dantas",
    placeholder: project ? `Foto: ${project.title}` : "Foto do projeto",
  };
}

export function Hero() {
  const photo = heroPhoto();

  return (
    <section className="bg-gradient-to-br from-brand-700 to-water-700 text-white">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 sm:py-20 lg:grid-cols-2">
        <div>
          <p className="font-semibold tracking-wide text-brand-100 uppercase">Araraquara - SP</p>
          <h1 className="mt-3 text-4xl leading-tight font-bold sm:text-5xl">
            Irrigação para viveiros, estufas e produção agrícola
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-brand-50">
            Projeto, instalação e materiais para irrigação, fertirrigação, casas de bombas e abastecimento em
            Araraquara e região. Também atendemos jardins residenciais e comerciais.
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
          <Link href="/projetos" className="mt-6 inline-block font-semibold text-white underline hover:text-brand-100">
            Ver projetos realizados →
          </Link>
        </div>

        <ProjectPhoto
          src={photo.src}
          alt={photo.alt}
          placeholder={photo.placeholder}
          sizes="(min-width: 1152px) 560px, (min-width: 1024px) 50vw, 100vw"
          eager
        />
      </div>
    </section>
  );
}
