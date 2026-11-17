import Image from "next/image";

type Props = {
  src: string;
  alt: string;
  sizes: string;
  placeholder?: string;
  aspect?: keyof typeof aspects;
  className?: string;
  // true = carrega antes das outras imagens (use só na imagem principal, no topo da página).
  eager?: boolean;
};

// Formatos disponíveis (largura/altura). As classes precisam estar escritas por inteiro
// para o Tailwind encontrá-las.
const aspects = {
  "4/3": "aspect-[4/3]",
  "16/9": "aspect-video",
};

// Foto no formato 4:3 (ou 16:9, com aspect="16/9"). Sem foto (src vazio), mostra um bloco cinza no mesmo tamanho,
// para o layout não mudar quando a foto real for colocada.
// Fotos reais com outro formato são cortadas nas bordas para caber (object-cover).
export function ProjectPhoto({ src, alt, sizes, placeholder = "Foto do projeto", aspect = "4/3", className = "", eager = false }: Props) {
  return (
    <div className={`relative w-full overflow-hidden rounded-2xl bg-zinc-200 ${aspects[aspect]} ${className}`}>
      {src ? (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          className="object-cover"
          loading={eager ? "eager" : undefined}
          fetchPriority={eager ? "high" : undefined}
        />
      ) : (
        <div className="flex h-full items-center justify-center p-2 text-center font-medium text-zinc-500">
          {placeholder}
        </div>
      )}
    </div>
  );
}
