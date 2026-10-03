// src/screens/public/LandingPage.tsx — site da KT Sistemas (desenvolvimento de sites, sistemas e aplicativos)

import { useEffect, useState, type ReactNode } from "react";
import {
    Globe, LayoutTemplate, ShoppingBag, Smartphone, LayoutDashboard, CalendarClock, UtensilsCrossed, Bot,
    CreditCard, BedDouble, Wrench, Check, MessageCircle, Mail, ChevronDown, Menu, X, Sun, Moon, ArrowRight,
    Cloud, Headphones, Palette, Rocket, ClipboardList, Code2, LifeBuoy, Sparkles, ChevronLeft, ChevronRight,
    Send, type LucideIcon,
} from "lucide-react";
import { COMPANY, CUSTOM_PLAN, PLANS, PLAN_FEATURES, PORTFOLIO, SEGMENTS, whatsappLink, mailtoLink, type PortfolioItem } from "../../config/brand";
import { formatBRL } from "../../lib/format";
import { navigate } from "../../lib/router";
import { useTheme } from "../../contexts/ThemeContext";

/** Marca da KT Sistemas (cor fixa, não muda com o white label das lojas). */
export function KtLogo({ light = false, className = "" }: { light?: boolean; className?: string }) {
    return (
        <span className={`inline-flex items-center gap-2.5 ${className}`}>
            <span className="relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-[10px] bg-gradient-to-br from-[#4b6bdc] to-[#27397f] text-[13px] font-bold tracking-tight text-white shadow-sm ring-1 ring-inset ring-white/15">
                KT
                <span className="absolute bottom-1.5 right-1.5 h-1 w-1 rounded-full bg-[#b8c7f5]" />
            </span>
            <span className={`text-[17px] font-semibold tracking-tight ${light ? "text-white" : "text-fg"}`}>KT <span className="font-normal opacity-60">Sistemas</span></span>
        </span>
    );
}

/* ------------------------------------------------------------------ Conteúdo */

const SERVICES: { icon: LucideIcon; title: string; text: string }[] = [
    { icon: Globe, title: "Sites institucionais", text: "Site profissional para sua empresa aparecer no Google e passar confiança." },
    { icon: LayoutTemplate, title: "Landing pages", text: "Páginas de venda e captação focadas em transformar visitas em clientes." },
    { icon: ShoppingBag, title: "Lojas virtuais", text: "E-commerce completo com catálogo, carrinho, frete e pagamento online." },
    { icon: Smartphone, title: "Aplicativos", text: "Apps para Android e iPhone, ou web apps que funcionam como aplicativo." },
    { icon: LayoutDashboard, title: "Sistemas de gestão", text: "Vendas, estoque, financeiro, clientes e relatórios do jeito do seu negócio." },
    { icon: CalendarClock, title: "Agendamento online", text: "Agenda para salões, barbearias, clínicas e serviços, com lembretes." },
    { icon: BedDouble, title: "Reservas e hospedagem", text: "Calendário de disponibilidade, cálculo de diárias e pré-reserva." },
    { icon: UtensilsCrossed, title: "Cardápio digital e delivery", text: "Cardápio pelo celular com pedidos direto no WhatsApp." },
    { icon: Bot, title: "Automações e WhatsApp", text: "Mensagens automáticas, integrações e fim do trabalho repetitivo." },
    { icon: CreditCard, title: "Pagamentos online", text: "PIX, cartão e links de pagamento integrados ao seu sistema." },
    { icon: Palette, title: "Painéis administrativos", text: "Você mesmo atualiza textos, fotos, preços e produtos, sem depender de ninguém." },
    { icon: Wrench, title: "Manutenção e melhorias", text: "Correções, novas funções e evolução de sites e sistemas que você já tem." },
];

const STEPS: { icon: LucideIcon; title: string; text: string }[] = [
    { icon: MessageCircle, title: "Conversa", text: "Você conta a ideia pelo WhatsApp e entendemos o que o seu negócio precisa." },
    { icon: ClipboardList, title: "Orçamento", text: "Enviamos a proposta com o que será feito, prazo e investimento." },
    { icon: Code2, title: "Desenvolvimento", text: "Você acompanha prévias durante o projeto e pede ajustes." },
    { icon: Rocket, title: "Entrega e suporte", text: "Colocamos no ar, treinamos você e seguimos dando suporte." },
];

