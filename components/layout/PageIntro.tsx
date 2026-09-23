import Link from "next/link";
import { Backdrop } from "@/components/brand/Backdrop";

/**
 * Faixa de abertura das páginas internas: vinho com o Brasil em pontos e rotas, trilha,
 * título grande e uma linha de apoio — a mesma voz da página inicial, em
 * escala menor.
 */
export function PageIntro({
  crumbs,
  kicker,
  title,
  children,
}: {
  crumbs: { href?: string; label: string }[];
  kicker?: string;
  title: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <section className="on-dark relative overflow-hidden bg-brand-900 text-white">
      <Backdrop variant="rotas" />
      <div className="container-content relative pb-10 pt-6 lg:pb-12">
        <nav aria-label="Trilha de navegação" className="text-[13px] text-white/65">
          <Link href="/" className="hover:text-white hover:underline">
            Início
          </Link>
          {crumbs.map((c) => (
            <span key={c.label}>
              <span aria-hidden="true"> / </span>
              {c.href ? (
                <Link href={c.href} className="hover:text-white hover:underline">
                  {c.label}
                </Link>
              ) : (
                <span className="text-white/85">{c.label}</span>
              )}
            </span>
          ))}
        </nav>
        {kicker && <p className="kicker-on-dark mt-7 animate-rise">{kicker}</p>}
        <h1
          className={`${kicker ? "mt-3" : "mt-7"} max-w-4xl animate-rise text-[32px] font-extrabold leading-[1.06] tracking-[-.035em] sm:text-[44px]`}
          style={{ animationDelay: "80ms" }}
        >
          {title}
        </h1>
        {children && (
          <div
            className="mt-3 max-w-2xl animate-rise text-[16px] leading-relaxed text-white/75 sm:text-[17px]"
            style={{ animationDelay: "160ms" }}
          >
            {children}
          </div>
        )}
      </div>
    </section>
  );
}
