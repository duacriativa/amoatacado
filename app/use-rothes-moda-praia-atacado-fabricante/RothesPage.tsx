'use client';

import { useState } from 'react';

const PHOTOS = [
    '/images/rothes/IMG_8780.JPG',
    '/images/rothes/IMG_8782.JPG',
    '/images/rothes/IMG_8784.JPG',
    '/images/rothes/IMG_8816.JPG',
    '/images/rothes/IMG_8818.JPG',
    '/images/rothes/IMG_8824.JPG',
    '/images/rothes/IMG_8856.JPG',
    '/images/rothes/IMG_8859.JPG',
    '/images/rothes/IMG_8863.JPG',
    '/images/rothes/IMG_8987.JPG',
    '/images/rothes/IMG_8989.JPG',
    '/images/rothes/IMG_9017.JPG',
    '/images/rothes/IMG_9048.JPG',
    '/images/rothes/IMG_9053.JPG',
    '/images/rothes/SaveClip.App_700063718_1584865246977699_3699232760355953753_n.jpg',
];
const IMG = (n: number) => PHOTOS[(n - 1) % PHOTOS.length];
const VIDEO = '/images/rothes/01%20-%20ROTHES.mp4';

const WA = 'https://wa.me/5585986172515?text=Ol%C3%A1%20vim%20da%20amoatacado%20e%20gostaria%20de%20revender%20Rothes';

const trackWA = () => {
    if (typeof window !== 'undefined' && (window as { fbq?: (...args: unknown[]) => void }).fbq) {
        (window as { fbq?: (...args: unknown[]) => void }).fbq?.('track', 'Lead');
    }
};

const STYLES = `
.rt-page {
  --rt-p: oklch(0.62 0.14 32);
  --rt-pg: oklch(0.72 0.12 52);
  --rt-ink: oklch(0.18 0.04 32);
  --rt-sand: oklch(0.96 0.022 70);
  --rt-bg: oklch(0.985 0.010 75);
  --rt-fg: oklch(0.22 0.04 32);
  --rt-muted: oklch(0.52 0.04 38);
  --rt-border: oklch(0.90 0.018 65);
  --rt-wa: oklch(0.66 0.17 145);
  --rt-gs: linear-gradient(135deg, oklch(0.74 0.13 52), oklch(0.62 0.14 32) 55%, oklch(0.50 0.13 18));
  background: var(--rt-bg);
  color: var(--rt-fg);
  font-family: 'Inter', ui-sans-serif, system-ui, sans-serif;
  -webkit-font-smoothing: antialiased;
}
.rt-page h1, .rt-page h2, .rt-page h3, .rt-display {
  font-family: var(--font-display-rt, 'Poppins', ui-sans-serif, system-ui, sans-serif);
  font-weight: 300;
  letter-spacing: 0.01em;
}
.rt-c-gradient {
  background: var(--rt-gs);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}
.rt-gradient { background-image: var(--rt-gs); }
.rt-sw { box-shadow: 0 10px 40px -10px oklch(0.62 0.14 32 / 0.45); }
.rt-ss { box-shadow: 0 1px 2px oklch(0.4 0.05 38 / 0.06), 0 8px 24px oklch(0.4 0.05 38 / 0.08); }
@keyframes rt-float { 0%, 100% { transform: translateY(0) rotate(-6deg); } 50% { transform: translateY(-10px) rotate(-6deg); } }
@keyframes rt-float-r { 0%, 100% { transform: translateY(0) rotate(5deg); } 50% { transform: translateY(-10px) rotate(5deg); } }
.rt-float { animation: rt-float 6s ease-in-out infinite; }
.rt-float-d { animation: rt-float-r 6s ease-in-out -3s infinite; }
@keyframes rt-scroll { from { transform: translateX(0); } to { transform: translateX(-33.33%); } }
.rt-scroll { animation: rt-scroll 30s linear infinite; display: flex; gap: 3rem; white-space: nowrap; }
`;

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
    return <svg viewBox="0 0 20 20" className="h-4 w-4 shrink-0" fill="currentColor" style={{ color: 'var(--rt-p)' }}><path d="M16.7 5.3a1 1 0 0 1 0 1.4l-7 7a1 1 0 0 1-1.4 0l-4-4a1 1 0 1 1 1.4-1.4L9 11.6l6.3-6.3a1 1 0 0 1 1.4 0Z" /></svg>;
}

