'use client';

import { useState } from 'react';

const WA = 'https://wa.me/5558589513933?text=Ol%C3%A1%20vim%20da%20amoatacado%20e%20gostaria%20de%20revender%20Eloah';

const trackWA = () => {
    if (typeof window !== 'undefined' && (window as { fbq?: (...args: unknown[]) => void }).fbq) {
        (window as { fbq?: (...args: unknown[]) => void }).fbq?.('track', 'Lead');
    }
};

const STYLES = `
.el-page {
  --el-p: oklch(0.58 0.07 75);
  --el-pg: oklch(0.75 0.09 85);
  --el-ink: oklch(0.16 0.01 75);
  --el-sand: oklch(0.95 0.018 75);
  --el-bg: oklch(0.98 0.008 75);
  --el-fg: oklch(0.22 0.02 75);
  --el-muted: oklch(0.50 0.02 75);
  --el-border: oklch(0.89 0.012 75);
  --el-wa: oklch(0.66 0.17 145);
  --el-gs: linear-gradient(135deg, oklch(0.78 0.08 85), oklch(0.58 0.07 75) 55%, oklch(0.30 0.02 60));
  background: var(--el-bg);
  color: var(--el-fg);
  font-family: 'Inter', ui-sans-serif, system-ui, sans-serif;
  -webkit-font-smoothing: antialiased;
}
.el-page h1, .el-page h2, .el-page h3, .el-display {
  font-family: var(--font-display-el, 'Playfair Display', ui-serif, Georgia, serif);
  letter-spacing: 0.01em;
}
.el-c-gradient {
  background: var(--el-gs);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}
.el-gradient { background-image: var(--el-gs); }
.el-sw { box-shadow: 0 10px 40px -10px oklch(0.58 0.07 75 / 0.45); }
.el-ss { box-shadow: 0 1px 2px oklch(0.4 0.02 75 / 0.06), 0 8px 24px oklch(0.4 0.02 75 / 0.08); }
.el-ph {
  background: linear-gradient(135deg, oklch(0.92 0.015 75), oklch(0.86 0.02 75));
  display: flex;
  align-items: center;
  justify-content: center;
  color: oklch(0.55 0.02 75);
  font-size: 0.75rem;
  text-align: center;
  padding: 0.5rem;
}
@keyframes el-float { 0%, 100% { transform: translateY(0) rotate(-4deg); } 50% { transform: translateY(-10px) rotate(-4deg); } }
@keyframes el-float-r { 0%, 100% { transform: translateY(0) rotate(4deg); } 50% { transform: translateY(-10px) rotate(4deg); } }
.el-float { animation: el-float 6s ease-in-out infinite; }
.el-float-d { animation: el-float-r 6s ease-in-out -3s infinite; }
@keyframes el-scroll { from { transform: translateX(0); } to { transform: translateX(-33.33%); } }
.el-scroll { animation: el-scroll 30s linear infinite; display: flex; gap: 3rem; white-space: nowrap; }
`;

function Placeholder({ label, className = '' }: { label: string; className?: string }) {
    return <div className={`el-ph ${className}`}>{label}</div>;
}

function WhatsIcon({ className = 'h-5 w-5' }: { className?: string }) {
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
    return <svg viewBox="0 0 20 20" className="h-4 w-4 shrink-0" fill="currentColor" style={{ color: 'var(--el-p)' }}><path d="M16.7 5.3a1 1 0 0 1 0 1.4l-7 7a1 1 0 0 1-1.4 0l-4-4a1 1 0 1 1 1.4-1.4L9 11.6l6.3-6.3a1 1 0 0 1 1.4 0Z" /></svg>;
}

function CTAWa({ children, variant = 'wa', className = '' }: {
    children: React.ReactNode;
    variant?: 'wa' | 'dark' | 'ghost';
    className?: string;
}) {
    const base = 'inline-flex items-center justify-center gap-2 rounded-full px-7 py-4 text-base font-semibold tracking-tight transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0';
    const varStyles: Record<string, React.CSSProperties> = {
        wa: { background: 'var(--el-wa)', color: '#fff' },
        dark: { background: 'var(--el-ink)', color: 'var(--el-bg)' },
        ghost: { border: '1px solid var(--el-border)', background: 'rgba(255,255,255,0.6)', backdropFilter: 'blur(8px)' },
    };
    return (
        <a href={WA} target="_blank" rel="noopener" onClick={trackWA} className={`${base} ${className}`} style={varStyles[variant]}>
            {children}
        </a>
    );
}

