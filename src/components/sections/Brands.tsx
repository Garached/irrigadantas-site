import { siteConfig } from "@/lib/site-config";

// "Marcas com que trabalhamos". A lista fica em siteConfig.brands.
export function Brands() {
  const { brands } = siteConfig;

  return (
    <section className="mx-auto max-w-6xl px-4 py-12">
      <h2 className="text-2xl font-bold text-brand-900">Marcas com que trabalhamos</h2>
      {brands.length > 0 ? (
        <ul className="mt-6 flex flex-wrap gap-3">
          {brands.map((brand) => (
            <li key={brand} className="rounded-full border border-zinc-200 bg-white px-5 py-2 font-semibold text-zinc-700">
              {brand}
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-4 rounded-lg bg-zinc-100 p-4 text-zinc-500">[Lista de marcas — A CONFIRMAR com a empresa.]</p>
      )}
    </section>
  );
}
