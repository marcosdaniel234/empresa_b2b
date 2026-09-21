/**
 * Dados de demonstração da interface. Nenhum valor aqui representa um ativo,
 * empresa, lance ou leilão real; servem apenas para exercitar o layout
 * e os fluxos de interface (ver HANDOFF_DESIGN.md §3).
 */

export type Category = "maquinas" | "veiculos" | "tecnologia" | "mobiliario";

export type AuctionStatus =
  | "agendado"
  | "aberto"
  | "encerrando"
  | "encerrado_vencedor"
  | "encerrado_sem_vencedor"
  | "cancelado";

export const CATEGORY_LABELS: Record<Category, string> = {
  maquinas: "Máquinas",
  veiculos: "Veículos",
  tecnologia: "Tecnologia",
  mobiliario: "Mobiliário",
};

export interface Company {
  slug: string;
  name: string;
  city: string;
  state: string;
  segment: string;
  since: string;
  description: string;
}

export interface Asset {
  id: string;
  /** Código público do lote, exibido no card, no detalhe e no painel de lance. */
  lot: string;
  slug: string;
  title: string;
  category: Category;
  companySlug: string;
  city: string;
  state: string;
  status: AuctionStatus;
  currentBid: number | null;
  startingBid: number;
  minIncrement: number;
  bidCount: number;
  deadlineIso: string;
  startsAtIso?: string;
  extendedUntilIso?: string;
  antiSniping: boolean;
  specs: { label: string; value: string }[];
  condition: string;
  description: string;
  documents: string[];
  pickup: string;
  gallery: number;
}

export const COMPANIES: Company[] = [
  {
    slug: "metalfor-industrial",
    name: "Metalfor Industrial Ltda.",
    city: "Campinas",
    state: "SP",
    segment: "Metalurgia e logística industrial",
    since: "2014",
    description:
      "Fabricante e operadora de equipamentos de movimentação interna. Renova a frota de empilhadeiras e máquinas a cada ciclo de 4 anos e disponibiliza os ativos substituídos para outras empresas.",
  },
  {
    slug: "transnorte-logistica",
    name: "Transnorte Logística S.A.",
    city: "São Paulo",
    state: "SP",
    segment: "Transporte e distribuição",
    since: "2009",
    description:
      "Opera uma frota própria de utilitários e caminhões leves para distribuição urbana. Publica veículos fora do ciclo de manutenção preventiva da frota.",
  },
  {
    slug: "constrular-engenharia",
    name: "Constrular Engenharia Ltda.",
    city: "Barueri",
    state: "SP",
    segment: "Construção civil e obras",
    since: "2011",
    description:
      "Empresa de engenharia e obras corporativas. Realoca mobiliário e equipamentos de canteiro entre projetos encerrados e novos contratos.",
  },
  {
    slug: "novadata-tecnologia",
    name: "Novadata Tecnologia S.A.",
    city: "Curitiba",
    state: "PR",
    segment: "Tecnologia da informação",
    since: "2017",
    description:
      "Empresa de infraestrutura de TI corporativa. Renova parques de servidores e estações de trabalho em ciclos de 3 anos.",
  },
  {
    slug: "agroverde-maquinas",
    name: "Agroverde Máquinas Agrícolas",
    city: "Ribeirão Preto",
    state: "SP",
    segment: "Máquinas agrícolas",
    since: "2005",
    description:
      "Revenda e locação de máquinas agrícolas. Publica equipamentos de fim de contrato de locação para venda direta entre empresas.",
  },
];

const now = Number(
  process.env.NEXT_PUBLIC_DEMO_EPOCH ?? Date.UTC(2026, 8, 21, 12),
);
const hours = (h: number) => new Date(now + h * 60 * 60 * 1000).toISOString();
const days = (d: number) =>
  new Date(now + d * 24 * 60 * 60 * 1000).toISOString();

