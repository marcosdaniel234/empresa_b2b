import { LogIn } from "lucide-react";
import { ComingSoon } from "@/components/ui/ComingSoon";

export const metadata = { title: "Entrar" };

export default function EntrarPage() {
  return (
    <ComingSoon
      icon={LogIn}
      eyebrow="ACESSO DA EMPRESA"
      title="Sua empresa, em um só lugar."
      description="A área da empresa está em preparação. Por enquanto, você pode explorar o catálogo e salvar seus favoritos sem criar uma conta."
      points={[
        "Cadastro de empresa com CNPJ e verificação de contato.",
        "Convite e papéis para membros da equipe.",
        "Habilitação para dar lances em nome da organização.",
      ]}
    />
  );
}
