'use client';

import { useState, Suspense } from 'react';
import Image from 'next/image';
import Script from 'next/script';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Check,
    TrendingUp,
    ShoppingBag,
    Zap,
    BarChart3,
    MessageCircle,
    MapPin,
    Shield,
    Truck,
    Star,
    Plus
} from 'lucide-react';
import LeadForm from '@/components/LeadForm';
import WhatsAppButton from '@/components/WhatsAppButton';

const goldGradient = "bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500";
const waLink = "https://wa.me/5585994399401?text=Olá! Vim pela AmoAtacado e gostaria de revender Sunliv, ou obter mais informações.";

const trackWhatsAppConversion = () => {
    if (typeof window !== 'undefined' && (window as any).gtag) { // eslint-disable-line @typescript-eslint/no-explicit-any
        (window as any).gtag('event', 'conversion', { // eslint-disable-line @typescript-eslint/no-explicit-any
            'send_to': 'AW-401775500/FHUdCLqlloAcEIy3yr8B'
        });
    }
};

const valueProps = [
    { title: 'Alta Lucratividade', desc: 'Margem acima de 100% em cada peça. Revenda com preços competitivos e maximize seus ganhos.', icon: <TrendingUp className="w-6 h-6" /> },
    { title: 'Alta Demanda', desc: 'Moda praia é sempre tendência. Produtos que vendem o ano todo em todo o Brasil.', icon: <Zap className="w-6 h-6" /> },
    { title: 'Produção Própria', desc: 'Fabricamos com qualidade premium e acabamentos de alto padrão direto de Fortaleza.', icon: <Shield className="w-6 h-6" /> },
    { title: 'Escalável', desc: 'Do pequeno ao grande pedido. Cresça seu negócio sem limites com a Sun Liv.', icon: <BarChart3 className="w-6 h-6" /> }
];

const trustBenefits = [
    { title: 'Fabricação Própria', desc: 'Qualidade que você pode confiar', icon: <Shield className="w-7 h-7 text-amber-500" /> },
    { title: 'Tecidos Premium', desc: 'Conforto, beleza e alta durabilidade', icon: <ShoppingBag className="w-7 h-7 text-amber-500" /> },
    { title: 'Alta Margem', desc: 'Lucro real em cada peça', icon: <TrendingUp className="w-7 h-7 text-amber-500" /> },
    { title: 'Envio Rápido', desc: 'Agilidade do pedido à entrega', icon: <Truck className="w-7 h-7 text-amber-500" /> }
];

const steps = [
    { title: 'Cadastro', desc: 'Preencha seus dados de forma rápida e fácil.', icon: <MessageCircle className="w-8 h-8 text-amber-500" /> },
    { title: 'Recebe Catálogo', desc: 'Enviamos nosso catálogo completo no WhatsApp.', icon: <ShoppingBag className="w-8 h-8 text-amber-500" /> },
    { title: 'Faz seu Pedido', desc: 'Escolha suas peças e faça seu pedido.', icon: <Zap className="w-8 h-8 text-amber-500" /> },
    { title: 'Começa a Lucrar', desc: 'Revenda com confiança e aumente seus lucros.', icon: <TrendingUp className="w-8 h-8 text-amber-500" /> }
];

const testimonials = [
    { text: 'As peças vendem muito rápido! Qualidade incrível e meus clientes sempre voltam pra comprar mais.', name: 'Juliana S.', city: 'São Paulo, SP', stars: 5 },
    { text: 'A margem de lucro é excelente e o atendimento é impecável. Super recomendo para quem quer começar!', name: 'Carla M.', city: 'Recife, PE', stars: 5 },
    { text: 'Entrega rápida, peças lindas e de ótima qualidade. Minha loja só trabalha com vocês agora!', name: 'Patrícia A.', city: 'Belo Horizonte, MG', stars: 5 }
];

