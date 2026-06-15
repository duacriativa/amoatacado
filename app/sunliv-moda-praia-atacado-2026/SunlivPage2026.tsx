'use client';

import { useState } from 'react';

const PHOTOS = [
    '/images/sunliv/catalog-1.jpg',
    '/images/sunliv/catalog-2.jpg',
    '/images/sunliv/catalog-3.jpg',
    '/images/sunliv/catalog-4.jpg',
    '/images/sunliv/catalog-5.jpg',
    '/images/sunliv/catalog-6.jpg',
    '/images/sunliv/catalog-7.jpg',
    '/images/sunliv/catalog-8.jpg',
];
const IMG = (n: number) => PHOTOS[(n - 1) % PHOTOS.length];

const WA = "https://wa.me/5585991613500?text=Ol%C3%A1!%20Vim%20pela%20p%C3%A1gina%20da%20Amo%20Atacado%20e%20gostaria%20de%20revender%20a%20Sunliv.";

const STYLES = `
.sl-page {
  --sl-p: oklch(0.68 0.19 38);
  --sl-pg: oklch(0.78 0.17 60);
  --sl-ink: oklch(0.18 0.03 35);
  --sl-sand: oklch(0.96 0.025 75);
  --sl-bg: oklch(0.985 0.012 80);
  --sl-fg: oklch(0.22 0.04 35);
  --sl-muted: oklch(0.5 0.04 40);
  --sl-border: oklch(0.9 0.02 70);
  --sl-wa: oklch(0.66 0.17 145);
  --sl-gs: linear-gradient(135deg, oklch(0.78 0.17 60), oklch(0.68 0.19 38) 55%, oklch(0.58 0.18 18));
  background: var(--sl-bg);
  color: var(--sl-fg);
  font-family: 'Inter', ui-sans-serif, system-ui, sans-serif;
  -webkit-font-smoothing: antialiased;
}
.sl-page h1, .sl-page h2, .sl-page h3, .sl-display {
  font-family: var(--font-display-sl, 'Cormorant Garamond', ui-serif, Georgia, serif);
  font-weight: 300;
  letter-spacing: 0.02em;
}
.sl-c-gradient {
  background: var(--sl-gs);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}
.sl-gradient { background-image: var(--sl-gs); }
.sl-sw { box-shadow: 0 10px 40px -10px oklch(0.68 0.19 38 / 0.45); }
.sl-ss { box-shadow: 0 1px 2px oklch(0.4 0.05 40 / 0.06), 0 8px 24px oklch(0.4 0.05 40 / 0.08); }
@keyframes sl-float { 0%, 100% { transform: translateY(0) rotate(-6deg); } 50% { transform: translateY(-10px) rotate(-6deg); } }
@keyframes sl-float-r { 0%, 100% { transform: translateY(0) rotate(5deg); } 50% { transform: translateY(-10px) rotate(5deg); } }
.sl-float { animation: sl-float 6s ease-in-out infinite; }
.sl-float-d { animation: sl-float-r 6s ease-in-out -3s infinite; }
@keyframes sl-scroll { from { transform: translateX(0); } to { transform: translateX(-33.33%); } }
.sl-scroll { animation: sl-scroll 30s linear infinite; display: flex; gap: 3rem; white-space: nowrap; }
`;

