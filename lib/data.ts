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
  maquinas: "Máquinas e equipamentos",
  veiculos: "Veículos e frota",
  tecnologia: "Tecnologia e TI",
  mobiliario: "Mobiliário corporativo",
};

/** Rótulo curto, para barras de navegação e trilhas. */
export const CATEGORY_SHORT: Record<Category, string> = {
  maquinas: "Máquinas",
  veiculos: "Veículos",
  tecnologia: "Tecnologia",
  mobiliario: "Mobiliário",
};

export interface Subcategory {
  slug: string;
  label: string;
}

/** Taxonomia do catálogo. Nem toda subcategoria tem lote publicado. */
export const SUBCATEGORIES: Record<Category, Subcategory[]> = {
  maquinas: [
    { slug: "movimentacao", label: "Movimentação e elevação" },
    { slug: "geracao", label: "Geração e energia" },
    { slug: "agricolas", label: "Máquinas agrícolas" },
    { slug: "usinagem", label: "Usinagem e metalurgia" },
    { slug: "compressores", label: "Compressores e bombas" },
    { slug: "embalagem", label: "Embalagem e envase" },
  ],
  veiculos: [
    { slug: "utilitarios", label: "Utilitários e furgões" },
    { slug: "refrigerados", label: "Transporte refrigerado" },
    { slug: "caminhoes", label: "Caminhões e cavalos mecânicos" },
    { slug: "implementos", label: "Implementos rodoviários" },
    { slug: "passeio", label: "Veículos de passeio" },
  ],
  tecnologia: [
    { slug: "servidores", label: "Servidores e datacenter" },
    { slug: "estacoes", label: "Estações de trabalho" },
    { slug: "notebooks", label: "Notebooks corporativos" },
    { slug: "redes", label: "Redes e conectividade" },
    { slug: "impressao", label: "Impressão e digitalização" },
  ],
  mobiliario: [
    { slug: "reuniao", label: "Salas de reunião" },
    { slug: "assentos", label: "Cadeiras e assentos" },
    { slug: "estacoes-trabalho", label: "Estações e bancadas" },
    { slug: "armazenagem", label: "Armazenagem e arquivo" },
  ],
};

const SUBCATEGORY_INDEX = new Map(
  (Object.entries(SUBCATEGORIES) as [Category, Subcategory[]][]).flatMap(
    ([category, list]) =>
      list.map((sub) => [`${category}/${sub.slug}`, sub] as const),
  ),
);

export function getSubcategoryLabel(
  category: Category,
  slug: string,
): string | undefined {
  return SUBCATEGORY_INDEX.get(`${category}/${slug}`)?.label;
}

