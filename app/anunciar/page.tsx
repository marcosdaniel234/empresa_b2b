import { PlusCircle } from "lucide-react";
import { ComingSoon } from "@/components/ui/ComingSoon";

export const metadata = { title: "Anunciar ativo" };

export default function AnunciarPage() {
  return (
    <ComingSoon
      icon={PlusCircle}
      eyebrow="Ainda não disponível neste MVP"
      title="Publicar um ativo para leilão"
      description="O cadastro de ativos depende de conta de empresa autenticada, ainda não implementada nesta versão. O roteiro completo do assistente de publicação (dados, fotos, ficha técnica e configuração do leilão) está descrito no README."
      points={[
        "Envio de fotos e documentos do ativo.",
        "Configuração de lance inicial, incremento e prazo.",
        "Fluxo de aprovação antes da publicação.",
      ]}
    />
  );
}
