'use client';

import { motion, useScroll } from 'framer-motion';
import {
    CheckCircle2,
    Store,
    Globe,
    Tag,
    Package,
    Truck,
    Scissors,
    Phone,
    HelpCircle,
    ShoppingBag,
    Users,
    TrendingUp,
    Check
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

const FloatingBalloon = ({ delay, x, y, children, color }: { delay: number, x: string, y: string, children: React.ReactNode, color: string }) => (
    <motion.div
        initial={{ opacity: 0, scale: 0.5, y: 20 }}
        animate={{
            opacity: [0, 1, 1, 0],
            scale: [0.5, 1, 1, 0.8],
            y: [-20, -40, -60, -80],
            x: [0, 10, -10, 0]
        }}
        transition={{
            duration: 4,
            repeat: Infinity,
            delay,
            ease: "easeInOut"
        }}
        className={`absolute z-20 px-3 py-2 rounded-2xl shadow-lg text-[10px] font-bold whitespace-nowrap flex items-center gap-2 border ${color}`}
        style={{ left: x, top: y }}
    >
        {children}
    </motion.div>
);

export default function LibertyJeansPage() {
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
        { title: 'Lojistas Físicos', icon: <Store className="w-6 h-6" /> },
        { title: 'Lojas Online', icon: <Globe className="w-6 h-6" /> },
        { title: 'Marcas Próprias', icon: <Tag className="w-6 h-6" /> },
        { title: 'Revendedores', icon: <Package className="w-6 h-6" /> },
    ];

    const benefits = [
        {
            title: 'Fabricação Própria',
            description: 'Controle total da qualidade e prazos, direto da fábrica.',
            icon: <Scissors className="w-8 h-8 text-blue-400" />
        },
        {
            title: 'Private Label',
            description: 'Sua marca na etiqueta. Personalização completa para o seu negócio.',
            icon: <Tag className="w-8 h-8 text-blue-400" />
        },
        {
            title: 'Pronta Entrega',
            description: 'Peças sem marca prontas para envio imediato. Agilidade para repor estoque.',
            icon: <Truck className="w-8 h-8 text-blue-400" />
        },
        {
            title: 'Padronização e Escala',
            description: 'Modelagem validada e capacidade produtiva para grandes pedidos.',
            icon: <CheckCircle2 className="w-8 h-8 text-blue-400" />
        }
    ];

    const steps = [
        { title: 'Contato', desc: 'Chame no WhatsApp ou preencha o formulário.', icon: <Phone className="w-6 h-6" /> },
        { title: 'Catálogo', desc: 'Receba modelos e condições comerciais.', icon: <Package className="w-6 h-6" /> },
        { title: 'Pedido', desc: 'Defina volumes e modelo de compra.', icon: <ShoppingBag className="w-6 h-6" /> },
        { title: 'Envio', desc: 'Produção/Separação e envio para todo Brasil.', icon: <Truck className="w-6 h-6" /> }
    ];

    const purchaseTypes = [
        {
            title: 'Jeans com Sua Marca (Private Label)',
            features: [
                'Etiqueta personalizada',
                'Grade de tamanhos a escolher',
                'Pedido mínimo sob consulta',
                'Foco em construção de marca'
            ],
            cta: 'Quero fabricar minha marca',
            highlight: true
        },
        {
            title: 'Jeans Pronta Entrega (Sem Marca)',
            features: [
                'Envio imediato',
                'Sem etiqueta de fabricante',
                'Pedido mínimo acessível',
                'Ideal para revenda rápida'
            ],
            cta: 'Ver catálogo pronta entrega',
            highlight: false
        }
    ];

    const faqs = [
        { q: 'Qual o pedido mínimo?', a: 'O pedido mínimo varia de acordo com o modelo de compra (Private Label ou Pronta Entrega). Entre em contato para condições atualizadas.' },
        { q: 'Vocês enviam para todo o Brasil?', a: 'Sim, enviamos para todo o território nacional via transportadora ou correios.' },
        { q: 'Posso fabricar com minha própria marca?', a: 'Sim! Somos especialistas em Private Label. Colocamos sua etiqueta e personalizamos o product.' },
        { q: 'Como recebo o catálogo?', a: 'Basta clicar no botão de WhatsApp ou preencher o formulário nesta página para receber o catálogo digital atualizado.' },
        { q: 'Qual o prazo médio?', a: 'Para pronta entrega, o envio é imediato após confirmação. Para Private Label, o prazo de produção é informado no orçamento.' }
    ];

    const whatsappLink = "https://wa.me/5585991528143?text=Ol%C3%A1%2C%20quero%20receber%20o%20cat%C3%A1logo%20e%20as%20condi%C3%A7%C3%B5es%20de%20atacado%20da%20Liberty%20Jeans.";

    return (
        <main className="min-h-screen bg-slate-50 font-sans text-slate-900">
            {/* Meta Pixel Code */}
            <Script id="fb-pixel-liberty" strategy="afterInteractive">
                {`
                    !function(f,b,e,v,n,t,s)
                    {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                    n.queue=[];t=b.createElement(e);t.async=!0;
                    t.src=v;s=b.getElementsByTagName(e)[0];
                    s.parentNode.insertBefore(t,s)}(window, document,'script',
                    'https://connect.facebook.net/en_US/fbevents.js');
                    fbq('init', '2142799419805931');
                    fbq('track', 'PageView');
                `}
            </Script>
            <noscript>
                <img
                    height="1"
                    width="1"
                    style={{ display: 'none' }}
                    src="https://www.facebook.com/tr?id=2142799419805931&ev=PageView&noscript=1"
                    alt=""
                />
            </noscript>
            {/* Hero Section */}
            <section className="relative min-h-[90vh] flex items-center bg-slate-900 overflow-hidden">
                <div className="absolute inset-0 z-0 opacity-40">
                    <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900/40 to-slate-900" />
                </div>

                <div className="container mx-auto px-4 relative z-10 flex flex-col md:flex-row items-center gap-12 py-12">
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={staggerContainer}
                        className="md:w-1/2 text-white"
                    >
                        <motion.div variants={fadeIn} className="inline-block px-4 py-1 mb-6 rounded-full bg-blue-600/30 border border-blue-500/50 backdrop-blur-sm">
                            <span className="text-xs font-bold tracking-widest uppercase text-blue-200">
                                LIBERTY JEANS ATACADO
                            </span>
                        </motion.div>

                        <motion.h1 variants={fadeIn} className="text-4xl md:text-6xl font-black leading-tight mb-6">
                            Fabricação de Jeans para sua marca, com <span className="text-blue-400">Pronta Entrega e Escala.</span>
                        </motion.h1>

                        <motion.p variants={fadeIn} className="text-lg text-slate-300 mb-8 max-w-lg leading-relaxed">
                            Especialistas em Private Label e Jeans Atacado sem marca. A qualidade que sua loja precisa para vender mais.
                        </motion.p>

                        <motion.div variants={fadeIn} className="flex flex-col sm:flex-row gap-4">
                            <a
                                href={whatsappLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-8 rounded-lg transition-all hover:scale-105 shadow-xl shadow-green-600/20"
                            >
                                <Phone className="mr-2 h-5 w-5" />
                                Receber Catálogo
                            </a>
                            <a
                                href="#types"
                                className="inline-flex items-center justify-center px-8 py-4 rounded-lg text-white bg-blue-600 sm:bg-transparent border border-blue-500 sm:border-slate-600 hover:bg-blue-700 sm:hover:bg-slate-800 transition-all font-semibold"
                            >
                                Quero fabricar com minha marca
                            </a>
                        </motion.div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="md:w-1/2 relative h-[500px] md:h-[600px] w-full flex justify-center items-center"
                    >
                        {/* Floating Balloons */}
                        <FloatingBalloon delay={0} x="10%" y="20%" color="bg-white/90 border-blue-100 text-slate-800">
                            <Users className="w-3 h-3 text-blue-500" /> +150 novos lojistas este mês
                        </FloatingBalloon>
                        <FloatingBalloon delay={1.5} x="70%" y="15%" color="bg-blue-600 border-blue-400 text-white">
                            <TrendingUp className="w-3 h-3" /> Vendas escalando em SP
                        </FloatingBalloon>
                        <FloatingBalloon delay={0.8} x="5%" y="60%" color="bg-slate-800 border-slate-600 text-white">
                            <Check className="w-3 h-3 text-green-400" /> Pedido aprovado: 300 peças
                        </FloatingBalloon>
                        <FloatingBalloon delay={2.2} x="65%" y="75%" color="bg-white/90 border-green-100 text-slate-800">
                            <ShoppingBag className="w-3 h-3 text-green-500" /> Cliente de MG acaba de comprar
                        </FloatingBalloon>

                        {/* YouTube Short Embed */}
                        <div className="relative w-full max-w-[300px] md:max-w-[340px] h-full bg-slate-800 rounded-3xl overflow-hidden shadow-2xl border-4 border-slate-700">
                            <iframe
                                className="w-full h-full object-cover"
                                src="https://www.youtube.com/embed/UC14Cfknn9M?autoplay=1&mute=1&loop=1&playlist=UC14Cfknn9M&controls=0&rel=0&showinfo=0"
                                title="Liberty Jeans Factory Tour"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                referrerPolicy="strict-origin-when-cross-origin"
                                allowFullScreen
                            />
                            <div className="absolute inset-0 pointer-events-none ring-1 ring-inset ring-slate-700/50 rounded-2xl"></div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Target Audience Section */}
            <section className="py-16 bg-white border-b border-slate-200">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-2xl font-bold text-slate-800">Para quem é a Liberty Jeans?</h2>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {audiences.map((aud, i) => (
                            <div key={i} className="flex flex-col items-center justify-center p-6 bg-slate-50 rounded-xl border border-slate-100 hover:border-blue-200 hover:shadow-md transition-all">
                                <div className="mb-3 text-blue-600 bg-blue-50 p-3 rounded-full">{aud.icon}</div>
                                <span className="font-semibold text-slate-700">{aud.title}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Benefits Section */}
            <section className="py-24 bg-slate-50">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <span className="text-blue-600 font-bold uppercase tracking-wider text-sm">DIFERENCIAIS</span>
                        <h2 className="text-3xl md:text-4xl font-black text-slate-900 mt-2">Por que escolher a Liberty?</h2>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {benefits.map((benefit, index) => (
                            <div key={index} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                                <div className="mb-4">{benefit.icon}</div>
                                <h3 className="text-xl font-bold mb-2 text-slate-900">{benefit.title}</h3>
                                <p className="text-slate-600 leading-relaxed">{benefit.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* How it Works - Timeline */}
            <section ref={timelineRef} className="py-24 bg-slate-900 text-white overflow-hidden">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-20">
                        <h2 className="text-3xl md:text-5xl font-black mb-4">Como comprar no atacado</h2>
                        <p className="text-slate-400 max-w-2xl mx-auto">Processo simplificado e dinâmico para você escalar seu negócio.</p>
                    </div>

                    <div className="relative max-w-4xl mx-auto">
                        {/* Vertical line that fills on scroll */}
                        <div className="absolute left-[31px] md:left-1/2 top-0 bottom-0 w-[2px] bg-slate-800 z-0">
                            <motion.div
                                className="absolute top-0 left-0 w-full bg-blue-500 origin-top"
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
                                            <h3 className="text-2xl font-bold text-white mb-2">{step.title}</h3>
                                            <p className="text-slate-400 leading-relaxed">{step.desc}</p>
                                        </div>
                                    </div>

                                    <div className="absolute left-0 md:left-1/2 -translate-x-0 md:-translate-x-1/2 w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center border-4 border-slate-900 shadow-xl z-20">
                                        <div className="text-white">{step.icon}</div>
                                    </div>

                                    <div className="hidden md:block w-1/2"></div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Purchase Types */}
            <section id="types" className="py-24 bg-white">
                <div className="container mx-auto px-4 max-w-5xl">
                    <h2 className="text-3xl md:text-4xl font-black text-center mb-16 text-slate-900">Modelos de Compra</h2>

                    <div className="grid md:grid-cols-2 gap-8">
                        {purchaseTypes.map((type, index) => (
                            <div
                                key={index}
                                className={`flex flex-col p-8 rounded-3xl border ${type.highlight ? 'border-blue-600 bg-blue-50 relative overflow-hidden' : 'border-slate-200 bg-white'}`}
                            >
                                {type.highlight && (
                                    <div className="absolute top-0 right-0 bg-blue-600 text-white text-xs font-bold px-4 py-1 rounded-bl-xl">MAIS PROCURADO</div>
                                )}
                                <h3 className="text-2xl font-bold mb-6 text-slate-900">{type.title}</h3>
                                <ul className="space-y-4 mb-8 flex-grow">
                                    {type.features.map((feat, i) => (
                                        <li key={i} className="flex items-center text-slate-700">
                                            <CheckCircle2 className={`w-5 h-5 mr-3 flex-shrink-0 ${type.highlight ? 'text-blue-600' : 'text-slate-400'}`} />
                                            {feat}
                                        </li>
                                    ))}
                                </ul>
                                <a
                                    href={whatsappLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`w-full py-4 rounded-xl font-bold text-center transition-colors ${type.highlight ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-slate-900 text-white hover:bg-slate-800'}`}
                                >
                                    {type.cta}
                                </a>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className="py-16 bg-slate-50">
                <div className="container mx-auto px-4 max-w-3xl">
                    <h2 className="text-3xl font-black text-center mb-12 text-slate-900">Perguntas Frequentes</h2>
                    <div className="space-y-4">
                        {faqs.map((faq, index) => (
                            <div key={index} className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                                <button
                                    onClick={() => toggleFaq(index)}
                                    className="w-full flex justify-between items-center p-6 text-left hover:bg-slate-50 transition-colors"
                                >
                                    <span className="font-bold text-slate-800">{faq.q}</span>
                                    <HelpCircle className={`w-5 h-5 text-blue-500 transition-transform ${openFaqIndex === index ? 'rotate-180' : ''}`} />
                                </button>
                                {openFaqIndex === index && (
                                    <div className="p-6 pt-0 text-slate-600 border-t border-slate-100 mt-2">
                                        {faq.a}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Final CTA / Lead Form */}
            <section className="py-24 bg-gradient-to-br from-slate-900 to-blue-900 text-white relative">
                <div className="container mx-auto px-4">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <h2 className="text-4xl md:text-5xl font-black mb-6 leading-tight">
                                Produza jeans para sua marca com quem é especialista.
                            </h2>
                            <p className="text-xl text-blue-100 mb-8 border-l-4 border-blue-500 pl-6 italic">
                                &quot;Qualidade que transforma negócios.&quot;<br />
                                <span className="text-sm not-italic opacity-70">libertyjeansoficial@gmail.com</span>
                            </p>
                            <a
                                href={whatsappLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center bg-green-500 hover:bg-green-600 text-white font-bold py-5 px-10 rounded-xl text-lg transition-all hover:scale-105 shadow-xl w-full md:w-auto"
                            >
                                <Phone className="mr-3 h-6 w-6" />
                                Falar no WhatsApp
                            </a>
                        </div>

                        <div className="bg-white text-slate-900 p-8 rounded-2xl shadow-2xl overflow-hidden">
                            <Suspense fallback={<div className="p-10 text-center animate-pulse bg-slate-100 rounded-xl">Carregando formulário...</div>}>
                                <LeadForm clientSlug="liberty-jeans" />
                            </Suspense>
                        </div>
                    </div>
                </div>
            </section>

            <Suspense fallback={null}>
                <WhatsAppButton
                    phoneNumber="5585991528143"
                    message="Olá, quero receber o catálogo e as condições de atacado da Liberty Jeans."
                />
            </Suspense>

            <Suspense fallback={null}>
                <SocialProofNotification />
            </Suspense>
        </main>
    );
}