const FAQ = [
    { q: "Quanto custa um site ou sistema?", a: "Depende do que o projeto precisa. Os sistemas prontos começam em planos mensais e projetos sob medida a partir de " + formatBRL(CUSTOM_PLAN.price) + ". Clique em “Fazer orçamento”, conte sua ideia e enviamos uma proposta sem compromisso." },
    { q: "Quanto tempo leva para ficar pronto?", a: "Uma landing page costuma ficar pronta em poucos dias; sites, lojas e sistemas variam conforme o tamanho. O prazo combinado vai na proposta." },
    { q: "Funciona no celular?", a: "Sim. Tudo é feito pensando primeiro no celular e funciona também no computador e no tablet." },
    { q: "Vou conseguir atualizar sozinho?", a: "Sim. Quando faz sentido, o projeto vem com um painel para você mudar textos, fotos, preços e produtos sem precisar de programador." },
    { q: "Vocês cuidam da hospedagem e do domínio?", a: "Sim. Ajudamos a registrar o domínio (ex.: suaempresa.com.br) e colocamos o projeto no ar em uma hospedagem rápida e segura." },
    { q: "Têm sistema pronto para o meu segmento?", a: "Temos sistemas prontos para " + SEGMENTS.slice(0, 5).join(", ").toLowerCase() + " e outros — com a sua marca, nos planos mensal, anual ou vitalício." },
    { q: "E depois da entrega?", a: "Seguimos com suporte pelo WhatsApp e fazemos melhorias e novas funções sempre que você precisar." },
];

const TRUST: [LucideIcon, string, string][] = [
    [Sparkles, "Sob medida", "Feito para o seu negócio"],
    [Smartphone, "Mobile first", "Perfeito no celular"],
    [Cloud, "No ar com você", "Domínio e hospedagem"],
    [Headphones, "Suporte humano", "Direto pelo WhatsApp"],
];

/* ------------------------------------------------------------------ Orçamento */

const PROJECT_TYPES = [...SERVICES.map(s => s.title), "Sistema pronto (plano mensal/anual/vitalício)", "Outro"];

/** Abre o formulário de orçamento, que monta a mensagem e envia pelo WhatsApp. */
function useQuote() {
    const [open, setOpen] = useState<null | { type?: string }>(null);
    const modal = open ? <QuoteModal initialType={open.type} onClose={() => setOpen(null)} /> : null;
    return { openQuote: (type?: string) => setOpen({ type }), quoteModal: modal };
}

function QuoteModal({ initialType, onClose }: { initialType?: string; onClose: () => void }) {
    const [name, setName] = useState("");
    const [business, setBusiness] = useState("");
    const [type, setType] = useState(initialType || PROJECT_TYPES[0]);
    const [idea, setIdea] = useState("");
    const [deadline, setDeadline] = useState("");

    useModalBehavior(onClose);

    const message = [
        "Olá! Quero fazer um orçamento com a *KT Sistemas* 🚀",
        "",
        `👤 *Nome:* ${name.trim()}`,
        business.trim() ? `🏢 *Empresa/negócio:* ${business.trim()}` : null,
        `🧩 *Projeto:* ${type}`,
        idea.trim() ? `📝 *Ideia:* ${idea.trim()}` : null,
        deadline ? `⏱️ *Prazo desejado:* ${deadline}` : null,
    ].filter(l => l !== null).join("\n");

    const ready = name.trim().length > 1;

    return (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 backdrop-blur-sm sm:items-center sm:p-6" onClick={onClose}>
            <div role="dialog" aria-modal="true" aria-label="Fazer orçamento" onClick={e => e.stopPropagation()} className="flex max-h-[92svh] w-full max-w-lg flex-col rounded-t-3xl border border-line bg-surface shadow-[var(--ui-shadow-lg)] sm:rounded-3xl">
                <div className="flex items-start justify-between gap-4 border-b border-line px-6 py-5">
                    <div>
                        <h2 className="text-xl font-bold tracking-tight text-fg">Fazer orçamento</h2>
                        <p className="mt-1 text-sm text-fg-subtle">Conte sua ideia. A mensagem vai pronta para o nosso WhatsApp.</p>
                    </div>
                    <button onClick={onClose} aria-label="Fechar" className="-mr-2 flex h-9 w-9 items-center justify-center rounded-xl text-fg-subtle hover:bg-hover"><X size={18} /></button>
                </div>
                <div className="space-y-4 overflow-y-auto px-6 py-5">
                    <Field label="Seu nome *"><input value={name} onChange={e => setName(e.target.value)} className="ui-input" placeholder="Como podemos te chamar?" autoFocus /></Field>
                    <Field label="Empresa ou negócio"><input value={business} onChange={e => setBusiness(e.target.value)} className="ui-input" placeholder="Ex.: Barbearia do João" /></Field>
                    <Field label="O que você precisa?">
                        <select value={type} onChange={e => setType(e.target.value)} className="ui-input">
                            {PROJECT_TYPES.map(t => <option key={t}>{t}</option>)}
                        </select>
                    </Field>
                    <Field label="Conte um pouco da ideia"><textarea value={idea} onChange={e => setIdea(e.target.value)} rows={4} className="ui-input resize-none" placeholder="O que o site/sistema/app precisa fazer? Tem alguma referência?" /></Field>
                    <Field label="Prazo desejado">
                        <select value={deadline} onChange={e => setDeadline(e.target.value)} className="ui-input">
                            <option value="">Sem pressa / a combinar</option>
                            <option>O quanto antes</option>
                            <option>Até 15 dias</option>
                            <option>Até 1 mês</option>
                            <option>Até 3 meses</option>
                        </select>
                    </Field>
                </div>
                <div className="border-t border-line px-6 py-4">
                    <a
                        href={ready ? whatsappLink(message) : undefined}
                        target="_blank"
                        rel="noreferrer"
                        aria-disabled={!ready}
                        onClick={e => { if (!ready) e.preventDefault(); else onClose(); }}
                        className={`flex h-12 w-full items-center justify-center gap-2 rounded-xl text-[15px] font-semibold text-white transition ${ready ? "bg-[#25d366] hover:brightness-95" : "cursor-not-allowed bg-[#25d366]/40"}`}
                    >
                        <Send size={17} /> Enviar pelo WhatsApp
                    </a>
                    <p className="mt-2 text-center text-xs text-fg-faint">{ready ? "Abre o WhatsApp com a mensagem pronta para enviar." : "Preencha seu nome para continuar."}</p>
                </div>
            </div>
        </div>
    );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
    return (
        <label className="block">
            <span className="mb-1.5 block text-sm font-medium text-fg">{label}</span>
            {children}
        </label>
    );
}

