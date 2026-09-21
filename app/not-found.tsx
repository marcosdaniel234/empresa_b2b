import Link from "next/link";
import { ArrowRight, Compass } from "lucide-react";

export default function NotFound() {
  return (
    <div className="container-content py-12 md:py-16">
      <div className="panel mx-auto max-w-xl p-6 text-center sm:p-8">
        <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-control bg-surface-subtle text-text-secondary">
          <Compass size={21} aria-hidden="true" />
        </div>
        <h1 className="mt-4 text-title-page-mobile text-text-primary md:text-title-page">
          Página não encontrada
        </h1>
        <p className="mx-auto mt-2 max-w-md text-body text-text-secondary">
          O endereço acessado não existe ou o conteúdo não está disponível
          publicamente.
        </p>
        <div className="mt-5 flex flex-wrap justify-center gap-3">
          <Link href="/resultados" className="primary-link">
            Abrir o catálogo
            <ArrowRight size={17} aria-hidden="true" />
          </Link>
          <Link href="/" className="secondary-link">
            Voltar para o início
          </Link>
        </div>
      </div>
    </div>
  );
}