function Nav() {
    return (
        <header className="sticky top-0 z-40 backdrop-blur-md" style={{ borderBottom: '1px solid oklch(0.89 0.012 75 / 0.6)', background: 'oklch(0.98 0.008 75 / 0.85)' }}>
            <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
                <a href="#top" className="el-display text-2xl tracking-[0.14em] uppercase font-bold" style={{ color: 'var(--el-ink)' }}>
                    ELOAH
                </a>
                <nav className="hidden items-center gap-8 text-sm md:flex" style={{ color: 'var(--el-muted)' }}>
                    <a href="#vantagens" className="hover:opacity-80 transition-opacity">Vantagens</a>
                    <a href="#colecao" className="hover:opacity-80 transition-opacity">Coleção</a>
                    <a href="#como-funciona" className="hover:opacity-80 transition-opacity">Como funciona</a>
                    <a href="#faq" className="hover:opacity-80 transition-opacity">FAQ</a>
                </nav>
                <CTAWa variant="wa" className="hidden md:inline-flex text-sm px-5 py-3">
                    <WhatsIcon className="h-4 w-4" /> Falar agora
                </CTAWa>
            </div>
        </header>
    );
}

function Hero() {
    return (
        <section id="top" className="relative overflow-hidden" style={{ background: 'var(--el-sand)' }}>
            <div className="lg:hidden">
                <div className="relative w-full" style={{ height: '70vw', maxHeight: 420 }}>
                    <Placeholder label="Foto Eloah" className="absolute inset-0 h-full w-full" />
                    <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, transparent 60%, var(--el-sand))' }} />
                    <div className="el-float-d el-ss absolute bottom-4 right-4 w-32 overflow-hidden rounded-2xl bg-white/90 pb-2 backdrop-blur-sm">
                        <Placeholder label="Coleção" className="h-24 rounded-xl" />
                        <p className="px-1 pt-1.5 text-[11px] font-medium">Mais vendido</p>
                        <p className="px-1 text-[11px]" style={{ color: 'var(--el-p)' }}>Plus &amp; Slim</p>
                    </div>
                </div>
                <div className="px-6 pb-24 pt-6">
                    <div className="mb-4 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-widest" style={{ background: 'oklch(0.58 0.07 75 / 0.12)', color: 'var(--el-p)' }}>
                        <span className="h-1.5 w-1.5 rounded-full" style={{ background: 'var(--el-p)' }} />
                        Atacado · Fortaleza · CE
                    </div>
                    <h1 className="text-4xl font-light leading-[1.1] tracking-tight" style={{ color: 'var(--el-ink)' }}>
                        Moda feminina<br />
                        plus size que<br />
                        <span className="el-c-gradient font-semibold">empodera</span>.
                    </h1>
                    <p className="mt-4 text-sm leading-relaxed" style={{ color: 'var(--el-muted)' }}>
                        Seja revendedora Eloah: peças plus size e slim com tecidos de qualidade, direto de Fortaleza, a partir de <strong style={{ color: 'var(--el-fg)' }}>6 peças no atacado</strong>.
                    </p>
                    <CTAWa variant="wa" className="mt-6 w-full justify-center">
                        <WhatsIcon /> Receber catálogo
                    </CTAWa>
                    <div className="mt-6 flex flex-wrap gap-4 text-xs" style={{ color: 'var(--el-muted)' }}>
                        {['Plus size e slim', 'Compra com CPF', 'Envio para o Brasil'].map(t => (
                            <span key={t} className="flex items-center gap-1"><CheckIcon /> {t}</span>
                        ))}
                    </div>
                </div>
            </div>

            <div className="hidden lg:grid mx-auto max-w-7xl grid-cols-2 min-h-screen">
                <div className="flex flex-col justify-center px-14">
                    <div className="mb-5 inline-flex items-center gap-2 self-start rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-widest" style={{ background: 'oklch(0.58 0.07 75 / 0.12)', color: 'var(--el-p)' }}>
                        <span className="h-1.5 w-1.5 rounded-full" style={{ background: 'var(--el-p)' }} />
                        Atacado · Fortaleza · CE
                    </div>
                    <h1 className="text-6xl font-light leading-[1.08] tracking-tight xl:text-7xl" style={{ color: 'var(--el-ink)' }}>
                        Moda feminina<br />
                        plus size que<br />
                        <span className="el-c-gradient font-semibold">empodera</span>.
                    </h1>
                    <p className="mt-6 max-w-md text-lg leading-relaxed" style={{ color: 'var(--el-muted)' }}>
                        Seja revendedora Eloah: vestidos, croppeds, saias, shorts e calças plus size e slim, com tecidos de qualidade e acabamento diferenciado, direto de Fortaleza.
                    </p>
                    <div className="mt-8 flex items-center gap-4">
                        <CTAWa variant="wa"><WhatsIcon /> Receber catálogo</CTAWa>
                        <a href="#colecao" className="text-sm font-semibold underline-offset-4 hover:underline" style={{ color: 'var(--el-muted)' }}>Ver coleção ↓</a>
                    </div>
                    <div className="mt-10 flex gap-6 text-sm" style={{ color: 'var(--el-muted)' }}>
                        {['Pedido mín. 6 peças', 'Plus size e slim', 'Compra com CPF'].map(t => (
                            <span key={t} className="flex items-center gap-1.5"><CheckIcon /> {t}</span>
                        ))}
                    </div>
                </div>
                <div className="relative min-h-screen">
                    <Placeholder label="Foto Eloah" className="absolute inset-0 h-full w-full" />
                    <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, var(--el-sand) 0%, transparent 25%)' }} />
                    <div className="el-float el-ss absolute left-[-48px] top-[22%] w-36 overflow-hidden rounded-2xl bg-white/90 pb-3 backdrop-blur-sm">
                        <Placeholder label="Plus Size" className="h-28 rounded-xl" />
                        <p className="px-1 pt-2 text-xs font-medium">Elegância</p>
                        <p className="px-1 text-xs" style={{ color: 'var(--el-p)' }}>Direto da loja</p>
                    </div>
                    <div className="el-float-d el-ss absolute bottom-[18%] right-8 w-36 overflow-hidden rounded-2xl bg-white/90 pb-3 backdrop-blur-sm">
                        <Placeholder label="Slim" className="h-28 rounded-xl" />
                        <p className="px-1 pt-2 text-xs font-medium">Mais vendido</p>
                        <p className="px-1 text-xs" style={{ color: 'var(--el-p)' }}>Coleção atual</p>
                    </div>
                </div>
            </div>
        </section>
    );
}

