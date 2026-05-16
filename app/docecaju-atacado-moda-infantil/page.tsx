'use client';

import { motion } from 'framer-motion';
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
    ShieldCheck,
    Heart,
    Star,
    MapPin,
} from 'lucide-react';
import LeadForm from '@/components/LeadForm';
import WhatsAppButton from '@/components/WhatsAppButton';
import SocialProofNotification from '@/components/SocialProofNotification';
import { useState, Suspense } from 'react';
import Script from 'next/script';

const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.2 }
    }
};

const PHONE = '558581127189';
const WA_MESSAGE = 'Olá! Vim pela página da Doce Caju e quero saber mais sobre o atacado.';
const WA_LINK = `https://wa.me/${PHONE}?text=${encodeURIComponent(WA_MESSAGE)}`;

const gdrive = (id: string, size = 800) =>
    `https://drive.google.com/thumbnail?id=${id}&sz=w${size}`;

const HERO_BG = gdrive('1IoQn08aXzpX0qh2t0BjwX3vahyyJ1uss', 1600);

const LOOKBOOK_IMAGES = [
    { thumb: gdrive('1cw64ty9ra_ACRlygyh02iShvHHMmdK7E'), full: gdrive('1cw64ty9ra_ACRlygyh02iShvHHMmdK7E', 1600) },
    { thumb: gdrive('1VlKcfWWGyK7TEkx835QKqFoA4TfW7d9i'), full: gdrive('1VlKcfWWGyK7TEkx835QKqFoA4TfW7d9i', 1600) },
    { thumb: gdrive('1SeyTIXw48SUoAYTcV0SvwCYMDuOrK4Dd'), full: gdrive('1SeyTIXw48SUoAYTcV0SvwCYMDuOrK4Dd', 1600) },
    { thumb: gdrive('1fifIkVarbJ61u-HzyqQtH3sifcLMBBLl'), full: gdrive('1fifIkVarbJ61u-HzyqQtH3sifcLMBBLl', 1600) },
    { thumb: gdrive('112CtrIF0N6V0UnyXMaDUVw0Be3zQ-trb'), full: gdrive('112CtrIF0N6V0UnyXMaDUVw0Be3zQ-trb', 1600) },
    { thumb: gdrive('1ouGg8sCDPRgLgo2mVhBuoOo1WM0rVgbF'), full: gdrive('1ouGg8sCDPRgLgo2mVhBuoOo1WM0rVgbF', 1600) },
    { thumb: gdrive('1WZ2NEczeWxTcgW8ntzyPTj8o6UVXvYPf'), full: gdrive('1WZ2NEczeWxTcgW8ntzyPTj8o6UVXvYPf', 1600) },
    { thumb: gdrive('1xu9joqRZn1yag4w_T2iCmcN0N29pL3lI'), full: gdrive('1xu9joqRZn1yag4w_T2iCmcN0N29pL3lI', 1600) },
    { thumb: gdrive('1SDmwOCvmRGwEF5aauOxB0ugLtQKMQ3uD'), full: gdrive('1SDmwOCvmRGwEF5aauOxB0ugLtQKMQ3uD', 1600) },
];

