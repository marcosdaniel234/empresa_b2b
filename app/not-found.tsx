import Link from "next/link";
import { CompassIcon } from "lucide-react";

export default function NotFound() {
  return (
    <div className="container-content flex flex-col items-center py-24 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-surface-subtle text-text-secondary">
        <CompassIcon className="h-7 w-7" aria-hidden="true" />
      </div>
      <h1 className="mt-4 text-title-page-mobile text-text-primary md:text-title-page">
        Página não encontrada
      </h1>
      <p className="mt-3 max-w-md text-body text-text-secondary">
        O endereço acessado não existe ou o conteúdo não está disponível
        publicamente.
      </p>
      <Link
        href="/"
        className="mt-6 inline-flex h-12 items-center justify-center rounded-control bg-action px-6 text-label font-medium text-text-inverse hover:bg-action-hover"
      >
        Voltar para o início
      </Link>
    </div>
  );
}

