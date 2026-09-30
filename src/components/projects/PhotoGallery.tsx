"use client";

// Botão "Ver todas as fotos" + galeria em tela cheia.
// Usa o elemento <dialog> do HTML: ele já prende o foco do teclado na galeria,
// fecha com a tecla Esc e é anunciado como janela pelos leitores de tela.
import Image from "next/image";
import { useRef, useState } from "react";

export type GalleryPhoto = { src: string; alt: string };

type Props = {
  title: string;
  photos: GalleryPhoto[];
};

export function PhotoGallery({ title, photos }: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [index, setIndex] = useState(0);
  const total = photos.length;

  // Sem fotos ainda: botão visível, mas desativado, para mostrar onde ele vai ficar.
  if (total === 0) {
    return (
      <button
        type="button"
        disabled
        className="rounded-full border-2 border-zinc-300 px-5 py-2 font-semibold text-zinc-400"
      >
        Ver todas as fotos
      </button>
    );
  }

  const open = () => {
    setIndex(0);
    dialogRef.current?.showModal();
  };
  const close = () => dialogRef.current?.close();
  const previous = () => setIndex((i) => (i - 1 + total) % total);
  const next = () => setIndex((i) => (i + 1) % total);

  const photo = photos[index];

  return (
    <>
      <button
        type="button"
        onClick={open}
        className="rounded-full border-2 border-brand-600 px-5 py-2 font-semibold text-brand-700 transition-colors hover:bg-brand-50"
      >
        Ver todas as fotos ({total})
      </button>

      <dialog
        ref={dialogRef}
        aria-label={`Fotos: ${title}`}
        className="m-0 h-dvh max-h-none w-screen max-w-none bg-black p-0 text-white backdrop:bg-black/80"
        onKeyDown={(e) => {
          if (e.key === "ArrowLeft") previous();
          if (e.key === "ArrowRight") next();
        }}
      >
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between gap-4 p-4">
            <p className="font-semibold">{title}</p>
            <div className="flex items-center gap-4">
              <span className="text-sm text-zinc-300" aria-live="polite">
                {index + 1} / {total}
              </span>
              <button
                type="button"
                onClick={close}
                aria-label="Fechar galeria"
                className="rounded-full p-2 text-2xl leading-none hover:bg-white/10"
              >
                ✕
              </button>
            </div>
          </div>

          <div className="relative flex-1">
            <Image key={photo.src} src={photo.src} alt={photo.alt} fill sizes="100vw" className="object-contain" />

            {total > 1 && (
              <>
                <button
                  type="button"
                  onClick={previous}
                  aria-label="Foto anterior"
                  className="absolute top-1/2 left-2 -translate-y-1/2 rounded-full bg-black/50 px-4 py-3 text-3xl leading-none hover:bg-black/70 sm:left-4"
                >
                  ‹
                </button>
                <button
                  type="button"
                  onClick={next}
                  aria-label="Próxima foto"
                  className="absolute top-1/2 right-2 -translate-y-1/2 rounded-full bg-black/50 px-4 py-3 text-3xl leading-none hover:bg-black/70 sm:right-4"
                >
                  ›
                </button>
              </>
            )}
          </div>
        </div>
      </dialog>
    </>
  );
}
