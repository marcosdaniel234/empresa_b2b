"use client";

import { useState } from "react";
import Link from "next/link";

const items = [
  [
    "Identificação do ativo",
    "Nome, marca, modelo, ano e quantidade disponível.",
  ],
  [
    "Fotos e estado de conservação",
    "Imagens atuais de todos os lados, detalhes e avarias visíveis.",
  ],
  [
    "Documentação e propriedade",
    "Comprovantes de propriedade e documentos aplicáveis ao ativo.",
  ],
  [
    "Valores e condições",
    "Lance inicial, incremento, prazo e eventuais custos adicionais.",
  ],
  [
    "Local e retirada",
    "Cidade, prazo de retirada, acesso ao local e responsabilidade pelo transporte.",
  ],
];

export function AnnouncementChecklist() {
  const [checked, setChecked] = useState<number[]>([]);
  return (
    <section
      className="mt-8 rounded-card border border-border-subtle bg-white p-5 sm:p-8"
      aria-labelledby="checklist-title"
    >
      <h2 id="checklist-title" className="text-title-section-mobile">
        Prepare seu anúncio
      </h2>
      <p className="mt-2 text-metadata text-text-secondary">
        Marque o que já tem em mãos. A lista fica disponível apenas enquanto
        esta página estiver aberta.
      </p>
      <p role="status" className="mt-5 text-label font-semibold text-action">
        {checked.length} de {items.length} etapas conferidas
      </p>
      <progress
        value={checked.length}
        max={items.length}
        aria-label="Preparação do anúncio"
        className="mt-2 h-2 w-full accent-action"
      />
      <div className="mt-4 divide-y divide-border-subtle">
        {items.map(([title, detail], index) => (
          <label
            key={title}
            className="flex cursor-pointer items-start gap-3 py-5"
          >
            <input
              type="checkbox"
              className="mt-1 h-5 w-5 shrink-0 accent-action"
              checked={checked.includes(index)}
              onChange={(event) =>
                setChecked((current) =>
                  event.target.checked
                    ? [...current, index]
                    : current.filter((i) => i !== index),
                )
              }
            />
            <span>
              <span className="block text-body font-semibold">{title}</span>
              <span className="mt-1 block text-metadata text-text-secondary">
                {detail}
              </span>
            </span>
          </label>
        ))}
      </div>
      {checked.length === items.length && (
        <p className="mt-3 rounded-control bg-success-surface p-4 text-metadata text-success-text">
          Tudo conferido. A publicação ainda não está disponível nesta
          demonstração, mas você já sabe o que preparar.
        </p>
      )}
      <Link href="/resultados" className="text-link mt-5">
        Veja como os ativos aparecem no catálogo
      </Link>
    </section>
  );
}