function CTAWa({ children, variant = 'wa', className = '' }: {
    children: React.ReactNode;
    variant?: 'wa' | 'dark' | 'ghost';
    className?: string;
}) {
    const base = 'inline-flex items-center justify-center gap-2 rounded-full px-7 py-4 text-base font-semibold tracking-tight transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0';
    const varStyles: Record<string, React.CSSProperties> = {
        wa: { background: 'var(--rt-wa)', color: '#fff' },
        dark: { background: 'var(--rt-ink)', color: 'var(--rt-bg)' },
        ghost: { border: '1px solid var(--rt-border)', background: 'rgba(255,255,255,0.6)', backdropFilter: 'blur(8px)' },
    };
    return (
        <a href={WA} target="_blank" rel="noopener" onClick={trackWA} className={`${base} ${className}`} style={varStyles[variant]}>
            {children}
        </a>
    );
}

function Nav() {
    return (
        <header className="sticky top-0 z-40 backdrop-blur-md" style={{ borderBottom: '1px solid oklch(0.9 0.018 65 / 0.6)', background: 'oklch(0.985 0.010 75 / 0.85)' }}>
            <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
                <a href="#top" className="rt-display text-2xl tracking-[0.14em] uppercase font-bold" style={{ color: 'var(--rt-ink)' }}>
                    ROTHES
                </a>
                <nav className="hidden items-center gap-8 text-sm md:flex" style={{ color: 'var(--rt-muted)' }}>
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
        <section id="top" className="relative min-h-screen overflow-hidden" style={{ background: 'var(--rt-sand)' }}>
            <div className="mx-auto grid max-w-7xl grid-cols-1 gap-0 lg:grid-cols-2 min-h-screen">
                {/* Left: copy */}
                <div className="flex flex-col justify-center px-6 py-20 lg:px-14 lg:py-0 order-2 lg:order-1">
                    <div className="mb-5 inline-flex items-center gap-2 self-start rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-widest" style={{ background: 'oklch(0.62 0.14 32 / 0.10)', color: 'var(--rt-p)' }}>
                        <span className="h-1.5 w-1.5 rounded-full" style={{ background: 'var(--rt-p)' }} />
                        Fábrica · Fortaleza · CE
                    </div>
                    <h1 className="text-5xl font-light leading-[1.08] tracking-tight lg:text-6xl xl:text-7xl" style={{ color: 'var(--rt-ink)' }}>
                        Moda praia<br />
                        <span className="rt-c-gradient font-semibold">artesanal</span><br />
                        que vende<br />
                        sozinha.
                    </h1>
                    <p className="mt-6 max-w-md text-base leading-relaxed lg:text-lg" style={{ color: 'var(--rt-muted)' }}>
                        Biquínis de macramê e crochê que nenhuma loja tem. Peças únicas direto da fábrica em Fortaleza com <strong style={{ color: 'var(--rt-fg)' }}>margem acima de 100%</strong> e envio em até 48h.
                    </p>
                    <div className="mt-8 flex flex-wrap items-center gap-4">
                        <CTAWa variant="wa">
                            <WhatsIcon /> Receber catálogo
                        </CTAWa>
                        <a href="#colecao" className="text-sm font-semibold underline-offset-4 hover:underline" style={{ color: 'var(--rt-muted)' }}>
                            Ver coleção ↓
                        </a>
                    </div>
                    <div className="mt-10 flex flex-wrap gap-6 text-sm" style={{ color: 'var(--rt-muted)' }}>
                        {['Pedido mín. 10 peças', 'Envio em 48h', 'Fabricação própria'].map(t => (
                            <span key={t} className="flex items-center gap-1.5">
                                <CheckIcon /> {t}
                            </span>
                        ))}
                    </div>
                </div>
                {/* Right: video + floating cards */}
                <div className="relative order-1 lg:order-2 min-h-[60vw] lg:min-h-screen">
                    <div className="absolute inset-0 overflow-hidden">
                        <video autoPlay muted loop playsInline className="h-full w-full object-cover object-top">
                            <source src={VIDEO} type="video/mp4" />
                        </video>
                        <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, var(--rt-sand) 0%, transparent 20%)' }} />
                    </div>
                    {/* Floating card left */}
                    <div className="rt-float rt-ss absolute left-4 top-[18%] w-36 overflow-hidden rounded-2xl bg-white/90 pb-3 backdrop-blur-sm lg:left-[-48px] lg:top-[22%]">
                        <div className="h-28 overflow-hidden rounded-xl">
                            <img src={IMG(3)} alt="" className="h-full w-full object-cover" />
                        </div>
                        <p className="px-1 pt-2 text-xs font-medium">Pronta-Entrega</p>
                        <p className="px-1 text-xs" style={{ color: 'var(--rt-p)' }}>Direto da fábrica</p>
                    </div>
                    {/* Floating card right */}
                    <div className="rt-float-d rt-ss absolute bottom-[14%] right-4 w-36 overflow-hidden rounded-2xl bg-white/90 pb-3 backdrop-blur-sm lg:bottom-[18%] lg:right-8">
                        <div className="h-28 overflow-hidden rounded-xl">
                            <img src={IMG(7)} alt="" className="h-full w-full object-cover" />
                        </div>
                        <p className="px-1 pt-2 text-xs font-medium">O Mais vendido</p>
                        <p className="px-1 text-xs" style={{ color: 'var(--rt-p)' }}>Coleção 2026</p>
                    </div>
                </div>
            </div>
        </section>
    );
}

