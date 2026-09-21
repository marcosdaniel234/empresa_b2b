import { LogIn } from "lucide-react";
import { ComingSoon } from "@/components/ui/ComingSoon";

export const metadata = { title: "Entrar" };

export default function EntrarPage() {
  return (
    <ComingSoon
      icon={LogIn}
      eyebrow="Ainda não disponível neste MVP"
      title="Conta e login de empresa"
      description="Este MVP demonstra a descoberta de ativos e o fluxo de revisão de lance como protótipo de interface. Autenticação real, cadastro de empresa e permissões de equipe fazem parte do roteiro descrito no README."
      points={[
        "Cadastro de empresa com CNPJ e verificação de contato.",
        "Convite e papéis para membros da equipe.",
        "Habilitação para dar lances em nome da organização.",
      ]}
    />
  );
}
