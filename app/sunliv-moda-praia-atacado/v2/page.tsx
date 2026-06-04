'use client';

import { useState, Suspense, useRef } from 'react';
import Image from 'next/image';
import Script from 'next/script';
import { motion } from 'framer-motion';
import { MessageCircle, Globe, CreditCard, RefreshCw, Heart, Instagram } from 'lucide-react';
import LeadForm from '@/components/LeadForm';

const waLink = "https://wa.me/5585991613500?text=Olá! Vim pela Sunliv e gostaria de receber lançamentos e ofertas exclusivas.";

const trackConversion = () => {
    if (typeof window !== 'undefined' && (window as any).gtag) { // eslint-disable-line @typescript-eslint/no-explicit-any
        (window as any).gtag('event', 'conversion', { // eslint-disable-line @typescript-eslint/no-explicit-any
            'send_to': 'AW-401775500/FHUdCLqlloAcEIy3yr8B'
        });
    }
};

const categories = [
    { title: 'Biquínis', desc: 'Estilos que valorizam sua essência', img: '/images/sunliv/catalog-1.jpg' },
    { title: 'Saídas de Praia', desc: 'Leveza e elegância em cada detalhe', img: '/images/sunliv/catalog-2.jpg' },
    { title: 'Acessórios', desc: 'Toques que completam seu look', img: '/images/sunliv/catalog-3.jpg' },
    { title: 'Marésia Lifestyle', desc: 'Para viver bem, dentro e fora da praia', img: '/images/sunliv/catalog-4.jpg' },
];

const trust = [
    { icon: <Globe className="w-5 h-5" />, title: 'Envio para todo o Brasil', desc: 'Receba com segurança onde estiver' },
    { icon: <CreditCard className="w-5 h-5" />, title: 'Compra 100% Segura', desc: 'Seus dados protegidos do início ao fim' },
    { icon: <RefreshCw className="w-5 h-5" />, title: 'Troca Fácil e sem Burocracia', desc: 'Mais praticidade para você' },
    { icon: <Heart className="w-5 h-5" />, title: 'Atendimento Humano', desc: 'Com carinho e atenção em cada contato' },
];

const TICKER_TEXT = 'SUNLIV OFFICIAL';

