'use client';

import { motion, useScroll } from 'framer-motion';
import {
    CheckCircle2,
    Store,
    Tag,
    Package,
    Truck,
    Scissors,
    Phone,
    HelpCircle,
    ShoppingBag,
    TrendingUp,
    ShieldCheck
} from 'lucide-react';
import LeadForm from '@/components/LeadForm';
import WhatsAppButton from '@/components/WhatsAppButton';
import SocialProofNotification from '@/components/SocialProofNotification';
import { useState, Suspense, useRef } from 'react';
import Script from 'next/script';

const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2
        }
    }
};

export default function KyrefhPage() {
    const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
    const timelineRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: timelineRef,
        offset: ["start end", "end start"]
    });

    const toggleFaq = (index: number) => {
        setOpenFaqIndex(openFaqIndex === index ? null : index);
    };

    const audiences = [
        { title: 'Lojistas de Moda Masculina', icon: <Store className="w-6 h-6" /> },
        { title: 'Lojas Virtuais', icon: <Package className="w-6 h-6" /> },
        { title: 'Revendedores', icon: <TrendingUp className="w-6 h-6" /> },
        { title: 'Empreendedores', icon: <Tag className="w-6 h-6" /> },
    ];

    const benefits = [
        {
            title: 'Qualidade Premium',
            description: 'Jeans masculino com acabamento impecável, design moderno e conforto inigualável.',
            icon: <ShieldCheck className="w-8 h-8 text-amber-500" />
        },
        {
            title: 'Variedade de Produtos',
            description: 'Calças, bermudas, t-shirts e polos. O mix completo para o público masculino.',
            icon: <ShoppingBag className="w-8 h-8 text-amber-500" />
        },
        {
            title: 'Pronta Entrega',
            description: 'Estoque disponível para envio imediato para todo o Brasil.',
            icon: <Truck className="w-8 h-8 text-amber-500" />
        },
        {
            title: 'Fabricação Própria',
            description: 'Controle rigoroso de qualidade direto de Fortaleza para sua loja.',
            icon: <Scissors className="w-8 h-8 text-amber-500" />
        }
    ];

    const steps = [
        { title: 'Contato', desc: 'Chame nossa consultora Thalya no WhatsApp ou preencha o formulário.', icon: <Phone className="w-6 h-6" /> },
        { title: 'Catálogo', desc: 'Receba nosso catálogo digital atualizado com os lançamentos.', icon: <Package className="w-6 h-6" /> },
        { title: 'Pedido', desc: 'Escolha os modelos e grade ideal para sua loja.', icon: <ShoppingBag className="w-6 h-6" /> },
        { title: 'Envio', desc: 'Despachamos seu pedido rapidamente para todo Brasil.', icon: <Truck className="w-6 h-6" /> }
    ];

    const products = [
        {
            title: 'Bermudas',
            features: [
                'Alfaiataria',
                'Jeans Premium',
                'Mauricinho',
                'Cargo e Casual'
            ]
        },
        {
            title: 'Calças',
            features: [
                'Alfaiataria',
                'Jeans e Jogger',
                'Tech',
                'Esporte Fino'
            ]
        },
        {
            title: 'Camisas',
            features: [
                'T-Shirt Básica',
                'Oversized',
                'Gola Polo',
                'Tecnológica'
            ]
        }
    ];

    const faqs = [
        { q: 'Vocês enviam para todo o Brasil?', a: 'Sim, enviamos nossos produtos para todo o território nacional através de transportadoras parceiras e correios de forma segura e rápida.' },
        { q: 'Onde ficam localizados?', a: 'Nossa loja física e matriz fica na Rua José Avelino, 256, Centro - Fortaleza/CE.' },
        { q: 'Como faço para ver o catálogo com preços?', a: 'Basta clicar no botão do WhatsApp e falar com a Thalya, ou preencher o formulário no final da página.' },
        { q: 'Quais produtos vocês fabricam?', a: 'Somos especialistas em moda masculina: Calças e Bermudas (Jeans, Alfaiataria, Cargo), T-Shirts (Básica, Oversized) e Polos.' },
        { q: 'Tem grupo VIP para lojistas?', a: 'Sim! Ao se cadastrar você receberá o link para participar do nosso grupo VIP e receber novidades em primeira mão.' }
    ];

    const whatsappLink = "https://wa.me/5585988839020?text=Ol%C3%A1%2C%20quero%20receber%20o%20cat%C3%A1logo%20e%20as%20condi%C3%A7%C3%B5es%20de%20atacado%20da%20Kyrefh%20Jeans.";

    return (
        <main className="min-h-screen bg-zinc-50 font-sans text-zinc-900 selection:bg-amber-500 selection:text-white">
            {/* Meta Pixel Code Placeholder */}
            <Script id="fb-pixel-kyrefh" strategy="afterInteractive">
                {`
                    !function(f,b,e,v,n,t,s)
                    {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                    n.queue=[];t=b.createElement(e);t.async=!0;
                    t.src=v;s=b.getElementsByTagName(e)[0];
                    s.parentNode.insertBefore(t,s)}(window, document,'script',
                    'https://connect.facebook.net/en_US/fbevents.js');
                    // Add Pixel ID when provided
                `}
            </Script>

            {/* Hero Section */}
            <section className="relative min-h-[90vh] flex items-center bg-zinc-950 overflow-hidden">
                {/* Abstract Background Design */}
                <div className="absolute inset-0 z-0">
                    <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-zinc-800 via-zinc-950 to-zinc-950 opacity-80" />
                    <div className="absolute -top-40 -right-40 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
                    <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-zinc-950 to-transparent pointer-events-none z-10" />
                </div>

                <div className="container mx-auto px-4 relative z-20 py-20 flex flex-col items-center justify-center text-center">
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={staggerContainer}
                        className="max-w-4xl mx-auto"
                    >
                        <motion.div variants={fadeIn} className="inline-block px-5 py-2 mb-8 rounded-full bg-zinc-900 border border-zinc-800 shadow-xl">
                            <span className="text-xs sm:text-sm font-black tracking-[0.2em] uppercase text-amber-500">
                                KYREFH JEANS ATACADO
                            </span>
                        </motion.div>

                        <motion.h1 variants={fadeIn} className="text-5xl md:text-7xl font-black leading-tight mb-8 text-white tracking-tight">
                            Eleve o nível da sua loja com <br className="hidden md:block" />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-amber-600">
                                moda masculina premium.
                            </span>
                        </motion.h1>

                        <motion.p variants={fadeIn} className="text-lg md:text-xl text-zinc-400 mb-12 max-w-2xl mx-auto leading-relaxed">
                            Qualidade excepcional, design moderno e conforto inigualável. Somos a fábrica referência em Fortaleza, pronta para abastecer o seu negócio.
                        </motion.p>

                        <motion.div variants={fadeIn} className="flex flex-col sm:flex-row gap-5 justify-center">
                            <a
                                href={whatsappLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center bg-amber-500 hover:bg-amber-400 text-zinc-950 font-black py-4 px-10 rounded-xl transition-all hover:scale-105 shadow-xl shadow-amber-500/20 text-lg uppercase tracking-wide"
                            >
                                <Phone className="mr-3 h-5 w-5" />
                                Falar com a Thalya
                            </a>
                            <a
                                href="#produtos"
                                className="inline-flex items-center justify-center px-10 py-4 rounded-xl text-white bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 hover:border-zinc-700 transition-all font-bold uppercase tracking-wide text-lg"
                            >
                                Conhecer Produtos
                            </a>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Target Audience Section */}
            <section className="py-20 bg-zinc-50 border-b border-zinc-200">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {audiences.map((aud, i) => (
                            <div key={i} className="flex flex-col items-center justify-center p-8 bg-white rounded-2xl border border-zinc-100 hover:border-amber-200 hover:shadow-lg transition-all group">
                                <div className="mb-4 text-zinc-400 group-hover:text-amber-500 transition-colors bg-zinc-50 p-4 rounded-full group-hover:bg-amber-50">{aud.icon}</div>
                                <span className="font-bold text-zinc-800 text-center">{aud.title}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Benefits Section */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-20">
                        <span className="text-amber-500 font-black uppercase tracking-[0.15em] text-sm">NOSSOS DIFERENCIAIS</span>
                        <h2 className="text-4xl md:text-5xl font-black text-zinc-950 mt-4 tracking-tight">Por que revender Kyrefh?</h2>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {benefits.map((benefit, index) => (
                            <div key={index} className="bg-zinc-50 p-10 rounded-3xl border border-zinc-100 hover:shadow-xl transition-all hover:-translate-y-1">
                                <div className="mb-6">{benefit.icon}</div>
                                <h3 className="text-2xl font-black mb-4 text-zinc-950">{benefit.title}</h3>
                                <p className="text-zinc-500 leading-relaxed">{benefit.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Products Section */}
            <section id="produtos" className="py-24 bg-zinc-950 text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-zinc-900 to-transparent opacity-50" />
                <div className="container mx-auto px-4 relative z-10 max-w-6xl">
                    <div className="text-center mb-20">
                        <span className="text-amber-500 font-black uppercase tracking-[0.15em] text-sm">COLEÇÃO</span>
                        <h2 className="text-4xl md:text-5xl font-black mt-4 tracking-tight">Nosso Mix de Produtos</h2>
                        <p className="text-zinc-400 mt-4 max-w-2xl mx-auto">Tudo que o homem moderno precisa, com a qualidade que sua loja exige.</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {products.map((product, index) => (
                            <div
                                key={index}
                                className="bg-zinc-900 border border-zinc-800 p-10 rounded-3xl hover:border-amber-500/50 transition-colors"
                            >
                                <h3 className="text-3xl font-black mb-8 text-white">{product.title}</h3>
                                <ul className="space-y-5 mb-10">
                                    {product.features.map((feat, i) => (
                                        <li key={i} className="flex items-center text-zinc-300 font-medium">
                                            <CheckCircle2 className="w-5 h-5 mr-4 flex-shrink-0 text-amber-500" />
                                            {feat}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                    
                    <div className="mt-16 text-center">
                        <a
                            href={whatsappLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center bg-amber-500 hover:bg-amber-400 text-zinc-950 font-black py-4 px-12 rounded-xl transition-all hover:scale-105 shadow-xl text-lg uppercase tracking-wide"
                        >
                            Solicitar Catálogo Completo
                        </a>
                    </div>
                </div>
            </section>

            {/* How it Works - Timeline */}
            <section ref={timelineRef} className="py-32 bg-zinc-50 overflow-hidden">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-24">
                        <h2 className="text-4xl md:text-5xl font-black mb-6 text-zinc-950 tracking-tight">Passo a Passo</h2>
                        <p className="text-zinc-500 max-w-2xl mx-auto text-lg">Processo simplificado e dinâmico para você escalar seu negócio sem burocracia.</p>
                    </div>

                    <div className="relative max-w-4xl mx-auto">
                        <div className="absolute left-[31px] md:left-1/2 top-0 bottom-0 w-[2px] bg-zinc-200 z-0">
                            <motion.div
                                className="absolute top-0 left-0 w-full bg-amber-500 origin-top"
                                style={{ scaleY: scrollYProgress }}
                            />
                        </div>

                        <div className="space-y-24 relative z-10">
                            {steps.map((step, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 50 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-100px" }}
                                    transition={{ duration: 0.6, delay: i * 0.1 }}
                                    className={`flex flex-col md:flex-row items-start md:items-center ${i % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}
                                >
                                    <div className="w-full md:w-1/2 flex items-center justify-start md:justify-end pl-20 pr-4 md:px-12">
                                        <div className={`text-left ${i % 2 !== 0 ? 'md:text-left' : 'md:text-right'}`}>
                                            <h3 className="text-2xl font-black text-zinc-900 mb-3">{step.title}</h3>
                                            <p className="text-zinc-500 leading-relaxed text-lg">{step.desc}</p>
                                        </div>
                                    </div>

                                    <div className="absolute left-0 md:left-1/2 -translate-x-0 md:-translate-x-1/2 w-16 h-16 bg-zinc-950 rounded-full flex items-center justify-center border-4 border-zinc-50 shadow-xl z-20">
                                        <div className="text-amber-500">{step.icon}</div>
                                    </div>

                                    <div className="hidden md:block w-1/2"></div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className="py-24 bg-white border-t border-zinc-100">
                <div className="container mx-auto px-4 max-w-3xl">
                    <h2 className="text-4xl font-black text-center mb-16 text-zinc-950 tracking-tight">Dúvidas Frequentes</h2>
                    <div className="space-y-4">
                        {faqs.map((faq, index) => (
                            <div key={index} className="bg-zinc-50 rounded-2xl border border-zinc-200 overflow-hidden">
                                <button
                                    onClick={() => toggleFaq(index)}
                                    className="w-full flex justify-between items-center p-6 text-left hover:bg-zinc-100 transition-colors"
                                >
                                    <span className="font-bold text-zinc-900 pr-4">{faq.q}</span>
                                    <HelpCircle className={`w-6 h-6 flex-shrink-0 text-amber-500 transition-transform ${openFaqIndex === index ? 'rotate-180' : ''}`} />
                                </button>
                                {openFaqIndex === index && (
                                    <div className="p-6 pt-0 text-zinc-600 border-t border-zinc-200 mt-2 leading-relaxed">
                                        {faq.a}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Final CTA / Lead Form */}
            <section className="py-24 bg-zinc-950 text-white relative">
                <div className="absolute inset-0 bg-[url('https://kyrefhjeans.com.br/wp-content/uploads/2024/02/IMG_9963-scaled.jpg')] bg-cover bg-center opacity-10 mix-blend-overlay"></div>
                <div className="container mx-auto px-4 relative z-10">
                    <div className="grid lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
                        <div>
                            <h2 className="text-4xl md:text-6xl font-black mb-8 leading-tight tracking-tight">
                                Leve o padrão <span className="text-amber-500">Kyrefh</span> para a sua loja.
                            </h2>
                            <p className="text-xl text-zinc-400 mb-10 max-w-lg">
                                Preencha o formulário para acessar nosso grupo VIP e receber o catálogo com condições exclusivas de atacado.
                            </p>
                            
                            <div className="space-y-4 mb-10">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full bg-zinc-900 flex items-center justify-center text-amber-500 shrink-0">
                                        <Store className="w-5 h-5" />
                                    </div>
                                    <p className="text-zinc-300 font-medium">Matriz na Rua José Avelino, Fortaleza</p>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full bg-zinc-900 flex items-center justify-center text-amber-500 shrink-0">
                                        <Truck className="w-5 h-5" />
                                    </div>
                                    <p className="text-zinc-300 font-medium">Envios diários para todo Brasil</p>
                                </div>
                            </div>
                            
                            <a
                                href={whatsappLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center bg-[#25D366] hover:bg-[#1ebd5a] text-white font-black py-4 px-10 rounded-xl transition-all hover:scale-105 shadow-xl w-full md:w-auto text-lg"
                            >
                                <Phone className="mr-3 h-6 w-6" />
                                WhatsApp da Thalya
                            </a>
                        </div>

                        <div className="bg-white text-zinc-900 p-8 md:p-10 rounded-3xl shadow-2xl relative">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-bl-full pointer-events-none"></div>
                            <h3 className="text-2xl font-black mb-6">Quero revender</h3>
                            <Suspense fallback={<div className="p-10 text-center animate-pulse bg-zinc-100 rounded-2xl">Carregando...</div>}>
                                <LeadForm clientSlug="kyrefh" />
                            </Suspense>
                        </div>
                    </div>
                </div>
            </section>

            <Suspense fallback={null}>
                <WhatsAppButton
                    phoneNumber="5585988839020"
                    message="Olá, quero receber o catálogo e as condições de atacado da Kyrefh Jeans."
                />
            </Suspense>

            <Suspense fallback={null}>
                <SocialProofNotification />
            </Suspense>
        </main>
    );
}