export default function DoceCajuPage() {
    const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
    const [lightbox, setLightbox] = useState<string | null>(null);

    const toggleFaq = (index: number) => {
        setOpenFaqIndex(openFaqIndex === index ? null : index);
    };

    const audiences = [
        { title: 'Lojistas de Moda Infantil', icon: <Store className="w-6 h-6" /> },
        { title: 'Lojas Virtuais', icon: <Package className="w-6 h-6" /> },
        { title: 'Revendedoras', icon: <TrendingUp className="w-6 h-6" /> },
        { title: 'Empreendedoras', icon: <Tag className="w-6 h-6" /> },
    ];

    const benefits = [
        {
            title: 'Alta Qualidade',
            description: 'Moda infantil com acabamento impecável, tecidos premium e design exclusivo que encanta mães e crianças.',
            icon: <ShieldCheck className="w-8 h-8 text-pink-500" />
        },
        {
            title: 'Peças Exclusivas',
            description: 'Coleções trendy & cool com identidade única. Seus clientes vão amar e fidelizar.',
            icon: <Star className="w-8 h-8 text-pink-500" />
        },
        {
            title: 'Entrega para Todo Brasil',
            description: 'Enviamos com agilidade e segurança para qualquer estado. Seu estoque sempre abastecido.',
            icon: <Truck className="w-8 h-8 text-pink-500" />
        },
        {
            title: 'Fabricação Própria',
            description: 'Controle total de qualidade direto de Fortaleza, com coleções sempre atualizadas.',
            icon: <Scissors className="w-8 h-8 text-pink-500" />
        }
    ];

    const steps = [
        { title: 'Contato', desc: 'Chame no WhatsApp ou preencha o formulário abaixo.', icon: <Phone className="w-6 h-6" /> },
        { title: 'Catálogo', desc: 'Receba o catálogo digital com os lançamentos da temporada.', icon: <Package className="w-6 h-6" /> },
        { title: 'Pedido', desc: 'Escolha as peças e feche seu pedido (mínimo 10 peças).', icon: <ShoppingBag className="w-6 h-6" /> },
        { title: 'Entrega', desc: 'Despachamos rapidinho para todo o Brasil.', icon: <Truck className="w-6 h-6" /> }
    ];

    const products = [
        {
            title: 'Vestidos & Saias',
            features: [
                'Estampas exclusivas',
                'Looks de festa',
                'Casual chic',
                'Edições temáticas'
            ]
        },
        {
            title: 'Conjuntos',
            features: [
                'Blusas + shorts',
                'Macacões',
                'Looks completos',
                'Tendências da temporada'
            ]
        },
        {
            title: 'Linha Junina',
            features: [
                'Vestidos xadrez',
                'Conjuntinhos caipiras',
                'Chapéu e acessórios',
                'Coleção especial'
            ]
        }
    ];

    const faqs = [
        {
            q: 'Qual o pedido mínimo?',
            a: 'O pedido mínimo é de 10 peças por pedido, sem exigência de grade fechada por modelo.'
        },
        {
            q: 'Vocês enviam para todo o Brasil?',
            a: 'Sim! Enviamos para todos os estados brasileiros por transportadoras parceiras e Correios.'
        },
        {
            q: 'Onde fica a loja física?',
            a: 'Estamos na Avenida Washington Soares, 450 – Loja 43, Fortaleza/CE.'
        },
        {
            q: 'Como faço para ver o catálogo com preços?',
            a: 'Basta clicar no botão do WhatsApp ou preencher o formulário. Nossa equipe envia o catálogo na hora.'
        },
        {
            q: 'Têm grupo VIP para lojistas?',
            a: 'Sim! Ao se cadastrar você recebe o acesso ao nosso grupo exclusivo com lançamentos em primeira mão e promoções especiais.'
        }
    ];

    const reviews = [
        { name: 'Fernanda R.', city: 'São Paulo / SP', text: 'As peças chegaram lindíssimas, minha clientela amou! Qualidade incrível para o preço de atacado.' },
        { name: 'Carla M.', city: 'Brasília / DF', text: 'Recomendo de olhos fechados. Atendimento ágil e os produtos são exatamente como nas fotos.' },
        { name: 'Juliana S.', city: 'Rio de Janeiro / RJ', text: 'Revendo Doce Caju há 1 ano e não paro mais. Minhas clientes ficam encantadas com os estampados.' },
    ];

    return (
        <main className="min-h-screen bg-rose-50 font-sans text-zinc-900 selection:bg-pink-400 selection:text-white">
            <Script id="fb-pixel-docecaju" strategy="afterInteractive">
                {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','424689846307173');fbq('track','PageView');`}
            </Script>

            {/* ── HERO ── */}
            <section className="relative min-h-[90vh] flex items-center overflow-hidden">
                {/* Background photo */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src={HERO_BG}
                    alt="Coleção Farm Girl Doce Caju"
                    className="absolute inset-0 w-full h-full object-cover object-center"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-pink-950/90 via-pink-950/70 to-pink-950/30" />
                <div className="absolute inset-0 bg-gradient-to-t from-pink-950/60 via-transparent to-transparent" />

                <div className="container mx-auto px-4 relative z-20 py-24">
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={staggerContainer}
                        className="max-w-2xl text-white"
                    >
                        <motion.div variants={fadeIn} className="inline-flex items-center gap-2 px-5 py-2 mb-6 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm">
                            <Heart className="w-4 h-4 text-pink-300 fill-pink-300" />
                            <span className="text-xs sm:text-sm font-black tracking-[0.15em] uppercase text-pink-200">
                                DOCE CAJU ATACADO
                            </span>
                        </motion.div>

                        <motion.h1 variants={fadeIn} className="text-4xl md:text-6xl lg:text-7xl font-black leading-tight mb-6 tracking-tight">
                            Moda infantil{' '}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-200 to-rose-300">
                                trendy & cool
                            </span>{' '}
                            para sua loja lucrar mais.
                        </motion.h1>

                        <motion.p variants={fadeIn} className="text-lg md:text-xl text-pink-100/80 mb-10 max-w-xl leading-relaxed">
                            Atacado exclusivo para lojistas e revendedoras. A partir de <strong className="text-white">10 peças</strong> por pedido, com qualidade e exclusividade que seus clientes vão amar.
                        </motion.p>

                        <motion.div variants={fadeIn} className="flex flex-col sm:flex-row gap-4">
                            <a
                                href={WA_LINK}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center bg-white hover:bg-pink-50 text-pink-700 font-black py-4 px-8 rounded-xl transition-all hover:scale-105 shadow-xl shadow-pink-900/30 text-lg uppercase tracking-wide"
                            >
                                <Phone className="mr-3 h-5 w-5" />
                                Quero ser revendedora
                            </a>
                            <a
                                href="#lookbook"
                                className="inline-flex items-center justify-center px-8 py-4 rounded-xl text-white bg-white/10 border border-white/20 hover:bg-white/20 transition-all font-bold uppercase tracking-wide text-lg backdrop-blur-sm"
                            >
                                Ver Coleção
                            </a>
                        </motion.div>

                        {/* trust badges */}
                        <motion.div variants={fadeIn} className="mt-10 flex flex-wrap gap-4">
                            {['161K seguidores no Instagram', '10 peças mínimo', 'Envio para todo Brasil'].map((badge) => (
                                <span key={badge} className="inline-flex items-center gap-2 text-sm text-pink-200 bg-white/10 px-4 py-2 rounded-full border border-white/10">
                                    <CheckCircle2 className="w-4 h-4 text-pink-300" />
                                    {badge}
                                </span>
                            ))}
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* ── PÚBLICO ── */}
            <section className="py-16 bg-white border-b border-rose-100">
                <div className="container mx-auto px-4">
                    <p className="text-center text-sm font-black uppercase tracking-[0.2em] text-pink-400 mb-8">Para quem é o atacado Doce Caju?</p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {audiences.map((aud, i) => (
                            <div key={i} className="flex flex-col items-center justify-center p-8 bg-rose-50 rounded-2xl border border-rose-100 hover:border-pink-300 hover:shadow-lg transition-all group">
                                <div className="mb-4 text-rose-300 group-hover:text-pink-500 transition-colors bg-white p-4 rounded-full shadow-sm group-hover:shadow-pink-100">
                                    {aud.icon}
                                </div>
                                <span className="font-bold text-zinc-800 text-center text-sm">{aud.title}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── BENEFÍCIOS ── */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-20">
                        <span className="text-pink-500 font-black uppercase tracking-[0.15em] text-sm">NOSSOS DIFERENCIAIS</span>
                        <h2 className="text-4xl md:text-5xl font-black text-zinc-950 mt-4 tracking-tight">Por que revender Doce Caju?</h2>
                        <p className="text-zinc-500 mt-4 max-w-xl mx-auto">Qualidade e exclusividade que fidelizam sua clientela — e fazem sua loja crescer.</p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {benefits.map((benefit, index) => (
                            <div key={index} className="bg-rose-50 p-10 rounded-3xl border border-rose-100 hover:shadow-xl transition-all hover:-translate-y-1">
                                <div className="mb-6">{benefit.icon}</div>
                                <h3 className="text-xl font-black mb-3 text-zinc-950">{benefit.title}</h3>
                                <p className="text-zinc-500 leading-relaxed text-sm">{benefit.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── DESTAQUE: atacado exclusivo ── */}
            <section className="py-20 bg-gradient-to-br from-pink-600 to-rose-500 text-white relative overflow-hidden">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute -top-20 -right-20 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-pink-800/30 rounded-full blur-2xl" />
                </div>
                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-3xl mx-auto text-center">
                        <h2 className="text-4xl md:text-5xl font-black mb-8 leading-tight">
                            Atacado <em className="not-italic">exclusivo</em> para<br />lojistas e revendedoras.
                        </h2>
                        <div className="grid grid-cols-3 gap-6 mb-12">
                            {[
                                { label: 'Mínimo por pedido', value: '10 peças' },
                                { label: 'Seguidores Instagram', value: '161K+' },
                                { label: 'Estados atendidos', value: 'Todo Brasil' },
                            ].map((stat) => (
                                <div key={stat.label} className="bg-white/15 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                                    <div className="text-3xl font-black text-white mb-1">{stat.value}</div>
                                    <div className="text-pink-100 text-sm">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                        <a
                            href={WA_LINK}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center bg-white hover:bg-pink-50 text-pink-700 font-black py-4 px-12 rounded-xl transition-all hover:scale-105 shadow-2xl text-lg uppercase tracking-wide"
                        >
                            <Phone className="mr-3 h-5 w-5" />
                            Falar com a equipe agora
                        </a>
                    </div>
                </div>
            </section>

            {/* ── PRODUTOS ── */}
            <section id="produtos" className="py-24 bg-zinc-950 text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-pink-950 to-transparent opacity-60" />
                <div className="container mx-auto px-4 relative z-10 max-w-6xl">
                    <div className="text-center mb-20">
                        <span className="text-pink-400 font-black uppercase tracking-[0.15em] text-sm">COLEÇÃO</span>
                        <h2 className="text-4xl md:text-5xl font-black mt-4 tracking-tight">Nosso Mix de Produtos</h2>
                        <p className="text-zinc-400 mt-4 max-w-2xl mx-auto">Peças trendy & cool para moda infantil que suas clientes não encontram em qualquer lugar.</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {products.map((product, index) => (
                            <div key={index} className="bg-zinc-900 border border-zinc-800 p-10 rounded-3xl hover:border-pink-500/50 transition-colors">
                                <h3 className="text-2xl font-black mb-8 text-white">{product.title}</h3>
                                <ul className="space-y-4 mb-10">
                                    {product.features.map((feat, i) => (
                                        <li key={i} className="flex items-center text-zinc-300 font-medium">
                                            <CheckCircle2 className="w-5 h-5 mr-4 flex-shrink-0 text-pink-400" />
                                            {feat}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>

                    <div className="mt-16 text-center">
                        <a
                            href={WA_LINK}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center bg-pink-500 hover:bg-pink-400 text-white font-black py-4 px-12 rounded-xl transition-all hover:scale-105 shadow-xl text-lg uppercase tracking-wide"
                        >
                            Solicitar Catálogo Completo
                        </a>
                    </div>
                </div>
            </section>

            {/* ── LOOKBOOK / GALERIA ── */}
            <section id="lookbook" className="py-24 bg-zinc-950">
                <div className="container mx-auto px-4 max-w-7xl">
                    <div className="text-center mb-16">
                        <span className="text-pink-400 font-black uppercase tracking-[0.15em] text-sm">COLEÇÃO FARM GIRL</span>
                        <h2 className="text-4xl md:text-5xl font-black mt-4 text-white tracking-tight">Looks da Nova Coleção</h2>
                        <p className="text-zinc-400 mt-4 max-w-xl mx-auto">Clique nas fotos para ampliar. Peças exclusivas que suas clientes vão amar.</p>
                    </div>

                    {/* Mosaic grid */}
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                        {/* destaque — ocupa 2 colunas */}
                        <div
                            className="col-span-2 row-span-2 relative overflow-hidden rounded-2xl cursor-zoom-in group"
                            style={{ aspectRatio: '1/1' }}
                            onClick={() => setLightbox(LOOKBOOK_IMAGES[0].full)}
                        >
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={LOOKBOOK_IMAGES[0].thumb} alt="Doce Caju — look 1" className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                            <div className="absolute inset-0 bg-pink-950/0 group-hover:bg-pink-950/20 transition-colors" />
                        </div>

                        {/* demais fotos */}
                        {LOOKBOOK_IMAGES.slice(1).map((img, idx) => (
                            <div
                                key={idx}
                                className="relative overflow-hidden rounded-2xl cursor-zoom-in group"
                                style={{ aspectRatio: '3/4' }}
                                onClick={() => setLightbox(img.full)}
                            >
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src={img.thumb} alt={`Doce Caju — look ${idx + 2}`} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                                <div className="absolute inset-0 bg-pink-950/0 group-hover:bg-pink-950/20 transition-colors" />
                            </div>
                        ))}
                    </div>

                    <div className="mt-12 text-center">
                        <a
                            href={WA_LINK}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center bg-pink-500 hover:bg-pink-400 text-white font-black py-4 px-12 rounded-xl transition-all hover:scale-105 shadow-xl text-lg uppercase tracking-wide"
                        >
                            <Phone className="mr-3 h-5 w-5" />
                            Quero comprar essa coleção
                        </a>
                    </div>
                </div>
            </section>

            {/* ── COMO FUNCIONA ── */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-4 max-w-4xl">
                    <div className="text-center mb-16">
                        <span className="text-pink-500 font-black uppercase tracking-[0.15em] text-sm">SIMPLES ASSIM</span>
                        <h2 className="text-4xl md:text-5xl font-black mt-4 text-zinc-950 tracking-tight">Como funciona?</h2>
                    </div>

                    <div className="grid md:grid-cols-4 gap-6">
                        {steps.map((step, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: i * 0.12 }}
                                className="flex flex-col items-center text-center p-6 rounded-3xl bg-rose-50 border border-rose-100 relative"
                            >
                                <div className="w-12 h-12 rounded-full bg-pink-500 flex items-center justify-center text-white mb-4 shadow-lg shadow-pink-200">
                                    {step.icon}
                                </div>
                                <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-zinc-950 text-white flex items-center justify-center text-xs font-black">
                                    {i + 1}
                                </div>
                                <h3 className="font-black text-zinc-900 mb-2">{step.title}</h3>
                                <p className="text-zinc-500 text-sm leading-relaxed">{step.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── DEPOIMENTOS ── */}
            <section className="py-24 bg-rose-50 border-y border-rose-100">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <span className="text-pink-500 font-black uppercase tracking-[0.15em] text-sm">QUEM JÁ REVENDE</span>
                        <h2 className="text-4xl font-black mt-4 text-zinc-950 tracking-tight">O que dizem nossas revendedoras</h2>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                        {reviews.map((review, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: i * 0.1 }}
                                className="bg-white p-8 rounded-3xl border border-rose-100 shadow-sm hover:shadow-md transition-shadow"
                            >
                                <div className="flex mb-4">
                                    {[...Array(5)].map((_, si) => (
                                        <Star key={si} className="w-5 h-5 text-pink-400 fill-pink-400" />
                                    ))}
                                </div>
                                <p className="text-zinc-600 leading-relaxed mb-6 italic">&ldquo;{review.text}&rdquo;</p>
                                <div>
                                    <div className="font-black text-zinc-900">{review.name}</div>
                                    <div className="text-zinc-400 text-sm flex items-center gap-1 mt-1">
                                        <MapPin className="w-3 h-3" />
                                        {review.city}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── FAQ ── */}
            <section className="py-24 bg-white border-t border-zinc-100">
                <div className="container mx-auto px-4 max-w-3xl">
                    <h2 className="text-4xl font-black text-center mb-16 text-zinc-950 tracking-tight">Dúvidas Frequentes</h2>
                    <div className="space-y-4">
                        {faqs.map((faq, index) => (
                            <div key={index} className="bg-rose-50 rounded-2xl border border-rose-100 overflow-hidden">
                                <button
                                    onClick={() => toggleFaq(index)}
                                    className="w-full flex justify-between items-center p-6 text-left hover:bg-rose-100 transition-colors"
                                >
                                    <span className="font-bold text-zinc-900 pr-4">{faq.q}</span>
                                    <HelpCircle className={`w-6 h-6 flex-shrink-0 text-pink-400 transition-transform ${openFaqIndex === index ? 'rotate-180' : ''}`} />
                                </button>
                                {openFaqIndex === index && (
                                    <div className="p-6 pt-0 text-zinc-600 border-t border-rose-100 mt-2 leading-relaxed">
                                        {faq.a}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── CTA FINAL / FORMULÁRIO ── */}
            <section className="py-24 bg-gradient-to-br from-pink-950 via-rose-900 to-pink-900 text-white relative overflow-hidden">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-pink-400/10 rounded-full blur-3xl" />
                    <div className="absolute bottom-0 left-0 w-96 h-96 bg-rose-800/30 rounded-full blur-3xl" />
                </div>

                <div className="container mx-auto px-4 relative z-10">
                    <div className="grid lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
                        <div>
                            <h2 className="text-4xl md:text-6xl font-black mb-8 leading-tight tracking-tight">
                                Leve a Doce Caju para a sua loja e{' '}
                                <span className="text-pink-300">encante suas clientes.</span>
                            </h2>
                            <p className="text-xl text-pink-100/80 mb-10 max-w-lg">
                                Preencha o formulário para receber o catálogo completo e as condições exclusivas de atacado.
                            </p>

                            <div className="space-y-4 mb-10">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-pink-300 shrink-0">
                                        <MapPin className="w-5 h-5" />
                                    </div>
                                    <p className="text-pink-100 font-medium">Av. Washington Soares, 450 – Loja 43, Fortaleza/CE</p>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-pink-300 shrink-0">
                                        <Truck className="w-5 h-5" />
                                    </div>
                                    <p className="text-pink-100 font-medium">Envios diários para todo o Brasil</p>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-pink-300 shrink-0">
                                        <ShoppingBag className="w-5 h-5" />
                                    </div>
                                    <p className="text-pink-100 font-medium">Mínimo de 10 peças por pedido</p>
                                </div>
                            </div>

                            <a
                                href={WA_LINK}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center bg-[#25D366] hover:bg-[#1ebd5a] text-white font-black py-4 px-10 rounded-xl transition-all hover:scale-105 shadow-xl w-full md:w-auto text-lg"
                            >
                                <Phone className="mr-3 h-6 w-6" />
                                Falar no WhatsApp agora
                            </a>
                        </div>

                        <div className="bg-white text-zinc-900 p-8 md:p-10 rounded-3xl shadow-2xl relative">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-pink-100 rounded-bl-full pointer-events-none" />
                            <h3 className="text-2xl font-black mb-2">Quero ser revendedora</h3>
                            <p className="text-zinc-500 text-sm mb-6">Preencha para receber o catálogo no WhatsApp.</p>
                            <Suspense fallback={<div className="p-10 text-center animate-pulse bg-zinc-100 rounded-2xl">Carregando...</div>}>
                                <LeadForm clientSlug="doce-caju" />
                            </Suspense>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── LIGHTBOX ── */}
            {lightbox && (
                <div
                    onClick={() => setLightbox(null)}
                    style={{ position: 'fixed', inset: 0, zIndex: 9999, background: 'rgba(0,0,0,0.93)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'zoom-out' }}
                >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src={lightbox}
                        alt="Doce Caju — lookbook"
                        onClick={(e) => e.stopPropagation()}
                        style={{ maxWidth: '90vw', maxHeight: '90vh', objectFit: 'contain', borderRadius: 8, boxShadow: '0 32px 80px rgba(0,0,0,0.6)' }}
                    />
                    <button
                        onClick={() => setLightbox(null)}
                        style={{ position: 'absolute', top: 20, right: 24, background: 'none', border: 'none', color: '#fff', fontSize: 40, lineHeight: 1, cursor: 'pointer', opacity: 0.7 }}
                    >×</button>
                </div>
            )}

            <Suspense fallback={null}>
                <WhatsAppButton
                    phoneNumber={PHONE}
                    message={WA_MESSAGE}
                />
            </Suspense>

            <Suspense fallback={null}>
                <SocialProofNotification />
            </Suspense>
        </main>
    );
}
