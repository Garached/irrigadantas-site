import { ProjectPhoto } from "@/components/ui/ProjectPhoto";
import { YouTubeEmbed } from "@/components/ui/YouTubeEmbed";
import { PhotoGallery, type GalleryPhoto } from "@/components/projects/PhotoGallery";
import type { Project } from "@/lib/site-config";

type Props = {
  project: Project;
  // Uma entrada por foto listada no config; src vazio = arquivo não encontrado.
  photos: GalleryPhoto[];
};

const HIGHLIGHTS = 3;

// As 3 primeiras fotos da lista, completando com blocos cinza se faltar.
function highlightPhotos(photos: GalleryPhoto[], title: string) {
  return Array.from({ length: HIGHLIGHTS }, (_, i) => photos[i] ?? { src: "", alt: `${title} — foto ${i + 1}` });
}

export function ProjectCard({ project, photos }: Props) {
  const highlights = highlightPhotos(photos, project.title);
  const galleryPhotos = photos.filter((p) => p.src);

  return project.hasVideo ? (
    <VideoProjectCard project={project} highlights={highlights} galleryPhotos={galleryPhotos} />
  ) : (
    <PhotoProjectCard project={project} highlights={highlights} galleryPhotos={galleryPhotos} />
  );
}

type CardProps = {
  project: Project;
  highlights: GalleryPhoto[];
  galleryPhotos: GalleryPhoto[];
};

// Projeto com vídeo: largura toda, vídeo grande e 3 fotos lado a lado embaixo.
function VideoProjectCard({ project, highlights, galleryPhotos }: CardProps) {
  const { featured } = project;

  return (
    <article className={`rounded-3xl p-4 sm:p-8 ${featured ? "bg-brand-50" : "border border-zinc-200"}`}>
      {featured && (
        <span className="mb-3 inline-block rounded-full bg-brand-600 px-3 py-1 text-sm font-bold text-white">
          Destaque
        </span>
      )}
      <h3 className={`font-bold text-brand-900 ${featured ? "text-2xl sm:text-3xl" : "text-xl sm:text-2xl"}`}>
        {project.title}
      </h3>
      <p className="mt-2 text-zinc-600">{project.description}</p>

      <div className="mt-6 space-y-3">
        <YouTubeEmbed url={project.videoUrl ?? ""} title={`Vídeo: ${project.title}`} />
        <div className="grid grid-cols-3 gap-2 sm:gap-3">
          {highlights.map((photo, i) => (
            <ProjectPhoto
              key={i}
              src={photo.src}
              alt={photo.alt}
              sizes="(min-width: 1152px) 360px, 33vw"
            />
          ))}
        </div>
      </div>

      <div className="mt-6">
        <PhotoGallery title={project.title} photos={galleryPhotos} />
      </div>
    </article>
  );
}

// Projeto só com fotos: uma foto grande e duas menores embaixo.
function PhotoProjectCard({ project, highlights, galleryPhotos }: CardProps) {
  const [main, ...small] = highlights;

  return (
    <article className="flex flex-col rounded-3xl border border-zinc-200 p-4 sm:p-5">
      <ProjectPhoto src={main.src} alt={main.alt} sizes="(min-width: 1152px) 540px, (min-width: 768px) 50vw, 100vw" />
      <div className="mt-3 grid grid-cols-2 gap-3">
        {small.map((photo, i) => (
          <ProjectPhoto
            key={i}
            src={photo.src}
            alt={photo.alt}
            sizes="(min-width: 1152px) 270px, (min-width: 768px) 25vw, 50vw"
          />
        ))}
      </div>

      <h3 className="mt-5 text-xl font-bold text-brand-900">{project.title}</h3>
      <p className="mt-1 mb-5 text-zinc-600">{project.description}</p>

      <div className="mt-auto">
        <PhotoGallery title={project.title} photos={galleryPhotos} />
      </div>
    </article>
  );
}
