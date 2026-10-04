// src/screens/public/LandingPage.tsx — site da KT Sistemas (design premium, escuro)

import { useEffect, useRef, useState, type ReactNode } from "react";
import {
    Globe, LayoutTemplate, ShoppingBag, Smartphone, LayoutDashboard, CalendarClock, UtensilsCrossed, Bot,
    CreditCard, BedDouble, Wrench, Check, MessageCircle, Mail, Plus, Menu, X, ArrowRight, ArrowUpRight,
    Cloud, Headphones, Palette, Rocket, ClipboardList, Code2, Sparkles, ChevronLeft, ChevronRight, Send, Sun, Moon, Scissors,
    type LucideIcon,
} from "lucide-react";
import { BARBER_SYSTEM, COMPANY, CUSTOM_PLAN, PLANS, PLAN_FEATURES, PORTFOLIO, SEGMENTS, whatsappLink, mailtoLink, type PortfolioItem } from "../../config/brand";
import { formatBRL } from "../../lib/format";
import { navigate } from "../../lib/router";

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

const VALUES: [LucideIcon, string, string][] = [
    [Sparkles, "100% sob medida", "Cada projeto pensado para o seu negócio"],
    [Smartphone, "Mobile first", "Perfeito no celular, ótimo no computador"],
    [Cloud, "No ar com você", "Domínio, hospedagem e segurança"],
    [Headphones, "Suporte humano", "Gente de verdade, direto no WhatsApp"],
];

/* ------------------------------------------------------------------ Base visual */

const BG = "kt-site bg-kt-bg";

/* ------------------------------------------------------------------ Tema claro / escuro */

type SiteTheme = "dark" | "light";
const THEME_KEY = "kt-site-theme";

function readTheme(): SiteTheme {
    try {
        return localStorage.getItem(THEME_KEY) === "light" ? "light" : "dark";
    } catch {
        return "dark";
    }
}

/** Tema do site público; a escolha fica salva no navegador do visitante. */
function useSiteTheme() {
    const [theme, setTheme] = useState<SiteTheme>(readTheme);
    const toggle = () => {
        const next: SiteTheme = theme === "light" ? "dark" : "light";
        setTheme(next);
        try {
            localStorage.setItem(THEME_KEY, next);
        } catch {
            /* sem armazenamento: vale só nesta visita */
        }
    };
    return { theme, isLight: theme === "light", toggle, rootClass: `${BG} ${theme === "light" ? "kt-light" : ""}` };
}

interface ThemeProps {
    isLight: boolean;
    onToggleTheme: () => void;
}

function ThemeToggle({ isLight, onToggleTheme }: ThemeProps) {
    return (
        <button
            onClick={onToggleTheme}
            aria-label={isLight ? "Usar tema escuro" : "Usar tema claro"}
            title={isLight ? "Tema escuro" : "Tema claro"}
            className="flex h-10 w-10 items-center justify-center rounded-full text-ink/70 transition hover:bg-ink/[0.08] hover:text-ink"
        >
            {isLight ? <Moon size={18} /> : <Sun size={18} />}
        </button>
    );
}

/** Fundo com brilhos sutis no azul da marca. */
function Glow({ className = "" }: { className?: string }) {
    return <div className={`pointer-events-none absolute rounded-full blur-[120px] ${className}`} />;
}

/** Aparece suavemente quando entra na tela. */
function Reveal({ children, delay = 0, className = "", immediate = false }: { children: ReactNode; delay?: number; className?: string; immediate?: boolean }) {
    const ref = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        // Conteúdo da primeira tela: anima logo ao abrir, sem esperar a rolagem
        if (immediate) {
            const id = requestAnimationFrame(() => el.classList.add("is-visible"));
            return () => cancelAnimationFrame(id);
        }
        const io = new IntersectionObserver(([e]) => {
            if (e.isIntersecting) {
                el.classList.add("is-visible");
                io.disconnect();
            }
        }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
        io.observe(el);
        return () => io.disconnect();
    }, [immediate]);
    return <div ref={ref} className={`kt-reveal ${className}`} style={{ transitionDelay: `${delay}ms` }}>{children}</div>;
}

function Eyebrow({ children }: { children: ReactNode }) {
    return (
        <span className="inline-flex items-center gap-2 text-[12px] font-medium uppercase tracking-[0.22em] text-kt-accent">
            <span className="h-px w-6 bg-gradient-to-r from-transparent to-kt-accent" />{children}
        </span>
    );
}