function WhatsIcon({ className = "h-5 w-5" }: { className?: string }) {
    return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
            <path d="M19.11 4.91A10 10 0 0 0 3.5 17.2L2 22l4.93-1.45A10 10 0 1 0 19.11 4.9Zm-7.1 15.4a8.3 8.3 0 0 1-4.23-1.15l-.3-.18-2.93.86.88-2.85-.2-.31a8.32 8.32 0 1 1 6.78 3.63Zm4.55-6.22c-.25-.13-1.47-.72-1.7-.8-.23-.09-.4-.13-.56.13-.17.25-.65.8-.8.97-.14.16-.29.18-.54.06-.25-.13-1.05-.39-2-1.23-.74-.66-1.24-1.47-1.38-1.73-.14-.25-.02-.39.1-.51.1-.1.25-.27.37-.4.13-.14.17-.23.25-.39.08-.16.04-.3-.02-.43-.06-.13-.55-1.34-.76-1.83-.2-.48-.4-.42-.55-.42h-.47c-.16 0-.43.06-.66.3-.23.25-.86.85-.86 2.06s.88 2.4 1 2.56c.13.16 1.74 2.66 4.22 3.72.59.26 1.05.41 1.41.52.59.19 1.12.16 1.55.1.47-.07 1.47-.6 1.68-1.18.2-.58.2-1.08.14-1.18-.06-.1-.22-.16-.47-.29Z" />
        </svg>
    );
}

function StarIcon() {
    return <svg viewBox="0 0 20 20" className="h-4 w-4" fill="currentColor"><path d="M10 1.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L10 14.9l-5.2 2.7 1-5.8L1.5 7.7l5.9-.9L10 1.5z" /></svg>;
}

function CheckIcon() {
    return <svg viewBox="0 0 20 20" className="h-4 w-4 shrink-0" fill="currentColor" style={{ color: 'var(--sl-p)' }}><path d="M16.7 5.3a1 1 0 0 1 0 1.4l-7 7a1 1 0 0 1-1.4 0l-4-4a1 1 0 1 1 1.4-1.4L9 11.6l6.3-6.3a1 1 0 0 1 1.4 0Z" /></svg>;
}

function CTAWa({ children, variant = "wa", className = "" }: {
    children: React.ReactNode;
    variant?: "wa" | "dark" | "ghost";
    className?: string;
}) {
    const base = "inline-flex items-center justify-center gap-2 rounded-full px-7 py-4 text-base font-semibold tracking-tight transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0";
    const varStyles: Record<string, React.CSSProperties> = {
        wa: { background: 'var(--sl-wa)', color: '#fff' },
        dark: { background: 'var(--sl-ink)', color: 'var(--sl-bg)' },
        ghost: { border: '1px solid var(--sl-border)', background: 'rgba(255,255,255,0.6)', backdropFilter: 'blur(8px)' },
    };
    return (
        <a href={WA} target="_blank" rel="noopener" className={`${base} ${className}`} style={varStyles[variant]}>
            {children}
        </a>
    );
}

function Nav() {
    return (
        <header className="sticky top-0 z-40 backdrop-blur-md" style={{ borderBottom: '1px solid oklch(0.9 0.02 70 / 0.6)', background: 'oklch(0.985 0.012 80 / 0.8)' }}>
            <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
                <a href="#top" className="sl-display text-2xl tracking-[0.18em] uppercase" style={{ fontWeight: 700 }}>
                    SUNLIV
                </a>
                <nav className="hidden items-center gap-8 text-sm md:flex" style={{ color: 'var(--sl-muted)' }}>
                    <a href="#vantagens" className="hover:opacity-80 transition-opacity">Vantagens</a>
                    <a href="#colecao" className="hover:opacity-80 transition-opacity">Coleção</a>
                    <a href="#como-funciona" className="hover:opacity-80 transition-opacity">Como funciona</a>
                    <a href="#faq" className="hover:opacity-80 transition-opacity">FAQ</a>
                </nav>
                <CTAWa variant="wa" className="px-4 py-2.5 text-sm">
                    <WhatsIcon className="h-4 w-4" /> Falar agora
                </CTAWa>
            </div>
        </header>
    );
}