/** Nome por extenso das UFs presentes no catálogo, para rótulos de navegação. */
export const STATE_NAMES: Record<string, string> = {
  BA: "Bahia",
  ES: "Espírito Santo",
  GO: "Goiás",
  MG: "Minas Gerais",
  PE: "Pernambuco",
  PR: "Paraná",
  RJ: "Rio de Janeiro",
  RS: "Rio Grande do Sul",
  SC: "Santa Catarina",
  SP: "São Paulo",
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

/**
 * Leilão recebe lances até o prazo; venda direta tem preço fixo e fica
 * disponível até a data indicada, sem disputa.
 */
export type Modalidade = "leilao" | "venda_direta";

export const MODALIDADE_LABELS: Record<Modalidade, string> = {
  leilao: "Em leilão",
  venda_direta: "Venda direta",
};

export interface Asset {
  id: string;
  /** Ausente = leilão, o formato padrão do catálogo. */
  modalidade?: Modalidade;
  /** Código público do lote, exibido no card, no detalhe e no painel de lance. */
  lot: string;
  slug: string;
  title: string;
  category: Category;
  subcategory: string;
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
  {
    slug: "siderpampa-metalurgia",
    name: "Siderpampa Metalurgia S.A.",
    city: "Caxias do Sul",
    state: "RS",
    segment: "Caldeiraria e estruturas metálicas",
    since: "2003",
    description:
      "Caldeiraria pesada e estruturas metálicas sob encomenda. Publica equipamentos de apoio substituídos em modernizações de planta.",
  },
  {
    slug: "vale-frios-logistica",
    name: "Vale Frios Logística Ltda.",
    city: "Contagem",
    state: "MG",
    segment: "Transporte frigorificado",
    since: "2012",
    description:
      "Transportadora de carga refrigerada entre centros de distribuição. Renova o conjunto trator da frota em ciclos de cinco anos.",
  },
  {
    slug: "portomar-industria",
    name: "Portomar Indústria e Comércio",
    city: "Vitória",
    state: "ES",
    segment: "Movimentação e apoio portuário",
    since: "2008",
    description:
      "Operação de pátio e apoio a terminais portuários. Disponibiliza equipamentos de movimentação ao fim do contrato de operação.",
  },
  {
    slug: "cerrado-agroindustrial",
    name: "Cerrado Agroindustrial S.A.",
    city: "Rio Verde",
    state: "GO",
    segment: "Agroindústria e processamento",
    since: "2010",
    description:
      "Processamento de grãos e cana. Substitui maquinário de colheita e geração conforme o plano plurianual de investimento.",
  },
  {
    slug: "atlantico-textil",
    name: "Atlântico Têxtil Ltda.",
    city: "Recife",
    state: "PE",
    segment: "Indústria têxtil",
    since: "2006",
    description:
      "Fiação e confecção para marcas próprias. Publica mobiliário e bancadas de unidades administrativas reorganizadas.",
  },
  {
    slug: "sulmetal-usinagem",
    name: "Sulmetal Usinagem de Precisão",
    city: "Joinville",
    state: "SC",
    segment: "Usinagem de precisão",
    since: "2015",
    description:
      "Usinagem CNC para autopeças e bens de capital. Renova o parque de máquinas-ferramenta conforme a carteira de contratos.",
  },
  {
    slug: "riograph-editorial",
    name: "Riograph Editorial S.A.",
    city: "Rio de Janeiro",
    state: "RJ",
    segment: "Gráfica e editorial",
    since: "1998",
    description:
      "Impressão comercial e editorial. Migra o parque para produção digital e disponibiliza equipamentos do fluxo anterior.",
  },
  {
    slug: "bahiaplast-embalagens",
    name: "Bahiaplast Embalagens Ltda.",
    city: "Camaçari",
    state: "BA",
    segment: "Embalagens plásticas",
    since: "2013",
    description:
      "Extrusão e envase de embalagens plásticas. Publica linhas desativadas após a consolidação de duas unidades fabris.",
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
    subcategory: "movimentacao",
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
    subcategory: "utilitarios",
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
    subcategory: "reuniao",
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
    subcategory: "servidores",
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
    subcategory: "agricolas",
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
    subcategory: "utilitarios",
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
    subcategory: "estacoes",
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
    subcategory: "assentos",
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
    subcategory: "geracao",
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
    subcategory: "agricolas",
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
    subcategory: "refrigerados",
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
    subcategory: "notebooks",
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
  {
    id: "a13",
    subcategory: "usinagem",
    lot: "LT-1161",
    slug: "torno-cnc-2018",
    title: "Torno CNC horizontal, curso 1.000 mm",
    category: "maquinas",
    companySlug: "sulmetal-usinagem",
    city: "Joinville",
    state: "SC",
    status: "aberto",
    currentBid: 186000,
    startingBid: 150000,
    minIncrement: 2000,
    bidCount: 19,
    deadlineIso: hours(9),
    antiSniping: true,
    specs: [
      { label: "Ano de fabricação", value: "2018" },
      { label: "Curso entre pontas", value: "1.000 mm" },
      { label: "Comando", value: "CNC de 2 eixos" },
      { label: "Horas de fuso", value: "11.400 h" },
    ],
    condition:
      "Máquina em produção até a semana da publicação. Guias e barramento sem sulco aparente; última calibração registrada há seis meses.",
    description:
      "Torno CNC usado em séries de autopeças. Acompanha castanhas, placa de três castanhas e manual do comando. Programas da operação anterior não são transferidos.",
    documents: ["Nota fiscal de compra", "Laudo de calibração", "Histórico de manutenção (24 meses)"],
    pickup:
      "Retirada por conta do comprador, em Joinville/SC, com rigger contratado pelo comprador.",
    gallery: 8,
  },
  {
    id: "a14",
    subcategory: "usinagem",
    lot: "LT-1164",
    slug: "centro-usinagem-vertical",
    title: "Centro de usinagem vertical, 3 eixos",
    category: "maquinas",
    companySlug: "sulmetal-usinagem",
    city: "Joinville",
    state: "SC",
    status: "encerrando",
    currentBid: 242000,
    startingBid: 205000,
    minIncrement: 2500,
    bidCount: 27,
    deadlineIso: hours(2),
    antiSniping: true,
    specs: [
      { label: "Ano de fabricação", value: "2019" },
      { label: "Cursos X/Y/Z", value: "800 / 500 / 500 mm" },
      { label: "Magazine de ferramentas", value: "20 posições" },
      { label: "Rotação máxima", value: "12.000 rpm" },
    ],
    condition:
      "Equipamento sob contrato de manutenção preventiva contínuo. Refrigeração e sistema de cavacos revisados no último trimestre.",
    description:
      "Centro de usinagem de três eixos com magazine automático. Liberado para inspeção presencial mediante agendamento com a empresa vendedora.",
    documents: ["Nota fiscal de compra", "Contrato de manutenção", "Laudo de calibração"],
    pickup:
      "Retirada por conta do comprador, em Joinville/SC, em até 15 dias úteis após o fechamento.",
    gallery: 10,
  },
  {
    id: "a15",
    subcategory: "compressores",
    lot: "LT-1168",
    slug: "compressor-parafuso-75cv",
    title: "Compressor de ar tipo parafuso, 75 cv",
    category: "maquinas",
    companySlug: "siderpampa-metalurgia",
    city: "Caxias do Sul",
    state: "RS",
    status: "aberto",
    currentBid: 41500,
    startingBid: 34000,
    minIncrement: 1000,
    bidCount: 11,
    deadlineIso: hours(16),
    antiSniping: true,
    specs: [
      { label: "Ano de fabricação", value: "2017" },
      { label: "Potência", value: "75 cv" },
      { label: "Vazão declarada", value: "10,5 m³/min" },
      { label: "Horas de operação", value: "23.800 h" },
    ],
    condition:
      "Unidade retirada de operação na modernização da central de ar comprimido. Elemento compressor com revisão registrada há 3.000 horas.",
    description:
      "Compressor de parafuso rotativo com secador acoplado. Painel eletrônico funcional; reservatório e tubulação não acompanham o lote.",
    documents: ["Nota fiscal de compra", "Relatório de análise de óleo"],
    pickup:
      "Retirada por conta do comprador, em Caxias do Sul/RS, em até 10 dias úteis após o fechamento.",
    gallery: 6,
  },
  {
    id: "a16",
    modalidade: "venda_direta",
    subcategory: "compressores",
    lot: "LT-1172",
    slug: "bombas-centrifugas-lote-4",
    title: "Lote de 4 bombas centrífugas industriais",
    category: "maquinas",
    companySlug: "portomar-industria",
    city: "Vitória",
    state: "ES",
    status: "aberto",
    currentBid: null,
    startingBid: 18500,
    minIncrement: 500,
    bidCount: 0,
    deadlineIso: days(4),
    antiSniping: true,
    specs: [
      { label: "Quantidade", value: "4 unidades" },
      { label: "Vazão nominal", value: "120 m³/h cada" },
      { label: "Material do rotor", value: "Aço inoxidável" },
      { label: "Ano de aquisição", value: "2016 a 2019" },
    ],
    condition:
      "Duas unidades em condição operacional declarada e duas para recondicionamento, identificadas individualmente no laudo que acompanha o lote.",
    description:
      "Lote de bombas centrífugas de apoio a terminal portuário. Vendidas em conjunto, sem possibilidade de aquisição avulsa.",
    documents: ["Laudo de condição por unidade", "Nota fiscal de compra"],
    pickup:
      "Retirada por conta do comprador, em Vitória/ES, em até 10 dias úteis após o fechamento.",
    gallery: 5,
  },
  {
    id: "a17",
    subcategory: "embalagem",
    lot: "LT-1175",
    slug: "envasadora-automatica",
    title: "Envasadora automática, 60 frascos/min",
    category: "maquinas",
    companySlug: "bahiaplast-embalagens",
    city: "Camaçari",
    state: "BA",
    status: "aberto",
    currentBid: 97000,
    startingBid: 78000,
    minIncrement: 1500,
    bidCount: 16,
    deadlineIso: days(2),
    antiSniping: true,
    specs: [
      { label: "Ano de fabricação", value: "2018" },
      { label: "Capacidade", value: "60 frascos por minuto" },
      { label: "Bicos dosadores", value: "8" },
      { label: "Faixa de volume", value: "100 ml a 1 L" },
    ],
    condition:
      "Linha desativada na consolidação de duas unidades fabris. Conjunto completo, com esteira de entrada e painel de comando.",
    description:
      "Envasadora linear para produtos líquidos, com dosagem volumétrica. Formatos de bico adicionais não integram o lote.",
    documents: ["Nota fiscal de compra", "Manual do fabricante", "Histórico de manutenção (18 meses)"],
    pickup:
      "Retirada por conta do comprador, em Camaçari/BA, com desmontagem por conta do comprador.",
    gallery: 7,
  },
  {
    id: "a18",
    subcategory: "embalagem",
    lot: "LT-1178",
    slug: "seladora-bandejas",
    title: "Seladora de bandejas com atmosfera modificada",
    category: "maquinas",
    companySlug: "bahiaplast-embalagens",
    city: "Camaçari",
    state: "BA",
    status: "agendado",
    currentBid: null,
    startingBid: 45000,
    minIncrement: 1000,
    bidCount: 0,
    deadlineIso: days(6),
    antiSniping: true,
    specs: [
      { label: "Ano de fabricação", value: "2020" },
      { label: "Formato de bandeja", value: "Até 4 cavidades" },
      { label: "Ciclo", value: "12 bandejas por minuto" },
      { label: "Injeção de gás", value: "Sim" },
    ],
    condition:
      "Equipamento com menos de dois anos de uso efetivo, mantido em área climatizada desde a desativação da linha.",
    description:
      "Seladora de bandejas para alimentos, com injeção de atmosfera modificada. Abertura de lances programada para a data indicada.",
    documents: ["Nota fiscal de compra", "Certificado de conformidade sanitária"],
    pickup:
      "Retirada por conta do comprador, em Camaçari/BA, em até 10 dias úteis após o fechamento.",
    gallery: 6,
  },
  {
    id: "a19",
    subcategory: "caminhoes",
    lot: "LT-1181",
    slug: "caminhao-bau-3-4",
    title: "Caminhão 3/4 com baú refrigerado",
    category: "veiculos",
    companySlug: "vale-frios-logistica",
    city: "Contagem",
    state: "MG",
    status: "encerrando",
    currentBid: 118000,
    startingBid: 96000,
    minIncrement: 2000,
    bidCount: 23,
    deadlineIso: hours(5),
    antiSniping: true,
    specs: [
      { label: "Ano/modelo", value: "2020/2021" },
      { label: "Quilometragem", value: "214.300 km" },
      { label: "Motor", value: "3.0 turbodiesel" },
      { label: "Baú", value: "Refrigerado, 5,2 m" },
    ],
    condition:
      "Veículo de frota própria com manutenção em concessionária. Conjunto de refrigeração com laudo de estanqueidade vigente.",
    description:
      "Caminhão leve de distribuição urbana refrigerada. Documentação em dia, sem restrição financeira declarada pelo vendedor.",
    documents: ["CRLV", "Laudo de estanqueidade", "Histórico de manutenção (36 meses)"],
    pickup:
      "Retirada por conta do comprador, em Contagem/MG, após transferência do registro.",
    gallery: 9,
  },
  {
    id: "a20",
    subcategory: "caminhoes",
    lot: "LT-1184",
    slug: "cavalo-mecanico-6x2",
    title: "Cavalo mecânico 6x2, cabine leito",
    category: "veiculos",
    companySlug: "vale-frios-logistica",
    city: "Contagem",
    state: "MG",
    status: "aberto",
    currentBid: 243000,
    startingBid: 198000,
    minIncrement: 3000,
    bidCount: 21,
    deadlineIso: days(3),
    antiSniping: true,
    specs: [
      { label: "Ano/modelo", value: "2019/2019" },
      { label: "Quilometragem", value: "612.800 km" },
      { label: "Potência", value: "460 cv" },
      { label: "Configuração", value: "6x2, cabine leito" },
    ],
    condition:
      "Terceiro ciclo de renovação da frota. Motor e câmbio sem intervenção maior registrada; pneus de tração com meia vida.",
    description:
      "Conjunto trator para transporte rodoviário de longa distância. Semirreboque não acompanha o lote.",
    documents: ["CRLV", "Histórico de manutenção (60 meses)", "Relatório de telemetria"],
    pickup:
      "Retirada por conta do comprador, em Contagem/MG, após transferência do registro.",
    gallery: 10,
  },
  {
    id: "a21",
    subcategory: "implementos",
    lot: "LT-1187",
    slug: "carreta-sider-3-eixos",
    title: "Carreta sider, 3 eixos",
    category: "veiculos",
    companySlug: "vale-frios-logistica",
    city: "Contagem",
    state: "MG",
    status: "aberto",
    currentBid: null,
    startingBid: 72000,
    minIncrement: 1500,
    bidCount: 4,
    deadlineIso: days(5),
    antiSniping: true,
    specs: [
      { label: "Ano de fabricação", value: "2018" },
      { label: "Eixos", value: "3, suspensão pneumática" },
      { label: "Capacidade", value: "27 toneladas" },
      { label: "Lona", value: "Substituída em 2024" },
    ],
    condition:
      "Chassi sem indício de trinca no laudo apresentado. Sistema pneumático revisado na última inspeção anual.",
    description:
      "Semirreboque sider para carga paletizada. Vendido sem cavalo mecânico.",
    documents: ["CRLV", "Laudo de inspeção veicular"],
    pickup:
      "Retirada por conta do comprador, em Contagem/MG, após transferência do registro.",
    gallery: 6,
  },
  {
    id: "a22",
    modalidade: "venda_direta",
    subcategory: "passeio",
    lot: "LT-1190",
    slug: "sedans-executivos-lote-5",
    title: "Lote de 5 sedans executivos",
    category: "veiculos",
    companySlug: "riograph-editorial",
    city: "Rio de Janeiro",
    state: "RJ",
    status: "aberto",
    currentBid: null,
    startingBid: 164000,
    minIncrement: 2000,
    bidCount: 0,
    deadlineIso: days(7),
    antiSniping: true,
    specs: [
      { label: "Quantidade", value: "5 unidades" },
      { label: "Ano/modelo", value: "2021/2022" },
      { label: "Quilometragem média", value: "78.400 km" },
      { label: "Motor", value: "1.5 turbo flex" },
    ],
    condition:
      "Frota executiva com revisões em rede autorizada. Quilometragem individual detalhada no laudo do lote.",
    description:
      "Lote de veículos de representação, vendidos em conjunto. Quatro unidades na cor prata e uma na cor preta.",
    documents: ["CRLV de cada unidade", "Histórico de revisões"],
    pickup:
      "Retirada por conta do comprador, no Rio de Janeiro/RJ, após transferência dos registros.",
    gallery: 8,
  },
  {
    id: "a23",
    subcategory: "redes",
    lot: "LT-1193",
    slug: "switches-48p-lote-12",
    title: "Lote de 12 switches gerenciáveis 48 portas",
    category: "tecnologia",
    companySlug: "novadata-tecnologia",
    city: "Curitiba",
    state: "PR",
    status: "aberto",
    currentBid: 23400,
    startingBid: 17000,
    minIncrement: 500,
    bidCount: 13,
    deadlineIso: days(2),
    antiSniping: true,
    specs: [
      { label: "Quantidade", value: "12 unidades" },
      { label: "Portas", value: "48 Gigabit + 4 SFP+" },
      { label: "Ano de aquisição", value: "2019" },
      { label: "Fonte redundante", value: "Sim, em 8 unidades" },
    ],
    condition:
      "Equipamentos retirados na migração do datacenter. Todos testados e com configuração de fábrica restaurada.",
    description:
      "Lote de switches gerenciáveis de camada 3. Licenças de software do fabricante não são transferidas com o lote.",
    documents: ["Nota fiscal de compra", "Relatório de teste por unidade", "Relatório de apagamento de configuração"],
    pickup:
      "Retirada por conta do comprador, em Curitiba/PR, em até 10 dias úteis após o fechamento.",
    gallery: 5,
  },
  {
    id: "a24",
    subcategory: "impressao",
    lot: "LT-1196",
    slug: "impressora-producao-a3",
    title: "Impressora de produção A3 colorida",
    category: "tecnologia",
    companySlug: "riograph-editorial",
    city: "Rio de Janeiro",
    state: "RJ",
    status: "aberto",
    currentBid: 68000,
    startingBid: 52000,
    minIncrement: 1000,
    bidCount: 15,
    deadlineIso: hours(20),
    antiSniping: true,
    specs: [
      { label: "Ano de fabricação", value: "2019" },
      { label: "Velocidade", value: "80 páginas por minuto" },
      { label: "Contador", value: "4,2 milhões de páginas" },
      { label: "Acabamento", value: "Grampeador e dobra" },
    ],
    condition:
      "Equipamento sob contrato de assistência até a data da publicação. Cilindros e unidade de fusão substituídos em 2025.",
    description:
      "Impressora de produção para tiragens curtas, com módulo de acabamento acoplado. Consumíveis em estoque não acompanham o lote.",
    documents: ["Nota fiscal de compra", "Relatório de contador", "Contrato de assistência encerrado"],
    pickup:
      "Retirada por conta do comprador, no Rio de Janeiro/RJ, com transporte especializado.",
    gallery: 7,
  },
  {
    id: "a25",
    subcategory: "impressao",
    lot: "LT-1199",
    slug: "guilhotina-grafica",
    title: "Guilhotina gráfica programável, 115 cm",
    category: "tecnologia",
    companySlug: "riograph-editorial",
    city: "Rio de Janeiro",
    state: "RJ",
    status: "encerrado_vencedor",
    currentBid: 54000,
    startingBid: 38000,
    minIncrement: 1000,
    bidCount: 18,
    deadlineIso: days(-2),
    antiSniping: true,
    specs: [
      { label: "Ano de fabricação", value: "2015" },
      { label: "Largura de corte", value: "1.150 mm" },
      { label: "Programas", value: "99 posições" },
      { label: "Dispositivo de segurança", value: "Cortina óptica" },
    ],
    condition:
      "Equipamento com manutenção preventiva semestral. Lâmina substituída três meses antes da publicação.",
    description:
      "Guilhotina programável para acabamento gráfico. Lote encerrado com vencedor; exibido no catálogo como histórico de resultado.",
    documents: ["Nota fiscal de compra", "Certificado NR-12"],
    pickup:
      "Retirada por conta do comprador, no Rio de Janeiro/RJ, em até 10 dias úteis após o fechamento.",
    gallery: 5,
  },
  {
    id: "a26",
    modalidade: "venda_direta",
    subcategory: "assentos",
    lot: "LT-1202",
    slug: "cadeiras-operacionais-lote-40",
    title: "Lote de 40 cadeiras operacionais",
    category: "mobiliario",
    companySlug: "atlantico-textil",
    city: "Recife",
    state: "PE",
    status: "aberto",
    currentBid: null,
    startingBid: 9600,
    minIncrement: 300,
    bidCount: 0,
    deadlineIso: days(4),
    antiSniping: true,
    specs: [
      { label: "Quantidade", value: "40 unidades" },
      { label: "Regulagens", value: "Altura, encosto e apoio de braço" },
      { label: "Revestimento", value: "Tela respirável" },
      { label: "Ano de aquisição", value: "2021" },
    ],
    condition:
      "Mobiliário de unidade administrativa reorganizada. Trinta e duas unidades sem avaria; oito com desgaste de revestimento, identificadas no laudo.",
    description:
      "Lote de cadeiras operacionais giratórias, vendido em conjunto. Não há venda avulsa por unidade.",
    documents: ["Nota fiscal de compra", "Laudo de condição por unidade"],
    pickup:
      "Retirada por conta do comprador, em Recife/PE, em até 15 dias úteis após o fechamento.",
    gallery: 6,
  },
  {
    id: "a27",
    modalidade: "venda_direta",
    subcategory: "estacoes-trabalho",
    lot: "LT-1205",
    slug: "bancadas-tecnicas-lote-12",
    title: "Lote de 12 bancadas técnicas",
    category: "mobiliario",
    companySlug: "atlantico-textil",
    city: "Recife",
    state: "PE",
    status: "aberto",
    currentBid: null,
    startingBid: 14400,
    minIncrement: 400,
    bidCount: 0,
    deadlineIso: days(6),
    antiSniping: true,
    specs: [
      { label: "Quantidade", value: "12 unidades" },
      { label: "Dimensões", value: "2,00 × 0,80 m" },
      { label: "Tampo", value: "MDF laminado, 30 mm" },
      { label: "Estrutura", value: "Aço com régua elétrica" },
    ],
    condition:
      "Bancadas de laboratório de controle de qualidade, desmontadas e embaladas. Réguas elétricas testadas uma a uma.",
    description:
      "Lote de bancadas técnicas com estrutura metálica e passagem de cabos. Bancos e iluminação de apoio não acompanham.",
    documents: ["Nota fiscal de compra", "Relatório de teste elétrico"],
    pickup:
      "Retirada por conta do comprador, em Recife/PE, em até 15 dias úteis após o fechamento.",
    gallery: 5,
  },
  {
    id: "a28",
    modalidade: "venda_direta",
    subcategory: "armazenagem",
    lot: "LT-1208",
    slug: "porta-paletes-500-posicoes",
    title: "Sistema porta-paletes, 500 posições",
    category: "mobiliario",
    companySlug: "cerrado-agroindustrial",
    city: "Rio Verde",
    state: "GO",
    status: "aberto",
    currentBid: null,
    startingBid: 58000,
    minIncrement: 1500,
    bidCount: 0,
    deadlineIso: days(3),
    antiSniping: true,
    specs: [
      { label: "Posições de palete", value: "500" },
      { label: "Altura das colunas", value: "8 metros" },
      { label: "Capacidade por nível", value: "2.500 kg" },
      { label: "Ano de instalação", value: "2017" },
    ],
    condition:
      "Estrutura desmontada por empresa especializada e conferida peça a peça. Longarinas sem empeno registrado no laudo.",
    description:
      "Sistema de armazenagem porta-paletes seletivo, com longarinas, colunas e travessas. Projeto estrutural original acompanha o lote.",
    documents: ["Projeto estrutural", "Laudo de desmontagem", "ART do responsável técnico"],
    pickup:
      "Retirada por conta do comprador, em Rio Verde/GO, em até 20 dias úteis após o fechamento.",
    gallery: 6,
  },
  {
    id: "a29",
    subcategory: "agricolas",
    lot: "LT-1211",
    slug: "colhedora-de-cana-2016",
    title: "Colhedora de cana, esteira",
    category: "maquinas",
    companySlug: "cerrado-agroindustrial",
    city: "Rio Verde",
    state: "GO",
    status: "aberto",
    currentBid: 412000,
    startingBid: 340000,
    minIncrement: 5000,
    bidCount: 24,
    deadlineIso: days(2),
    antiSniping: true,
    specs: [
      { label: "Ano de fabricação", value: "2016" },
      { label: "Horas de motor", value: "12.900 h" },
      { label: "Potência", value: "355 cv" },
      { label: "Rodado", value: "Esteira" },
    ],
    condition:
      "Máquina de safra própria, com manutenção em oficina interna. Rolos picadores substituídos na última entressafra.",
    description:
      "Colhedora de cana de esteira, revisada ao fim da safra. Peças de reposição em estoque não integram o lote.",
    documents: ["Nota fiscal de compra", "Histórico de manutenção (48 meses)", "Relatório de horas"],
    pickup:
      "Retirada por conta do comprador, em Rio Verde/GO, com prancha contratada pelo comprador.",
    gallery: 9,
  },
  {
    id: "a30",
    subcategory: "geracao",
    lot: "LT-1214",
    slug: "gerador-250kva",
    title: "Grupo gerador diesel, 250 kVA",
    category: "maquinas",
    companySlug: "cerrado-agroindustrial",
    city: "Rio Verde",
    state: "GO",
    status: "aberto",
    currentBid: 76000,
    startingBid: 62000,
    minIncrement: 1500,
    bidCount: 12,
    deadlineIso: days(5),
    antiSniping: true,
    specs: [
      { label: "Ano de fabricação", value: "2018" },
      { label: "Potência", value: "250 kVA" },
      { label: "Horas de operação", value: "3.100 h" },
      { label: "Cabine", value: "Silenciada, 75 dB a 1,5 m" },
    ],
    condition:
      "Gerador de retaguarda acionado apenas em testes mensais e três ocorrências de queda de rede. Bateria substituída em 2025.",
    description:
      "Grupo gerador diesel cabinado, com quadro de transferência automática. Tanque externo não acompanha o lote.",
    documents: ["Nota fiscal de compra", "Relatório de ensaio de carga", "Histórico de partidas"],
    pickup:
      "Retirada por conta do comprador, em Rio Verde/GO, em até 10 dias úteis após o fechamento.",
    gallery: 7,
  },
  {
    id: "a31",
    modalidade: "venda_direta",
    subcategory: "movimentacao",
    lot: "LT-1217",
    slug: "ponte-rolante-10t",
    title: "Ponte rolante, capacidade 10 t",
    category: "maquinas",
    companySlug: "siderpampa-metalurgia",
    city: "Caxias do Sul",
    state: "RS",
    status: "aberto",
    currentBid: null,
    startingBid: 88000,
    minIncrement: 2000,
    bidCount: 0,
    deadlineIso: days(8),
    antiSniping: true,
    specs: [
      { label: "Capacidade", value: "10 toneladas" },
      { label: "Vão", value: "18 metros" },
      { label: "Ano de fabricação", value: "2014" },
      { label: "Comando", value: "Botoeira pendente" },
    ],
    condition:
      "Equipamento em operação até a desmontagem programada. Ensaio de carga anual em dia, com laudo emitido por engenheiro responsável.",
    description:
      "Ponte rolante birretrátil para galpão industrial. Viga de rolamento e trilhos não integram o lote.",
    documents: ["Laudo de ensaio de carga", "ART do responsável técnico", "Nota fiscal de compra"],
    pickup:
      "Retirada por conta do comprador, em Caxias do Sul/RS, com desmontagem por empresa especializada.",
    gallery: 8,
  },
  {
    id: "a32",
    subcategory: "movimentacao",
    lot: "LT-1220",
    slug: "empilhadeira-gas-3t",
    title: "Empilhadeira a gás, capacidade 3 t",
    category: "maquinas",
    companySlug: "portomar-industria",
    city: "Vitória",
    state: "ES",
    status: "encerrando",
    currentBid: 67000,
    startingBid: 54000,
    minIncrement: 1000,
    bidCount: 17,
    deadlineIso: hours(7),
    antiSniping: true,
    specs: [
      { label: "Ano de fabricação", value: "2020" },
      { label: "Capacidade", value: "3 toneladas" },
      { label: "Altura de elevação", value: "4,5 metros" },
      { label: "Horas de uso", value: "7.600 h" },
    ],
    condition:
      "Unidade de pátio portuário com manutenção terceirizada e registros completos. Pneus maciços substituídos em 2025.",
    description:
      "Empilhadeira a combustão movida a GLP, para operação externa. Cilindro de gás não acompanha o lote.",
    documents: ["Nota fiscal de compra", "Histórico de manutenção (24 meses)", "Checklist operacional"],
    pickup:
      "Retirada por conta do comprador, em Vitória/ES, em até 10 dias úteis após o fechamento.",
    gallery: 6,
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

/** UFs com lote disponível, da maior para a menor oferta. */
export function getStateCounts(): { uf: string; name: string; total: number }[] {
  const counts = new Map<string, number>();
  for (const asset of ASSETS) {
    if (asset.status === "cancelado") continue;
    counts.set(asset.state, (counts.get(asset.state) ?? 0) + 1);
  }
  return [...counts.entries()]
    .map(([uf, total]) => ({ uf, name: STATE_NAMES[uf] ?? uf, total }))
    .sort((a, b) => b.total - a.total || a.name.localeCompare(b.name, "pt-BR"));
}

export function modalidadeOf(asset: Asset): Modalidade {
  return asset.modalidade ?? "leilao";
}
