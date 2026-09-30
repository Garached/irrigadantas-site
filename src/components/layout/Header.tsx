"use client";

// Client Component: precisa rodar no navegador porque o menu do celular
// abre e fecha quando a pessoa toca no botão.
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { siteConfig } from "@/lib/site-config";

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const linkClass = (href: string) =>
    `rounded-md px-3 py-2 font-medium transition-colors hover:bg-brand-50 hover:text-brand-700 ${
      pathname === href ? "text-brand-700" : "text-zinc-700"
    }`;

  return (
    <header className="sticky top-0 z-40 border-b border-zinc-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="text-xl font-bold text-brand-700" onClick={() => setOpen(false)}>
          {siteConfig.name}
        </Link>

        {/* Menu para telas grandes */}
        <nav className="hidden items-center gap-1 lg:flex" aria-label="Menu principal">
          {siteConfig.nav.map((item) => (
            <Link key={item.href} href={item.href} className={linkClass(item.href)}>
              {item.label}
            </Link>
          ))}
          <Link
            href="/orcamento"
            className="ml-2 rounded-full bg-brand-600 px-4 py-2 font-semibold text-white hover:bg-brand-700"
          >
            Orçamento
          </Link>
        </nav>

        {/* Botão do menu no celular */}
        <button
          type="button"
          className="rounded-md p-2 text-zinc-700 lg:hidden"
          aria-expanded={open}
          aria-controls="menu-celular"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          onClick={() => setOpen(!open)}
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            {open ? (
              <path strokeLinecap="round" d="M6 6l12 12M6 18L18 6" />
            ) : (
              <path strokeLinecap="round" d="M4 7h16M4 12h16M4 17h16" />
            )}
          </svg>
        </button>
      </div>

      {open && (
        <nav id="menu-celular" className="border-t border-zinc-200 px-4 py-2 lg:hidden" aria-label="Menu principal">
          {siteConfig.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`block ${linkClass(item.href)}`}
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/orcamento"
            className="my-2 block rounded-full bg-brand-600 px-4 py-2 text-center font-semibold text-white"
            onClick={() => setOpen(false)}
          >
            Solicite um orçamento
          </Link>
        </nav>
      )}
    </header>
  );
}
