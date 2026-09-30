import Link from "next/link";

type Variant = "primary" | "secondary" | "light";

const variants: Record<Variant, string> = {
  primary: "bg-brand-600 text-white hover:bg-brand-700",
  secondary: "border-2 border-brand-600 text-brand-700 hover:bg-brand-50",
  light: "bg-white text-brand-800 hover:bg-brand-50",
};

type Props = {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
};

// Link com cara de botão. Links externos (http...) abrem em nova aba.
export function ButtonLink({ href, children, variant = "primary" }: Props) {
  const className = `inline-flex items-center justify-center rounded-full px-6 py-3 font-semibold transition-colors ${variants[variant]}`;

  if (href.startsWith("http")) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}
