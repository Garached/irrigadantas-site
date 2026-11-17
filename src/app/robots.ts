import type { MetadataRoute } from "next";

// Gera o arquivo /robots.txt, que diz aos buscadores o que eles podem visitar.
// Fica SEMPRE liberado (Allow), mesmo antes do lançamento, de propósito:
// o bloqueio é feito pela meta "noindex" das páginas (veja src/lib/indexing.ts).
// Se o robots.txt bloqueasse o acesso, o Google não conseguiria abrir as páginas
// para ler o "noindex", e ainda poderia listar o endereço (sem conteúdo) se alguém publicasse um link.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
  };
}
