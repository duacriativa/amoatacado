'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import Script from 'next/script';
import { motion } from 'framer-motion';
import { MessageCircle, Globe, CreditCard, RefreshCw, Heart, Instagram } from 'lucide-react';

const waLink = "https://wa.me/5585991613500?text=Olá! Me cadastrei no site da Sunliv e quero receber lançamentos e ofertas exclusivas no WhatsApp.";

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
                })(window, document, "clarity", "script", "x1yf2c21q7");
            `}</Script>

            {/* HERO */}
            <section className="relative min-h-screen overflow-hidden">
                {/* Background photo */}
                <Image
                    src="/images/sunliv/catalog-5.jpg"
                    alt="Sun Liv"
                    fill
                    priority
                    className="object-cover object-top"
                />
                {/* Warm overlay — puxar para tons quentes, não azulados */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/30 to-black/50" />
                <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/20" />
                {/* Warm tint layer */}
                <div className="absolute inset-0 bg-amber-950/10 mix-blend-multiply" />

                {/* NAVBAR */}
                <div className="absolute top-0 left-0 right-0 z-20 px-6 py-5 flex items-center justify-between">
                    <div className="relative w-10 h-10">
                        <Image src="/images/sunliv/logo_raw.png" alt="Sun Liv" fill className="object-contain brightness-0 invert" />
                    </div>
                </div>

                {/* Content */}
                <div className="relative z-10 container mx-auto px-6 min-h-screen grid lg:grid-cols-2 gap-10 items-center pt-24 pb-16">

                    {/* LEFT */}
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="inline-flex items-center gap-2 border border-white/30 text-white/80 text-[10px] font-semibold uppercase tracking-[0.2em] px-3 py-1.5 rounded-full mb-7">
                            Seja uma Sunliv Girl ✦
                        </div>

                        <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[0.95] tracking-tight mb-6">
                            SOL, MAR E<br />LIVRE PARA<br />SER.
                        </h1>

                        <p className="text-white/70 text-sm leading-relaxed mb-8 max-w-xs">
                            Moda praia e lifestyle que traduzem leveza, autenticidade e conexão com o essencial.
                        </p>

                        <div className="flex flex-wrap gap-7 mb-10">
                            {[
                                { icon: '♡', label: 'Peças Exclusivas', sub: 'Design autoral e edições limitadas' },
                                { icon: '◎', label: 'Com Propósito', sub: 'Produções conscientes e detalhes únicos' },
                                { icon: '✦', label: 'Para Todos os Seus Momentos', sub: 'Do beach ao sunset' },
                            ].map((item) => (
                                <div key={item.label} className="flex flex-col gap-0.5 max-w-[90px]">
                                    <span className="text-white text-sm">{item.icon}</span>
                                    <span className="text-white font-bold text-[9px] uppercase tracking-wider leading-tight">{item.label}</span>
                                    <span className="text-white/45 text-[9px] leading-tight">{item.sub}</span>
                                </div>
                            ))}
                        </div>

                        <button
                            onClick={scrollToForm}
                            className="flex items-center gap-2.5 bg-white text-stone-900 font-black text-xs uppercase tracking-wider py-3.5 px-7 rounded-full hover:bg-stone-100 transition-colors"
                        >
                            <MessageCircle className="w-4 h-4" />
                            Receber lançamentos no WhatsApp
                        </button>
                    </motion.div>

                    {/* RIGHT: Form */}
                    <motion.div
                        ref={formRef}
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.15 }}
                        className="hidden lg:block"
                    >
                        <div className="bg-[#1C1C1A]/92 backdrop-blur-md border border-white/8 rounded-2xl p-8 shadow-2xl">
                            {/* WA icon */}
                            <div className="flex justify-center mb-5">
                                <div className="w-14 h-14 bg-green-500 rounded-full flex items-center justify-center shadow-lg shadow-green-900/40">
                                    <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                                    </svg>
                                </div>
                            </div>

                            <div className="text-center mb-6">
                                <h3 className="text-white font-black text-base uppercase tracking-wider leading-tight">
                                    Receba Lançamentos<br />e Ofertas Exclusivas
                                </h3>
                                <p className="text-white/40 text-xs mt-1">no WhatsApp</p>
                                <p className="text-white/40 text-xs mt-2 leading-relaxed">
                                    Entre para nossa lista VIP e fique por dentro de tudo em primeira mão.
                                </p>
                            </div>

                            <LeadFormDark />

                            <p className="text-white/25 text-[10px] text-center mt-4">
                                🔒 Seus dados estão seguros. Não enviamos spam.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* MOBILE FORM */}
            <div ref={formRef} className="lg:hidden bg-[#1C1C1A] px-6 py-10">
                <div className="flex justify-center mb-5">
                    <div className="w-14 h-14 bg-green-500 rounded-full flex items-center justify-center">
                        <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                        </svg>
                    </div>
                </div>
                <div className="text-center mb-6">
                    <h3 className="text-white font-black text-base uppercase tracking-wider">Receba Lançamentos e Ofertas Exclusivas</h3>
                    <p className="text-white/40 text-xs mt-1">no WhatsApp — lista VIP</p>
                </div>
                <LeadFormDark />
                <p className="text-white/25 text-[10px] text-center mt-4">🔒 Seus dados estão seguros. Não enviamos spam.</p>
            </div>

            {/* TICKER */}
            <div className="bg-[#F2EDE4] border-y border-stone-300/60 py-3 overflow-hidden">
                <div className="flex animate-marquee whitespace-nowrap">
                    {Array.from({ length: 14 }).map((_, i) => (
                        <span key={i} className="text-stone-800 text-[11px] font-bold uppercase tracking-[0.25em] px-8 shrink-0">
                            SUNLIV OFFICIAL <span className="text-stone-400 mx-1">•</span>
                        </span>
                    ))}
                </div>
            </div>

            {/* CATEGORIAS */}
            <section className="py-20 px-6 bg-[#F2EDE4]">
                <div className="container mx-auto">
                    <div className="text-center mb-14">
                        <h2 className="text-3xl md:text-4xl font-black text-stone-900 leading-tight uppercase tracking-tight">
                            Para cada momento,
                        </h2>
                        <p className="text-3xl md:text-4xl font-black text-stone-500 italic mt-1">uma Sunliv.</p>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
                        {categories.map((cat, i) => (
                            <motion.a
                                key={i}
                                href={waLink}
                                target="_blank"
                                rel="noopener"
                                onClick={trackConversion}
                                initial={{ opacity: 0, y: 16 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.07 }}
                                className="relative rounded-2xl overflow-hidden group block"
                                style={{ aspectRatio: '3/4' }}
                            >
                                <Image src={cat.img} alt={cat.title} fill className="object-cover object-top transition-transform duration-700 group-hover:scale-105" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
                                <div className="absolute bottom-0 left-0 right-0 p-4">
                                    <div className="text-white font-black text-xs uppercase tracking-wider">{cat.title}</div>
                                    <div className="text-white/65 text-[11px] mt-0.5 leading-tight">{cat.desc}</div>
                                </div>
                            </motion.a>
                        ))}
                    </div>
                </div>
            </section>

            {/* TRUST BAR */}
            <section className="py-16 px-6 bg-[#EDE8DE]">
                <div className="container mx-auto">
                    <div className="grid lg:grid-cols-5 gap-10 items-center">
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
                                    <div className="w-11 h-11 bg-[#F2EDE4] rounded-xl flex items-center justify-center text-stone-600 shadow-sm">
                                        {item.icon}
                                    </div>
                                    <div>
                                        <div className="font-black text-stone-900 text-[10px] uppercase tracking-wide">{item.title}</div>
                                        <div className="text-stone-500 text-[10px] mt-0.5 leading-tight">{item.desc}</div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                        {/* Polaroid */}
                        <div className="hidden lg:flex justify-center">
                            <div className="bg-white p-2.5 pb-8 rounded shadow-xl rotate-2 hover:rotate-0 transition-transform duration-500 w-40">
                                <div className="relative w-full aspect-[3/4] overflow-hidden">
                                    <Image src="/images/sunliv/catalog-8.jpg" alt="Sunliv" fill className="object-cover object-top" />
                                </div>
                                <p className="text-center mt-3 text-[9px] text-stone-400 uppercase tracking-widest">Sunliv Official</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA FINAL */}
            <section className="relative py-24 px-6 overflow-hidden bg-[#2C3527]">
                <div className="absolute inset-0">
                    <Image src="/images/sunliv/catalog-7.jpg" alt="" fill className="object-cover object-top opacity-25" />
                    <div className="absolute inset-0 bg-[#2C3527]/75" />
                </div>

                <div className="relative container mx-auto grid lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <div className="inline-flex items-center gap-2 border border-white/20 text-white/50 text-[9px] font-bold uppercase tracking-[0.25em] px-3 py-1.5 rounded-full mb-6">
                            ✦ Lista VIP
                        </div>
                        <h2 className="text-5xl md:text-6xl font-black text-white mb-5 leading-tight uppercase tracking-tight">
                            VEM SER<br />SUNLIV.
                        </h2>
                        <p className="text-white/50 text-sm mb-8 leading-relaxed max-w-xs">
                            Entre para nossa comunidade no WhatsApp e viva tudo o que o mar pode te contar.
                        </p>
                        <a
                            href={waLink}
                            target="_blank"
                            rel="noopener"
                            onClick={trackConversion}
                            className="inline-flex items-center gap-3 border-2 border-white text-white font-black text-xs uppercase tracking-widest py-4 px-8 rounded-full hover:bg-white hover:text-stone-900 transition-all"
                        >
                            <MessageCircle className="w-4 h-4" />
                            Quero receber no WhatsApp
                        </a>
                    </div>

                    {/* Logo mark */}
                    <div className="hidden lg:flex justify-end items-center">
                        <div className="relative w-48 h-48 opacity-20">
                            <Image src="/images/sunliv/logo_raw.png" alt="Sun Liv" fill className="object-contain brightness-0 invert" />
                        </div>
                    </div>
                </div>
            </section>

            {/* FOOTER */}
            <footer className="bg-[#F2EDE4] border-t border-stone-200 py-10 px-6">
                <div className="container mx-auto flex flex-col items-center gap-3 text-center">
                    <p className="text-stone-800 font-black text-xs uppercase tracking-[0.3em]">SUNLIV OFFICIAL</p>
                    <p className="text-stone-500 text-xs">Moda praia e lifestyle com alma solar.</p>
                    <a href="https://instagram.com/sunlivoficial" target="_blank" rel="noopener"
                        className="flex items-center gap-1.5 text-stone-500 hover:text-stone-900 text-xs transition-colors">
                        <Instagram className="w-3.5 h-3.5" />
                        @sunlivoficial
                    </a>
                    <p className="text-stone-400 text-[10px] mt-2">© 2026 Sun Liv — Dados da Sunliv Atacado</p>
                </div>
            </footer>

        </main>
    );
}

function LeadFormDark() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [volume, setVolume] = useState('');
    const [submitting, setSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            await fetch('/api/lead', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, phone, orderVolume: volume, clientSlug: 'sunliv-v2', source: 'website-v2' }),
            });
            window.location.href = '/sunliv-moda-praia-atacado/v2/obrigado';
        } catch {
            setSubmitting(false);
        }
    };

    const inputClass = "w-full bg-white/8 border border-white/15 rounded-xl px-4 py-3 text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-white/40 focus:bg-white/12 transition-all";
    const selectClass = `${inputClass} appearance-none`;

    return (
        <div>
            <p className="text-white/30 text-[10px] uppercase tracking-widest mb-1">Formulário de atacado</p>
            <p className="text-white font-bold text-sm mb-5">Receba o catálogo em 60 segundos.</p>
            <form onSubmit={handleSubmit} className="space-y-3">
                <input type="text" placeholder="Seu nome" value={name} onChange={e => setName(e.target.value)} required className={inputClass} />
                <input type="email" placeholder="Seu melhor e-mail" value={email} onChange={e => setEmail(e.target.value)} required className={inputClass} />
                <input type="tel" placeholder="(11) 99999-9999" value={phone} onChange={e => setPhone(e.target.value)} required className={inputClass} />
                <select value={volume} onChange={e => setVolume(e.target.value)} required className={selectClass}>
                    <option value="" disabled>Volume mensal estimado</option>
                    <option value="Até 30 peças">Até 30 peças</option>
                    <option value="30 a 100 peças">30 a 100 peças</option>
                    <option value="100 a 300 peças">100 a 300 peças</option>
                    <option value="Mais de 300 peças">Mais de 300 peças</option>
                </select>
                <button
                    type="submit"
                    disabled={submitting}
                    className="w-full bg-green-500 hover:bg-green-400 text-white font-black text-xs uppercase tracking-widest py-4 rounded-xl transition-colors disabled:opacity-50 mt-1"
                >
                    {submitting ? 'Enviando...' : 'Solicitar catálogo'}
                </button>
            </form>
        </div>
    );
}
