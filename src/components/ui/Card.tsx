type Props = {
  title: string;
  children: React.ReactNode;
};

export function Card({ title, children }: Props) {
  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
      <h3 className="text-lg font-bold text-brand-800">{title}</h3>
      <div className="mt-2 text-zinc-600">{children}</div>
    </div>
  );
}
