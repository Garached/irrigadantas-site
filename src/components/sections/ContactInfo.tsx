import { fullAddress, mapsUrl, siteConfig, whatsappUrl } from "@/lib/site-config";

export function ContactInfo() {
  const { contact, hours } = siteConfig;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-brand-900">Endereço</h2>
        <p className="mt-1">{fullAddress()}</p>
        <p>{siteConfig.address.reference}</p>
        <a href={mapsUrl()} target="_blank" rel="noopener noreferrer" className="mt-1 inline-block text-brand-700 underline">
          Abrir no Google Maps
        </a>
      </div>

      <div>
        <h2 className="text-xl font-bold text-brand-900">Contato</h2>
        <ul className="mt-1 space-y-1">
          <li>
            Telefone:{" "}
            {contact.phones.map((phone, i) => (
              <span key={phone.href}>
                {i > 0 && " / "}
                <a href={`tel:${phone.href}`} className="text-brand-700 underline">
                  {phone.display}
                </a>
              </span>
            ))}
          </li>
          <li>
            WhatsApp:{" "}
            <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" className="text-brand-700 underline">
              {contact.whatsapp.display}
            </a>
          </li>
          <li>
            E-mail:{" "}
            <a href={`mailto:${contact.email}`} className="text-brand-700 underline">
              {contact.email}
            </a>
          </li>
        </ul>
      </div>

      <div>
        <h2 className="text-xl font-bold text-brand-900">Horário de atendimento</h2>
        <ul className="mt-1 space-y-1">
          {hours.map((h) => (
            <li key={h.days}>
              {h.days}: {h.time}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