function Marquee() {
    const items = ['Plus Size', 'Slim', 'Elegância', 'Autoestima', 'Fortaleza CE', 'Tecido de Qualidade', 'Atacado', 'Compra com CPF'];
    const repeated = [...items, ...items, ...items];
    return (
        <div className="overflow-hidden py-5 el-gradient" style={{ opacity: 0.92 }}>
            <div className="el-scroll">
                {repeated.map((item, i) => (
                    <span key={i} className="text-sm font-semibold uppercase tracking-[0.2em] text-white/90">
                        {item} <span className="mx-4 opacity-50">·</span>
                    </span>
                ))}
            </div>
        </div>
    );
}

function Benefits() {
    const items = [
        { icon: '👗', title: 'Plus Size e Slim', desc: 'Vestidos, croppeds, saias, shorts e calças em variedade de tamanhos — sua cliente encontra tudo em um só lugar.' },
        { icon: '✨', title: 'Acabamento Diferenciado', desc: 'Tecidos de qualidade, aplicações, botões especiais e aviamentos que dão valor real à peça.' },
        { icon: '💰', title: 'Atacado Acessível', desc: 'A partir de 6 peças variadas para envio, ou 3 peças comprando direto no nosso ponto em Fortaleza.' },
        { icon: '🪪', title: 'Sem CNPJ', desc: 'Compre com CPF. Atendemos sacoleiras, lojistas e revendedoras iniciantes de todo o Brasil.' },
        { icon: '💎', title: 'Elegância e Autoestima', desc: 'Peças pensadas para toda mulher se sentir bem consigo mesma, com empoderamento e confiança.' },
        { icon: '🏬', title: 'Fábrica em Fortaleza', desc: 'Produção própria no Ceará, com novidades constantes na coleção.' },
    ];
    return (
        <section id="vantagens" className="py-24 px-5" style={{ background: 'var(--el-bg)' }}>
            <div className="mx-auto max-w-6xl">
                <div className="mb-14 text-center">
                    <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em]" style={{ color: 'var(--el-p)' }}>Por que revender Eloah</p>
                    <h2 className="text-4xl font-light lg:text-5xl" style={{ color: 'var(--el-ink)' }}>
                        Moda feminina que<br />
                        <span className="el-c-gradient font-semibold">vale por dentro e por fora</span>
                    </h2>
                </div>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {items.map(({ icon, title, desc }) => (
                        <div key={title} className="el-ss rounded-2xl p-7" style={{ background: '#fff' }}>
                            <div className="mb-4 text-3xl">{icon}</div>
                            <h3 className="mb-2 text-lg font-semibold" style={{ color: 'var(--el-ink)' }}>{title}</h3>
                            <p className="text-sm leading-relaxed" style={{ color: 'var(--el-muted)' }}>{desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

function Collection() {
    const labels = ['Vestido', 'Cropped', 'Saia', 'Short', 'Calça', 'Plus Size', 'Slim', 'Conjunto', 'Body', 'Saída', 'Acessório', 'Novidade'];
    return (
        <section id="colecao" className="py-24 px-5" style={{ background: 'var(--el-sand)' }}>
            <div className="mx-auto max-w-6xl">
                <div className="mb-14 text-center">
                    <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em]" style={{ color: 'var(--el-p)' }}>Coleção atacado</p>
                    <h2 className="text-4xl font-light lg:text-5xl" style={{ color: 'var(--el-ink)' }}>
                        Peças que <span className="el-c-gradient font-semibold">encantam</span><br />em todos os tamanhos
                    </h2>
                    <p className="mt-4 text-base" style={{ color: 'var(--el-muted)' }}>
                        Vestidos · Croppeds · Saias · Shorts · Calças · Plus size e slim
                    </p>
                </div>
                <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
                    {labels.map((label, i) => (
                        <div key={label} className={`overflow-hidden rounded-2xl ${i === 0 || i === 5 ? 'row-span-2' : ''}`}
                            style={{ aspectRatio: i === 0 || i === 5 ? '3/4' : '1/1' }}>
                            <Placeholder label={label} className="h-full w-full" />
                        </div>
                    ))}
                </div>
                <div className="mt-10 text-center">
                    <CTAWa variant="dark">
                        <WhatsIcon /> Ver catálogo completo
                    </CTAWa>
                </div>
            </div>
        </section>
    );
}

function Numbers() {
    const stats = [
        { n: '65K+', label: 'seguidoras no Instagram' },
        { n: '6', label: 'peças pedido mínimo (envio)' },
        { n: '3', label: 'peças no ponto físico' },
        { n: 'CE', label: 'Fortaleza, Buraco da Gia' },
    ];
    return (
        <section className="py-20 px-5 el-gradient">
            <div className="mx-auto max-w-5xl">
                <div className="grid grid-cols-2 gap-8 text-center text-white lg:grid-cols-4">
                    {stats.map(({ n, label }) => (
                        <div key={label}>
                            <p className="el-display text-5xl font-semibold lg:text-6xl">{n}</p>
                            <p className="mt-1 text-sm text-white/75">{label}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

function HowItWorks() {
    const steps = [
        { n: '01', title: 'Chama no WhatsApp', desc: 'Manda mensagem para a Juliana e receba o catálogo completo com preços de atacado.' },
        { n: '02', title: 'Escolhe as peças', desc: 'Selecione os modelos plus size e slim que combinam com seu público. Mínimo 6 peças para envio.' },
        { n: '03', title: 'Faz o pedido', desc: 'Pagamento via PIX, boleto ou cartão. O frete por envio fica a cargo do cliente.' },
        { n: '04', title: 'Começa a lucrar', desc: 'Receba suas peças e revenda com confiança — qualidade que fideliza sua cliente.' },
    ];
    return (
        <section id="como-funciona" className="py-24 px-5" style={{ background: 'var(--el-bg)' }}>
            <div className="mx-auto max-w-5xl">
                <div className="mb-14 text-center">
                    <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em]" style={{ color: 'var(--el-p)' }}>Simples e rápido</p>
                    <h2 className="text-4xl font-light lg:text-5xl" style={{ color: 'var(--el-ink)' }}>
                        Como começar a<br /><span className="el-c-gradient font-semibold">revender Eloah</span>
                    </h2>
                </div>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                    {steps.map(({ n, title, desc }) => (
                        <div key={n} className="el-ss rounded-2xl p-7 text-center" style={{ background: '#fff' }}>
                            <p className="el-display mb-4 text-5xl font-light" style={{ color: 'oklch(0.58 0.07 75 / 0.2)' }}>{n}</p>
                            <h3 className="mb-2 text-base font-semibold" style={{ color: 'var(--el-ink)' }}>{title}</h3>
                            <p className="text-sm leading-relaxed" style={{ color: 'var(--el-muted)' }}>{desc}</p>
                        </div>
                    ))}
                </div>
                <div className="mt-12 text-center">
                    <CTAWa variant="wa" className="text-lg px-10 py-5 el-sw">
                        <WhatsIcon className="h-6 w-6" /> Quero revender agora
                    </CTAWa>
                </div>
            </div>
        </section>
    );
}

function Testimonials() {
    const items = [
        { text: 'Encontrei na Eloah peças plus size que realmente valorizam o corpo. Minhas clientes pedem sempre mais!', name: 'Camila S.', city: 'Fortaleza, CE', stars: 5 },
        { text: 'A qualidade do tecido e o acabamento fazem toda diferença na hora de revender. Atendimento ótimo também.', name: 'Patrícia A.', city: 'Recife, PE', stars: 5 },
        { text: 'Comecei com poucas peças e hoje já é minha principal fonte de renda extra. Recomendo demais a Eloah!', name: 'Vanessa L.', city: 'São Luís, MA', stars: 5 },
    ];
    return (
        <section className="py-24 px-5" style={{ background: 'var(--el-sand)' }}>
            <div className="mx-auto max-w-5xl">
                <div className="mb-14 text-center">
                    <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em]" style={{ color: 'var(--el-p)' }}>Quem já revende</p>
                    <h2 className="text-4xl font-light lg:text-5xl" style={{ color: 'var(--el-ink)' }}>
                        Revendedoras que<br /><span className="el-c-gradient font-semibold">já estão lucrando</span>
                    </h2>
                </div>
                <div className="grid gap-6 md:grid-cols-3">
                    {items.map(({ text, name, city, stars }) => (
                        <div key={name} className="el-ss rounded-2xl p-7" style={{ background: '#fff' }}>
                            <div className="mb-4 flex gap-0.5" style={{ color: 'var(--el-pg)' }}>
                                {Array.from({ length: stars }).map((_, i) => <StarIcon key={i} />)}
                            </div>
                            <p className="mb-5 text-sm leading-relaxed" style={{ color: 'var(--el-fg)' }}>&ldquo;{text}&rdquo;</p>
                            <div>
                                <p className="text-sm font-semibold" style={{ color: 'var(--el-ink)' }}>{name}</p>
                                <p className="text-xs" style={{ color: 'var(--el-muted)' }}>{city}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

function FAQ() {
    const [open, setOpen] = useState<number | null>(null);
    const items = [
        { q: 'Qual o pedido mínimo?', a: 'No envio, o pedido mínimo é de 6 peças variadas. Comprando direto no nosso ponto em Fortaleza, a partir de 3 peças (variadas entre cores e tamanhos).' },
        { q: 'Preciso de CNPJ para comprar?', a: 'Não. Você pode comprar com CPF. Atendemos sacoleiras, lojistas e revendedoras iniciantes de todo o Brasil.' },
        { q: 'Vocês enviam para todo o Brasil?', a: 'Sim! Fazemos envios para diversas cidades. O frete fica a cargo do cliente.' },
        { q: 'Posso retirar o pedido pessoalmente?', a: 'Sim! Você pode retirar no nosso ponto de venda em Fortaleza (Buraco da Gia) ou na nossa fábrica, conforme sua preferência.' },
        { q: 'Vocês trabalham só com plus size?', a: 'Nosso foco principal é plus size, mas também temos peças no slim — vestidos, croppeds, saias, shorts e calças.' },
        { q: 'Quais as formas de pagamento?', a: 'Aceitamos PIX, boleto e cartões. Consulte condições com a Juliana no WhatsApp.' },
    ];
    return (
        <section id="faq" className="py-24 px-5" style={{ background: 'var(--el-bg)' }}>
            <div className="mx-auto max-w-3xl">
                <div className="mb-14 text-center">
                    <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em]" style={{ color: 'var(--el-p)' }}>Dúvidas frequentes</p>
                    <h2 className="text-4xl font-light lg:text-5xl" style={{ color: 'var(--el-ink)' }}>
                        Perguntas <span className="el-c-gradient font-semibold">respondidas</span>
                    </h2>
                </div>
                <div className="space-y-3">
                    {items.map(({ q, a }, i) => (
                        <div key={q} className="el-ss overflow-hidden rounded-2xl" style={{ background: '#fff' }}>
                            <button
                                onClick={() => setOpen(open === i ? null : i)}
                                className="flex w-full items-center justify-between px-6 py-5 text-left text-sm font-semibold transition-colors"
                                style={{ color: 'var(--el-ink)' }}
                            >
                                {q}
                                <span className="ml-4 shrink-0 text-lg" style={{ color: 'var(--el-p)' }}>{open === i ? '−' : '+'}</span>
                            </button>
                            {open === i && (
                                <p className="px-6 pb-5 text-sm leading-relaxed" style={{ color: 'var(--el-muted)' }}>{a}</p>
                            )}
                        </div>
                    ))}
                </div>
                <p className="mt-8 text-center text-sm" style={{ color: 'var(--el-muted)' }}>
                    Ainda com dúvida?{' '}
                    <a href={WA} target="_blank" rel="noopener" onClick={trackWA} className="font-semibold underline-offset-4 hover:underline" style={{ color: 'var(--el-p)' }}>
                        Chama a Juliana no WhatsApp
                    </a>, respondemos em minutos.
                </p>
            </div>
        </section>
    );
}

function FinalCTA() {
    return (
        <section className="py-28 px-5 el-gradient">
            <div className="mx-auto max-w-3xl text-center text-white">
                <p className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-white/70">Última chamada</p>
                <h2 className="el-display mb-6 text-4xl font-light leading-tight lg:text-6xl">
                    Sua loja plus size<br />começa <span className="font-semibold">agora</span>
                </h2>
                <p className="mx-auto mb-10 max-w-md text-base text-white/80">
                    Moda feminina plus size e slim, direto de Fortaleza, com qualidade e elegância que fidelizam sua cliente.
                </p>
                <a
                    href={WA}
                    target="_blank"
                    rel="noopener"
                    onClick={trackWA}
                    className="inline-flex items-center gap-3 rounded-full bg-white px-10 py-5 text-lg font-semibold transition-all hover:-translate-y-0.5 hover:shadow-2xl"
                    style={{ color: 'var(--el-p)' }}
                >
                    <WhatsIcon className="h-6 w-6" /> Quero o catálogo agora
                </a>
                <p className="mt-5 text-sm text-white/60">Atendimento direto com a Juliana · Fortaleza CE</p>
            </div>
        </section>
    );
}

function Footer() {
    return (
        <footer className="py-12 px-5 text-center text-sm" style={{ background: 'var(--el-ink)', color: 'oklch(0.75 0.02 75)' }}>
            <p className="el-display mb-3 text-xl font-bold tracking-[0.14em] text-white">ELOAH</p>
            <p>Buraco da Gia, Rua D, Lage 5, banca 386 B/C · Fortaleza · CE · Brasil</p>
            <p className="mt-1 text-xs opacity-70">Atendimento presencial: quarta a sábado, 6h às 12h</p>
            <p className="mt-2">
                WhatsApp: <a href={WA} onClick={trackWA} className="hover:underline" style={{ color: 'var(--el-pg)' }}>(85) 8951-3933</a>
            </p>
            <p className="mt-6 text-xs opacity-50">© 2026 Eloah Moda Feminina · Todos os direitos reservados</p>
        </footer>
    );
}

function StickyMobileCTA() {
    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 p-4 md:hidden" style={{ background: 'linear-gradient(to top, var(--el-bg) 60%, transparent)' }}>
            <CTAWa variant="wa" className="w-full el-sw text-base py-4">
                <WhatsIcon className="h-5 w-5" /> Receber catálogo no WhatsApp
            </CTAWa>
        </div>
    );
}

export default function EloahPage() {
    return (
        <div className="el-page">
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