export const ASSETS: Asset[] = [
  {
    id: "a1",
    lot: "LT-1042",
    slug: "empilhadeira-eletrica-2021",
    title: "Empilhadeira elétrica, capacidade 2,5 t",
    category: "maquinas",
    companySlug: "metalfor-industrial",
    city: "Campinas",
    state: "SP",
    status: "aberto",
    currentBid: 28000,
    startingBid: 22000,
    minIncrement: 500,
    bidCount: 14,
    deadlineIso: hours(3),
    antiSniping: true,
    specs: [
      { label: "Ano de fabricação", value: "2021" },
      { label: "Capacidade de carga", value: "2,5 toneladas" },
      { label: "Tipo de alimentação", value: "Elétrica (bateria de lítio)" },
      { label: "Horas de uso registradas", value: "5.320 h" },
      { label: "Estado de conservação", value: "Bom" },
      { label: "Acompanha", value: "Carregador original" },
    ],
    condition:
      "Em uso interno contínuo, sem histórico de colisão registrado. Pintura com desgaste normal de piso industrial. Garfos com folga dentro do padrão do fabricante.",
    description:
      "Empilhadeira elétrica utilizada em operação de armazém coberto. Bateria de lítio com autonomia declarada pelo vendedor, sem substituição registrada. Revisões periódicas em dia conforme manual do fabricante.",
    documents: ["Nota fiscal de compra", "Histórico de manutenção (12 meses)"],
    pickup:
      "Retirada por conta do comprador, em Campinas/SP, em até 10 dias úteis após o fechamento.",
    gallery: 6,
  },
  {
    id: "a2",
    lot: "LT-1058",
    slug: "furgao-de-carga-2020",
    title: "Furgão de carga, motor 2.3",
    category: "veiculos",
    companySlug: "transnorte-logistica",
    city: "São Paulo",
    state: "SP",
    status: "aberto",
    currentBid: 46500,
    startingBid: 38000,
    minIncrement: 1000,
    bidCount: 21,
    deadlineIso: hours(6),
    antiSniping: true,
    specs: [
      { label: "Ano/modelo", value: "2020/2020" },
      { label: "Motor", value: "2.3 turbodiesel" },
      { label: "Quilometragem", value: "103.000 km" },
      { label: "Câmbio", value: "Manual, 6 marchas" },
      { label: "Capacidade de carga", value: "1.200 kg" },
      { label: "Manutenção", value: "Em dia, revisões em concessionária" },
    ],
    condition:
      "Uso em rota urbana de distribuição. Lataria com marcas de uso compatíveis com a idade. Pneus dianteiros trocados há 8.000 km. Sem registro de sinistro.",
    description:
      "Veículo utilitário de frota própria, substituído dentro do ciclo padrão de renovação da empresa. Interior de carga com forração original, sem avarias estruturais visíveis.",
    documents: [
      "CRLV atualizado",
      "Histórico de revisões",
      "Laudo de vistoria cautelar",
    ],
    pickup:
      "Retirada por conta do comprador, em São Paulo/SP, mediante transferência de documentação.",
    gallery: 5,
  },
  {
    id: "a3",
    lot: "LT-1067",
    slug: "mobiliario-corporativo-sala-reuniao",
    title: "Conjunto de mobiliário para sala de reunião",
    category: "mobiliario",
    companySlug: "constrular-engenharia",
    city: "Barueri",
    state: "SP",
    status: "encerrando",
    currentBid: 12800,
    startingBid: 8000,
    minIncrement: 200,
    bidCount: 9,
    deadlineIso: hours(1),
    antiSniping: true,
    specs: [
      { label: "Itens incluídos", value: "1 mesa + 10 cadeiras ergonômicas" },
      { label: "Material da mesa", value: "MDF revestido, estrutura em aço" },
      { label: "Cadeiras", value: "Apoio lombar regulável, base giratória" },
      { label: "Estado de conservação", value: "Excelente" },
      { label: "Origem", value: "Escritório corporativo desativado" },
    ],
    condition:
      "Conjunto retirado de escritório em processo de mudança. Sem manchas ou rasgos no estofado. Mesa sem trincas ou empenamento visível.",
    description:
      "Conjunto completo para sala de reunião de até 10 pessoas, proveniente de escritório corporativo com uso predominante em ambiente climatizado.",
    documents: ["Nota fiscal de compra original"],
    pickup:
      "Retirada por conta do comprador, em Barueri/SP, com agendamento prévio por mensagem.",
    gallery: 4,
  },
  {
    id: "a4",
    lot: "LT-1073",
    slug: "servidores-rack-42u",
    title: "Lote de servidores em rack 42U",
    category: "tecnologia",
    companySlug: "novadata-tecnologia",
    city: "Curitiba",
    state: "PR",
    status: "aberto",
    currentBid: null,
    startingBid: 15000,
    minIncrement: 500,
    bidCount: 0,
    deadlineIso: days(2),
    antiSniping: true,
    specs: [
      { label: "Quantidade", value: "6 servidores rack + 1 rack 42U" },
      { label: "Processadores", value: "Intel Xeon (2ª/3ª geração)" },
      { label: "Memória total", value: "384 GB distribuídos no lote" },
      { label: "Armazenamento", value: "SSD e HDD SAS, sem dados residuais" },
      { label: "Tempo de operação", value: "Substituídos em ciclo de 3 anos" },
    ],
    condition:
      "Equipamentos desligados e higienizados. Discos formatados com apagamento seguro antes da fotografia. Sem garantia de fabricante ativa.",
    description:
      "Lote de infraestrutura de datacenter substituído em ciclo programado de renovação. Testado funcionalmente antes da publicação, sem carga de produção.",
    documents: [
      "Relatório de apagamento seguro de dados",
      "Inventário técnico do lote",
    ],
    pickup:
      "Retirada por conta do comprador, em Curitiba/PR, com necessidade de veículo de carga.",
    gallery: 5,
  },
  {
    id: "a5",
    lot: "LT-1088",
    slug: "trator-agricola-2019",
    title: "Trator agrícola, 110 cv",
    category: "maquinas",
    companySlug: "agroverde-maquinas",
    city: "Ribeirão Preto",
    state: "SP",
    status: "agendado",
    currentBid: null,
    startingBid: 95000,
    minIncrement: 2000,
    bidCount: 0,
    deadlineIso: days(4),
    startsAtIso: days(2),
    antiSniping: true,
    specs: [
      { label: "Potência", value: "110 cv" },
      { label: "Ano de fabricação", value: "2019" },
      { label: "Horas de uso", value: "3.860 h" },
      { label: "Tração", value: "4x4" },
      { label: "Implementos", value: "Não incluídos" },
    ],
    condition:
      "Fim de contrato de locação, com manutenção preventiva registrada pela locadora. Pneus com desgaste médio, sem substituição recente.",
    description:
      "Trator utilizado em operação de locação para terceiros, devolvido ao fim do contrato dentro do prazo previsto de manutenção.",
    documents: ["Nota fiscal", "Ficha de manutenção da locadora"],
    pickup: "Retirada por conta do comprador, em Ribeirão Preto/SP.",
    gallery: 5,
  },
  {
    id: "a6",
    lot: "LT-1094",
    slug: "vans-utilitarias-lote",
    title: "Van utilitária, motor 1.4",
    category: "veiculos",
    companySlug: "transnorte-logistica",
    city: "São Paulo",
    state: "SP",
    status: "aberto",
    currentBid: 31200,
    startingBid: 25000,
    minIncrement: 500,
    bidCount: 7,
    deadlineIso: days(1),
    antiSniping: true,
    specs: [
      { label: "Ano/modelo", value: "2019/2019" },
      { label: "Motor", value: "1.4 flex" },
      { label: "Quilometragem", value: "89.500 km" },
      { label: "Câmbio", value: "Manual, 5 marchas" },
      { label: "Manutenção", value: "Em dia" },
    ],
    condition:
      "Uso urbano leve. Lataria com pequenos riscos superficiais. Sem registro de sinistro.",
    description:
      "Veículo de apoio administrativo, substituído por renovação programada de frota.",
    documents: ["CRLV atualizado", "Histórico de revisões"],
    pickup: "Retirada por conta do comprador, em São Paulo/SP.",
    gallery: 4,
  },
  {
    id: "a7",
    lot: "LT-1101",
    slug: "estacoes-trabalho-lote-20",
    title: "Lote de 20 estações de trabalho",
    category: "tecnologia",
    companySlug: "novadata-tecnologia",
    city: "Curitiba",
    state: "PR",
    status: "encerrado_vencedor",
    currentBid: 18400,
    startingBid: 12000,
    minIncrement: 400,
    bidCount: 26,
    deadlineIso: hours(-30),
    antiSniping: true,
    specs: [
      { label: "Quantidade", value: "20 desktops" },
      { label: "Processador", value: "Intel Core i5, 8ª/9ª geração" },
      { label: "Memória", value: "8 GB por unidade" },
      { label: "Armazenamento", value: "SSD 240 GB, dados apagados" },
    ],
    condition:
      "Equipamentos de escritório substituídos em ciclo de renovação. Testados individualmente.",
    description:
      "Lote corporativo de estações de trabalho para revenda ou reaproveitamento interno.",
    documents: ["Relatório de apagamento seguro de dados"],
    pickup: "Retirada por conta do comprador, em Curitiba/PR.",
    gallery: 4,
  },
  {
    id: "a8",
    lot: "LT-1115",
    slug: "cadeiras-diretoria-lote-8",
    title: "Lote de 8 cadeiras de diretoria",
    category: "mobiliario",
    companySlug: "constrular-engenharia",
    city: "Barueri",
    state: "SP",
    status: "aberto",
    currentBid: 4200,
    startingBid: 3000,
    minIncrement: 100,
    bidCount: 5,
    deadlineIso: days(3),
    antiSniping: true,
    specs: [
      { label: "Quantidade", value: "8 unidades" },
      { label: "Revestimento", value: "Couro sintético" },
      { label: "Regulagens", value: "Altura, apoio lombar e braços" },
      { label: "Estado de conservação", value: "Bom, com marcas de uso" },
    ],
    condition:
      "Estofado sem rasgos. Mecanismo de regulagem funcional em todas as unidades testadas.",
    description:
      "Cadeiras provenientes de sala de diretoria em processo de reforma do escritório.",
    documents: ["Nota fiscal de compra original"],
    pickup: "Retirada por conta do comprador, em Barueri/SP.",
    gallery: 3,
  },
  {
    id: "a9",
    lot: "LT-1127",
    slug: "gerador-diesel-150kva",
    title: "Gerador a diesel, 150 kVA",
    category: "maquinas",
    companySlug: "metalfor-industrial",
    city: "Campinas",
    state: "SP",
    status: "aberto",
    currentBid: 52000,
    startingBid: 45000,
    minIncrement: 1000,
    bidCount: 11,
    deadlineIso: hours(18),
    antiSniping: true,
    specs: [
      { label: "Potência", value: "150 kVA" },
      { label: "Combustível", value: "Diesel" },
      { label: "Horas de uso", value: "2.140 h" },
      { label: "Cabine", value: "Acústica" },
      { label: "Ano de fabricação", value: "2020" },
    ],
    condition:
      "Utilizado como backup industrial. Testado mensalmente conforme rotina de manutenção preventiva.",
    description:
      "Gerador de backup substituído por unidade de maior potência no plano de expansão da planta.",
    documents: ["Ficha de manutenção preventiva", "Nota fiscal de compra"],
    pickup:
      "Retirada por conta do comprador, em Campinas/SP. Necessário transporte com capacidade adequada.",
    gallery: 5,
  },
  {
    id: "a10",
    lot: "LT-1130",
    slug: "colheitadeira-2017",
    title: "Colheitadeira, plataforma 20 pés",
    category: "maquinas",
    companySlug: "agroverde-maquinas",
    city: "Ribeirão Preto",
    state: "SP",
    status: "cancelado",
    currentBid: null,
    startingBid: 320000,
    minIncrement: 5000,
    bidCount: 0,
    deadlineIso: hours(-5),
    antiSniping: true,
    specs: [
      { label: "Ano de fabricação", value: "2017" },
      { label: "Plataforma", value: "20 pés" },
      { label: "Horas de uso", value: "4.900 h" },
    ],
    condition: "Leilão cancelado pelo vendedor antes do início dos lances.",
    description:
      "Leilão cancelado pelo vendedor. Equipamento pode ser republicado futuramente.",
    documents: [],
    pickup: "Não aplicável. Leilão cancelado.",
    gallery: 2,
  },
  {
    id: "a11",
    lot: "LT-1146",
    slug: "furgao-refrigerado-2021",
    title: "Furgão refrigerado, câmara isotérmica",
    category: "veiculos",
    companySlug: "transnorte-logistica",
    city: "São Paulo",
    state: "SP",
    status: "aberto",
    currentBid: 61500,
    startingBid: 52000,
    minIncrement: 1500,
    bidCount: 16,
    deadlineIso: hours(2),
    antiSniping: true,
    specs: [
      { label: "Ano/modelo", value: "2021/2021" },
      { label: "Câmara", value: "Isotérmica com unidade refrigerada" },
      { label: "Quilometragem", value: "67.000 km" },
      {
        label: "Temperatura de operação",
        value: "-2°C a 8°C declarado pelo vendedor",
      },
    ],
    condition:
      "Unidade de refrigeração com manutenção registrada a cada 90 dias. Sem vazamentos aparentes.",
    description:
      "Veículo de distribuição de produtos refrigerados, substituído por renovação de contrato.",
    documents: [
      "CRLV atualizado",
      "Histórico de manutenção da unidade refrigerada",
    ],
    pickup: "Retirada por conta do comprador, em São Paulo/SP.",
    gallery: 5,
  },
  {
    id: "a12",
    lot: "LT-1152",
    slug: "notebooks-corporativos-lote-15",
    title: "Lote de 15 notebooks corporativos",
    category: "tecnologia",
    companySlug: "novadata-tecnologia",
    city: "Curitiba",
    state: "PR",
    status: "aberto",
    currentBid: 9800,
    startingBid: 7000,
    minIncrement: 200,
    bidCount: 13,
    deadlineIso: hours(9),
    antiSniping: true,
    specs: [
      { label: "Quantidade", value: "15 unidades" },
      { label: "Processador", value: "Intel Core i5/i7, 10ª geração" },
      { label: "Memória", value: "16 GB por unidade" },
      { label: "Armazenamento", value: "SSD 256 GB, dados apagados" },
    ],
    condition:
      "Notebooks corporativos com marcas de uso normal. Baterias com autonomia reduzida em parte do lote.",
    description:
      "Lote substituído em renovação de parque de notebooks corporativos.",
    documents: ["Relatório de apagamento seguro de dados"],
    pickup: "Retirada por conta do comprador, em Curitiba/PR.",
    gallery: 4,
  },
];

export function getAssetBySlug(slug: string): Asset | undefined {
  return ASSETS.find((asset) => asset.slug === slug);
}

export function getCompanyBySlug(slug: string): Company | undefined {
  return COMPANIES.find((company) => company.slug === slug);
}

export function getAssetsByCompany(companySlug: string): Asset[] {
  return ASSETS.filter((asset) => asset.companySlug === companySlug);
}

export function getClosingSoon(limit = 4): Asset[] {
  return ASSETS.filter(
    (a) => a.status === "aberto" || a.status === "encerrando",
  )
    .slice()
    .sort(
      (a, b) =>
        new Date(a.deadlineIso).getTime() - new Date(b.deadlineIso).getTime(),
    )
    .slice(0, limit);
}

export function getNewest(limit = 4): Asset[] {
  return ASSETS.filter(
    (a) => a.status === "aberto" || a.status === "agendado",
  ).slice(0, limit);
}