/** Fecha com Esc e trava a rolagem da página enquanto a janela está aberta. */
function useModalBehavior(onClose: () => void) {
    useEffect(() => {
        const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
        window.addEventListener("keydown", onKey);
        const prev = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return () => { window.removeEventListener("keydown", onKey); document.body.style.overflow = prev; };
    }, [onClose]);
}

/* ------------------------------------------------------------------ Estrutura comum */

const NAV: [string, string][] = [["servicos", "Serviços"], ["projetos", "Projetos"], ["planos", "Planos"], ["como-trabalhamos", "Como trabalhamos"], ["duvidas", "Dúvidas"], ["contato", "Contato"]];

function Header({ onQuote }: { onQuote: () => void }) {
    const { theme, toggleTheme } = useTheme();
    const [menu, setMenu] = useState(false);
    const go = (id: string) => {
        setMenu(false);
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth" });
        else { navigate("/"); setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }), 120); }
    };
    return (
        <header className="sticky top-0 z-40 border-b border-line bg-bg/80 backdrop-blur-md">
            <div className="mx-auto flex h-16 max-w-6xl items-center gap-4 px-4 sm:px-6">
                <a href="#/" aria-label={COMPANY.name}><KtLogo /></a>
                <nav className="ml-4 hidden items-center gap-0.5 text-sm lg:flex">
                    {NAV.map(([id, l]) => <button key={id} onClick={() => go(id)} className="rounded-lg px-3 py-1.5 text-fg-subtle hover:bg-hover hover:text-fg">{l}</button>)}
                </nav>
                <span className="flex-1" />
                <button onClick={toggleTheme} aria-label="Alternar tema" className="flex h-9 w-9 items-center justify-center rounded-xl text-fg-subtle hover:bg-hover">{theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}</button>
                <button onClick={onQuote} className="hidden h-9 items-center gap-2 rounded-xl bg-fg px-4 text-sm font-semibold text-bg hover:opacity-90 sm:inline-flex">
                    Fazer orçamento
                </button>
                <button onClick={() => setMenu(!menu)} aria-label="Menu" className="flex h-9 w-9 items-center justify-center rounded-xl text-fg lg:hidden">{menu ? <X size={20} /> : <Menu size={20} />}</button>
            </div>
            {menu && (
                <div className="space-y-1 border-t border-line px-4 py-3 lg:hidden">
                    {NAV.map(([id, l]) => (
                        <button key={id} onClick={() => go(id)} className="block w-full rounded-xl px-3 py-2.5 text-left text-sm font-medium text-fg hover:bg-hover">{l}</button>
                    ))}
                    <button onClick={() => { setMenu(false); onQuote(); }} className="mt-2 flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-primary text-sm font-semibold text-white"><MessageCircle size={16} /> Fazer orçamento</button>
                </div>
            )}
        </header>
    );
}

function Footer({ onQuote }: { onQuote: () => void }) {
    const go = (id: string) => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth" });
        else { navigate("/"); setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }), 120); }
    };
    return (
        <footer className="border-t border-line bg-surface">
            <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-[1.5fr_1fr_1fr]">
                <div>
                    <KtLogo />
                    <p className="mt-3 max-w-xs text-sm text-fg-subtle">{COMPANY.tagline}.</p>
                </div>
                <div>
                    <p className="text-sm font-semibold text-fg">Navegação</p>
                    <ul className="mt-3 space-y-2 text-sm text-fg-subtle">
                        <li><button onClick={() => go("servicos")} className="hover:text-fg">Serviços</button></li>
                        <li><a href="#/projetos" className="hover:text-fg">Projetos</a></li>
                        <li><button onClick={() => go("planos")} className="hover:text-fg">Planos</button></li>
                        <li><button onClick={onQuote} className="hover:text-fg">Fazer orçamento</button></li>
                    </ul>
                </div>
                <div>
                    <p className="text-sm font-semibold text-fg">Contato</p>
                    <ul className="mt-3 space-y-2 text-sm text-fg-subtle">
                        <li><a href={whatsappLink("Olá! Vim pelo site da KT Sistemas.")} target="_blank" rel="noreferrer" className="hover:text-fg">{COMPANY.whatsappDisplay}</a></li>
                        <li><a href={`mailto:${COMPANY.email}`} className="break-all hover:text-fg">{COMPANY.email}</a></li>
                    </ul>
                </div>
            </div>
            <div className="border-t border-line">
                <p className="mx-auto max-w-6xl px-4 py-5 text-xs text-fg-faint sm:px-6">© {new Date().getFullYear()} {COMPANY.name}. Todos os direitos reservados.</p>
            </div>
        </footer>
    );
}