function SectionTitle({ eyebrow, title, text, center }: { eyebrow: string; title: ReactNode; text?: string; center?: boolean }) {
    return (
        <Reveal className={center ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
            <Eyebrow>{eyebrow}</Eyebrow>
            <h2 className="mt-4 text-[34px] font-semibold leading-[1.08] tracking-[-0.03em] text-ink sm:text-[48px]">{title}</h2>
            {text && <p className={`mt-4 text-[17px] leading-relaxed text-ink/55 ${center ? "mx-auto max-w-2xl" : "max-w-2xl"}`}>{text}</p>}
        </Reveal>
    );
}

function PrimaryButton({ children, onClick, className = "" }: { children: ReactNode; onClick?: () => void; className?: string }) {
    return (
        <button onClick={onClick} className={`group relative inline-flex h-12 items-center justify-center gap-2 overflow-hidden rounded-full bg-gradient-to-b from-[#6f86ff] to-[#3f5bd6] px-7 text-[15px] font-semibold text-[#fff] shadow-[0_10px_30px_-10px_rgba(91,118,255,.8),inset_0_1px_0_rgba(255,255,255,.25)] transition hover:brightness-110 ${className}`}>
            {children}
        </button>
    );
}

function GhostLink({ href, children, className = "" }: { href: string; children: ReactNode; className?: string }) {
    return (
        <a href={href} className={`inline-flex h-12 items-center justify-center gap-2 rounded-full border border-ink/12 bg-ink/[0.03] px-7 text-[15px] font-medium text-ink/90 backdrop-blur transition hover:border-ink/25 hover:bg-ink/[0.07] ${className}`}>
            {children}
        </a>
    );
}

/* ------------------------------------------------------------------ Orçamento */

const PROJECT_TYPES = [...SERVICES.map(s => s.title), "Sistema pronto (plano mensal/anual/vitalício)", "Sistema sob medida", "Outro"];

/** Abre o formulário de orçamento, que monta a mensagem e envia pelo WhatsApp. */
function useQuote() {
    const [open, setOpen] = useState<null | { type?: string }>(null);
    const modal = open ? <QuoteModal initialType={open.type} onClose={() => setOpen(null)} /> : null;
    return { openQuote: (type?: string) => setOpen({ type }), quoteModal: modal };
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

function Modal({ children, onClose, label, wide }: { children: ReactNode; onClose: () => void; label: string; wide?: boolean }) {
    useModalBehavior(onClose);
    return (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-[#02040a]/75 backdrop-blur-md sm:items-center sm:p-6" onClick={onClose}>
            <div
                role="dialog"
                aria-modal="true"
                aria-label={label}
                onClick={e => e.stopPropagation()}
                className={`relative flex max-h-[94svh] w-full flex-col overflow-hidden rounded-t-[28px] border border-ink/10 bg-kt-raised/95 text-ink shadow-[0_40px_120px_-20px_var(--kt-shadow)] sm:rounded-[28px] ${wide ? "max-w-4xl" : "max-w-lg"}`}
            >
                {children}
            </div>
        </div>
    );
}

function QuoteModal({ initialType, onClose }: { initialType?: string; onClose: () => void }) {
    const [name, setName] = useState("");
    const [business, setBusiness] = useState("");
    const [type, setType] = useState(initialType || PROJECT_TYPES[0]);
    const [idea, setIdea] = useState("");
    const [deadline, setDeadline] = useState("");

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
        <Modal onClose={onClose} label="Fazer orçamento">
            <Glow className="-right-24 -top-24 h-64 w-64 bg-[#4b6bdc]/30" />
            <div className="relative flex items-start justify-between gap-4 border-b border-ink/[0.07] px-6 py-5">
                <div>
                    <h2 className="text-xl font-semibold tracking-tight">Fazer <span className="kt-serif text-[26px] italic text-kt-accent-strong">orçamento</span></h2>
                    <p className="mt-1 text-sm text-ink/50">Conte sua ideia. A mensagem vai pronta para o nosso WhatsApp.</p>
                </div>
                <button onClick={onClose} aria-label="Fechar" className="-mr-2 flex h-9 w-9 items-center justify-center rounded-full text-ink/50 hover:bg-ink/10 hover:text-ink"><X size={18} /></button>
            </div>
            <div className="relative space-y-4 overflow-y-auto px-6 py-5">
                <Field label="Seu nome *"><input value={name} onChange={e => setName(e.target.value)} className="kt-input" placeholder="Como podemos te chamar?" autoFocus /></Field>
                <Field label="Empresa ou negócio"><input value={business} onChange={e => setBusiness(e.target.value)} className="kt-input" placeholder="Ex.: Barbearia do João" /></Field>
                <Field label="O que você precisa?">
                    <select value={type} onChange={e => setType(e.target.value)} className="kt-input">
                        {PROJECT_TYPES.map(t => <option key={t}>{t}</option>)}
                    </select>
                </Field>
                <Field label="Conte um pouco da ideia"><textarea value={idea} onChange={e => setIdea(e.target.value)} rows={4} className="kt-input resize-none" placeholder="O que o site/sistema/app precisa fazer? Tem alguma referência?" /></Field>
                <Field label="Prazo desejado">
                    <select value={deadline} onChange={e => setDeadline(e.target.value)} className="kt-input">
                        <option value="">Sem pressa / a combinar</option>
                        <option>O quanto antes</option>
                        <option>Até 15 dias</option>
                        <option>Até 1 mês</option>
                        <option>Até 3 meses</option>
                    </select>
                </Field>
            </div>
            <div className="relative border-t border-ink/[0.07] px-6 py-4">
                <a
                    href={ready ? whatsappLink(message) : undefined}
                    target="_blank"
                    rel="noreferrer"
                    aria-disabled={!ready}
                    onClick={e => { if (!ready) e.preventDefault(); else onClose(); }}
                    className={`flex h-12 w-full items-center justify-center gap-2 rounded-full text-[15px] font-semibold text-[#fff] transition ${ready ? "bg-gradient-to-b from-[#2fe07a] to-[#1fb862] shadow-[0_10px_30px_-12px_rgba(37,211,102,.8)] hover:brightness-105" : "cursor-not-allowed bg-ink/10 text-ink/40"}`}
                >
                    <Send size={17} /> Enviar pelo WhatsApp
                </a>
                <p className="mt-2 text-center text-xs text-ink/35">{ready ? "Abre o WhatsApp com a mensagem pronta para enviar." : "Preencha seu nome para continuar."}</p>
            </div>
        </Modal>
    );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
    return (
        <label className="block">
            <span className="mb-1.5 block text-[13px] font-medium text-ink/70">{label}</span>
            {children}
        </label>
    );
}

/* ------------------------------------------------------------------ Cabeçalho e rodapé */

const NAV: [string, string][] = [["servicos", "Serviços"], ["projetos", "Projetos"], ["planos", "Planos"], ["processo", "Processo"], ["duvidas", "Dúvidas"]];

const goTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    else { navigate("/"); setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }), 140); }
};

function Header({ onQuote, isLight, onToggleTheme }: { onQuote: () => void } & ThemeProps) {
    const [menu, setMenu] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    useEffect(() => {
        const on = () => setScrolled(window.scrollY > 24);
        on();
        window.addEventListener("scroll", on, { passive: true });
        return () => window.removeEventListener("scroll", on);
    }, []);
    return (
        <header className="fixed inset-x-0 top-0 z-40 px-3 pt-3 sm:px-5 sm:pt-4">
            <div className={`mx-auto flex h-14 max-w-6xl items-center gap-3 rounded-full border px-3 pl-4 transition-all duration-500 sm:h-16 sm:px-4 sm:pl-5 ${scrolled || menu ? "border-ink/10 bg-kt-raised/80 shadow-[0_20px_50px_-20px_var(--kt-shadow)] backdrop-blur-xl" : "border-transparent bg-transparent"}`}>
                <a href="#/" aria-label={COMPANY.name}><KtLogo light={!isLight} /></a>
                <nav className="ml-6 hidden items-center gap-1 text-[14px] lg:flex">
                    {NAV.map(([id, l]) => <button key={id} onClick={() => goTo(id)} className="rounded-full px-3.5 py-2 text-ink/60 transition hover:bg-ink/[0.06] hover:text-ink">{l}</button>)}
                </nav>
                <span className="flex-1" />
                <ThemeToggle isLight={isLight} onToggleTheme={onToggleTheme} />
                <a href={BARBER_SYSTEM.url} title={BARBER_SYSTEM.name} className="hidden h-10 shrink-0 items-center gap-2 whitespace-nowrap rounded-full border border-ink/12 bg-ink/[0.04] px-4 text-sm font-semibold text-ink transition hover:border-ink/25 hover:bg-ink/[0.08] md:inline-flex">
                    <Scissors size={15} className="text-[#c08a2e]" /> Barbearias
                </a>
                <button onClick={onQuote} className="hidden h-10 shrink-0 items-center gap-2 whitespace-nowrap rounded-full bg-ink px-5 text-sm font-semibold text-inkbg transition hover:bg-ink/90 sm:inline-flex">
                    Fazer orçamento <ArrowUpRight size={15} />
                </button>
                <button onClick={() => setMenu(!menu)} aria-label="Menu" className="flex h-10 w-10 items-center justify-center rounded-full text-ink hover:bg-ink/10 lg:hidden">{menu ? <X size={20} /> : <Menu size={20} />}</button>
            </div>
            {menu && (
                <div className="mx-auto mt-2 max-w-6xl space-y-1 rounded-3xl border border-ink/10 bg-kt-raised/95 p-3 backdrop-blur-xl lg:hidden">
                    {NAV.map(([id, l]) => (
                        <button key={id} onClick={() => { setMenu(false); goTo(id); }} className="block w-full rounded-2xl px-4 py-3 text-left text-[15px] font-medium text-ink/85 hover:bg-ink/[0.06]">{l}</button>
                    ))}
                    <a href={BARBER_SYSTEM.url} className="flex w-full items-center gap-2 rounded-2xl px-4 py-3 text-left text-[15px] font-semibold text-ink hover:bg-ink/[0.06]">
                        <Scissors size={16} className="text-[#c08a2e]" /> {BARBER_SYSTEM.name}
                    </a>
                    <button onClick={() => { setMenu(false); onQuote(); }} className="mt-1 flex h-12 w-full items-center justify-center gap-2 rounded-full bg-ink text-sm font-semibold text-inkbg">Fazer orçamento <ArrowUpRight size={15} /></button>
                </div>
            )}
        </header>
    );
}