function Hero() {
    return (
        <section id="top" className="relative overflow-hidden">
            <div className="absolute inset-0 -z-10" style={{
                background: 'radial-gradient(60% 50% at 85% 10%, oklch(0.92 0.08 70) 0%, transparent 60%), radial-gradient(40% 40% at 10% 90%, oklch(0.9 0.06 200) 0%, transparent 60%)'
            }} />
            <div className="mx-auto grid max-w-7xl gap-12 px-5 pt-12 pb-20 md:grid-cols-12 md:items-center md:gap-8 md:pt-20 md:pb-28">
                <div className="md:col-span-6">
                    <span className="inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium uppercase tracking-[0.18em] backdrop-blur"
                        style={{ borderColor: 'oklch(0.68 0.19 38 / 0.25)', background: 'rgba(255,255,255,0.7)', color: 'var(--sl-p)' }}>
                        <span className="h-1.5 w-1.5 rounded-full animate-pulse" style={{ background: 'var(--sl-p)' }} />
                        Direto da fábrica · Fortaleza · CE
                    </span>

                    <h1 className="mt-6 text-6xl leading-[1.05] tracking-[0.02em] md:text-8xl">
                        Moda praia que <em className="not-italic sl-c-gradient">vende sozinha</em> na sua loja.
                    </h1>

                    <p className="mt-6 max-w-xl text-lg md:text-xl" style={{ color: 'var(--sl-muted)' }}>
                        Sunliv é a marca de biquínis e maiôs que revendedoras estão pedindo de novo em{' '}
                        <strong style={{ color: 'var(--sl-fg)' }}>menos de 30 dias</strong>. Pedido mínimo de 10 peças, margem acima de 100% e envio em até 48h.
                    </p>

                    <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                        <CTAWa variant="wa"><WhatsIcon /> Quero receber o catálogo</CTAWa>
                        <a href="#colecao" className="inline-flex items-center justify-center gap-2 rounded-full border px-7 py-4 text-base font-semibold backdrop-blur transition hover:bg-white/80"
                            style={{ borderColor: 'var(--sl-border)', background: 'rgba(255,255,255,0.6)' }}>
                            Ver coleção ↓
                        </a>
                    </div>

                    <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm" style={{ color: 'var(--sl-muted)' }}>
                        {["Pedido mínimo 10 peças", "Envio em 48h", "Fabricação própria", "Sem mensalidade"].map((t) => (
                            <li key={t} className="flex items-center gap-2"><CheckIcon />{t}</li>
                        ))}
                    </ul>

                    <div className="mt-10 flex items-center gap-4 border-t pt-6" style={{ borderColor: 'oklch(0.9 0.02 70 / 0.6)' }}>
                        <div className="flex -space-x-2">
                            {[1, 2, 3, 4].map((i) => (
                                <img key={i} src={IMG(i)} alt="" className="h-10 w-10 rounded-full border-2 border-white object-cover object-top" />
                            ))}
                        </div>
                        <div>
                            <div className="flex items-center gap-1" style={{ color: 'var(--sl-p)' }}>
                                {Array.from({ length: 5 }).map((_, i) => <StarIcon key={i} />)}
                            </div>
                            <p className="text-sm" style={{ color: 'var(--sl-muted)' }}>
                                <strong style={{ color: 'var(--sl-fg)' }}>+500 revendedoras</strong> ativas no Brasil
                            </p>
                        </div>
                    </div>
                </div>

                <div className="relative md:col-span-6">
                    <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] sl-sw">
                        <img src={IMG(2)} alt="Modelo usando biquíni Sunliv na praia" className="h-full w-full object-cover object-top" />
                        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/40 to-transparent" />
                        <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between">
                            <div className="rounded-2xl px-4 py-3 sl-ss" style={{ background: 'rgba(255,255,255,0.95)' }}>
                                <p className="text-[11px] uppercase tracking-widest" style={{ color: 'var(--sl-muted)' }}>Coleção verão</p>
                                <p className="sl-display text-lg font-semibold">Sunliv 26'</p>
                            </div>
                            <CTAWa variant="wa" className="px-5 py-3 text-sm">
                                <WhatsIcon className="h-4 w-4" /> Falar no WhatsApp
                            </CTAWa>
                        </div>
                    </div>

                    <div className="absolute -left-6 -top-6 hidden w-48 rounded-2xl p-3 sl-sw sl-float md:block" style={{ background: 'white' }}>
                        <img src={IMG(5)} alt="" className="aspect-[3/4] w-full rounded-xl object-cover object-top" />
                        <p className="px-1 pt-2 text-xs font-medium">Top cortininha</p>
                        <p className="px-1 text-xs" style={{ color: 'var(--sl-p)' }}>Coleção verão</p>
                    </div>

                    <div className="absolute -right-4 bottom-10 hidden w-44 rounded-2xl p-3 sl-sw sl-float-d md:block" style={{ background: 'white' }}>
                        <img src={IMG(7)} alt="" className="aspect-[3/4] w-full rounded-xl object-cover object-top" />
                        <p className="px-1 pt-2 text-xs font-medium">Maiô hot pant</p>
                        <p className="px-1 text-xs" style={{ color: 'var(--sl-p)' }}>Best-seller</p>
                    </div>
                </div>
            </div>
        </section>
    );
}

