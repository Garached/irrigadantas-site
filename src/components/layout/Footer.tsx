import Link from "next/link";
import { fullAddress, siteConfig } from "@/lib/site-config";

export function Footer() {
  const { contact, hours, nav, name } = siteConfig;

  return (
    <footer className="bg-brand-900 text-brand-50">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:grid-cols-3">
        <div>
          <p className="text-lg font-bold text-white">{name}</p>
          <p className="mt-2 text-sm">Irrigação, bombas e material hidráulico.</p>
          <p className="mt-2 text-sm">{fullAddress()}</p>
        </div>

        <div>
          <p className="font-semibold text-white">Contato</p>
          <ul className="mt-2 space-y-1 text-sm">
            <li>Telefone: {contact.phones.map((p) => p.display).join(" / ")}</li>
            <li>WhatsApp: {contact.whatsapp.display}</li>
            <li>
              E-mail:{" "}
              <a href={`mailto:${contact.email}`} className="underline hover:text-white">
                {contact.email}
              </a>
            </li>
            {hours.map((h) => (
              <li key={h.days}>
                {h.days}: {h.time}
              </li>
            ))}
          </ul>
        </div>

        <nav aria-label="Links do rodapé">
          <p className="font-semibold text-white">Navegação</p>
          <ul className="mt-2 space-y-1 text-sm">
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-white hover:underline">
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/orcamento" className="hover:text-white hover:underline">
                Solicite um orçamento
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      <p className="border-t border-brand-800 py-4 text-center text-xs text-brand-100">
        © {new Date().getFullYear()} {name}. Todos os direitos reservados.
      </p>
    </footer>
  );
}