const faqs = [
    { q: 'Qual é o pedido mínimo?', a: 'Nosso pedido mínimo é de apenas 10 peças variadas, facilitando o início para novas revendedoras.' },
    { q: 'Preciso ter CNPJ para comprar?', a: 'Não. Você pode comprar tanto com CPF quanto com CNPJ. Atendemos sacoleiras, lojistas e revendedoras iniciantes.' },
    { q: 'Quais as formas de pagamento?', a: 'Aceitamos PIX com desconto, boleto bancário e todos os cartões de crédito com parcelamento.' },
    { q: 'Como funciona a entrega?', a: 'Enviamos para todo o Brasil via Correios (PAC e SEDEX) ou transportadoras de confiança, com rastreamento.' },
    { q: 'Posso trocar produtos?', a: 'Sim. Trabalhamos com política de troca para produtos com defeito de fabricação. Entre em contato com nossa equipe.' }
];

export default function SunlivPage() {
    const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

    return (
        <main className="min-h-screen bg-white font-sans selection:bg-amber-100">

            <Script id="microsoft-clarity" strategy="lazyOnload">{`
                (function(c,l,a,r,i,t,y){
                    c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                    t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                    y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
                })(window, document, "clarity", "script", "vj3eb84q9y");
            `}</Script>
            <Script id="fb-pixel" strategy="afterInteractive">{`
                !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
                fbq('init','1342296943580479');fbq('track','PageView');
            `}</Script>
            <noscript><img height="1" width="1" style={{display:'none'}} src="https://www.facebook.com/tr?id=1342296943580479&ev=PageView&noscript=1" alt="" /></noscript>
            <Script src="https://www.googletagmanager.com/gtag/js?id=AW-401775500" strategy="afterInteractive" />
            <Script id="google-ads-gtag" strategy="afterInteractive">{`
                window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','AW-401775500');
            `}</Script>

            {/* NAVBAR */}
            <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-100">
                <div className="container mx-auto px-4 py-3 flex items-center justify-between">
                    <div className="relative w-28 h-10">
                        <Image src="/images/sunliv/logo_raw.png" alt="Sun Liv" fill className="object-contain" />
                    </div>
                    <a href={waLink} target="_blank" rel="noopener" onClick={trackWhatsAppConversion}
                        className="flex items-center gap-2 bg-green-500 hover:bg-green-600 transition-colors text-white font-bold py-2.5 px-5 rounded-xl text-sm">
                        <MessageCircle className="w-4 h-4" />
                        Fale no WhatsApp
                    </a>
                </div>
            </header>

            {/* HERO SPLIT */}
            <section className="bg-[#FAFAF8] overflow-hidden">
                <div className="container mx-auto px-4">
                    <div className="grid lg:grid-cols-2 gap-0 min-h-[85vh] items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.7 }}
                            className="py-16 lg:py-24 pr-0 lg:pr-12"
                        >
                            <div className="inline-flex items-center gap-2 bg-amber-50 border border-amber-200 text-amber-700 text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-8">
                                <MapPin className="w-3 h-3" />
                                Atacado direto de Fortaleza
                            </div>
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 leading-[1.05] mb-6">
                                Moda Praia no Atacado que{' '}
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">
                                    Vende Sozinha
                                </span>
                            </h1>
                            <p className="text-lg text-slate-500 mb-10 leading-relaxed max-w-md">
                                Produção própria em Fortaleza, peças de alta qualidade, com margem alta e pedido mínimo acessível.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 mb-12">
                                <a href={waLink} target="_blank" rel="noopener" onClick={trackWhatsAppConversion}
                                    className={`${goldGradient} flex items-center justify-center gap-2 text-slate-900 font-black py-4 px-8 rounded-xl text-base shadow-lg shadow-amber-200 hover:scale-105 transition-transform`}>
                                    <MessageCircle className="w-5 h-5" />
                                    Quero receber catálogo
                                </a>
                                <a href="#colecao"
                                    className="flex items-center justify-center gap-2 bg-white border-2 border-slate-200 text-slate-800 font-bold py-4 px-8 rounded-xl text-base hover:border-amber-400 transition-colors">
                                    Ver coleção
                                </a>
                            </div>
                            <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm text-slate-500">
                                {['Pedido mínimo baixo', 'Envio rápido', 'Produção própria'].map((t) => (
                                    <div key={t} className="flex items-center gap-2">
                                        <Check className="w-4 h-4 text-amber-500" /><span>{t}</span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 1.05 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.9 }}
                            className="relative h-[500px] lg:h-full min-h-[600px] rounded-3xl lg:rounded-none overflow-hidden"
                        >
                            <Image src="/images/sunliv/catalog-5.jpg" alt="Modelo Sun Liv" fill priority
                                className="object-cover object-top" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* VANTAGENS */}
            <section className="py-24 px-4 bg-white">
                <div className="container mx-auto">
                    <div className="text-center mb-16">
                        <span className="text-xs font-bold uppercase tracking-widest text-amber-500 mb-3 block">Vantagens</span>
                        <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-3">
                            A oportunidade perfeita para<br />revender moda praia
                        </h2>
                        <div className="w-12 h-1 bg-amber-400 mx-auto rounded-full mt-4" />
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {valueProps.map((prop, i) => (
                            <motion.div key={i}
                                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                                className="text-center p-8 bg-slate-50 rounded-2xl border border-slate-100 hover:border-amber-200 hover:shadow-lg transition-all group">
                                <div className="w-14 h-14 bg-amber-100 group-hover:bg-amber-400 transition-colors rounded-2xl flex items-center justify-center mx-auto mb-5 text-amber-600 group-hover:text-white">
                                    {prop.icon}
                                </div>
                                <h3 className="text-lg font-bold text-slate-900 mb-2">{prop.title}</h3>
                                <p className="text-slate-500 text-sm leading-relaxed">{prop.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* COLEÇÃO */}
            <section id="colecao" className="py-24 px-4 bg-slate-950">
                <div className="container mx-auto">
                    <div className="text-center mb-16">
                        <span className="text-xs font-bold uppercase tracking-widest text-amber-400 mb-3 block">Coleção</span>
                        <h2 className="text-3xl md:text-4xl font-black text-white mb-3">Conheça nossa coleção</h2>
                        <div className="w-12 h-1 bg-amber-400 mx-auto rounded-full mt-4" />
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
                            className="col-span-2 row-span-2 relative rounded-2xl overflow-hidden group"
                            style={{ aspectRatio: '3/4' }}>
                            <Image src="/images/sunliv/catalog-8.jpg" alt="Coleção Sun Liv destaque" fill
                                className="object-cover object-top transition-transform duration-700 group-hover:scale-105" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                        </motion.div>
                        {[1, 2, 3, 4, 6, 7].map((idx, i) => (
                            <motion.div key={idx}
                                initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}
                                className="relative rounded-2xl overflow-hidden group"
                                style={{ aspectRatio: '3/4' }}>
                                <Image src={`/images/sunliv/catalog-${idx}.jpg`} alt={`Coleção Sun Liv ${idx}`} fill
                                    className="object-cover object-top transition-transform duration-700 group-hover:scale-105" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                            </motion.div>
                        ))}
                    </div>

                    <div className="text-center mt-12">
                        <a href={waLink} target="_blank" rel="noopener" onClick={trackWhatsAppConversion}
                            className="inline-flex items-center gap-3 bg-green-500 hover:bg-green-600 transition-colors text-white font-black py-4 px-10 rounded-2xl text-base">
                            <MessageCircle className="w-5 h-5" />
                            Ver catálogo completo
                        </a>
                    </div>
                </div>
            </section>

            {/* TRUST BAR */}
            <section className="py-16 px-4 bg-amber-50 border-y border-amber-100">
                <div className="container mx-auto">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {trustBenefits.map((b, i) => (
                            <motion.div key={i}
                                initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                                className="flex flex-col items-center text-center gap-3">
                                <div className="w-14 h-14 bg-white rounded-2xl shadow-sm flex items-center justify-center">{b.icon}</div>
                                <div>
                                    <div className="font-bold text-slate-900 text-sm">{b.title}</div>
                                    <div className="text-slate-500 text-xs mt-0.5">{b.desc}</div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* COMO FUNCIONA */}
            <section className="py-24 px-4 bg-white">
                <div className="container mx-auto">
                    <div className="text-center mb-16">
                        <span className="text-xs font-bold uppercase tracking-widest text-amber-500 mb-3 block">Como funciona</span>
                        <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-3">É simples começar a revender</h2>
                        <div className="w-12 h-1 bg-amber-400 mx-auto rounded-full mt-4" />
                    </div>
                    <div className="grid md:grid-cols-4 gap-8 relative">
                        <div className="hidden md:block absolute top-8 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-transparent via-amber-200 to-transparent" />
                        {steps.map((step, i) => (
                            <motion.div key={i}
                                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }}
                                className="text-center relative">
                                <div className="relative inline-flex mb-6">
                                    <div className="w-16 h-16 bg-amber-50 border-2 border-amber-200 rounded-2xl flex items-center justify-center">{step.icon}</div>
                                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-amber-400 rounded-full flex items-center justify-center text-white text-xs font-black">{i + 1}</div>
                                </div>
                                <h3 className="text-lg font-bold text-slate-900 mb-2">{step.title}</h3>
                                <p className="text-slate-500 text-sm leading-relaxed">{step.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* DEPOIMENTOS */}
            <section className="py-24 px-4 bg-slate-50">
                <div className="container mx-auto">
                    <div className="text-center mb-16">
                        <span className="text-xs font-bold uppercase tracking-widest text-amber-500 mb-3 block">Quem revende, aprova</span>
                        <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-3">Mais de 500 revendedoras ativas</h2>
                        <div className="w-12 h-1 bg-amber-400 mx-auto rounded-full mt-4" />
                    </div>
                    <div className="grid md:grid-cols-3 gap-6">
                        {testimonials.map((t, i) => (
                            <motion.div key={i}
                                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                                className="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm">
                                <div className="flex gap-1 mb-4">
                                    {Array.from({ length: t.stars }).map((_, s) => (
                                        <Star key={s} className="w-4 h-4 fill-amber-400 text-amber-400" />
                                    ))}
                                </div>
                                <p className="text-slate-600 leading-relaxed mb-6 text-sm">&ldquo;{t.text}&rdquo;</p>
                                <div>
                                    <div className="font-bold text-slate-900 text-sm">{t.name}</div>
                                    <div className="text-slate-400 text-xs mt-0.5">{t.city}</div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className="py-24 px-4 bg-white">
                <div className="container mx-auto max-w-2xl">
                    <div className="text-center mb-16">
                        <span className="text-xs font-bold uppercase tracking-widest text-amber-500 mb-3 block">Dúvidas frequentes</span>
                        <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-3">Perguntas frequentes</h2>
                        <div className="w-12 h-1 bg-amber-400 mx-auto rounded-full mt-4" />
                    </div>
                    <div className="space-y-3">
                        {faqs.map((faq, i) => (
                            <div key={i} className="border border-slate-200 rounded-2xl overflow-hidden">
                                <button onClick={() => setOpenFaqIndex(openFaqIndex === i ? null : i)}
                                    className="w-full flex justify-between items-center p-6 text-left hover:bg-slate-50 transition-colors">
                                    <span className="font-bold text-slate-900 text-sm pr-4">{faq.q}</span>
                                    <Plus className={`w-5 h-5 text-amber-500 shrink-0 transition-transform ${openFaqIndex === i ? 'rotate-45' : ''}`} />
                                </button>
                                <AnimatePresence>
                                    {openFaqIndex === i && (
                                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                                            <div className="px-6 pb-6 text-slate-500 text-sm leading-relaxed border-t border-slate-100 pt-4">{faq.a}</div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA + LEAD FORM */}
            <section id="lead" className="py-24 px-4 bg-slate-950 relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(251,191,36,0.08)_0%,_transparent_60%)] pointer-events-none" />
                <div className="container mx-auto max-w-5xl relative">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <h2 className="text-4xl md:text-5xl font-black text-white leading-tight mb-6">
                                Comece a revender<br />
                                <span className="text-amber-400">ainda essa semana</span>
                            </h2>
                            <p className="text-slate-400 mb-10 leading-relaxed">
                                Receba agora nosso catálogo completo no WhatsApp e dê o primeiro passo para lucrar com moda praia.
                            </p>
                            <div className="flex flex-col gap-4 text-sm text-slate-400">
                                {[
                                    { icon: <MessageCircle className="w-5 h-5 text-green-400 shrink-0" />, text: 'Atendimento rápido via WhatsApp' },
                                    { icon: <ShoppingBag className="w-5 h-5 text-amber-400 shrink-0" />, text: 'Catálogo completo com preços de atacado' },
                                    { icon: <Check className="w-5 h-5 text-amber-400 shrink-0" />, text: 'Sem compromisso' }
                                ].map((item, i) => (
                                    <div key={i} className="flex items-center gap-3">{item.icon}<span>{item.text}</span></div>
                                ))}
                            </div>
                        </div>
                        <div className="bg-white p-8 md:p-10 rounded-3xl shadow-2xl">
                            <h3 className="text-xl font-black text-slate-900 mb-2">Quero receber o catálogo</h3>
                            <p className="text-slate-400 text-sm mb-8">Seus dados estão seguros conosco.</p>
                            <Suspense fallback={<div className="p-10 text-center animate-pulse bg-slate-100 rounded-xl text-sm text-slate-400">Carregando formulário...</div>}>
                                <LeadForm clientSlug="sunliv" />
                            </Suspense>
                        </div>
                    </div>
                </div>
            </section>

            {/* FOOTER */}
            <footer className="bg-slate-900 py-12 px-4">
                <div className="container mx-auto">
                    <div className="grid md:grid-cols-3 gap-10 mb-10">
                        <div>
                            <div className="relative w-24 h-8 mb-4">
                                <Image src="/images/sunliv/logo_raw.png" alt="Sun Liv" fill className="object-contain brightness-0 invert" />
                            </div>
                            <p className="text-slate-500 text-sm leading-relaxed">Moda praia no atacado direto de Fortaleza para todo o Brasil.</p>
                        </div>
                        <div>
                            <div className="font-bold text-white text-sm mb-4">Links úteis</div>
                            <div className="flex flex-col gap-2 text-slate-500 text-sm">
                                <a href="#colecao" className="hover:text-amber-400 transition-colors">Coleção</a>
                                <a href="#lead" className="hover:text-amber-400 transition-colors">Como funciona</a>
                                <a href="#lead" className="hover:text-amber-400 transition-colors">Perguntas frequentes</a>
                                <a href={waLink} target="_blank" rel="noopener" className="hover:text-amber-400 transition-colors">Fale conosco</a>
                            </div>
                        </div>
                        <div>
                            <div className="font-bold text-white text-sm mb-4">Siga-nos</div>
                            <a href="https://instagram.com/sunlivoficial" target="_blank" rel="noopener"
                                className="w-10 h-10 bg-slate-800 hover:bg-amber-400 transition-colors rounded-xl flex items-center justify-center text-slate-400 hover:text-white inline-flex">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                            </a>
                        </div>
                    </div>
                    <div className="border-t border-slate-800 pt-8 text-center text-slate-600 text-xs">
                        © 2026 Sun Liv — Todos os direitos reservados. Criado por <span className="text-slate-500">AmoAtacado</span>
                    </div>
                </div>
            </footer>

            <Suspense fallback={null}>
                <WhatsAppButton phoneNumber="5585994399401" message="Olá! Vim pela AmoAtacado e gostaria de revender Sunliv, ou obter mais informações." onClick={trackWhatsAppConversion} />
            </Suspense>
        </main>
    );
}