function Marquee() {
    const items = ["Fabricação própria", "Pedido mínimo 10 peças", "Envio em 48h", "Margem 100%+", "Coleção 2026", "Sem mensalidade", "Atendimento exclusivo"];
    return (
        <div className="border-y overflow-hidden py-4" style={{ borderColor: 'oklch(0.9 0.02 70 / 0.6)', background: 'var(--sl-ink)', color: 'var(--sl-bg)' }}>
            <div className="sl-scroll">
                {[...items, ...items, ...items].map((t, i) => (
                    <span key={i} className="sl-display inline-flex items-center gap-3 text-sm tracking-wide uppercase shrink-0">
                        <span className="h-1.5 w-1.5 rounded-full shrink-0" style={{ background: 'var(--sl-p)' }} /> {t}
                    </span>
                ))}
            </div>
        </div>
    );
}

function Benefits() {
    const items = [
        { k: "100%+", t: "Margem real", d: "Compra a R$ 25, revenda a R$ 79. Lucro que paga as contas no primeiro pedido." },
        { k: "10", t: "Peças mínimas", d: "Comece pequeno, escale rápido. Sem investimento alto, sem estoque parado." },
        { k: "48h", t: "Para enviar", d: "Pedido confirmado hoje, sai amanhã. Você gira estoque mais rápido que a concorrência." },
        { k: "12", t: "Anos de fábrica", d: "Costura premium, tecidos resistentes ao cloro e ao sol. Cliente volta porque dura." },
    ];
    return (
        <section id="vantagens" className="mx-auto max-w-7xl px-5 py-24">
            <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
                <div className="max-w-2xl">
                    <span className="text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: 'var(--sl-p)' }}>Por que Sunliv</span>
                    <h2 className="mt-3 text-4xl leading-tight tracking-[0.02em] md:text-6xl">
                        A oportunidade que <em className="not-italic sl-c-gradient">paga sozinha</em> no primeiro pedido.
                    </h2>
                </div>
                <p className="max-w-md" style={{ color: 'var(--sl-muted)' }}>
                    Lojistas pequenas estão faturando 5 dígitos com 50 peças. Sem loja física, sem CNPJ obrigatório, sem enrolação.
                </p>
            </div>

            <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
                {items.map((b) => (
                    <div key={b.t} className="group relative overflow-hidden rounded-3xl border p-7 sl-ss transition hover:-translate-y-1 hover:sl-sw"
                        style={{ borderColor: 'oklch(0.9 0.02 70 / 0.6)', background: 'white' }}>
                        <div className="sl-display text-6xl font-semibold sl-c-gradient">{b.k}</div>
                        <h3 className="mt-4 text-xl font-semibold">{b.t}</h3>
                        <p className="mt-2 text-sm" style={{ color: 'var(--sl-muted)' }}>{b.d}</p>
                        <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full" style={{ background: 'oklch(0.68 0.19 38 / 0.05)' }} />
                    </div>
                ))}
            </div>
        </section>
    );
}

