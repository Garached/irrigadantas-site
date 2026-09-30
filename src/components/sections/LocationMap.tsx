import { siteConfig } from "@/lib/site-config";

// Mapa do Google incorporado pelo endereço. Este formato não precisa de chave de API.
export function LocationMap() {
  const { street, city, state } = siteConfig.address;
  const query = `${street}, ${city} - ${state}`;
  const src = `https://www.google.com/maps?q=${encodeURIComponent(query)}&output=embed`;

  return (
    <iframe
      title={`Mapa: ${siteConfig.name}`}
      src={src}
      className="aspect-video w-full rounded-2xl border-0 md:aspect-square"
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
    />
  );
}
