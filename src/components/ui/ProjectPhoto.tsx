import Image from "next/image";

type Props = {
  src: string;
  alt: string;
  sizes: string;
};

// Foto no formato 4:3. Sem foto (src vazio), mostra um bloco cinza no mesmo tamanho,
// para o layout não mudar quando a foto real for colocada.
// Fotos reais com outro formato são cortadas nas bordas para caber (object-cover).
export function ProjectPhoto({ src, alt, sizes }: Props) {
  return (
    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-zinc-200">
      {src ? (
        <Image src={src} alt={alt} fill sizes={sizes} className="object-cover" />
      ) : (
        <div className="flex h-full items-center justify-center font-medium text-zinc-500">
          Foto do projeto
        </div>
      )}
    </div>
  );
}