function Collection() {
    const layout = [
        { n: 8, span: "md:col-span-2 md:row-span-2" },
        { n: 1, span: "" },
        { n: 2, span: "" },
        { n: 3, span: "md:col-span-2" },
        { n: 4, span: "" },
        { n: 6, span: "" },
        { n: 7, span: "md:col-span-2" },
    ];
    return (
        <section id="colecao" className="py-24" style={{ background: 'var(--sl-sand)' }}>
            <div className="mx-auto max-w-7xl px-5">
                <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
                    <div>
                        <span className="text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: 'var(--sl-p)' }}>Coleção verão 26'</span>
                        <h2 className="mt-3 text-4xl leading-tight tracking-[0.02em] md:text-6xl">
                            As peças que estão <br className="hidden md:inline" />
                            <em className="not-italic sl-c-gradient">esgotando</em> nas revendedoras.
                        </h2>
                    </div>
                    <p className="max-w-sm" style={{ color: 'var(--sl-muted)' }}>
                        Catálogo completo com mais de 80 modelos: biquínis, maiôs, saídas de praia, kits e linha plus.
                    </p>
                </div>

                <div className="mt-12 grid auto-rows-[260px] grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
                    {layout.map((it, i) => (
                        <figure key={i} className={`group relative overflow-hidden rounded-2xl ${it.span}`}>
                            <img src={IMG(it.n)} alt={`Sunliv coleção ${it.n}`} loading="lazy"
                                className="h-full w-full object-cover object-top transition duration-700 group-hover:scale-105" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 transition group-hover:opacity-100" />
                        </figure>
                    ))}
                </div>

                <div className="mt-12 flex flex-col items-center gap-3 text-center">
                    <CTAWa variant="wa"><WhatsIcon /> Receber catálogo completo com preços</CTAWa>
                    <p className="text-sm" style={{ color: 'var(--sl-muted)' }}>Envio imediato no WhatsApp · Sem compromisso</p>
                </div>
            </div>
        </section>
    );
}

function Numbers() {
    const stats = [
        { n: "+500", l: "Revendedoras ativas" },
        { n: "+80", l: "Modelos por coleção" },
        { n: "4.9★", l: "Avaliação no WhatsApp" },
        { n: "100%", l: "Produção em Fortaleza" },
    ];
    return (
        <section className="mx-auto max-w-7xl px-5 py-20">
            <div className="grid gap-px overflow-hidden rounded-3xl md:grid-cols-4" style={{ background: 'var(--sl-border)' }}>
                {stats.map((s) => (
                    <div key={s.l} className="p-8 text-center" style={{ background: 'var(--sl-bg)' }}>
                        <div className="sl-display text-5xl font-semibold sl-c-gradient md:text-6xl">{s.n}</div>
                        <div className="mt-2 text-sm uppercase tracking-widest" style={{ color: 'var(--sl-muted)' }}>{s.l}</div>
                    </div>
                ))}
            </div>
        </section>
    );
}