export default function SunlivV2Page() {
    const formRef = useRef<HTMLDivElement>(null);

    const scrollToForm = () => {
        formRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <main className="min-h-screen bg-[#F2EDE4] font-sans">

            <Script id="fb-pixel" strategy="afterInteractive">{`
                !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
                fbq('init','1342296943580479');fbq('track','PageView');
            `}</Script>
            <noscript><img height="1" width="1" style={{display:'none'}} src="https://www.facebook.com/tr?id=1342296943580479&ev=PageView&noscript=1" alt="" /></noscript>
            <Script src="https://www.googletagmanager.com/gtag/js?id=AW-401775500" strategy="afterInteractive" />
            <Script id="google-ads-gtag" strategy="afterInteractive">{`
                window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','AW-401775500');
            `}</Script>
            <Script id="microsoft-clarity" strategy="lazyOnload">{`
                (function(c,l,a,r,i,t,y){
                    c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                    t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                    y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
                })(window, document, "clarity", "script", "vj3eb84q9y");
            `}</Script>

            {/* NAVBAR */}
            <header className="absolute top-0 left-0 right-0 z-30 px-6 py-5 flex items-center justify-between">
                <div className="relative w-24 h-8">
                    <Image src="/images/sunliv/logo_raw.png" alt="Sun Liv" fill className="object-contain brightness-0 invert" />
                </div>
                <button
                    onClick={scrollToForm}
                    className="flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/30 text-white text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full hover:bg-white/20 transition-colors"
                >
                    <MessageCircle className="w-3.5 h-3.5" />
                    Receber no WhatsApp
                </button>
            </header>

            {/* HERO */}
            <section className="relative min-h-screen flex items-end lg:items-center overflow-hidden bg-stone-900">
                <Image
                    src="/images/sunliv/catalog-5.jpg"
                    alt="Sun Liv"
                    fill
                    priority
                    className="object-cover object-top opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-black/60 lg:to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

                <div className="relative z-10 w-full container mx-auto px-6 pb-20 pt-32 lg:py-0 grid lg:grid-cols-2 gap-12 items-center">
                    {/* LEFT: Copy */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="inline-flex items-center gap-2 border border-white/40 text-white/80 text-[10px] font-bold uppercase tracking-[0.2em] px-3 py-1.5 rounded-full mb-6">
                            Seja uma Sunliv Girl ✦
                        </div>
                        <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[1] mb-6 tracking-tight">
                            SOL, MAR E<br />LIVRE PARA<br />SER.
                        </h1>
                        <p className="text-white/70 text-base leading-relaxed mb-10 max-w-sm">
                            Moda praia e lifestyle que traduzem leveza, autenticidade e conexão com o essencial.
                        </p>
                        <div className="flex flex-wrap gap-6 text-white/60 text-xs font-medium uppercase tracking-widest mb-10">
                            {[
                                { icon: '♡', label: 'Peças Exclusivas', sub: 'Design autoral e edições limitadas' },
                                { icon: '◎', label: 'Com Propósito', sub: 'Produções conscientes e detalhes únicos' },
                                { icon: '✦', label: 'Para Todos os Seus Momentos', sub: 'Do beach ao sunset' },
                            ].map((item) => (
                                <div key={item.label} className="text-center">
                                    <div className="text-white text-base mb-1">{item.icon}</div>
                                    <div className="text-white font-bold text-[10px] uppercase tracking-wider">{item.label}</div>
                                    <div className="text-white/50 text-[9px] mt-0.5 max-w-[80px]">{item.sub}</div>
                                </div>
                            ))}
                        </div>
                        <button
                            onClick={scrollToForm}
                            className="flex items-center gap-3 bg-white text-stone-900 font-black text-sm uppercase tracking-wider py-4 px-8 rounded-full hover:bg-stone-100 transition-colors"
                        >
                            <MessageCircle className="w-4 h-4" />
                            Receber lançamentos no WhatsApp
                        </button>
                    </motion.div>

                    {/* RIGHT: Lead Form */}
                    <motion.div
                        ref={formRef}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="hidden lg:block"
                    >
                        <div className="bg-stone-900/90 backdrop-blur-md border border-white/10 rounded-3xl p-8 shadow-2xl">
                            <div className="flex items-center gap-3 mb-5">
                                <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                                    <MessageCircle className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                    <div className="text-white font-black text-sm uppercase tracking-wider">Receba Lançamentos</div>
                                    <div className="text-white font-black text-sm uppercase tracking-wider">e Ofertas Exclusivas</div>
                                    <div className="text-white/50 text-xs">no WhatsApp</div>
                                </div>
                            </div>
                            <p className="text-white/50 text-xs mb-6 leading-relaxed">
                                Entre para nossa lista VIP e fique por dentro de tudo em primeira mão.
                            </p>
                            <Suspense fallback={<div className="h-40 animate-pulse bg-white/5 rounded-xl" />}>
                                <LeadFormDark />
                            </Suspense>
                            <p className="text-white/30 text-[10px] text-center mt-4">
                                🔒 Seus dados estão seguros. Não enviamos spam.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* MOBILE FORM */}
            <div ref={formRef} className="lg:hidden bg-stone-900 px-6 py-10">
                <div className="flex items-center gap-3 mb-5">
                    <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center shrink-0">
                        <MessageCircle className="w-5 h-5 text-white" />
                    </div>
                    <div>
                        <div className="text-white font-black text-sm uppercase tracking-wider">Receba Lançamentos e Ofertas Exclusivas no WhatsApp</div>
                        <div className="text-white/50 text-xs mt-0.5">Entre para nossa lista VIP</div>
                    </div>
                </div>
                <Suspense fallback={<div className="h-40 animate-pulse bg-white/5 rounded-xl" />}>
                    <LeadFormDark />
                </Suspense>
                <p className="text-white/30 text-[10px] text-center mt-4">🔒 Seus dados estão seguros. Não enviamos spam.</p>
            </div>

            {/* TICKER */}
            <div className="bg-[#F2EDE4] border-y border-stone-300 py-3 overflow-hidden">
                <div className="flex gap-0 animate-marquee whitespace-nowrap">
                    {Array.from({ length: 12 }).map((_, i) => (
                        <span key={i} className="text-stone-900 text-xs font-bold uppercase tracking-[0.3em] px-8">
                            {TICKER_TEXT} <span className="text-stone-400">•</span>
                        </span>
                    ))}
                </div>
            </div>

            {/* CATEGORIAS */}
            <section className="py-20 px-6 bg-[#F2EDE4]">
                <div className="container mx-auto">
                    <div className="text-center mb-14">
                        <h2 className="text-3xl md:text-4xl font-black text-stone-900 leading-tight">
                            Para cada momento,<br /><em className="font-black not-italic text-stone-600">uma Sunliv.</em>
                        </h2>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
                        {categories.map((cat, i) => (
                            <motion.a
                                key={i}
                                href={waLink}
                                target="_blank"
                                rel="noopener"
                                onClick={trackConversion}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.08 }}
                                className="relative rounded-2xl overflow-hidden group cursor-pointer block"
                                style={{ aspectRatio: '3/4' }}
                            >
                                <Image
                                    src={cat.img}
                                    alt={cat.title}
                                    fill
                                    className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                                <div className="absolute bottom-0 left-0 right-0 p-4">
                                    <div className="text-white font-black text-sm uppercase tracking-wide">{cat.title}</div>
                                    <div className="text-white/70 text-xs mt-0.5 leading-tight">{cat.desc}</div>
                                </div>
                            </motion.a>
                        ))}
                    </div>
                </div>
            </section>

            {/* TRUST BAR */}
            <section className="py-16 px-6 bg-stone-100">
                <div className="container mx-auto">
                    <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-10 items-center">
                        <div className="lg:col-span-4 grid grid-cols-2 md:grid-cols-4 gap-8">
                            {trust.map((item, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.08 }}
                                    className="flex flex-col items-center text-center gap-3"
                                >
                                    <div className="w-12 h-12 bg-stone-200 rounded-2xl flex items-center justify-center text-stone-700">
                                        {item.icon}
                                    </div>
                                    <div>
                                        <div className="font-bold text-stone-900 text-xs uppercase tracking-wide">{item.title}</div>
                                        <div className="text-stone-500 text-xs mt-0.5 leading-tight">{item.desc}</div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                        <div className="hidden lg:block relative">
                            <div className="bg-white p-3 rounded-lg shadow-lg rotate-3 hover:rotate-0 transition-transform duration-500">
                                <div className="relative w-full aspect-[3/4] rounded overflow-hidden">
                                    <Image src="/images/sunliv/catalog-8.jpg" alt="Sunliv" fill className="object-cover object-top" />
                                </div>
                                <div className="text-center mt-2 text-[10px] text-stone-400 uppercase tracking-widest">Sunliv Official</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA FINAL */}
            <section className="py-24 px-6 bg-stone-900 relative overflow-hidden">
                <div className="absolute inset-0">
                    <Image src="/images/sunliv/catalog-7.jpg" alt="" fill className="object-cover object-top opacity-20" />
                    <div className="absolute inset-0 bg-stone-900/80" />
                </div>
                <div className="relative container mx-auto max-w-2xl text-center">
                    <div className="inline-flex items-center gap-2 border border-white/20 text-white/60 text-[10px] font-bold uppercase tracking-[0.2em] px-3 py-1.5 rounded-full mb-6">
                        ✦ Lista VIP
                    </div>
                    <h2 className="text-4xl md:text-5xl font-black text-white mb-4 leading-tight">
                        VEM SER SUNLIV.
                    </h2>
                    <p className="text-white/50 text-base mb-10 leading-relaxed">
                        Entre para nossa comunidade no WhatsApp<br />e viva tudo o que o mar pode te contar.
                    </p>
                    <a
                        href={waLink}
                        target="_blank"
                        rel="noopener"
                        onClick={trackConversion}
                        className="inline-flex items-center gap-3 border-2 border-white text-white font-black text-sm uppercase tracking-wider py-4 px-10 rounded-full hover:bg-white hover:text-stone-900 transition-all"
                    >
                        <MessageCircle className="w-4 h-4" />
                        Quero receber no WhatsApp
                    </a>
                </div>
            </section>

            {/* FOOTER */}
            <footer className="bg-[#F2EDE4] border-t border-stone-200 py-10 px-6">
                <div className="container mx-auto flex flex-col items-center gap-4 text-center">
                    <div className="relative w-20 h-7">
                        <Image src="/images/sunliv/logo_raw.png" alt="Sun Liv" fill className="object-contain" />
                    </div>
                    <p className="text-stone-500 text-xs">Moda praia e lifestyle com alma solar.</p>
                    <a href="https://instagram.com/sunlivoficial" target="_blank" rel="noopener"
                        className="flex items-center gap-1.5 text-stone-500 hover:text-stone-900 text-xs transition-colors">
                        <Instagram className="w-3.5 h-3.5" />
                        @sunlivoficial
                    </a>
                    <p className="text-stone-400 text-[10px] mt-2">© 2026 Sun Liv — Todos os direitos reservados.</p>
                </div>
            </footer>

        </main>
    );
}