/* ------------------------------------------------------------------ Página inicial */

/** Quantos projetos aparecem na página inicial (o resto fica em “Ver mais projetos”). */
const HOME_PROJECTS = 4;

export default function LandingPage() {
    const { openQuote, quoteModal } = useQuote();
    const [project, setProject] = useState<PortfolioItem | null>(null);

    return (
        <div className="min-h-screen bg-bg font-sans text-fg-muted">
            <Header onQuote={() => openQuote()} />

            {/* Hero */}
            <section className="relative overflow-hidden">
                <div className="pointer-events-none absolute inset-0 opacity-60 [background-image:radial-gradient(var(--ui-line-strong)_1px,transparent_1px)] [background-size:22px_22px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,black,transparent)]" />
                <div className="pointer-events-none absolute -top-48 left-1/2 h-[480px] w-[880px] -translate-x-1/2 rounded-full bg-primary/[0.07] blur-[110px]" />
                <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-4 pb-20 pt-14 sm:px-6 lg:grid-cols-[1.05fr_1fr] lg:pb-24 lg:pt-20">
                    <div>
                        <span className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-1 text-xs font-medium text-fg-muted shadow-[var(--ui-shadow)]">
                            <span className="h-1.5 w-1.5 rounded-full bg-success" /> Sites · E-commerce · Aplicativos · Sistemas
                        </span>
                        <h1 className="mt-6 text-[38px] font-bold leading-[1.07] tracking-[-0.025em] text-fg sm:text-[52px]">
                            Sua ideia no ar, <span className="text-fg-subtle">do jeito que o seu negócio precisa.</span>
                        </h1>
                        <p className="mt-6 max-w-xl text-lg leading-relaxed text-fg-subtle">
                            Criamos sites, lojas virtuais, aplicativos e sistemas sob medida — bonitos, rápidos, perfeitos no celular e fáceis de usar.
                        </p>
                        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                            <button onClick={() => openQuote()} className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-primary px-6 text-[15px] font-semibold text-white shadow-[var(--ui-shadow-md)] hover:bg-primary-hover">
                                <MessageCircle size={18} /> Fazer orçamento
                            </button>
                            <a href="#/projetos" className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-line bg-surface px-6 text-[15px] font-semibold text-fg shadow-[var(--ui-shadow)] hover:bg-hover">
                                Ver projetos <ArrowRight size={16} />
                            </a>
                        </div>
                        <ul className="mt-8 grid max-w-lg grid-cols-2 gap-x-6 gap-y-2.5 text-sm text-fg-subtle">
                            {["Orçamento sem compromisso", "Projeto sob medida", "Painel para você editar", `Planos a partir de ${formatBRL(PLANS[0].price)}/mês`].map(t => (
                                <li key={t} className="flex items-center gap-2"><Check size={15} className="shrink-0 text-success" />{t}</li>
                            ))}
                        </ul>
                    </div>
                    <HeroShowcase />
                </div>
            </section>

            {/* Faixa de confiança */}
            <section className="border-y border-line bg-surface">
                <div className="mx-auto grid max-w-6xl grid-cols-2 divide-line px-4 sm:px-6 md:grid-cols-4 md:divide-x">
                    {TRUST.map(([Icon, t, d]) => (
                        <div key={t} className="flex items-center gap-3 px-2 py-5 md:px-6">
                            <Icon size={20} className="shrink-0 text-fg-faint" />
                            <div><p className="text-sm font-semibold text-fg">{t}</p><p className="text-xs text-fg-subtle">{d}</p></div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Serviços */}
            <section id="servicos" className="scroll-mt-16 py-20 sm:py-24">
                <div className="mx-auto max-w-6xl px-4 sm:px-6">
                    <SectionTitle eyebrow="Serviços" title="Tudo que o seu negócio precisa na internet" text="Do primeiro site ao sistema completo de gestão — cuidamos de tudo, do layout ao suporte." />
                    <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-line bg-line shadow-[var(--ui-shadow)] sm:grid-cols-2 lg:grid-cols-4">
                        {SERVICES.map(f => (
                            <button key={f.title} onClick={() => openQuote(f.title)} className="group bg-surface p-6 text-left transition-colors hover:bg-subtle">
                                <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-line bg-subtle text-fg-muted group-hover:text-primary"><f.icon size={19} /></span>
                                <h3 className="mt-4 font-semibold text-fg">{f.title}</h3>
                                <p className="mt-1.5 text-sm leading-relaxed text-fg-subtle">{f.text}</p>
                                <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-primary-text opacity-0 transition-opacity group-hover:opacity-100">Pedir orçamento <ArrowRight size={13} /></span>
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Projetos */}
            <section id="projetos" className="scroll-mt-16 border-y border-line bg-surface py-20 sm:py-24">
                <div className="mx-auto max-w-6xl px-4 sm:px-6">
                    <div className="flex flex-wrap items-end justify-between gap-6">
                        <SectionTitle eyebrow="Projetos" title="Sistemas que já estão rodando" text="Alguns dos projetos que desenvolvemos e que estão em uso hoje." />
                        <a href="#/projetos" className="hidden h-10 items-center gap-2 rounded-xl border border-line bg-bg px-4 text-sm font-semibold text-fg hover:bg-hover sm:inline-flex">Ver mais projetos <ArrowRight size={15} /></a>
                    </div>
                    <div className="mt-12 grid gap-6 md:grid-cols-2">
                        {PORTFOLIO.slice(0, HOME_PROJECTS).map(p => <ProjectCard key={p.id} item={p} onOpen={() => setProject(p)} />)}
                    </div>
                    <div className="mt-10 flex justify-center">
                        <a href="#/projetos" className="inline-flex h-11 items-center gap-2 rounded-xl border border-line bg-bg px-5 text-sm font-semibold text-fg shadow-[var(--ui-shadow)] hover:bg-hover">Ver mais projetos <ArrowRight size={15} /></a>
                    </div>
                </div>
            </section>

            {/* Planos */}
            <section id="planos" className="scroll-mt-16 py-20 sm:py-24">
                <div className="mx-auto max-w-6xl px-4 sm:px-6">
                    <SectionTitle center eyebrow="Planos" title="Sistemas prontos para o seu segmento" text="Comece rápido com um sistema pronto, com a sua marca — ou peça um projeto exclusivo." />
                    <div className="mx-auto mt-6 flex max-w-3xl flex-wrap justify-center gap-2">
                        {SEGMENTS.map(s => <span key={s} className="rounded-full border border-line bg-surface px-3 py-1 text-xs font-medium text-fg-muted">{s}</span>)}
                    </div>
                    <PlanCards />
                    <CustomPlanCard onQuote={() => openQuote("Sistema sob medida")} />
                </div>
            </section>

            {/* Como trabalhamos */}
            <section id="como-trabalhamos" className="scroll-mt-16 border-y border-line bg-surface py-20 sm:py-24">
                <div className="mx-auto max-w-6xl px-4 sm:px-6">
                    <SectionTitle center eyebrow="Como trabalhamos" title="Do primeiro contato ao projeto no ar" />
                    <ol className="relative mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
                        <span className="pointer-events-none absolute left-[12%] right-[12%] top-5 hidden h-px bg-line-strong lg:block" />
                        {STEPS.map((s, i) => (
                            <li key={s.title} className="relative text-center">
                                <span className="relative mx-auto flex h-10 w-10 items-center justify-center rounded-full border border-line-strong bg-surface text-sm font-semibold text-fg shadow-[var(--ui-shadow)]">{i + 1}</span>
                                <h3 className="mt-5 flex items-center justify-center gap-2 font-semibold text-fg"><s.icon size={16} className="text-fg-faint" />{s.title}</h3>
                                <p className="mx-auto mt-1.5 max-w-xs text-sm text-fg-subtle">{s.text}</p>
                            </li>
                        ))}
                    </ol>
                </div>
            </section>

            {/* Dúvidas */}
            <Faq />

            {/* Contato */}
            <ContactBand onQuote={() => openQuote()} />

            <Footer onQuote={() => openQuote()} />
            {project && <ProjectModal item={project} onClose={() => setProject(null)} onQuote={() => { setProject(null); openQuote(); }} />}
            {quoteModal}
        </div>
    );
}

/* ------------------------------------------------------------------ Página de projetos */

export function ProjectsPage() {
    const { openQuote, quoteModal } = useQuote();
    const [project, setProject] = useState<PortfolioItem | null>(null);
    return (
        <div className="min-h-screen bg-bg font-sans text-fg-muted">
            <Header onQuote={() => openQuote()} />
            <section className="py-16 sm:py-20">
                <div className="mx-auto max-w-6xl px-4 sm:px-6">
                    <a href="#/" className="inline-flex items-center gap-1.5 text-sm font-medium text-fg-subtle hover:text-fg"><ChevronLeft size={16} /> Voltar ao início</a>
                    <div className="mt-6">
                        <SectionTitle eyebrow="Projetos" title="Nosso portfólio" text="Sites, sistemas e aplicativos que desenvolvemos e que estão em uso hoje. Clique para ver os detalhes." />
                    </div>
                    <div className="mt-12 grid gap-6 md:grid-cols-2">
                        {PORTFOLIO.map(p => <ProjectCard key={p.id} item={p} onOpen={() => setProject(p)} />)}
                    </div>
                    <div className="mt-14 rounded-2xl border border-dashed border-line-strong bg-surface p-8 text-center">
                        <p className="text-lg font-semibold text-fg">Novos projetos em breve por aqui.</p>
                        <p className="mt-1 text-sm text-fg-subtle">Quer que o próximo seja o seu?</p>
                        <button onClick={() => openQuote()} className="mt-5 inline-flex h-11 items-center gap-2 rounded-xl bg-primary px-5 text-sm font-semibold text-white hover:bg-primary-hover"><MessageCircle size={16} /> Fazer orçamento</button>
                    </div>
                </div>
            </section>
            <Footer onQuote={() => openQuote()} />
            {project && <ProjectModal item={project} onClose={() => setProject(null)} onQuote={() => { setProject(null); openQuote(); }} />}
            {quoteModal}
        </div>
    );
}

/* ------------------------------------------------------------------ Blocos */

function SectionTitle({ eyebrow, title, text, center }: { eyebrow: string; title: string; text?: string; center?: boolean }) {
    return (
        <div className={center ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
            <p className="text-sm font-semibold text-primary-text">{eyebrow}</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-fg sm:text-[38px] sm:leading-tight">{title}</h2>
            {text && <p className="mt-3 text-fg-subtle">{text}</p>}
        </div>
    );
}

/** Vitrine do topo: prévias reais dos projetos em janelas de navegador. */
function HeroShowcase() {
    const [a, b] = PORTFOLIO;
    if (!a) return null;
    return (
        <div className="relative pb-10 sm:pb-14">
            <BrowserFrame src={a.images[0]} alt={a.name} />
            {b && (
                <div className="absolute -bottom-2 -left-4 w-[62%] sm:-left-8">
                    <BrowserFrame src={b.images[0]} alt={b.name} small />
                </div>
            )}
        </div>
    );
}

function BrowserFrame({ src, alt, small }: { src: string; alt: string; small?: boolean }) {
    return (
        <div className={`overflow-hidden rounded-2xl border border-line bg-surface ${small ? "shadow-[var(--ui-shadow-lg)] ring-4 ring-bg" : "shadow-[var(--ui-shadow-lg)]"}`}>
            <div className="flex items-center gap-1.5 border-b border-line bg-subtle px-3 py-2">
                <span className="h-2 w-2 rounded-full bg-line-strong" /><span className="h-2 w-2 rounded-full bg-line-strong" /><span className="h-2 w-2 rounded-full bg-line-strong" />
            </div>
            <img src={src} alt={`Prévia: ${alt}`} className="block aspect-[16/10] w-full object-cover object-top" />
        </div>
    );
}

function ProjectCard({ item, onOpen }: { item: PortfolioItem; onOpen: () => void }) {
    return (
        <article className="group flex flex-col overflow-hidden rounded-2xl border border-line bg-bg shadow-[var(--ui-shadow)] transition-shadow hover:shadow-[var(--ui-shadow-lg)]">
            <button onClick={onOpen} className="relative block aspect-[16/10] overflow-hidden border-b border-line bg-subtle" aria-label={`Ver detalhes de ${item.name}`}>
                <img src={item.images[0]} alt={`Prévia do projeto ${item.name}`} loading="lazy" className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]" />
                {item.images.length > 1 && <span className="absolute bottom-3 right-3 rounded-full bg-black/60 px-2.5 py-1 text-[11px] font-medium text-white">{item.images.length} fotos</span>}
            </button>
            <div className="flex flex-1 flex-col p-5 sm:p-6">
                <p className="text-xs font-semibold uppercase tracking-wide text-primary-text">{item.category}</p>
                <h3 className="mt-1.5 text-lg font-semibold text-fg">{item.name}</h3>
                <p className="mt-1.5 flex-1 text-sm leading-relaxed text-fg-subtle">{item.summary}</p>
                <button onClick={onOpen} className="mt-5 inline-flex h-10 w-fit items-center gap-2 rounded-xl border border-line bg-surface px-4 text-sm font-semibold text-fg hover:bg-hover">
                    Ver detalhes <ArrowRight size={15} />
                </button>
            </div>
        </article>
    );
}

/** Detalhes do projeto: fotos, descrição e funcionalidades (sem link para o sistema). */
function ProjectModal({ item, onClose, onQuote }: { item: PortfolioItem; onClose: () => void; onQuote: () => void }) {
    const [i, setI] = useState(0);
    useModalBehavior(onClose);
    const n = item.images.length;
    return (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 backdrop-blur-sm sm:items-center sm:p-6" onClick={onClose}>
            <div role="dialog" aria-modal="true" aria-label={item.name} onClick={e => e.stopPropagation()} className="flex max-h-[94svh] w-full max-w-4xl flex-col overflow-hidden rounded-t-3xl border border-line bg-surface shadow-[var(--ui-shadow-lg)] sm:rounded-3xl">
                <div className="relative bg-subtle">
                    <img src={item.images[i]} alt={`${item.name} — imagem ${i + 1}`} className="block max-h-[52svh] w-full object-contain" />
                    {n > 1 && (
                        <>
                            <button onClick={() => setI((i - 1 + n) % n)} aria-label="Imagem anterior" className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/55 text-white hover:bg-black/70"><ChevronLeft size={20} /></button>
                            <button onClick={() => setI((i + 1) % n)} aria-label="Próxima imagem" className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/55 text-white hover:bg-black/70"><ChevronRight size={20} /></button>
                            <span className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-black/60 px-2.5 py-1 text-[11px] font-medium text-white">{i + 1} / {n}</span>
                        </>
                    )}
                    <button onClick={onClose} aria-label="Fechar" className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-black/55 text-white hover:bg-black/70"><X size={18} /></button>
                </div>
                <div className="overflow-y-auto p-6 sm:p-8">
                    <p className="text-xs font-semibold uppercase tracking-wide text-primary-text">{item.category}</p>
                    <h2 className="mt-1.5 text-2xl font-bold tracking-tight text-fg">{item.name}</h2>
                    <p className="mt-3 leading-relaxed text-fg-subtle">{item.details}</p>
                    <ul className="mt-6 grid gap-3 text-sm sm:grid-cols-2">
                        {item.highlights.map(h => <li key={h} className="flex gap-2.5"><Check size={16} className="mt-0.5 shrink-0 text-success" /><span>{h}</span></li>)}
                    </ul>
                    <div className="mt-8 flex flex-col gap-3 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
                        <p className="text-sm text-fg-subtle">Quer um projeto parecido para o seu negócio?</p>
                        <button onClick={onQuote} className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-primary px-5 text-sm font-semibold text-white hover:bg-primary-hover"><MessageCircle size={16} /> Fazer orçamento</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export function PlanCards({ compact = false }: { compact?: boolean }) {
    return (
        <div className={`grid items-stretch gap-5 ${compact ? "mt-6" : "mt-12"} lg:grid-cols-3`}>
            {PLANS.map(p => {
                const featured = !!p.highlight;
                return (
                    <div key={p.id} className={`relative flex flex-col rounded-2xl border bg-surface p-6 sm:p-7 ${featured ? "border-primary/50 shadow-[var(--ui-shadow-lg)] ring-1 ring-primary/30" : "border-line shadow-[var(--ui-shadow)]"}`}>
                        <div className="flex items-center justify-between gap-2">
                            <h3 className="text-lg font-semibold text-fg">{p.name}</h3>
                            {featured && <span className="rounded-full border border-primary/25 bg-primary-soft px-2.5 py-0.5 text-xs font-semibold text-primary-text">{p.highlight}</span>}
                        </div>
                        <p className="mt-1 text-sm text-fg-subtle">{p.description}</p>
                        <p className="mt-6 flex flex-wrap items-baseline gap-x-1.5">
                            <span className="w-full text-xs font-medium text-fg-subtle">a partir de</span>
                            <span className="text-[36px] font-bold tracking-tight text-fg tabular">{formatBRL(p.price)}</span>
                            <span className="text-sm text-fg-subtle">{p.period}</span>
                        </p>
                        <p className="mt-1 min-h-4 text-xs font-medium text-success">
                            {p.id === "anual" && `Equivale a ${formatBRL(p.price / 12)}/mês`}
                            {p.id === "vitalicio" && "Sem mensalidade"}
                        </p>
                        <a
                            href={whatsappLink(`Olá! Tenho interesse no plano *${p.name}* (a partir de ${formatBRL(p.price)}${p.period.startsWith("/") ? p.period : " - " + p.period}) de um sistema pronto da KT Sistemas.`)}
                            target="_blank"
                            rel="noreferrer"
                            className={`mt-6 inline-flex h-11 items-center justify-center gap-2 rounded-xl text-sm font-semibold transition-colors ${featured ? "bg-primary text-white shadow-[var(--ui-shadow-md)] hover:bg-primary-hover" : "border border-line bg-surface text-fg hover:bg-hover"}`}
                        >
                            <MessageCircle size={16} /> Quero o plano {p.name.toLowerCase()}
                        </a>
                        {!compact && (
                            <ul className="mt-7 flex-1 space-y-3 border-t border-line pt-6 text-sm">
                                {PLAN_FEATURES.map(f => <li key={f} className="flex gap-2.5"><Check size={16} className="mt-0.5 shrink-0 text-success" /><span>{f}</span></li>)}
                            </ul>
                        )}
                    </div>
                );
            })}
        </div>
    );
}

function CustomPlanCard({ onQuote }: { onQuote: () => void }) {
    return (
        <div className="relative mt-5 overflow-hidden rounded-2xl bg-nav p-6 text-white shadow-[var(--ui-shadow-lg)] sm:p-8">
            <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#4b6bdc]/30 blur-[90px]" />
            <div className="relative grid gap-8 lg:grid-cols-[1.1fr_1.4fr] lg:items-center">
                <div>
                    <span className="rounded-full border border-white/15 bg-white/10 px-2.5 py-0.5 text-xs font-semibold text-white/85">Exclusivo</span>
                    <h3 className="mt-3 text-2xl font-bold tracking-tight">Sistema {CUSTOM_PLAN.name.toLowerCase()}</h3>
                    <p className="mt-2 text-sm text-white/65">{CUSTOM_PLAN.description}</p>
                    <p className="mt-5 flex flex-wrap items-baseline gap-x-1.5">
                        <span className="w-full text-xs font-medium text-white/60">a partir de</span>
                        <span className="text-[34px] font-bold tracking-tight tabular">{formatBRL(CUSTOM_PLAN.price)}</span>
                    </p>
                    <button onClick={onQuote} className="mt-5 inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-white px-5 text-sm font-semibold text-[#0f172a] hover:bg-white/90">
                        <MessageCircle size={16} /> Fazer orçamento
                    </button>
                </div>
                <ul className="grid gap-3 text-sm sm:grid-cols-2">
                    {CUSTOM_PLAN.features.map(f => (
                        <li key={f} className="flex gap-2.5 text-white/85"><Check size={16} className="mt-0.5 shrink-0 text-[#8fd1a8]" /><span>{f}</span></li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

function Faq() {
    const [open, setOpen] = useState<number | null>(0);
    return (
        <section id="duvidas" className="scroll-mt-16 py-20 sm:py-24">
            <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-[1fr_1.6fr]">
                <div>
                    <SectionTitle eyebrow="Dúvidas" title="Perguntas frequentes" text="Não achou sua resposta? Chame a gente no WhatsApp." />
                    <a href={whatsappLink("Olá! Tenho uma dúvida sobre os serviços da KT Sistemas.")} target="_blank" rel="noreferrer" className="mt-6 inline-flex h-10 items-center gap-2 rounded-xl border border-line bg-surface px-4 text-sm font-semibold text-fg shadow-[var(--ui-shadow)] hover:bg-hover">
                        <MessageCircle size={16} /> Falar no WhatsApp
                    </a>
                </div>
                <div className="divide-y divide-line rounded-2xl border border-line bg-surface">
                    {FAQ.map((f, i) => (
                        <div key={f.q}>
                            <button onClick={() => setOpen(open === i ? null : i)} aria-expanded={open === i} className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-[15px] font-medium text-fg">
                                {f.q}<ChevronDown size={18} className={`shrink-0 text-fg-faint transition-transform ${open === i ? "rotate-180" : ""}`} />
                            </button>
                            {open === i && <p className="-mt-1 px-5 pb-5 text-sm leading-relaxed text-fg-subtle">{f.a}</p>}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

function ContactBand({ onQuote }: { onQuote: () => void }) {
    return (
        <section id="contato" className="scroll-mt-16 px-4 pb-20 sm:px-6">
            <div className="relative mx-auto max-w-6xl overflow-hidden rounded-3xl bg-nav px-6 py-14 text-white sm:px-14 sm:py-16">
                <div className="pointer-events-none absolute inset-0 [background-image:radial-gradient(rgb(255_255_255/0.06)_1px,transparent_1px)] [background-size:20px_20px]" />
                <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-[#4b6bdc]/25 blur-[100px]" />
                <div className="relative grid items-center gap-10 lg:grid-cols-[1.3fr_1fr]">
                    <div>
                        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Vamos tirar seu projeto do papel?</h2>
                        <p className="mt-3 max-w-xl text-white/65">Conte o que você precisa e receba uma proposta sem compromisso. Respondemos rapidinho pelo WhatsApp.</p>
                        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                            <button onClick={onQuote} className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-white px-6 font-semibold text-[#0f172a] hover:bg-white/90">
                                <MessageCircle size={18} /> Fazer orçamento
                            </button>
                            <a href={mailtoLink("Orçamento — KT Sistemas", "Olá! Gostaria de um orçamento para um projeto.")} className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 px-6 font-semibold text-white hover:bg-white/10">
                                <Mail size={18} /> Enviar e-mail
                            </a>
                        </div>
                    </div>
                    <div className="space-y-3.5 rounded-2xl border border-white/10 bg-white/[0.04] p-5 text-sm">
                        <p className="flex items-center gap-3"><MessageCircle size={17} className="shrink-0 text-white/50" /> {COMPANY.whatsappDisplay}</p>
                        <p className="flex items-center gap-3 break-all"><Mail size={17} className="shrink-0 text-white/50" /> {COMPANY.email}</p>
                        <p className="flex items-center gap-3"><LifeBuoy size={17} className="shrink-0 text-white/50" /> Suporte depois da entrega</p>
                    </div>
                </div>
            </div>
        </section>
    );
}
