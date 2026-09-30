import { ProjectPhoto } from "@/components/ui/ProjectPhoto";
import { publicFileExists } from "@/lib/public-file";
import { siteConfig } from "@/lib/site-config";

// Fotos da nova loja (imagens do projeto arquitetônico).
//
// Telas médias/grandes: grade de 3 colunas x 2 linhas.
//   ┌───────────────┬───────┐
//   │               │ estac.│
//   │   principal   ├───────┤
//   │               │lateral│
//   └───────────────┴───────┘
// A principal (16:9) define a altura; as duas da direita dividem essa altura
// igualmente, então o bloco fica alinhado e sem espaços vazios.
//
// Celular: principal em cima, na largura toda; as outras duas lado a lado embaixo.
//
// Se o arquivo de uma foto ainda não existe em public/, mostra um bloco cinza.
export function StorefrontPhotos() {
  const { main, parking, side } = siteConfig.storefront;
  const srcIfExists = (src: string) => (publicFileExists(src) ? src : "");

  // Nas telas maiores, as fotos da direita deixam de ter formato fixo e
  // ocupam exatamente a altura da sua linha na grade.
  const stackedPhoto = "sm:aspect-auto sm:h-full";

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:grid-rows-2 sm:gap-4">
      <div className="relative col-span-2 sm:row-span-2">
        <ProjectPhoto
          src={srcIfExists(main.src)}
          alt={main.alt}
          placeholder="Foto da fachada principal"
          aspect="16/9"
          sizes="(min-width: 1152px) 750px, (min-width: 640px) 66vw, 100vw"
        />
        <span className="absolute top-3 left-3 rounded-full bg-brand-600 px-4 py-1.5 text-sm font-bold text-white shadow">
          Nova loja em breve
        </span>
      </div>
      <ProjectPhoto
        src={srcIfExists(parking.src)}
        alt={parking.alt}
        placeholder="Foto do estacionamento"
        aspect="16/9"
        className={stackedPhoto}
        sizes="(min-width: 1152px) 370px, (min-width: 640px) 33vw, 50vw"
      />
      <ProjectPhoto
        src={srcIfExists(side.src)}
        alt={side.alt}
        placeholder="Foto da fachada lateral"
        aspect="16/9"
        className={stackedPhoto}
        sizes="(min-width: 1152px) 370px, (min-width: 640px) 33vw, 50vw"
      />
    </div>
  );
}
