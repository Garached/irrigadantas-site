import { ButtonLink } from "@/components/ui/ButtonLink";
import { StorefrontPhotos } from "@/components/sections/StorefrontPhotos";
import { fullAddress, siteConfig } from "@/lib/site-config";

// Seção "Nossa nova loja" da página inicial.
export function NewStore() {
  return (
    <section className="bg-zinc-50">
      <div className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="text-3xl font-bold text-brand-900">Nossa nova loja</h2>
        <p className="mt-2 text-lg text-zinc-600">
          {fullAddress()} · {siteConfig.address.reference}
        </p>
        <div className="mt-8">
          <StorefrontPhotos />
        </div>
        <div className="mt-8">
          <ButtonLink href="/contato" variant="secondary">
            Como chegar e horários
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
