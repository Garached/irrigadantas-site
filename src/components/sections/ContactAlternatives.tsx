import { siteConfig, whatsappUrl } from "@/lib/site-config";

type Props = {
  title?: string;
};

// Bloco com WhatsApp e telefones, usado como alternativa ao formulário de orçamento.
// Não usa hooks, então funciona tanto em Server quanto em Client Components.
export function ContactAlternatives({ title = "Prefere falar direto com a gente?" }: Props) {
  const { phones, whatsapp } = siteConfig.contact;

  return (
    <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-5">
      <p className="font-semibold text-brand-900">{title}</p>
      <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
        <a
          href={whatsappUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center rounded-full bg-whatsapp px-5 py-2.5 font-semibold text-white hover:brightness-95"
        >
          WhatsApp {whatsapp.display}
        </a>
        <p className="text-zinc-700">
          ou ligue:{" "}
          {phones.map((phone, i) => (
            <span key={phone.href}>
              {i > 0 && " / "}
              <a href={`tel:${phone.href}`} className="font-semibold text-brand-700 underline">
                {phone.display}
              </a>
            </span>
          ))}
        </p>
      </div>
    </div>
  );
}
