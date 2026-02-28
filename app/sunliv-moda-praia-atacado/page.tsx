'use client';

import { useState, Suspense } from 'react';
import Image from 'next/image';
import Script from 'next/script';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ChevronDown,
    Check,
    TrendingUp,
    ShoppingBag,
    Zap,
    BarChart3,
    MessageCircle
} from 'lucide-react';
import LeadForm from '@/components/LeadForm';
import WhatsAppButton from '@/components/WhatsAppButton';

const goldGradient = "bg-gradient-to-r from-amber-200 via-amber-400 to-amber-600";
const tealBg = "bg-[#0A3D4D]";
const offWhite = "bg-[#FDFCF8]";


export default function SunlivPage() {
    const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

    const toggleFaq = (index: number) => {
        setOpenFaqIndex(openFaqIndex === index ? null : index);
    };

    const stats = [
        { label: 'Compra Segura' },
        { label: 'Satisfação Garantida' },
        { label: 'Alta Lucratividade' },
        { label: 'Envio para todo Brasil' }
    ];

    const valueProps = [
        {
            title: 'Alta Lucratividade',
            desc: 'Margem de lucro acima de 100%. Revenda com preços competitivos e maximize seus ganhos.',
            icon: <TrendingUp className="w-6 h-6 text-white" />
        },
        {
            title: 'Facilidade de Venda',
            desc: 'Produto 100% validado com alta aceitação no mercado. Todos querem looks elegantes e modernos.',
            icon: <ShoppingBag className="w-6 h-6 text-white" />
        },
        {
            title: 'Alta Demanda',
            desc: 'Moda praia tem demanda o ano inteiro no Brasil. Seja uma revendedora de sucesso.',
            icon: <Zap className="w-6 h-6 text-white" />
        },
        {
            title: 'Escalabilidade',
            desc: 'Escale seu negócio sem preocupações. Com a Sun Liv, seu negócio decola.',
            icon: <BarChart3 className="w-6 h-6 text-white" />
        }
    ];

    const technicalBenefits = [
        { title: 'Fabricação Própria', icon: <Check className="w-5 h-5 text-amber-400" /> },
        { title: 'Tecidos Premium', icon: <Check className="w-5 h-5 text-amber-400" /> },
        { title: '+100% de Margem', icon: <Check className="w-5 h-5 text-amber-400" /> },
        { title: 'Envio em 24h', icon: <Check className="w-5 h-5 text-amber-400" /> }
    ];

    const steps = [
        { num: '01', title: 'Cadastre-se', desc: 'Preencha o formulário abaixo com seus dados e nosso time entrará em contato.' },
        { num: '02', title: 'Receba o Catálogo', desc: 'Acesse nossa coleção completa com preços exclusivos de atacado.' },
        { num: '03', title: 'Faça seu Pedido', desc: 'Mínimo de 10 peças variadas. Pagamento facilitado via PIX ou cartão.' },
        { num: '04', title: 'Comece a Lucrar', desc: 'Receba rápido e comece a vender com margem de lucro acima de 100%.' }
    ];

    const faqs = [
        { q: 'Qual a quantidade mínima que preciso comprar?', a: 'Nosso pedido mínimo é de apenas 10 peças variadas, facilitando o início para novas revendedoras.' },
        { q: 'Compro no atacado, mas não tenho CNPJ. Como fazer?', a: 'Você pode comprar no atacado tanto CPF quanto com CNPJ. Atendemos sacoleiras e lojistas.' },
        { q: 'Quais são as formas de pagamento?', a: 'Aceitamos PIX com desconto, boleto bancário e todos os cartões de crédito com parcelamento.' },
        { q: 'Quais os tamanhos das peças?', a: 'Trabalhamos com uma grade completa que geralmente vai do P ao GG, dependendo do modelo.' },
        { q: 'Quais as formas de envio?', a: 'Enviamos para todo o Brasil via Correios (PAC e SEDEX) ou transportadoras de confiança.' },
        { q: 'Quais as faixas de preços?', a: 'Nossas peças são altamente competitivas para garantir sua margem de 100%. Solicite o catálogo para ver todos os valores.' }
    ];

    const waLink = "https://wa.me/5585994399401?text=Olá! Vim pela AmoAtacado e gostaria de revender Sunliv, ou obter mais informações.";

    const trackWhatsAppConversion = () => {
        if (typeof window !== 'undefined' && (window as any).gtag) {
            (window as any).gtag('event', 'conversion', {
                'send_to': 'AW-401775500/FHUdCLqlloAcEIy3yr8B'
            });
        }
    };

    return (
        <main className={`min-h-screen ${offWhite} font-sans selection:bg-amber-100`}>
            {/* Microsoft Clarity */}
            <Script id="microsoft-clarity" strategy="lazyOnload">
                {`
                    (function(c,l,a,r,i,t,y){
                        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
                    })(window, document, "clarity", "script", "vj3eb84q9y");
                `}
            </Script>

            {/* Meta Pixel Code */}
            <Script id="fb-pixel" strategy="afterInteractive">
                {`
                    !function(f,b,e,v,n,t,s)
                    {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                    n.queue=[];t=b.createElement(e);t.async=!0;
                    t.src=v;s=b.getElementsByTagName(e)[0];
                    s.parentNode.insertBefore(t,s)}(window, document,'script',
                    'https://connect.facebook.net/en_US/fbevents.js');
                    fbq('init', '1342296943580479');
                    fbq('track', 'PageView');
                `}
            </Script>
            <noscript>
                <img
                    height="1"
                    width="1"
                    style={{ display: 'none' }}
                    src="https://www.facebook.com/tr?id=1342296943580479&ev=PageView&noscript=1"
                    alt=""
                />
            </noscript>

            {/* Google Ads Global Tag */}
            <Script
                src="https://www.googletagmanager.com/gtag/js?id=AW-401775500"
                strategy="afterInteractive"
            />
            <Script id="google-ads-gtag" strategy="afterInteractive">
                {`
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', 'AW-401775500');
                `}
            </Script>

            {/* Hero Section */}
            <section className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden">
                {/* Optimized Hero Image */}
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/images/sunliv/catalog-4.jpg"
                        alt="Background Sunliv"
                        fill
                        priority
                        className="object-cover opacity-80"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/70 z-10" />
                </div>

                <div className="container mx-auto px-4 relative z-20 text-center text-white">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        className="mb-8 flex justify-center"
                    >
                        <div className="relative w-32 h-32 md:w-40 md:h-40">
                            <Image
                                src="/images/sunliv/logo_raw.png"
                                alt="Sunliv Logo"
                                fill
                                priority
                                className="object-contain filter brightness-0 invert"
                            />
                        </div>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-7xl font-black mb-6 leading-tight max-w-4xl mx-auto"
                    >
                        Moda Praia no <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-amber-500">Atacado</span> direto de Fortaleza
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="text-lg md:text-xl text-white/80 mb-10 max-w-2xl mx-auto leading-relaxed"
                    >
                        + de 10 anos vestindo o Brasil. Peças com design exclusivo, fabricação própria e margem de lucro acima de 100%.
                        <br />
                        <span className="font-bold text-amber-400 mt-4 block">Pedido mínimo: apenas 10 peças • Peças a partir de R$30</span>
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="flex flex-col sm:flex-row gap-4 justify-center"
                    >
                        <a href="#lead" className={`${goldGradient} hover:scale-105 transition-transform text-slate-900 font-black py-5 px-10 rounded-xl text-lg shadow-xl uppercase tracking-wider`}>
                            QUERO SER REVENDEDORA
                        </a>
                        <a
                            href={waLink}
                            target="_blank"
                            rel="noopener"
                            onClick={trackWhatsAppConversion}
                            className="bg-white/10 backdrop-blur-md hover:bg-white/20 transition-all text-white border border-white/40 font-black py-5 px-10 rounded-xl text-lg uppercase tracking-wider"
                        >
                            VER CATÁLOGO
                        </a>
                    </motion.div>

                    {/* Trust Badges */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8 }}
                        className="mt-16 flex flex-wrap justify-center gap-x-8 gap-y-4 text-xs md:text-sm font-medium text-white/60"
                    >
                        {stats.map((s, i) => (
                            <div key={i} className="flex items-center gap-2">
                                <Check className="w-4 h-4 text-amber-400" />
                                <span>{s.label}</span>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Value Propositions */}
            <section className="py-24 px-4">
                <div className="container mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4">
                            A oportunidade de negócio <span className="text-amber-500">perfeita</span>
                        </h2>
                        <p className="text-slate-500 max-w-2xl mx-auto">Tudo que você precisa para ter uma revenda lucrativa de moda praia</p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {valueProps.map((prop, i) => (
                            <motion.div
                                key={i}
                                whileHover={{ y: -10 }}
                                className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl transition-all h-full"
                            >
                                <div className="w-12 h-12 bg-amber-500 rounded-xl flex items-center justify-center mb-6 shadow-lg shadow-amber-500/30">
                                    {prop.icon}
                                </div>
                                <h3 className="text-xl font-bold mb-3 text-slate-900">{prop.title}</h3>
                                <p className="text-slate-500 leading-relaxed text-sm">{prop.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Catalog Placeholder - Em branco conforme solicitado */}
            <section className={`${tealBg} py-32 px-4 text-white overflow-hidden`}>
                <div className="container mx-auto text-center relative">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-amber-400/10 blur-[100px] pointer-events-none" />

                    <h2 className="text-4xl md:text-6xl font-black mb-6">Conheça nossa <span className="text-amber-400">coleção</span></h2>
                    <p className="text-white/60 mb-20 max-w-xl mx-auto">Fabricação própria com o melhor custo-benefício do mercado. Solicite o catálogo para ver todos os modelos.</p>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
                        {[1, 2, 3, 4].map((idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ delay: idx * 0.1 }}
                                className="group relative aspect-[3/4] rounded-2xl overflow-hidden border border-white/10 shadow-2xl"
                            >
                                <Image
                                    src={`/images/sunliv/catalog-${idx}.jpg`}
                                    alt={`Coleção Sunliv ${idx}`}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                            </motion.div>
                        ))}
                    </div>

                    <div className="mt-20">
                        <a
                            href={waLink}
                            onClick={trackWhatsAppConversion}
                            className={`${goldGradient} inline-flex items-center text-slate-900 font-black py-5 px-12 rounded-2xl text-lg hover:scale-105 transition-transform`}
                        >
                            SOLICITE O CATÁLOGO COMPLETO
                        </a>
                    </div>
                </div>
            </section>

            {/* Features List */}
            <section className="py-24 px-4 bg-white border-b border-slate-100">
                <div className="container mx-auto">
                    <div className="grid md:grid-cols-4 gap-6">
                        {technicalBenefits.map((benefit, i) => (
                            <div key={i} className="flex items-center gap-4 p-6 bg-slate-50 rounded-2xl border border-slate-100">
                                <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center shrink-0">
                                    {benefit.icon}
                                </div>
                                <span className="font-bold text-slate-800 uppercase tracking-tight text-sm">{benefit.title}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Methodology / Steps */}
            <section className="py-24 px-4">
                <div className="container mx-auto">
                    <div className="text-center mb-20">
                        <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4">
                            Como <span className="text-amber-500">funciona</span>
                        </h2>
                        <p className="text-slate-500">4 passos simples para começar a revender</p>
                    </div>

                    <div className="grid md:grid-cols-4 gap-8">
                        {steps.map((step, i) => (
                            <div key={i} className="text-center group">
                                <div className="text-6xl md:text-8xl font-black text-slate-100 mb-4 transition-colors group-hover:text-amber-100">{step.num}</div>
                                <h3 className="text-xl font-bold mb-3 text-slate-900">{step.title}</h3>
                                <p className="text-slate-500 text-sm leading-relaxed">{step.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-24 px-4 bg-slate-50">
                <div className="container mx-auto max-w-3xl">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-black text-slate-900 mb-4">Perguntas <span className="text-amber-500">Frequentes</span></h2>
                    </div>

                    <div className="space-y-4">
                        {faqs.map((faq, i) => (
                            <div key={i} className="bg-white border border-slate-200 rounded-2xl overflow-hidden active:border-amber-400 transition-colors">
                                <button
                                    onClick={() => toggleFaq(i)}
                                    className="w-full flex justify-between items-center p-6 text-left"
                                >
                                    <span className="font-bold text-slate-900">{faq.q}</span>
                                    <ChevronDown className={`w-5 h-5 text-amber-500 transition-transform ${openFaqIndex === i ? 'rotate-180' : ''}`} />
                                </button>
                                <AnimatePresence>
                                    {openFaqIndex === i && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            className="overflow-hidden"
                                        >
                                            <div className="p-6 pt-0 text-slate-500 text-sm border-t border-slate-50">
                                                {faq.a}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Cta Section / Lead Form */}
            <section id="lead" className="py-24 px-4 relative overflow-hidden">
                <div className="container mx-auto max-w-6xl">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div className="text-left">
                            <h2 className="text-4xl md:text-6xl font-black text-slate-900 mb-8 leading-tight italic">
                                Comece a <span className="text-amber-500 italic">lucrar</span> agora
                            </h2>
                            <p className="text-xl text-slate-600 mb-10 leading-relaxed italic">
                                Preencha os dados ao lado para receber o catálogo completo e falar com um consultor da nossa fábrica.
                            </p>

                            <div className="flex flex-col gap-6 italic">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                                        <MessageCircle size={24} />
                                    </div>
                                    <div>
                                        <div className="text-xs uppercase font-bold text-slate-400">Atendimento Via WhatsApp</div>
                                        <div className="text-lg font-black text-slate-900">(85) 99439-9401</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white p-8 md:p-12 rounded-[40px] shadow-2xl shadow-amber-500/10 border border-slate-100">
                            <h3 className="text-2xl font-black text-slate-900 mb-8">Receber Catálogo Atacado</h3>
                            <Suspense fallback={<div className="p-10 text-center animate-pulse bg-slate-100 rounded-xl">Carregando formulário...</div>}>
                                <LeadForm clientSlug="sunliv" />
                            </Suspense>
                        </div>
                    </div>
                </div>

                <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] bg-amber-400/5 blur-[120px] pointer-events-none rounded-full" />
            </section>

            {/* Footer */}
            <footer className="py-12 px-4 border-t border-slate-100 bg-white">
                <div className="container mx-auto text-center">
                    <div className="text-xl font-black tracking-tighter mb-6">SUN LIV</div>
                    <p className="text-slate-400 text-sm mb-4 italic">© 2026 Sun Liv - Todos os direitos reservados.</p>
                    <p className="text-slate-300 text-xs italic">Criado por AmoAtacado</p>
                </div>
            </footer>

            <Suspense fallback={null}>
                <WhatsAppButton
                    phoneNumber="5585994399401"
                    message="Olá! Vim pela AmoAtacado e gostaria de revender Sunliv, ou obter mais informações."
                    onClick={trackWhatsAppConversion}
                />
            </Suspense>
        </main>
    );
}