function Marquee() {
    const items = ['Macramê', 'Crochê', 'Saídas Exclusivas', 'Fabricação Própria', 'Fortaleza CE', 'Alta Margem', 'Pronta Entrega', 'Atacado'];
    const repeated = [...items, ...items, ...items];
    return (
        <div className="overflow-hidden py-5 rt-gradient" style={{ opacity: 0.92 }}>
            <div className="rt-scroll">
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
        { icon: '🧵', title: 'Peças Únicas', desc: 'Macramê e crochê artesanal que nenhum concorrente tem. Produto diferenciado = cliente fiel.' },
        { icon: '📦', title: 'Pronta-Entrega', desc: 'Estoque disponível para envio imediato. Você recebe em até 48h e já começa a revender.' },
        { icon: '💰', title: 'Margem 100%+', desc: 'Compre direto da fábrica e revenda com lucro real em cada peça.' },
        { icon: '🏭', title: 'Fabricante Direto', desc: 'Sem intermediários. Preço de fábrica, qualidade garantida, coleção sempre renovada.' },
        { icon: '🌊', title: 'Alta Demanda', desc: 'Moda praia artesanal está em alta no Brasil. Produto que se vende sozinho nas redes.' },
        { icon: '🚀', title: 'Sem CNPJ', desc: 'Pode comprar com CPF. Atendemos sacoleiras, lojistas e revendedoras de todo o Brasil.' },
    ];
    return (
        <section id="vantagens" className="py-24 px-5" style={{ background: 'var(--rt-bg)' }}>
            <div className="mx-auto max-w-6xl">
                <div className="mb-14 text-center">
                    <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em]" style={{ color: 'var(--rt-p)' }}>Por que revender Rothes</p>
                    <h2 className="text-4xl font-light lg:text-5xl" style={{ color: 'var(--rt-ink)' }}>
                        O produto que seu cliente<br />
                        <span className="rt-c-gradient font-semibold">nunca viu antes</span>
                    </h2>
                </div>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {items.map(({ icon, title, desc }) => (
                        <div key={title} className="rt-ss rounded-2xl p-7" style={{ background: '#fff' }}>
                            <div className="mb-4 text-3xl">{icon}</div>
                            <h3 className="mb-2 text-lg font-semibold" style={{ color: 'var(--rt-ink)' }}>{title}</h3>
                            <p className="text-sm leading-relaxed" style={{ color: 'var(--rt-muted)' }}>{desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

function Collection() {
    return (
        <section id="colecao" className="py-24 px-5" style={{ background: 'var(--rt-sand)' }}>
            <div className="mx-auto max-w-6xl">
                <div className="mb-14 text-center">
                    <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em]" style={{ color: 'var(--rt-p)' }}>Coleção atacado</p>
                    <h2 className="text-4xl font-light lg:text-5xl" style={{ color: 'var(--rt-ink)' }}>
                        Peças que <span className="rt-c-gradient font-semibold">encantam</span><br />e se vendem sozinhas
                    </h2>
                    <p className="mt-4 text-base" style={{ color: 'var(--rt-muted)' }}>
                        Biquínis Electra · Maiô Malibu · Saia Celebrate · Saída Dafne · Macramê exclusivo
                    </p>
                </div>
                {/* Masonry-style grid */}
                <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
                    {PHOTOS.slice(0, 12).map((src, i) => (
                        <div key={src} className={`overflow-hidden rounded-2xl ${i === 0 || i === 5 ? 'row-span-2' : ''}`}
                            style={{ aspectRatio: i === 0 || i === 5 ? '3/4' : '1/1' }}>
                            <img src={src} alt={`Rothes ${i + 1}`} className="h-full w-full object-cover transition-transform duration-500 hover:scale-105" />
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
        { n: '100%+', label: 'de margem por peça' },
        { n: '48h', label: 'prazo de envio' },
        { n: '10', label: 'peças pedido mínimo' },
        { n: 'CE', label: 'Fábrica Fortaleza' },
    ];
    return (
        <section className="py-20 px-5 rt-gradient">
            <div className="mx-auto max-w-5xl">
                <div className="grid grid-cols-2 gap-8 text-center text-white lg:grid-cols-4">
                    {stats.map(({ n, label }) => (
                        <div key={label}>
                            <p className="rt-display text-5xl font-semibold lg:text-6xl">{n}</p>
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
        { n: '01', title: 'Chama no WhatsApp', desc: 'Manda mensagem para a Andressa e receba o catálogo completo com preços atacado.' },
        { n: '02', title: 'Escolhe as peças', desc: 'Selecione os modelos que mais combinam com seu público. Mínimo 10 peças.' },
        { n: '03', title: 'Faz o pedido', desc: 'Pagamento via PIX, boleto ou cartão. Separamos e embalamos com cuidado.' },
        { n: '04', title: 'Começa a lucrar', desc: 'Receba em até 48h e revenda com 100%+ de margem. Simples assim.' },
    ];
    return (
        <section id="como-funciona" className="py-24 px-5" style={{ background: 'var(--rt-bg)' }}>
            <div className="mx-auto max-w-5xl">
                <div className="mb-14 text-center">
                    <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em]" style={{ color: 'var(--rt-p)' }}>Simples e rápido</p>
                    <h2 className="text-4xl font-light lg:text-5xl" style={{ color: 'var(--rt-ink)' }}>
                        Como começar a<br /><span className="rt-c-gradient font-semibold">revender Rothes</span>
                    </h2>
                </div>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                    {steps.map(({ n, title, desc }) => (
                        <div key={n} className="rt-ss rounded-2xl p-7 text-center" style={{ background: '#fff' }}>
                            <p className="rt-display mb-4 text-5xl font-light" style={{ color: 'oklch(0.62 0.14 32 / 0.18)' }}>{n}</p>
                            <h3 className="mb-2 text-base font-semibold" style={{ color: 'var(--rt-ink)' }}>{title}</h3>
                            <p className="text-sm leading-relaxed" style={{ color: 'var(--rt-muted)' }}>{desc}</p>
                        </div>
                    ))}
                </div>
                <div className="mt-12 text-center">
                    <CTAWa variant="wa" className="text-lg px-10 py-5 rt-sw">
                        <WhatsIcon className="h-6 w-6" /> Quero revender agora
                    </CTAWa>
                </div>
            </div>
        </section>
    );
}

function Testimonials() {
    const items = [
        { text: 'As peças de macramê vendem muito mais rápido do que eu esperava. Os clientes nunca viram nada igual por aqui!', name: 'Fernanda R.', city: 'Belém, PA', stars: 5 },
        { text: 'Comprei meu primeiro lote com receio, mas logo percebi que é produto diferenciado. Minhas clientes adoram e pedem sempre mais.', name: 'Raquel M.', city: 'Natal, RN', stars: 5 },
        { text: 'A qualidade do acabamento surpreende. Entrega rápida e a Andressa atende super bem. Recomendo demais!', name: 'Thais O.', city: 'Salvador, BA', stars: 5 },
    ];
    return (
        <section className="py-24 px-5" style={{ background: 'var(--rt-sand)' }}>
            <div className="mx-auto max-w-5xl">
                <div className="mb-14 text-center">
                    <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em]" style={{ color: 'var(--rt-p)' }}>Quem já revende</p>
                    <h2 className="text-4xl font-light lg:text-5xl" style={{ color: 'var(--rt-ink)' }}>
                        Revendedoras que<br /><span className="rt-c-gradient font-semibold">já estão lucrando</span>
                    </h2>
                </div>
                <div className="grid gap-6 md:grid-cols-3">
                    {items.map(({ text, name, city, stars }) => (
                        <div key={name} className="rt-ss rounded-2xl p-7" style={{ background: '#fff' }}>
                            <div className="mb-4 flex gap-0.5" style={{ color: 'var(--rt-pg)' }}>
                                {Array.from({ length: stars }).map((_, i) => <StarIcon key={i} />)}
                            </div>
                            <p className="mb-5 text-sm leading-relaxed" style={{ color: 'var(--rt-fg)' }}>&ldquo;{text}&rdquo;</p>
                            <div>
                                <p className="text-sm font-semibold" style={{ color: 'var(--rt-ink)' }}>{name}</p>
                                <p className="text-xs" style={{ color: 'var(--rt-muted)' }}>{city}</p>
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
        { q: 'Qual o pedido mínimo?', a: 'O pedido mínimo é de 10 peças variadas, facilitando o início para novas revendedoras em qualquer estado do Brasil.' },
        { q: 'Preciso de CNPJ para comprar?', a: 'Não. Você pode comprar com CPF ou CNPJ. Atendemos sacoleiras, lojistas e revendedoras iniciantes.' },
        { q: 'Vocês enviam para todo o Brasil?', a: 'Sim! Enviamos para todos os estados via Correios (PAC e SEDEX) ou transportadora, com rastreamento.' },
        { q: 'Quais as formas de pagamento?', a: 'Aceitamos PIX, boleto bancário e cartões de crédito. Consulte condições de parcelamento com a Andressa.' },
        { q: 'Quanto tempo leva para chegar?', a: 'Separamos e despachamos em até 48h após a confirmação do pagamento. O prazo de entrega varia por região.' },
        { q: 'As peças de macramê são feitas à mão?', a: 'Sim! São peças artesanais com acabamento diferenciado, o que as torna exclusivas e com alto valor percebido pelos clientes finais.' },
    ];
    return (
        <section id="faq" className="py-24 px-5" style={{ background: 'var(--rt-bg)' }}>
            <div className="mx-auto max-w-3xl">
                <div className="mb-14 text-center">
                    <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em]" style={{ color: 'var(--rt-p)' }}>Dúvidas frequentes</p>
                    <h2 className="text-4xl font-light lg:text-5xl" style={{ color: 'var(--rt-ink)' }}>
                        Perguntas <span className="rt-c-gradient font-semibold">respondidas</span>
                    </h2>
                </div>
                <div className="space-y-3">
                    {items.map(({ q, a }, i) => (
                        <div key={q} className="rt-ss overflow-hidden rounded-2xl" style={{ background: '#fff' }}>
                            <button
                                onClick={() => setOpen(open === i ? null : i)}
                                className="flex w-full items-center justify-between px-6 py-5 text-left text-sm font-semibold transition-colors"
                                style={{ color: 'var(--rt-ink)' }}
                            >
                                {q}
                                <span className="ml-4 shrink-0 text-lg" style={{ color: 'var(--rt-p)' }}>{open === i ? '−' : '+'}</span>
                            </button>
                            {open === i && (
                                <p className="px-6 pb-5 text-sm leading-relaxed" style={{ color: 'var(--rt-muted)' }}>{a}</p>
                            )}
                        </div>
                    ))}
                </div>
                <p className="mt-8 text-center text-sm" style={{ color: 'var(--rt-muted)' }}>
                    Ainda com dúvida?{' '}
                    <a href={WA} target="_blank" rel="noopener" onClick={trackWA} className="font-semibold underline-offset-4 hover:underline" style={{ color: 'var(--rt-p)' }}>
                        Chama a Andressa no WhatsApp
                    </a>, respondemos em minutos.
                </p>
            </div>
        </section>
    );
}

function FinalCTA() {
    return (
        <section className="py-28 px-5 rt-gradient">
            <div className="mx-auto max-w-3xl text-center text-white">
                <p className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-white/70">Última chamada</p>
                <h2 className="rt-display mb-6 text-4xl font-light leading-tight lg:text-6xl">
                    Seu estoque de verão<br />começa <span className="font-semibold">agora</span>
                </h2>
                <p className="mx-auto mb-10 max-w-md text-base text-white/80">
                    Peças únicas de macramê e crochê que se vendem sozinhas. Direto da fábrica em Fortaleza com margem acima de 100%.
                </p>
                <a
                    href={WA}
                    target="_blank"
                    rel="noopener"
                    onClick={trackWA}
                    className="inline-flex items-center gap-3 rounded-full bg-white px-10 py-5 text-lg font-semibold transition-all hover:-translate-y-0.5 hover:shadow-2xl"
                    style={{ color: 'var(--rt-p)' }}
                >
                    <WhatsIcon className="h-6 w-6" /> Quero o catálogo agora
                </a>
                <p className="mt-5 text-sm text-white/60">Atendimento direto com a Andressa · Fortaleza CE</p>
            </div>
        </section>
    );
}

function Footer() {
    return (
        <footer className="py-12 px-5 text-center text-sm" style={{ background: 'var(--rt-ink)', color: 'oklch(0.75 0.03 35)' }}>
            <p className="rt-display mb-3 text-xl font-bold tracking-[0.14em] text-white">ROTHES</p>
            <p>Fábrica em Fortaleza · CE · Brasil</p>
            <p className="mt-2">
                WhatsApp: <a href={WA} onClick={trackWA} className="hover:underline" style={{ color: 'var(--rt-pg)' }}>(85) 98617-2515</a>
            </p>
            <p className="mt-6 text-xs opacity-50">© 2026 Rothes Moda Praia · Todos os direitos reservados</p>
        </footer>
    );
}

function StickyMobileCTA() {
    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 p-4 md:hidden" style={{ background: 'linear-gradient(to top, var(--rt-bg) 60%, transparent)' }}>
            <CTAWa variant="wa" className="w-full rt-sw text-base py-4">
                <WhatsIcon className="h-5 w-5" /> Receber catálogo no WhatsApp
            </CTAWa>
        </div>
    );
}

export default function RothesPage() {
    return (
        <div className="rt-page">
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
