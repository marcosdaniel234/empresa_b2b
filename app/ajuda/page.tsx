import Link from "next/link";

export const metadata = { title: "Central de ajuda" };

export default function AjudaPage() {
  return (
    <div className="container-content max-w-2xl py-12 md:py-16">
      <h1 className="text-title-page-mobile text-text-primary md:text-title-page">Central de ajuda</h1>
      <p className="mt-4 text-body text-text-secondary">
        Este MVP ainda não possui um canal de suporte real nem sistema de denúncia. Para entender o que já foi
        construído e o que está planejado, veja{" "}
        <Link href="/como-funciona" className="text-action hover:underline">
          como funciona
        </Link>{" "}
        e o roteiro completo no README do repositório.
      </p>
    </div>
  );
}
