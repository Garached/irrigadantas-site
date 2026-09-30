import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { ProjectPhoto } from "@/components/ui/ProjectPhoto";
import { YouTubeEmbed } from "@/components/ui/YouTubeEmbed";
import { CtaQuote } from "@/components/sections/CtaQuote";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Projetos realizados",
  description: "Jardins residenciais e projetos de irrigação instalados pela Irriga Dantas em Araraquara e região.",
};

// Fotos e vídeo vêm de siteConfig.projects (src/lib/site-config.ts).
export default function ProjetosPage() {
  const { gardens, featured } = siteConfig.projects;

  return (
    <>
      <PageHeader
        title="Projetos realizados"
        subtitle="Alguns dos jardins e projetos de irrigação que já instalamos."
      />

      <section className="mx-auto max-w-6xl px-4 py-12">
        <h2 className="text-2xl font-bold text-brand-900">Jardins residenciais</h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {gardens.map((photo, i) => (
            <ProjectPhoto
              key={i}
              src={photo.src}
              alt={photo.alt}
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            />
          ))}
        </div>
      </section>

      <section className="bg-brand-50">
        <div className="mx-auto max-w-4xl space-y-6 px-4 py-12">
          <div>
            <h2 className="text-2xl font-bold text-brand-900">{featured.title}</h2>
            <p className="mt-2 text-zinc-600">{featured.description}</p>
          </div>
          <ProjectPhoto
            src={featured.photoBefore.src}
            alt={featured.photoBefore.alt}
            sizes="(min-width: 896px) 896px, 100vw"
          />
          <YouTubeEmbed url={featured.videoUrl} title={`Vídeo: ${featured.title}`} />
          <ProjectPhoto
            src={featured.photoAfter.src}
            alt={featured.photoAfter.alt}
            sizes="(min-width: 896px) 896px, 100vw"
          />
        </div>
      </section>

      <CtaQuote />
    </>
  );
}
