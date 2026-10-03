// src/config/brand.ts — dados da KT Sistemas (empresa que vende o sistema)

export const COMPANY = {
    name: "KT Sistemas",
    tagline: "Sites, sistemas e aplicativos sob medida para o seu negócio",
    whatsapp: "5531983892948", // com DDI 55
    whatsappDisplay: "(31) 98389-2948",
    email: "katlenduarte.dev@gmail.com",
};

export type PlanId = "mensal" | "anual" | "vitalicio";

export interface Plan {
    id: PlanId;
    name: string;
    price: number;
    period: string;
    description: string;
    highlight?: string;
    durationDays: number | null; // null = sem vencimento
}

export const PLANS: Plan[] = [
    { id: "mensal", name: "Mensal", price: 79.9, period: "/mês", description: "Ideal para começar sem compromisso.", durationDays: 31 },
    { id: "anual", name: "Anual", price: 799.9, period: "/ano", description: "2 meses grátis em relação ao mensal.", highlight: "Mais escolhido", durationDays: 366 },
    { id: "vitalicio", name: "Vitalício", price: 1999.9, period: "pagamento único", description: "Pague uma vez e use para sempre.", durationDays: null },
];

/** O que vem nos planos dos sistemas prontos (assistência técnica, salão, barbearia, tabacaria…). */
export const PLAN_FEATURES = [
    "Sistema pronto para o seu segmento",
    "Vendas, clientes, estoque e caixa num só lugar",
    "Dashboard e relatórios por período",
    "Sua logo, seu nome e suas cores no sistema",
    "Funciona no computador, tablet e celular",
    "Dados na nuvem com backup e segurança",
    "Atualizações incluídas",
    "Suporte humano pelo WhatsApp",
];

/** Segmentos que já têm sistema pronto (usados nos planos). */
export const SEGMENTS = ["Assistência técnica", "Loja de celular", "Salão de beleza", "Barbearia", "Tabacaria", "Loja de roupas", "Hospedagem", "Comércio em geral"];

/** Plano sob medida: sistema exclusivo, contratado pelo WhatsApp (não entra no cadastro automático). */
export const CUSTOM_PLAN = {
    name: "Sob medida",
    price: 2999.9,
    period: "projeto",
    description: "Um sistema feito exclusivamente para o seu negócio, com todas as funcionalidades que você precisar.",
    features: [
        "Levantamento do seu processo e das suas necessidades",
        "Telas, relatórios e funcionalidades sob medida",
        "Sua marca, suas cores e seu domínio",
        "Site, painel administrativo e acesso pelo celular",
        "Integrações (WhatsApp, pagamentos, planilhas…)",
        "Treinamento e suporte na implantação",
    ],
};

/** Projetos que já estão rodando (seção "Projetos"). Só imagens e detalhes, sem link para o sistema.
 *  Para adicionar um projeto: coloque as imagens em public/portfolio e acrescente um item nesta lista. */
export interface PortfolioItem {
    id: string;
    name: string;
    category: string;
    summary: string; // texto curto do card
    details: string; // texto completo (janela de detalhes)
    highlights: string[]; // principais funcionalidades
    images: string[]; // a 1ª é a capa
}

export const PORTFOLIO: PortfolioItem[] = [
    {
        id: "solucell-gavea",
        name: "Solucell Gávea",
        category: "Sistema de gestão · Loja de celular e assistência técnica",
        summary: "Painel completo da loja: vendas, estoque, fiado, manutenções, fechamento de caixa e relatórios.",
        details:
            "Sistema web feito para o dia a dia de uma loja de celulares com assistência técnica. O balcão registra vendas com vários meios de pagamento, o estoque é atualizado sozinho, o fiado fica organizado com cobrança pelo WhatsApp e cada aparelho em manutenção tem sua ordem de serviço. No fim do dia, o fechamento de caixa mostra exatamente o que entrou.",
        highlights: [
            "Vendas com PIX, cartão, dinheiro, pagamento dividido e fiado",
            "Estoque com alerta de reposição e etiquetas com código de barras",
            "Ordens de serviço da assistência técnica",
            "Fechamento de caixa e relatórios em PDF",
            "Dashboard com faturamento, ticket médio e mais vendidos",
            "Funciona no computador e no celular",
        ],
        images: ["portfolio/solucell-gavea.jpg"],
    },
    {
        id: "cabanas-bambu-cristal",
        name: "Cabanas Bambu Cristal",
        category: "Site + sistema de reservas · Hospedagem",
        summary: "Site de hospedagem com vídeo em tela cheia, calendário de disponibilidade e pré-reserva pelo WhatsApp.",
        details:
            "Site premium para uma hospedagem de cabanas, com cada acomodação apresentada como uma experiência própria. O visitante vê as datas livres, o valor de cada noite e o total da estadia, e envia a pré-reserva pronta pelo WhatsApp. A proprietária administra tudo por um painel: fotos, vídeos, preços, feriados, calendário e pedidos.",
        highlights: [
            "Vídeo em tela cheia na abertura e galerias com fotos e vídeos",
            "Calendário de disponibilidade por cabana",
            "Cálculo automático da estadia (semana, fim de semana, feriados)",
            "Pré-reserva com prévia da mensagem no WhatsApp",
            "Painel da proprietária com dashboard e calendário",
            "Prioridade total para o celular",
        ],
        images: ["portfolio/cabanas-bambu-cristal.jpg"],
    },
];

export const planById = (id?: string | null) => PLANS.find(p => p.id === id);

export const whatsappLink = (message: string) =>
    `https://wa.me/${COMPANY.whatsapp}?text=${encodeURIComponent(message)}`;

export const mailtoLink = (subject: string, body: string) =>
    `mailto:${COMPANY.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
