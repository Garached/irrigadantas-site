type Props = {
  title: string;
  subtitle?: string;
};

// Faixa de título no topo das páginas internas.
export function PageHeader({ title, subtitle }: Props) {
  return (
    <section className="bg-brand-50">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:py-16">
        <h1 className="text-3xl font-bold text-brand-900 sm:text-4xl">{title}</h1>
        {subtitle && <p className="mt-3 max-w-2xl text-lg text-zinc-600">{subtitle}</p>}
      </div>
    </section>
  );
}
