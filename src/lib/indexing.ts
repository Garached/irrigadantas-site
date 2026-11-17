import "server-only";

// Controla se Google e outros buscadores podem indexar (mostrar nos resultados) o site.
// - Sem a variável (ou com qualquer valor diferente de "true"): site BLOQUEADO.
//   É o padrão, para o endereço provisório de testes não aparecer no Google.
// - ALLOW_INDEXING=true: site liberado (no lançamento oficial).
// O bloqueio é feito SÓ pela meta "robots" (noindex) em todas as páginas, em src/app/layout.tsx.
// O /robots.txt fica sempre liberado, para o Google conseguir ler o noindex (veja src/app/robots.ts).
// O valor é lido durante o build: depois de mudar a variável na Vercel, faça um novo deploy (Redeploy).
export const allowIndexing = process.env.ALLOW_INDEXING === "true";