function Footer({ onQuote, isLight }: { onQuote: () => void; isLight: boolean }) {
    return (
        <footer className="relative border-t border-ink/[0.06]">
            <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:px-6 md:grid-cols-[1.6fr_1fr_1fr]">
                <div>
                    <KtLogo light={!isLight} />
                    <p className="mt-4 max-w-xs text-sm leading-relaxed text-ink/45">{COMPANY.tagline}.</p>
                </div>
                <div>
                    <p className="text-[12px] font-medium uppercase tracking-[0.2em] text-ink/40">Navegação</p>
                    <ul className="mt-4 space-y-2.5 text-sm text-ink/60">
                        <li><button onClick={() => goTo("servicos")} className="hover:text-ink">Serviços</button></li>
                        <li><a href="#/projetos" className="hover:text-ink">Projetos</a></li>
                        <li><button onClick={() => goTo("planos")} className="hover:text-ink">Planos</button></li>
                        <li><a href={BARBER_SYSTEM.url} className="hover:text-ink">{BARBER_SYSTEM.name}</a></li>
                        <li><button onClick={onQuote} className="hover:text-ink">Fazer orçamento</button></li>
                    </ul>
                </div>
                <div>
                    <p className="text-[12px] font-medium uppercase tracking-[0.2em] text-ink/40">Contato</p>
                    <ul className="mt-4 space-y-2.5 text-sm text-ink/60">
                        <li><a href={whatsappLink("Olá! Vim pelo site da KT Sistemas.")} target="_blank" rel="noreferrer" className="hover:text-ink">{COMPANY.whatsappDisplay}</a></li>
                        <li><a href={`mailto:${COMPANY.email}`} className="break-all hover:text-ink">{COMPANY.email}</a></li>
                    </ul>
                </div>
            </div>
            <div className="border-t border-ink/[0.06]">
                <p className="mx-auto max-w-6xl px-5 py-6 text-xs text-ink/30 sm:px-6">© {new Date().getFullYear()} {COMPANY.name}. Todos os direitos reservados.</p>
            </div>
        </footer>
    );
}

/* ------------------------------------------------------------------ Sistema para barbearias */

