import { youtubeEmbedUrl } from "@/lib/site-config";

type Props = {
  url: string;
  title: string;
};

// Vídeo do YouTube incorporado, ocupando a largura toda no formato 16:9.
// Sem link (url vazia), mostra um retângulo cinza no mesmo formato.
export function YouTubeEmbed({ url, title }: Props) {
  const src = url ? youtubeEmbedUrl(url) : null;

  if (!src) {
    return (
      <div className="flex aspect-video w-full items-center justify-center rounded-2xl bg-zinc-200 font-medium text-zinc-500">
        {url ? "Link do vídeo inválido" : "Vídeo do projeto"}
      </div>
    );
  }

  return (
    <iframe
      src={src}
      title={title}
      className="aspect-video w-full rounded-2xl border-0"
      loading="lazy"
      allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      referrerPolicy="strict-origin-when-cross-origin"
      allowFullScreen
    />
  );
}
