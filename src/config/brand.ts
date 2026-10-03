// src/config/brand.ts — dados da KT Sistemas (empresa que vende o sistema)

export const COMPANY = {
    name: "KT Sistemas",
    tagline: "Gestão completa para lojas de celular e assistência técnica",
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

export const PLAN_FEATURES = [
    "Vendas com PIX, cartão, dinheiro, múltiplos e fiado",
    "Estoque com alerta de reposição e código de barras",
    "Controle de fiado com cobrança por WhatsApp",
    "Ordens de serviço da assistência técnica",
    "Abertura e fechamento de caixa com PDF",
    "Dashboard e relatórios por período",
    "Sua logo e o nome da sua loja no sistema",
    "Funciona no computador e no celular",
];

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

/** Sistemas que já estão no ar (seção "Projetos" do site). Imagens em public/portfolio. */
export interface PortfolioItem {
    name: string;
    category: string;
    description: string;
    image: string;
    url?: string;
}

export const PORTFOLIO: PortfolioItem[] = [
    {
        name: "Solucell Gávea",
        category: "Loja de celular e assistência técnica",
        description: "Painel completo da loja: vendas, estoque, fiado, manutenções, fechamento de caixa, etiquetas e relatórios.",
        image: "portfolio/solucell-gavea.jpg",
    },
    {
        name: "Cabanas Bambu Cristal",
        category: "Hospedagem e turismo",
        description: "Site de hospedagem com vídeo, calendário de disponibilidade, cálculo da estadia, pré-reserva pelo WhatsApp e painel da proprietária.",
        image: "portfolio/cabanas-bambu-cristal.jpg",
        url: "https://cabanas-bambu-cristal.vercel.app",
    },
];

export const planById = (id?: string | null) => PLANS.find(p => p.id === id);

export const whatsappLink = (message: string) =>
    `https://wa.me/${COMPANY.whatsapp}?text=${encodeURIComponent(message)}`;

export const mailtoLink = (subject: string, body: string) =>
    `mailto:${COMPANY.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
