import Link from "next/link";
import { LucideIcon } from "lucide-react";

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
    <div className="container-content flex justify-center py-16 md:py-24">
      <div className="max-w-xl text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-surface-subtle text-action">
          <Icon className="h-7 w-7" aria-hidden="true" />
        </div>
        <span className="mt-4 block text-caption font-semibold uppercase tracking-wide text-text-secondary">
          {eyebrow}
        </span>
        <h1 className="mt-2 text-title-page-mobile text-text-primary md:text-title-page">
          {title}
        </h1>
        <p className="mt-3 text-body text-text-secondary">{description}</p>

        <ul className="mt-6 space-y-2 text-left text-metadata text-text-secondary">
          {points.map((point) => (
            <li key={point} className="flex gap-2">
              <span
                className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-action"
                aria-hidden="true"
              />
              {point}
            </li>
          ))}
        </ul>

        <Link
          href="/resultados"
          className="mt-8 inline-flex h-12 items-center justify-center rounded-control bg-action px-6 text-label font-medium text-text-inverse hover:bg-action-hover"
        >
          Explorar o catálogo
        </Link>
      </div>
    </div>
  );
}