function LeadFormDark() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [done, setDone] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            await fetch('/api/lead', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, phone, clientSlug: 'sunliv', source: 'website-v2' }),
            });
            window.location.href = '/sunliv-moda-praia-atacado/v2/obrigado';
        } catch {
            setSubmitting(false);
        }
    };

    if (done) {
        return (
            <div className="text-center py-6">
                <div className="text-2xl mb-2">🌊</div>
                <p className="text-white font-bold text-sm">Você está na lista VIP!</p>
                <p className="text-white/50 text-xs mt-1">Em breve você receberá novidades no WhatsApp.</p>
            </div>
        );
    }

    const inputClass = "w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-white/50 focus:bg-white/15 transition-all";

    return (
        <form onSubmit={handleSubmit} className="space-y-3">
            <input
                type="text"
                placeholder="Seu nome"
                value={name}
                onChange={e => setName(e.target.value)}
                required
                className={inputClass}
            />
            <input
                type="email"
                placeholder="Seu melhor e-mail"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                className={inputClass}
            />
            <input
                type="tel"
                placeholder="(11) 99999-9999"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                required
                className={inputClass}
            />
            <button
                type="submit"
                disabled={submitting}
                className="w-full bg-white text-stone-900 font-black text-xs uppercase tracking-widest py-4 rounded-xl hover:bg-stone-100 transition-colors disabled:opacity-50"
            >
                {submitting ? 'Enviando...' : 'Quero receber no WhatsApp ›'}
            </button>
        </form>
    );
}
