import "server-only";
import { existsSync } from "node:fs";
import path from "node:path";

// Confere se um arquivo existe na pasta public/ (ex.: "/images/loja/fachada_principal.jpg").
// Roda no servidor, durante o build: ao adicionar uma foto nova, o próximo deploy já a mostra.
export function publicFileExists(src: string) {
  if (!src) return false;
  return existsSync(path.join(process.cwd(), "public", src));
}