function HowItWorks() {
    const steps = [
        { n: "01", t: "Chama no WhatsApp", d: "Clica no botão e fala com nosso time. Sem formulário longo, sem espera." },
        { n: "02", t: "Recebe o catálogo", d: "Te enviamos o PDF completo com fotos, tabela de medidas e preços de atacado." },
        { n: "03", t: "Monta seu pedido", d: "Escolhe a partir de 10 peças, mix livre. Pagamento no Pix, cartão ou boleto." },
        { n: "04", t: "Recebe e vende", d: "Postamos em até 48h. Você posta no Insta e começa a girar no mesmo dia." },
    ];
    return (
        <section id="como-funciona" className="py-24" style={{ background: 'var(--sl-ink)', color: 'var(--sl-bg)' }}>
            <div className="mx-auto max-w-7xl px-5">
                <div className="max-w-2xl">
                    <span className="text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: 'var(--sl-pg)' }}>Como funciona</span>
                    <h2 className="mt-3 text-4xl leading-tight tracking-[0.02em] md:text-6xl">
                        Do primeiro <em className="not-italic sl-c-gradient">&ldquo;oi&rdquo;</em> ao primeiro lucro em{' '}
                        <span style={{ color: 'var(--sl-pg)' }}>5 dias.</span>
                    </h2>
                </div>
                <div className="mt-14 grid gap-6 md:grid-cols-4">
                    {steps.map((s, i) => (
                        <div key={s.n} className="relative rounded-2xl border p-6" style={{ borderColor: 'rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.03)' }}>
                            <div className="sl-display text-sm" style={{ color: 'var(--sl-pg)' }}>{s.n}</div>
                            <h3 className="mt-2 text-2xl font-semibold">{s.t}</h3>
                            <p className="mt-2 text-sm" style={{ color: 'rgba(245,240,230,0.65)' }}>{s.d}</p>
                            {i < steps.length - 1 && (
                                <span className="absolute right-4 top-8 hidden text-2xl md:block" style={{ color: 'var(--sl-p)' }}>→</span>
                            )}
                        </div>
                    ))}
                </div>
                <div className="mt-12">
                    <CTAWa variant="wa"><WhatsIcon /> Começar agora — leva 2 minutos</CTAWa>
                </div>
            </div>
        </section>
    );
}

function Testimonials() {
    const items = [
        { q: "As peças vendem muito rápido. Já estou no terceiro pedido em 2 meses, e meu Instagram não para de crescer.", n: "Juliana S.", c: "São Paulo · SP", img: IMG(1) },
        { q: "A margem é absurda. Comprei 30 peças, paguei o pedido em uma semana e ainda sobrou dinheiro pra dobrar o estoque.", n: "Carla M.", c: "Recife · PE", img: IMG(3) },
        { q: "Entrega rápida, qualidade premium e atendimento humano. Minha loja física só trabalha com a Sunliv agora.", n: "Patrícia A.", c: "Belo Horizonte · MG", img: IMG(4) },
    ];
    return (
        <section className="mx-auto max-w-7xl px-5 py-24">
            <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
                <div>
                    <span className="text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: 'var(--sl-p)' }}>Quem revende, aprova</span>
                    <h2 className="mt-3 text-4xl leading-tight tracking-[0.02em] md:text-6xl">
                        Mais de <em className="not-italic sl-c-gradient">500 lojistas</em> faturam <br className="hidden md:inline" /> com a Sunliv.
                    </h2>
                </div>
            </div>
            <div className="mt-12 grid gap-6 md:grid-cols-3">
                {items.map((t) => (
                    <figure key={t.n} className="flex flex-col rounded-3xl border p-7 sl-ss" style={{ borderColor: 'oklch(0.9 0.02 70 / 0.6)', background: 'white' }}>
                        <div className="flex items-center gap-1" style={{ color: 'var(--sl-p)' }}>
                            {Array.from({ length: 5 }).map((_, i) => <StarIcon key={i} />)}
                        </div>
                        <blockquote className="mt-4 sl-display text-xl leading-snug">&ldquo;{t.q}&rdquo;</blockquote>
                        <figcaption className="mt-6 flex items-center gap-3 border-t pt-4" style={{ borderColor: 'oklch(0.9 0.02 70 / 0.6)' }}>
                            <img src={t.img} alt="" className="h-11 w-11 rounded-full object-cover object-top" />
                            <div>
                                <div className="font-semibold">{t.n}</div>
                                <div className="text-sm" style={{ color: 'var(--sl-muted)' }}>{t.c}</div>
                            </div>
                        </figcaption>
                    </figure>
                ))}
            </div>
        </section>
    );
}

