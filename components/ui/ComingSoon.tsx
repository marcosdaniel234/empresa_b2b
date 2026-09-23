import Link from "next/link";
import { ArrowRight, LucideIcon } from "lucide-react";

export function ComingSoon({
  icon: Icon,
  eyebrow,
  title,
  description,
  points,
}: {
  icon: LucideIcon;
  eyebrow: string;
  title: string;
  description: string;
  points: string[];
}) {
  return (
    <div className="container-content py-10 md:py-14">
      <div className="panel mx-auto max-w-2xl p-6 sm:p-8">
        <div className="flex h-11 w-11 items-center justify-center rounded-control bg-surface-subtle text-action">
          <Icon size={21} aria-hidden="true" />
        </div>
        <p className="eyebrow mt-4">{eyebrow}</p>
        <h1 className="mt-1.5 text-[28px] font-extrabold leading-[1.08] tracking-[-.03em] text-text-primary sm:text-[36px]">
          {title}
        </h1>
        <p className="mt-2 text-body text-text-secondary">{description}</p>

        <ul className="mt-5 divide-y divide-border-subtle border-y border-border-subtle">
          {points.map((point) => (
            <li
              key={point}
              className="flex gap-2.5 py-3 text-metadata text-text-secondary"
            >
              <span
                className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-strong"
                aria-hidden="true"
              />
              {point}
            </li>
          ))}
        </ul>

        <Link href="/resultados" className="primary-link mt-5">
          Explorar o catálogo
          <ArrowRight size={17} aria-hidden="true" />
        </Link>
      </div>
    </div>
  );
}
