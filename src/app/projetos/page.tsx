import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { CtaQuote } from "@/components/sections/CtaQuote";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { ProjectTabs } from "@/components/projects/ProjectTabs";
import { publicFileExists } from "@/lib/public-file";
import { projectCategories, projects, type Project } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Projetos realizados",
  description:
    "Projetos de irrigação agrícola, estufas, casas de bombas, jardins residenciais e comerciais realizados pela Irriga Dantas.",
};

// Monta a lista de fotos de um projeto. Arquivo que não existe em public/ vira src vazio (bloco cinza).
function projectPhotos(project: Project) {
  return project.photos.map((file, i) => {
    const src = `/images/projetos/${project.slug}/${file}`;
    return { src: publicFileExists(src) ? src : "", alt: `${project.title} — foto ${i + 1}` };
  });
}

function CategoryProjects({ items }: { items: Project[] }) {
  // Projetos com vídeo ocupam a largura toda; os demais ficam em 2 colunas.
  const withVideo = items.filter((p) => p.hasVideo);
  const photoOnly = items.filter((p) => !p.hasVideo);

  return (
    <div className="space-y-8">
      {withVideo.map((project) => (
        <ProjectCard key={project.slug} project={project} photos={projectPhotos(project)} />
      ))}
      {photoOnly.length > 0 && (
        <div className="grid gap-8 md:grid-cols-2">
          {photoOnly.map((project) => (
            <ProjectCard key={project.slug} project={project} photos={projectPhotos(project)} />
          ))}
        </div>
      )}
    </div>
  );
}

// Projetos e fotos vêm de src/lib/site-config.ts.
export default function ProjetosPage() {
  const panels = projectCategories.map((category) => ({
    id: category.id,
    label: category.label,
    content: (
      <>
        <h2 className="sr-only">{category.label}</h2>
        <CategoryProjects items={projects.filter((p) => p.category === category.id)} />
      </>
    ),
  }));

  return (
    <>
      <PageHeader
        title="Projetos realizados"
        subtitle="Conheça alguns dos projetos de irrigação que já realizamos."
      />
      <section className="mx-auto max-w-6xl px-4 py-12">
        <ProjectTabs panels={panels} />
      </section>
      <CtaQuote />
    </>
  );
}