function BarberShowcase() {
    return (
        <section id="barbearias" className="relative scroll-mt-24 py-16 sm:py-24">
            <Glow className="left-[-120px] top-10 h-[420px] w-[520px] bg-[#d4a24c]/15" />
            <div className="relative mx-auto max-w-6xl px-5 sm:px-6">
                <Reveal className="overflow-hidden rounded-[32px] border border-ink/10 bg-kt-raised/60 backdrop-blur">
                    <div className="grid items-center gap-10 p-6 sm:p-10 lg:grid-cols-[1.1fr_1fr] lg:p-14">
                        <div>
                            <span className="inline-flex items-center gap-2 rounded-full border border-[#d4a24c]/40 bg-[#d4a24c]/10 px-3 py-1 text-[12px] font-semibold text-[#b8862f]">
                                <Scissors size={13} /> Produto KT Sistemas
                            </span>
                            <h2 className="mt-5 text-[32px] font-semibold leading-[1.08] tracking-[-0.03em] text-ink sm:text-[44px]">
                                O sistema completo para <span className="kt-serif italic text-[#c08a2e]">barbearias</span>
                            </h2>
                            <p className="mt-4 max-w-xl text-[17px] leading-relaxed text-ink/55">
                                Agenda online, clientes, profissionais, caixa e financeiro num só lugar — pronto para usar, com a marca da sua barbearia.
                            </p>
                            <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
                                {BARBER_SYSTEM.highlights.map((h) => (
                                    <li key={h} className="flex items-start gap-2 text-[14px] text-ink/70">
                                        <Check size={16} className="mt-0.5 shrink-0 text-kt-check" /> {h}
                                    </li>
                                ))}
                            </ul>
                            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                                <a href={BARBER_SYSTEM.url} className="group inline-flex h-12 items-center justify-center gap-2 whitespace-nowrap rounded-full bg-gradient-to-b from-[#e0b866] to-[#c08a2e] px-7 text-[15px] font-semibold text-[#0b0b0c] shadow-[0_10px_30px_-12px_rgba(212,162,76,.9)] transition hover:brightness-110">
                                    Conhecer o sistema <ArrowRight size={17} className="transition-transform group-hover:translate-x-0.5" />
                                </a>
                                <GhostLink href={BARBER_SYSTEM.demoBookingUrl} className="whitespace-nowrap">Ver agendamento de exemplo</GhostLink>
                            </div>
                            <p className="mt-4 text-[13px] text-ink/40">
                                {BARBER_SYSTEM.trialDays} dias grátis · a partir de {formatBRL(BARBER_SYSTEM.priceFrom)}/mês
                            </p>
                        </div>

                        {/* Prévia do agendamento no celular */}
                        <div className="relative mx-auto w-full max-w-[300px]">
                            <div className="rounded-[36px] border border-ink/10 bg-[#0b0b0c] p-3 shadow-[0_40px_80px_-30px_var(--kt-shadow)]">
                                <div className="rounded-[28px] bg-[#121214] p-4 text-left text-[#e4e4e7]">
                                    <div className="flex items-center gap-2.5">
                                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#d4a24c] text-sm font-black text-[#0b0b0c]">B</div>
                                        <div>
                                            <div className="text-[13px] font-bold text-white">Black Barber</div>
                                            <div className="text-[10px] text-[#71717a]">Agende seu horário</div>
                                        </div>
                                    </div>
                                    <div className="mt-4 space-y-2">
                                        {[["Corte", "R$ 40,00"], ["Barba", "R$ 30,00"], ["Corte + Barba", "R$ 65,00"]].map(([n, p]) => (
                                            <div key={n} className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2.5 text-[12px]">
                                                <span className="font-semibold text-white">{n}</span>
                                                <span className="text-[#a1a1aa]">{p}</span>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="mt-3 grid grid-cols-4 gap-1.5">
                                        {["09:00", "09:30", "10:00", "10:30", "11:00", "13:00", "13:30", "14:00"].map((h, i) => (
                                            <span key={h} className={`rounded-lg py-1.5 text-center text-[10px] font-semibold ${i === 2 ? "bg-[#d4a24c] text-[#0b0b0c]" : "border border-white/10 text-white"}`}>{h}</span>
                                        ))}
                                    </div>
                                    <div className="mt-3 rounded-xl bg-[#d4a24c] py-2.5 text-center text-[12px] font-bold text-[#0b0b0c]">Confirmar agendamento</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Reveal>
            </div>
        </section>
    );
}

/* ------------------------------------------------------------------ Página inicial */

/** Quantos projetos aparecem na página inicial (o resto fica em “Ver mais projetos”). */
const HOME_PROJECTS = 4;

export default function LandingPage() {
    const { openQuote, quoteModal } = useQuote();
    const { isLight, toggle, rootClass } = useSiteTheme();
    const [project, setProject] = useState<PortfolioItem | null>(null);

    return (
        <div className={`min-h-screen overflow-x-clip ${rootClass} font-sans text-ink antialiased selection:bg-[#6f86ff]/40`}>
            <Header onQuote={() => openQuote()} isLight={isLight} onToggleTheme={toggle} />

            {/* ---------------- Hero ---------------- */}
            <section className="relative overflow-hidden pb-10 pt-28 sm:pt-36">
                <div className="pointer-events-none absolute inset-0 [background-image:linear-gradient(var(--kt-grid)_1px,transparent_1px),linear-gradient(90deg,var(--kt-grid)_1px,transparent_1px)] [background-size:64px_64px] [mask-image:radial-gradient(ellipse_70%_55%_at_50%_0%,black,transparent)]" />
                <Glow className="left-1/2 top-[-260px] h-[620px] w-[1000px] -translate-x-1/2 bg-[#3f5bd6]/35" />
                <Glow className="right-[-200px] top-[200px] h-[420px] w-[420px] bg-[#8b5cf6]/15" />

                <div className="relative mx-auto max-w-6xl px-5 text-center sm:px-6">
                    <Reveal immediate>
                        <span className="inline-flex items-center gap-2.5 rounded-full border border-ink/10 bg-ink/[0.04] py-1.5 pl-2 pr-4 text-[13px] text-ink/70 backdrop-blur">
                            <span className="relative flex h-5 items-center rounded-full bg-[#6f86ff]/20 px-2 text-[11px] font-semibold text-kt-accent-strong">
                                <span className="mr-1.5 h-1.5 w-1.5 animate-pulse rounded-full bg-kt-check" />Novo
                            </span>
                            <span className="sm:hidden">Sites · Lojas · Apps · Sistemas</span>
                            <span className="hidden sm:inline">Sites · E-commerce · Aplicativos · Sistemas</span>
                        </span>
                    </Reveal>
                    <Reveal immediate delay={80}>
                        <h1 className="mx-auto mt-7 max-w-4xl text-[44px] font-semibold leading-[1.02] tracking-[-0.045em] text-ink sm:text-[76px]">
                            Transformamos ideias em <span className="kt-serif kt-gradient-text pr-1 text-[1.12em] italic">experiências digitais</span> que vendem.
                        </h1>
                    </Reveal>
                    <Reveal immediate delay={160}>
                        <p className="mx-auto mt-7 max-w-2xl text-[17px] leading-relaxed text-ink/55 sm:text-lg">
                            Criamos sites, lojas virtuais, aplicativos e sistemas sob medida — bonitos, rápidos, perfeitos no celular e fáceis de usar.
                        </p>
                    </Reveal>
                    <Reveal immediate delay={240}>
                        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
                            <PrimaryButton onClick={() => openQuote()} className="w-full sm:w-auto">
                                Fazer orçamento <ArrowRight size={17} className="transition-transform group-hover:translate-x-0.5" />
                            </PrimaryButton>
                            <GhostLink href="#/projetos" className="w-full sm:w-auto">Ver projetos</GhostLink>
                        </div>
                        <p className="mt-6 text-[13px] text-ink/40">Orçamento sem compromisso · Planos a partir de {formatBRL(PLANS[0].price)}/mês</p>
                    </Reveal>

                    {/* Vitrine em perspectiva */}
                    <Reveal immediate delay={320} className="relative mx-auto mt-14 max-w-5xl sm:mt-16">
                        <Showcase />
                    </Reveal>
                </div>
            </section>

            {/* ---------------- Faixa de segmentos ---------------- */}
            <section className="relative border-y border-ink/[0.06] bg-ink/[0.015] py-6">
                <div className="flex overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_12%,black_88%,transparent)]">
                    <div className="kt-marquee flex shrink-0 items-center gap-10 pr-10">
                        {[0, 1].map(k => (
                            <div key={k} className="flex shrink-0 items-center gap-10" aria-hidden={k === 1}>
                                {[...SEGMENTS, ...SERVICES.slice(0, 6).map(s => s.title)].map(t => (
                                    <span key={t + k} className="flex shrink-0 items-center gap-10 whitespace-nowrap text-[15px] text-ink/40">
                                        {t}<span className="h-1 w-1 rounded-full bg-ink/20" />
                                    </span>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ---------------- Valores ---------------- */}
            <section className="relative py-20 sm:py-24">
                <div className="mx-auto max-w-6xl px-5 sm:px-6">
                    <div className="grid gap-px overflow-hidden rounded-3xl border border-ink/[0.07] bg-ink/[0.07] sm:grid-cols-2 lg:grid-cols-4">
                        {VALUES.map(([Icon, t, d], i) => (
                            <Reveal key={t} delay={i * 70} className="bg-kt-surface p-7">
                                <Icon size={20} className="text-kt-accent" />
                                <p className="mt-5 text-[17px] font-semibold text-ink">{t}</p>
                                <p className="mt-1.5 text-sm leading-relaxed text-ink/45">{d}</p>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* ---------------- Serviços ---------------- */}
            <section id="servicos" className="relative scroll-mt-24 py-16 sm:py-24">
                <Glow className="left-[-200px] top-40 h-[500px] w-[500px] bg-[#3f5bd6]/15" />
                <div className="relative mx-auto max-w-6xl px-5 sm:px-6">
                    <SectionTitle eyebrow="Serviços" title={<>Tudo que o seu negócio precisa <span className="kt-serif italic text-kt-accent-strong">na internet</span></>} text="Do primeiro site ao sistema completo de gestão — cuidamos de tudo, do layout ao suporte." />
                    <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {SERVICES.map((s, i) => (
                            <Reveal key={s.title} delay={(i % 3) * 70}>
                                <button
                                    onClick={() => openQuote(s.title)}
                                    className="group relative h-full w-full overflow-hidden rounded-3xl border border-ink/[0.07] bg-gradient-to-b from-ink/[0.045] to-ink/[0.01] p-7 text-left transition duration-300 hover:-translate-y-0.5 hover:border-[#7c93ff]/35"
                                >
                                    <span className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-[#6f86ff]/0 blur-3xl transition duration-500 group-hover:bg-[#6f86ff]/25" />
                                    <span className="relative flex h-12 w-12 items-center justify-center rounded-2xl border border-ink/10 bg-gradient-to-b from-ink/[0.08] to-ink/[0.02] text-kt-accent-strong shadow-[inset_0_1px_0_rgba(255,255,255,.08)]">
                                        <s.icon size={21} strokeWidth={1.6} />
                                    </span>
                                    <h3 className="relative mt-6 text-[18px] font-semibold tracking-tight text-ink">{s.title}</h3>
                                    <p className="relative mt-2 text-[14.5px] leading-relaxed text-ink/50">{s.text}</p>
                                    <span className="relative mt-5 inline-flex items-center gap-1.5 text-[13px] font-medium text-kt-accent opacity-70 transition group-hover:opacity-100">
                                        Pedir orçamento <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                                    </span>
                                </button>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* ---------------- Projetos ---------------- */}
            <section id="projetos" className="relative scroll-mt-24 py-16 sm:py-24">
                <div className="relative mx-auto max-w-6xl px-5 sm:px-6">
                    <div className="flex flex-wrap items-end justify-between gap-6">
                        <SectionTitle eyebrow="Projetos" title={<>Sistemas que já <span className="kt-serif italic text-kt-accent-strong">estão rodando</span></>} text="Alguns dos projetos que desenvolvemos e que estão em uso hoje." />
                        <a href="#/projetos" className="hidden items-center gap-2 text-sm font-medium text-ink/70 transition hover:text-ink sm:inline-flex">Ver mais projetos <ArrowRight size={15} /></a>
                    </div>
                    <div className="mt-14 space-y-6">
                        {PORTFOLIO.slice(0, HOME_PROJECTS).map((p, i) => <ProjectRow key={p.id} item={p} reverse={i % 2 === 1} onOpen={() => setProject(p)} />)}
                    </div>
                    <Reveal className="mt-12 flex justify-center">
                        <GhostLink href="#/projetos">Ver mais projetos <ArrowRight size={16} /></GhostLink>
                    </Reveal>
                </div>
            </section>

            {/* ---------------- Processo ---------------- */}
            <section id="processo" className="relative scroll-mt-24 py-16 sm:py-24">
                <div className="relative mx-auto max-w-6xl px-5 sm:px-6">
                    <SectionTitle center eyebrow="Processo" title={<>Do primeiro contato ao <span className="kt-serif italic text-kt-accent-strong">projeto no ar</span></>} />
                    <div className="relative mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                        <span className="pointer-events-none absolute left-[12%] right-[12%] top-[38px] hidden h-px bg-gradient-to-r from-transparent via-[#7c93ff]/40 to-transparent lg:block" />
                        {STEPS.map((s, i) => (
                            <Reveal key={s.title} delay={i * 90} className="relative rounded-3xl border border-ink/[0.07] bg-kt-surface p-7">
                                <span className="kt-serif block text-[44px] italic leading-none text-kt-accent/80">0{i + 1}</span>
                                <h3 className="mt-5 flex items-center gap-2 text-[17px] font-semibold text-ink"><s.icon size={17} className="text-ink/40" />{s.title}</h3>
                                <p className="mt-2 text-sm leading-relaxed text-ink/50">{s.text}</p>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* ---------------- Sistema para barbearias ---------------- */}
            <BarberShowcase />

            {/* ---------------- Planos ---------------- */}
            <section id="planos" className="relative scroll-mt-24 py-16 sm:py-24">
                <Glow className="left-1/2 top-24 h-[520px] w-[900px] -translate-x-1/2 bg-[#3f5bd6]/15" />
                <div className="relative mx-auto max-w-6xl px-5 sm:px-6">
                    <SectionTitle center eyebrow="Planos" title={<>Sistemas prontos para o <span className="kt-serif italic text-kt-accent-strong">seu segmento</span></>} text="Comece rápido com um sistema pronto, com a sua marca — ou peça um projeto exclusivo." />
                    <Reveal className="mx-auto mt-8 flex max-w-3xl flex-wrap justify-center gap-2">
                        {SEGMENTS.map(s => <span key={s} className="rounded-full border border-ink/10 bg-ink/[0.03] px-3.5 py-1.5 text-[13px] text-ink/60">{s}</span>)}
                    </Reveal>
                    <PlanCards />
                    <CustomPlanCard onQuote={() => openQuote("Sistema sob medida")} />
                </div>
            </section>

            {/* ---------------- Dúvidas ---------------- */}
            <Faq />

            {/* ---------------- Chamada final ---------------- */}
            <ContactBand onQuote={() => openQuote()} />

            <Footer onQuote={() => openQuote()} isLight={isLight} />
            {project && <ProjectModal item={project} onClose={() => setProject(null)} onQuote={() => { setProject(null); openQuote(); }} />}
            {quoteModal}
        </div>
    );
}

/* ------------------------------------------------------------------ Página de projetos */

export function ProjectsPage() {
    const { openQuote, quoteModal } = useQuote();
    const { isLight, toggle, rootClass } = useSiteTheme();
    const [project, setProject] = useState<PortfolioItem | null>(null);
    return (
        <div className={`min-h-screen overflow-x-clip ${rootClass} font-sans text-ink antialiased`}>
            <Header onQuote={() => openQuote()} isLight={isLight} onToggleTheme={toggle} />
            <section className="relative overflow-hidden pb-20 pt-32 sm:pt-40">
                <Glow className="left-1/2 top-[-260px] h-[560px] w-[900px] -translate-x-1/2 bg-[#3f5bd6]/30" />
                <div className="relative mx-auto max-w-6xl px-5 sm:px-6">
                    <a href="#/" className="inline-flex items-center gap-1.5 text-sm text-ink/50 hover:text-ink"><ChevronLeft size={16} /> Voltar ao início</a>
                    <div className="mt-8">
                        <SectionTitle eyebrow="Portfólio" title={<>Nossos <span className="kt-serif italic text-kt-accent-strong">projetos</span></>} text="Sites, sistemas e aplicativos que desenvolvemos e que estão em uso hoje. Clique para ver os detalhes." />
                    </div>
                    <div className="mt-14 grid gap-6 md:grid-cols-2">
                        {PORTFOLIO.map((p, i) => (
                            <Reveal key={p.id} delay={(i % 2) * 90}><ProjectCard item={p} onOpen={() => setProject(p)} /></Reveal>
                        ))}
                    </div>
                    <Reveal className="relative mt-16 overflow-hidden rounded-[28px] border border-dashed border-ink/15 bg-ink/[0.02] p-10 text-center">
                        <p className="text-2xl font-semibold tracking-tight">Novos projetos <span className="kt-serif italic text-kt-accent-strong">em breve</span> por aqui.</p>
                        <p className="mt-2 text-ink/50">Quer que o próximo seja o seu?</p>
                        <PrimaryButton onClick={() => openQuote()} className="mt-7">Fazer orçamento <ArrowRight size={17} /></PrimaryButton>
                    </Reveal>
                </div>
            </section>
            <Footer onQuote={() => openQuote()} isLight={isLight} />
            {project && <ProjectModal item={project} onClose={() => setProject(null)} onQuote={() => { setProject(null); openQuote(); }} />}
            {quoteModal}
        </div>
    );
}

/* ------------------------------------------------------------------ Blocos */

/** Vitrine do topo: prévias reais dos projetos em perspectiva, com destaques flutuando. */
function Showcase() {
    const [a, b] = PORTFOLIO;
    if (!a) return null;
    return (
        <div className="relative [perspective:2000px]">
            <Glow className="inset-x-10 bottom-0 top-10 bg-[#4b6bdc]/30" />
            <div className="relative rounded-[22px] border border-ink/10 bg-ink/[0.03] p-2 shadow-[0_50px_120px_-30px_var(--kt-shadow)] [transform:rotateX(10deg)] sm:p-2.5">
                <Frame src={a.images[0]} alt={a.name} />
            </div>
            {b && (
                <div className="absolute -bottom-8 -right-2 hidden w-[44%] rounded-[18px] border border-ink/10 bg-ink/[0.04] p-1.5 shadow-[0_30px_80px_-20px_var(--kt-shadow)] backdrop-blur sm:block lg:-right-10">
                    <Frame src={b.images[0]} alt={b.name} />
                </div>
            )}
            <div className="absolute -left-3 top-[18%] hidden items-center gap-3 rounded-2xl border border-ink/10 bg-kt-raised/85 px-4 py-3 text-left shadow-2xl backdrop-blur-xl sm:flex lg:-left-12" style={{ animation: "kt-float 6s ease-in-out infinite" }}>
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#25d366]/15 text-[#5ee39a]"><MessageCircle size={17} /></span>
                <div><p className="text-[13px] font-semibold text-ink">Pedido no WhatsApp</p><p className="text-[11px] text-ink/45">Mensagem pronta, em 1 toque</p></div>
            </div>
            <div className="absolute -left-2 bottom-[12%] hidden items-center gap-3 rounded-2xl border border-ink/10 bg-kt-raised/85 px-4 py-3 text-left shadow-2xl backdrop-blur-xl md:flex lg:-left-16" style={{ animation: "kt-float 7s ease-in-out infinite 1s" }}>
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#6f86ff]/20 text-kt-accent-strong"><Smartphone size={17} /></span>
                <div><p className="text-[13px] font-semibold text-ink">Perfeito no celular</p><p className="text-[11px] text-ink/45">Mobile first em tudo</p></div>
            </div>
        </div>
    );
}

function Frame({ src, alt }: { src: string; alt: string }) {
    return (
        <div className="overflow-hidden rounded-[16px] border border-ink/10 bg-kt-raised">
            <div className="flex items-center gap-1.5 border-b border-ink/[0.06] px-3 py-2">
                <span className="h-2 w-2 rounded-full bg-ink/15" /><span className="h-2 w-2 rounded-full bg-ink/15" /><span className="h-2 w-2 rounded-full bg-ink/15" />
            </div>
            <img src={src} alt={`Prévia: ${alt}`} className="block aspect-[16/10] w-full object-cover object-top" />
        </div>
    );
}

/** Projeto em destaque na página inicial (imagem grande + texto, alternando os lados). */
function ProjectRow({ item, reverse, onOpen }: { item: PortfolioItem; reverse: boolean; onOpen: () => void }) {
    return (
        <Reveal>
            <article className="group grid items-center gap-8 overflow-hidden rounded-[28px] border border-ink/[0.07] bg-gradient-to-b from-ink/[0.04] to-ink/[0.01] p-3 sm:p-4 lg:grid-cols-[1.35fr_1fr] lg:gap-12">
                <button onClick={onOpen} aria-label={`Ver detalhes de ${item.name}`} className={`relative block overflow-hidden rounded-[20px] border border-ink/[0.06] bg-kt-raised ${reverse ? "lg:order-2" : ""}`}>
                    <img src={item.images[0]} alt={`Prévia do projeto ${item.name}`} loading="lazy" className="aspect-[16/10] w-full object-cover object-top transition duration-700 group-hover:scale-[1.025]" />
                    <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-kt-bg/40 via-transparent to-transparent" />
                    {item.images.length > 1 && <span className="absolute bottom-3 right-3 rounded-full bg-black/60 px-2.5 py-1 text-[11px] font-medium text-[#fff] backdrop-blur">{item.images.length} fotos</span>}
                </button>
                <div className={`px-3 pb-5 sm:px-4 lg:px-2 lg:pb-0 ${reverse ? "lg:order-1 lg:pl-8" : "lg:pr-8"}`}>
                    <p className="text-[12px] font-medium uppercase tracking-[0.18em] text-kt-accent">{item.category}</p>
                    <h3 className="mt-3 text-[28px] font-semibold leading-tight tracking-tight text-ink sm:text-[32px]">{item.name}</h3>
                    <p className="mt-3 leading-relaxed text-ink/55">{item.summary}</p>
                    <ul className="mt-6 space-y-2.5 text-[14.5px] text-ink/70">
                        {item.highlights.slice(0, 3).map(h => <li key={h} className="flex gap-3"><Check size={16} className="mt-0.5 shrink-0 text-kt-check" />{h}</li>)}
                    </ul>
                    <button onClick={onOpen} className="mt-8 inline-flex h-11 items-center gap-2 rounded-full border border-ink/12 bg-ink/[0.04] px-5 text-sm font-medium text-ink transition hover:border-ink/25 hover:bg-ink/[0.08]">
                        Ver detalhes <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
                    </button>
                </div>
            </article>
        </Reveal>
    );
}

function ProjectCard({ item, onOpen }: { item: PortfolioItem; onOpen: () => void }) {
    return (
        <article className="group flex h-full flex-col overflow-hidden rounded-[28px] border border-ink/[0.07] bg-gradient-to-b from-ink/[0.04] to-ink/[0.01] p-3">
            <button onClick={onOpen} className="relative block overflow-hidden rounded-[20px] border border-ink/[0.06] bg-kt-raised" aria-label={`Ver detalhes de ${item.name}`}>
                <img src={item.images[0]} alt={`Prévia do projeto ${item.name}`} loading="lazy" className="aspect-[16/10] w-full object-cover object-top transition duration-700 group-hover:scale-[1.03]" />
                {item.images.length > 1 && <span className="absolute bottom-3 right-3 rounded-full bg-black/60 px-2.5 py-1 text-[11px] font-medium text-[#fff] backdrop-blur">{item.images.length} fotos</span>}
            </button>
            <div className="flex flex-1 flex-col p-4 pt-6">
                <p className="text-[12px] font-medium uppercase tracking-[0.18em] text-kt-accent">{item.category}</p>
                <h3 className="mt-2 text-[22px] font-semibold tracking-tight text-ink">{item.name}</h3>
                <p className="mt-2 flex-1 text-[14.5px] leading-relaxed text-ink/55">{item.summary}</p>
                <button onClick={onOpen} className="mt-6 inline-flex h-10 w-fit items-center gap-2 rounded-full border border-ink/12 bg-ink/[0.04] px-4 text-sm font-medium text-ink hover:bg-ink/[0.08]">
                    Ver detalhes <ArrowRight size={15} />
                </button>
            </div>
        </article>
    );
}

/** Detalhes do projeto: fotos, descrição e funcionalidades (sem link para o sistema). */
function ProjectModal({ item, onClose, onQuote }: { item: PortfolioItem; onClose: () => void; onQuote: () => void }) {
    const [i, setI] = useState(0);
    const n = item.images.length;
    return (
        <Modal onClose={onClose} label={item.name} wide>
            <div className="relative bg-kt-surface">
                <img src={item.images[i]} alt={`${item.name} — imagem ${i + 1}`} className="block max-h-[50svh] w-full object-contain" />
                {n > 1 && (
                    <>
                        <button onClick={() => setI((i - 1 + n) % n)} aria-label="Imagem anterior" className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-ink/10 bg-black/50 text-[#fff] backdrop-blur hover:bg-black/70"><ChevronLeft size={20} /></button>
                        <button onClick={() => setI((i + 1) % n)} aria-label="Próxima imagem" className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-ink/10 bg-black/50 text-[#fff] backdrop-blur hover:bg-black/70"><ChevronRight size={20} /></button>
                        <span className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-black/60 px-2.5 py-1 text-[11px] font-medium text-[#fff]">{i + 1} / {n}</span>
                    </>
                )}
                <button onClick={onClose} aria-label="Fechar" className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full border border-ink/10 bg-black/50 text-[#fff] backdrop-blur hover:bg-black/70"><X size={18} /></button>
            </div>
            <div className="overflow-y-auto p-6 sm:p-9">
                <p className="text-[12px] font-medium uppercase tracking-[0.18em] text-kt-accent">{item.category}</p>
                <h2 className="mt-2 text-[30px] font-semibold tracking-tight">{item.name}</h2>
                <p className="mt-4 leading-relaxed text-ink/60">{item.details}</p>
                <ul className="mt-7 grid gap-3 text-[14.5px] text-ink/75 sm:grid-cols-2">
                    {item.highlights.map(h => <li key={h} className="flex gap-3"><Check size={16} className="mt-0.5 shrink-0 text-kt-check" /><span>{h}</span></li>)}
                </ul>
                <div className="mt-9 flex flex-col gap-4 border-t border-ink/[0.07] pt-7 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-ink/55">Quer um projeto parecido para o seu negócio?</p>
                    <PrimaryButton onClick={onQuote}>Fazer orçamento <ArrowRight size={16} /></PrimaryButton>
                </div>
            </div>
        </Modal>
    );
}

export function PlanCards() {
    return (
        <div className="mt-14 grid items-stretch gap-5 lg:grid-cols-3">
            {PLANS.map((p, idx) => {
                const featured = !!p.highlight;
                const card = (
                    <div className={`relative flex h-full flex-col rounded-[27px] p-7 sm:p-8 ${featured ? "bg-kt-raised" : "border border-ink/[0.08] bg-ink/[0.025]"}`}>
                        {featured && <Glow className="-top-20 left-1/2 h-40 w-64 -translate-x-1/2 bg-[#6f86ff]/35" />}
                        <div className="relative flex items-center justify-between gap-2">
                            <h3 className="text-lg font-semibold text-ink">{p.name}</h3>
                            {featured && <span className="rounded-full bg-gradient-to-r from-[#6f86ff] to-[#9f7aea] px-3 py-1 text-[11px] font-semibold text-[#fff]">{p.highlight}</span>}
                        </div>
                        <p className="relative mt-1.5 text-sm text-ink/50">{p.description}</p>
                        <p className="relative mt-8 flex flex-wrap items-baseline gap-x-1.5">
                            <span className="w-full text-[12px] text-ink/40">a partir de</span>
                            <span className="text-[42px] font-semibold tracking-[-0.03em] text-ink tabular">{formatBRL(p.price)}</span>
                            <span className="text-sm text-ink/45">{p.period}</span>
                        </p>
                        <p className="relative mt-1 min-h-4 text-xs font-medium text-kt-check">
                            {p.id === "anual" && `Equivale a ${formatBRL(p.price / 12)}/mês`}
                            {p.id === "vitalicio" && "Sem mensalidade"}
                        </p>
                        <a
                            href={whatsappLink(`Olá! Tenho interesse no plano *${p.name}* (a partir de ${formatBRL(p.price)}${p.period.startsWith("/") ? p.period : " - " + p.period}) de um sistema pronto da KT Sistemas.`)}
                            target="_blank"
                            rel="noreferrer"
                            className={`relative mt-7 inline-flex h-12 items-center justify-center gap-2 rounded-full text-sm font-semibold transition ${featured ? "bg-ink text-inkbg hover:bg-ink/90" : "border border-ink/12 bg-ink/[0.04] text-ink hover:bg-ink/[0.08]"}`}
                        >
                            Quero o plano {p.name.toLowerCase()} <ArrowUpRight size={15} />
                        </a>
                        <ul className="relative mt-8 flex-1 space-y-3 border-t border-ink/[0.07] pt-7 text-[14px] text-ink/65">
                            {PLAN_FEATURES.map(f => <li key={f} className="flex gap-3"><Check size={16} className="mt-0.5 shrink-0 text-kt-check" /><span>{f}</span></li>)}
                        </ul>
                    </div>
                );
                return (
                    <Reveal key={p.id} delay={idx * 90} className="h-full">
                        {featured ? <div className="h-full rounded-[28px] bg-gradient-to-b from-[#8ea2ff] via-[#4b6bdc]/60 to-ink/10 p-px shadow-[0_30px_80px_-30px_rgba(91,118,255,.7)]">{card}</div> : card}
                    </Reveal>
                );
            })}
        </div>
    );
}

function CustomPlanCard({ onQuote }: { onQuote: () => void }) {
    return (
        <Reveal className="mt-5">
            <div className="kt-force-dark relative overflow-hidden rounded-[28px] border border-ink/10 bg-gradient-to-br from-[#131a33] via-[#0b1020] to-[#0a0d18] p-7 sm:p-10">
                <Glow className="-right-24 -top-24 h-80 w-80 bg-[#6f86ff]/30" />
                <Glow className="-bottom-32 left-10 h-72 w-72 bg-[#9f7aea]/15" />
                <div className="relative grid gap-10 lg:grid-cols-[1.1fr_1.4fr] lg:items-center">
                    <div>
                        <span className="rounded-full border border-ink/15 bg-ink/[0.06] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-ink/80">Exclusivo</span>
                        <h3 className="mt-5 text-[32px] font-semibold leading-tight tracking-tight text-ink">Sistema <span className="kt-serif italic text-kt-accent-strong">{CUSTOM_PLAN.name.toLowerCase()}</span></h3>
                        <p className="mt-3 text-ink/55">{CUSTOM_PLAN.description}</p>
                        <p className="mt-7 flex flex-wrap items-baseline gap-x-1.5">
                            <span className="w-full text-[12px] text-ink/40">a partir de</span>
                            <span className="text-[40px] font-semibold tracking-[-0.03em] text-[#fff] tabular">{formatBRL(CUSTOM_PLAN.price)}</span>
                        </p>
                        <PrimaryButton onClick={onQuote} className="mt-6">Fazer orçamento <ArrowRight size={16} /></PrimaryButton>
                    </div>
                    <ul className="grid gap-x-6 gap-y-4 text-[14.5px] sm:grid-cols-2">
                        {CUSTOM_PLAN.features.map(f => (
                            <li key={f} className="flex gap-3 text-ink/75"><Check size={16} className="mt-0.5 shrink-0 text-kt-check" /><span>{f}</span></li>
                        ))}
                    </ul>
                </div>
            </div>
        </Reveal>
    );
}

function Faq() {
    const [open, setOpen] = useState<number | null>(0);
    return (
        <section id="duvidas" className="relative scroll-mt-24 py-16 sm:py-24">
            <div className="mx-auto grid max-w-6xl gap-12 px-5 sm:px-6 lg:grid-cols-[1fr_1.5fr]">
                <div>
                    <SectionTitle eyebrow="Dúvidas" title={<>Perguntas <span className="kt-serif italic text-kt-accent-strong">frequentes</span></>} text="Não achou sua resposta? Chame a gente no WhatsApp." />
                    <Reveal>
                        <a href={whatsappLink("Olá! Tenho uma dúvida sobre os serviços da KT Sistemas.")} target="_blank" rel="noreferrer" className="mt-8 inline-flex h-11 items-center gap-2 rounded-full border border-ink/12 bg-ink/[0.04] px-5 text-sm font-medium text-ink hover:bg-ink/[0.08]">
                            <MessageCircle size={16} /> Falar no WhatsApp
                        </a>
                    </Reveal>
                </div>
                <Reveal className="divide-y divide-ink/[0.07] rounded-[28px] border border-ink/[0.07] bg-ink/[0.02] px-2">
                    {FAQ.map((f, i) => (
                        <div key={f.q}>
                            <button onClick={() => setOpen(open === i ? null : i)} aria-expanded={open === i} className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left text-[16px] font-medium text-ink">
                                {f.q}
                                <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-ink/10 text-ink/60 transition-transform duration-300 ${open === i ? "rotate-45 bg-ink/10" : ""}`}><Plus size={16} /></span>
                            </button>
                            <div className={`grid transition-all duration-300 ${open === i ? "grid-rows-[1fr] pb-5" : "grid-rows-[0fr]"}`}>
                                <p className="overflow-hidden px-5 text-[14.5px] leading-relaxed text-ink/55">{f.a}</p>
                            </div>
                        </div>
                    ))}
                </Reveal>
            </div>
        </section>
    );
}

function ContactBand({ onQuote }: { onQuote: () => void }) {
    return (
        <section id="contato" className="relative scroll-mt-24 px-5 pb-24 pt-8 sm:px-6">
            <Reveal className="kt-force-dark relative mx-auto max-w-6xl overflow-hidden rounded-[32px] border border-ink/10 bg-gradient-to-br from-[#1a2350] via-[#101632] to-[#0a0d18] px-6 py-16 text-center sm:px-14 sm:py-24">
                <div className="pointer-events-none absolute inset-0 [background-image:radial-gradient(rgba(255,255,255,.07)_1px,transparent_1px)] [background-size:22px_22px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
                <Glow className="left-1/2 top-[-120px] h-80 w-[640px] -translate-x-1/2 bg-[#6f86ff]/35" />
                <div className="relative">
                    <h2 className="mx-auto max-w-3xl text-[36px] font-semibold leading-[1.05] tracking-[-0.035em] text-ink sm:text-[60px]">
                        Vamos construir algo <span className="kt-serif kt-gradient-text italic">incrível</span> juntos?
                    </h2>
                    <p className="mx-auto mt-5 max-w-xl text-[17px] text-ink/60">Conte o que você precisa e receba uma proposta sem compromisso. Respondemos rapidinho pelo WhatsApp.</p>
                    <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
                        <button onClick={onQuote} className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-ink px-7 text-[15px] font-semibold text-inkbg transition hover:bg-ink/90 sm:w-auto">
                            Fazer orçamento <ArrowRight size={17} />
                        </button>
                        <a href={mailtoLink("Orçamento — KT Sistemas", "Olá! Gostaria de um orçamento para um projeto.")} className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full border border-ink/15 bg-ink/[0.05] px-7 text-[15px] font-medium text-ink hover:bg-ink/10 sm:w-auto">
                            <Mail size={17} /> Enviar e-mail
                        </a>
                    </div>
                    <p className="mt-8 text-sm text-ink/40">{COMPANY.whatsappDisplay} · {COMPANY.email}</p>
                </div>
            </Reveal>
        </section>
    );
}