function FAQ() {
    const items = [
        { q: "Qual é o pedido mínimo?", a: "Apenas 10 peças no primeiro pedido — pode misturar modelos, cores e tamanhos como quiser." },
        { q: "Preciso ter CNPJ para comprar?", a: "Não. Vendemos para CPF e CNPJ. Se tiver CNPJ, conseguimos preço ainda melhor e nota fiscal completa." },
        { q: "Quais as formas de pagamento?", a: "Pix com 5% de desconto, cartão de crédito em até 6x e boleto à vista. Você escolhe o que faz mais sentido." },
        { q: "Como funciona a entrega?", a: "Despachamos em até 48h via Correios ou transportadora. Frete calculado no fechamento do pedido, com rastreio." },
        { q: "Posso trocar produtos com defeito?", a: "Sim. Trabalhamos com garantia de 7 dias para defeitos de fabricação. Resolvemos rápido, sem burocracia." },
        { q: "Tem exclusividade por região?", a: "Para pedidos recorrentes acima de 100 peças/mês, oferecemos exclusividade na sua cidade. Fale com nosso time." },
    ];
    const [open, setOpen] = useState<number | null>(0);
    return (
        <section id="faq" className="py-24" style={{ background: 'var(--sl-sand)' }}>
            <div className="mx-auto max-w-4xl px-5">
                <div className="text-center">
                    <span className="text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: 'var(--sl-p)' }}>Dúvidas frequentes</span>
                    <h2 className="mt-3 text-4xl tracking-[0.02em] md:text-5xl">Tira sua dúvida em 30 segundos</h2>
                </div>
                <div className="mt-10 overflow-hidden rounded-3xl border" style={{ borderColor: 'oklch(0.9 0.02 70 / 0.6)', background: 'white' }}>
                    {items.map((it, i) => {
                        const isOpen = open === i;
                        return (
                            <div key={i} style={{ borderTop: i > 0 ? '1px solid oklch(0.9 0.02 70 / 0.7)' : 'none' }}>
                                <button onClick={() => setOpen(isOpen ? null : i)}
                                    className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition hover:bg-stone-50">
                                    <span className="sl-display text-lg font-semibold">{it.q}</span>
                                    <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-full text-sm font-bold transition-transform duration-200 ${isOpen ? 'rotate-45' : ''}`}
                                        style={{ background: 'oklch(0.68 0.19 38 / 0.1)', color: 'var(--sl-p)' }}>+</span>
                                </button>
                                {isOpen && <div className="px-6 pb-6 text-sm leading-relaxed" style={{ color: 'var(--sl-muted)' }}>{it.a}</div>}
                            </div>
                        );
                    })}
                </div>
                <p className="mt-8 text-center text-sm" style={{ color: 'var(--sl-muted)' }}>
                    Ainda com dúvida?{' '}
                    <a href={WA} target="_blank" rel="noopener" className="font-semibold underline-offset-4 hover:underline" style={{ color: 'var(--sl-p)' }}>
                        Chama no WhatsApp
                    </a>, te respondemos em minutos.
                </p>
            </div>
        </section>
    );
}

function FinalCTA() {
    return (
        <section className="relative overflow-hidden">
            <div className="absolute inset-0 sl-gradient" />
            <div className="absolute inset-0" style={{ background: 'radial-gradient(50% 60% at 50% 0%, rgba(255,255,255,0.25), transparent)' }} />
            <div className="relative mx-auto grid max-w-7xl gap-12 px-5 py-24 md:grid-cols-2 md:items-center md:py-28" style={{ color: 'white' }}>
                <div>
                    <span className="text-xs font-semibold uppercase tracking-[0.25em] opacity-80">Última chamada</span>
                    <h2 className="mt-3 text-5xl leading-[1.05] tracking-[0.02em] md:text-7xl">
                        Comece a faturar com moda praia <em className="not-italic">ainda essa semana.</em>
                    </h2>
                    <p className="mt-6 max-w-lg text-lg opacity-90">
                        O verão está chegando — e quem começa agora chega na alta temporada com estoque, clientes e cinco estrelas no Instagram.
                    </p>
                    <ul className="mt-8 space-y-3 text-base">
                        {[
                            "Atendimento humano em minutos no WhatsApp",
                            "Catálogo completo com preços de atacado",
                            "Sem mensalidade, sem fidelidade",
                            "Garantia de 7 dias contra defeitos"
                        ].map(t => (
                            <li key={t} className="flex items-start gap-3">
                                <span className="mt-1 grid h-5 w-5 shrink-0 place-items-center rounded-full text-xs" style={{ background: 'rgba(255,255,255,0.25)' }}>✓</span>
                                {t}
                            </li>
                        ))}
                    </ul>
                    <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                        <CTAWa variant="dark" className="px-8 py-5 text-lg">
                            <WhatsIcon /> Quero receber o catálogo agora
                        </CTAWa>
                    </div>
                    <p className="mt-4 text-sm opacity-80">Resposta em até 5 minutos · seg-sáb, 8h-20h</p>
                </div>

                <div className="relative">
                    <div className="grid grid-cols-2 gap-3">
                        {[2, 6, 4, 8].map((n, i) => (
                            <img key={n} src={IMG(n)} alt="" className={`aspect-[3/4] rounded-2xl object-cover object-top sl-sw ${i % 2 === 1 ? 'translate-y-8' : ''}`} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

function Footer() {
    return (
        <footer style={{ background: 'var(--sl-ink)', color: 'rgba(245,240,230,0.8)' }}>
            <div className="mx-auto grid max-w-7xl gap-8 px-5 py-14 md:grid-cols-3">
                <div>
                    <div className="sl-display text-2xl tracking-[0.18em] uppercase" style={{ color: 'white', fontWeight: 700 }}>SUNLIV</div>
                    <p className="mt-4 text-sm">Moda praia feminina, fabricada com amor em Fortaleza desde 2013.</p>
                </div>
                <div className="text-sm">
                    <div className="text-xs uppercase tracking-widest" style={{ color: 'rgba(245,240,230,0.5)' }}>Atendimento</div>
                    <p className="mt-3">WhatsApp: <a href={WA} className="hover:underline" style={{ color: 'var(--sl-pg)' }}>(85) 99161-3500</a></p>
                    <p>Segunda a Sábado · 8h às 20h</p>
                </div>
                <div className="text-sm">
                    <div className="text-xs uppercase tracking-widest" style={{ color: 'rgba(245,240,230,0.5)' }}>Fábrica</div>
                    <p className="mt-3">Fortaleza · Ceará · Brasil</p>
                    <p>CNPJ disponível mediante solicitação.</p>
                </div>
            </div>
            <div className="border-t" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
                <p className="mx-auto max-w-7xl px-5 py-5 text-center text-xs" style={{ color: 'rgba(245,240,230,0.6)' }}>
                    © {new Date().getFullYear()} Sunliv Moda Praia · Todos os direitos reservados.
                </p>
            </div>
        </footer>
    );
}

function StickyMobileCTA() {
    return (
        <div className="fixed inset-x-0 bottom-0 z-50 border-t p-3 backdrop-blur md:hidden"
            style={{ background: 'rgba(245,240,230,0.95)', borderColor: 'oklch(0.9 0.02 70 / 0.6)' }}>
            <CTAWa variant="wa" className="w-full">
                <WhatsIcon /> Receber catálogo no WhatsApp
            </CTAWa>
        </div>
    );
}

export default function SunlivPage2026() {
    return (
        <div className="sl-page min-h-screen">
            <style dangerouslySetInnerHTML={{ __html: STYLES }} />
            <Nav />
            <Hero />
            <Marquee />
            <Benefits />
            <Collection />
            <Numbers />
            <HowItWorks />
            <Testimonials />
            <FAQ />
            <FinalCTA />
            <Footer />
            <StickyMobileCTA />
        </div>
    );
}
