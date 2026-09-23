"use client";

import { useId, useRef, useState } from "react";
import { ArrowRight, CircleAlert, CircleCheck, Pencil } from "lucide-react";
import { checkCorporateEmail, formatCnpj, isValidCnpj } from "@/lib/cadastro";

type Erros = Partial<Record<"nome" | "cnpj" | "email", string>>;

function validar(nome: string, cnpj: string, email: string): Erros {
  const erros: Erros = {};
  if (nome.trim().length < 3) erros.nome = "Informe a razão social ou o nome fantasia.";
  if (!cnpj) erros.cnpj = "Informe o CNPJ.";
  else if (!isValidCnpj(cnpj)) erros.cnpj = "Este CNPJ não confere. Revise os 14 dígitos.";
  const e = checkCorporateEmail(email);
  if (e === "vazio") erros.email = "Informe um e-mail para contato.";
  else if (e === "invalido") erros.email = "Este e-mail não parece válido.";
  return erros;
}

/**
 * Primeiro passo do cadastro de vendedor. Valida no navegador (CNPJ com
 * dígitos verificadores, e-mail) e mostra a conferência dos dados — sem
 * enviar nada, porque o cadastro de empresas ainda não está aberto.
 */
export function SellerForm() {
  const id = useId();
  const [nome, setNome] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [email, setEmail] = useState("");
  const [erros, setErros] = useState<Erros>({});
  const [conferido, setConferido] = useState(false);
  const resumoRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const pessoal = checkCorporateEmail(email) === "pessoal";

  function enviar(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const encontrados = validar(nome, cnpj, email);
    setErros(encontrados);
    const primeiro = (["nome", "cnpj", "email"] as const).find((k) => encontrados[k]);
    if (primeiro) {
      formRef.current?.querySelector<HTMLInputElement>(`[name="${primeiro}"]`)?.focus();
      return;
    }
    setConferido(true);
    requestAnimationFrame(() => resumoRef.current?.focus());
  }

  if (conferido) {
    return (
      <div
        ref={resumoRef}
        tabIndex={-1}
        className="animate-rise rounded-panel bg-surface-card p-6 text-text-primary shadow-float focus-visible:outline-none sm:p-8"
        aria-labelledby={`${id}-resumo`}
        role="region"
      >
        <p className="flex items-center gap-2 text-[15px] font-semibold text-success-text">
          <CircleCheck size={20} aria-hidden="true" /> Dados conferidos
        </p>
        <h3 id={`${id}-resumo`} className="mt-3 text-[22px] font-extrabold tracking-[-.02em]">
          {nome.trim()}
        </h3>
        <dl className="mt-4 grid gap-3 text-[15px] sm:grid-cols-2">
          <div>
            <dt className="text-text-muted">CNPJ</dt>
            <dd className="font-semibold tabular">{cnpj}</dd>
          </div>
          <div className="min-w-0">
            <dt className="text-text-muted">E-mail</dt>
            <dd className="truncate font-semibold">{email.trim()}</dd>
          </div>
        </dl>
        <p className="mt-5 rounded-control bg-surface-subtle p-4 text-[14px] leading-relaxed text-text-secondary">
          Nada foi enviado. O cadastro de empresas ainda não está aberto nesta
          demonstração; os dados ficaram só nesta página e somem ao sair dela.
        </p>
        <button
          type="button"
          onClick={() => setConferido(false)}
          className="secondary-link mt-5"
        >
          <Pencil size={16} aria-hidden="true" /> Editar dados
        </button>
      </div>
    );
  }

  const campo = (nomeCampo: keyof Erros) =>
    erros[nomeCampo]
      ? { "aria-invalid": true, "aria-describedby": `${id}-${nomeCampo}-erro` }
      : {};

  return (
    <form
      ref={formRef}
      noValidate
      onSubmit={enviar}
      className="rounded-panel bg-surface-card p-6 text-text-primary shadow-float sm:p-8"
      aria-labelledby={`${id}-titulo`}
    >
      <h3 id={`${id}-titulo`} className="text-[22px] font-extrabold tracking-[-.02em]">
        Comece pela sua empresa
      </h3>
      <p className="mt-1.5 text-[15px] text-text-secondary">Três dados para abrir a sua loja.</p>

      <div className="mt-6 space-y-5">
        <div>
          <label htmlFor={`${id}-nome`} className="field-label text-[15px] font-medium">
            Nome da empresa
          </label>
          <input
            id={`${id}-nome`}
            name="nome"
            autoComplete="organization"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            maxLength={120}
            className="field mt-2"
            {...campo("nome")}
          />
          {erros.nome && <Erro id={`${id}-nome-erro`}>{erros.nome}</Erro>}
        </div>

        <div>
          <label htmlFor={`${id}-cnpj`} className="field-label text-[15px] font-medium">
            CNPJ
          </label>
          <input
            id={`${id}-cnpj`}
            name="cnpj"
            inputMode="numeric"
            placeholder="00.000.000/0000-00"
            value={cnpj}
            onChange={(e) => setCnpj(formatCnpj(e.target.value))}
            className="field mt-2 tabular"
            {...campo("cnpj")}
          />
          {erros.cnpj && <Erro id={`${id}-cnpj-erro`}>{erros.cnpj}</Erro>}
        </div>

        <div>
          <label htmlFor={`${id}-email`} className="field-label text-[15px] font-medium">
            E-mail corporativo
          </label>
          <input
            id={`${id}-email`}
            name="email"
            type="email"
            autoComplete="email"
            placeholder="nome@suaempresa.com.br"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            maxLength={160}
            className="field mt-2"
            {...campo("email")}
          />
          {erros.email ? (
            <Erro id={`${id}-email-erro`}>{erros.email}</Erro>
          ) : (
            pessoal && (
              <p className="mt-1.5 text-[13px] text-text-secondary">
                Um e-mail do domínio da empresa ajuda compradores a reconhecer quem vende.
              </p>
            )
          )}
        </div>
      </div>

      <button type="submit" className="primary-link group mt-7 h-12 w-full text-[16px]">
        Continuar cadastro
        <ArrowRight size={18} aria-hidden="true" className="transition-transform duration-standard group-hover:translate-x-1" />
      </button>
      <p className="mt-3 text-center text-[13px] text-text-muted">
        Nesta demonstração os dados são só conferidos, não enviados.
      </p>
    </form>
  );
}

function Erro({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <p id={id} className="mt-1.5 flex items-center gap-1.5 text-[13px] font-medium text-danger-text">
      <CircleAlert size={14} aria-hidden="true" /> {children}
    </p>
  );
}
