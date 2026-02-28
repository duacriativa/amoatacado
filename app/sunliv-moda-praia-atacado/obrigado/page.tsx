'use client';

import { Suspense } from 'react';
import Script from 'next/script';
import WhatsAppButton from '@/components/WhatsAppButton';
import { motion } from 'framer-motion';
import { Instagram, Users, CheckCircle } from 'lucide-react';

export default function SunlivObrigado() {
    const waLink = "https://wa.me/5585994399401?text=Olá! Acabei de me cadastrar no site da Sunliv e gostaria de receber o catálogo.";

    const trackWhatsAppConversion = () => {
        if (typeof window !== 'undefined' && (window as any).gtag) { // eslint-disable-line @typescript-eslint/no-explicit-any
            (window as any).gtag('event', 'conversion', { // eslint-disable-line @typescript-eslint/no-explicit-any
                'send_to': 'AW-401775500/FHUdCLqlloAcEIy3yr8B'
            });
        }
    };

    return (
        <main className="min-h-screen bg-[#FDFCF8] font-sans selection:bg-amber-100 flex flex-col items-center justify-center px-4 py-20">
            {/* Google Ads Global Tag */}
            <Script
                src="https://www.googletagmanager.com/gtag/js?id=AW-401775500"
                strategy="afterInteractive"
            />
            <Script id="google-ads-gtag-thanks" strategy="afterInteractive">
                {`
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', 'AW-401775500');
                    
                    // Specific Conversion for Page Visit (if needed)
                    gtag('event', 'conversion', {
                        'send_to': 'AW-401775500/49tfCOGnnYAcEIy3yr8B'
                    });
                `}
            </Script>

            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="max-w-2xl w-full bg-white rounded-[40px] shadow-2xl p-8 md:p-12 text-center border border-slate-100"
            >
                <div className="flex justify-center mb-8">
                    <div className="relative w-24 h-24 bg-green-50 rounded-full flex items-center justify-center text-green-500">
                        <CheckCircle size={60} />
                    </div>
                </div>

                <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 italic">
                    Cadastro <span className="text-amber-500 italic">Recebido!</span>
                </h1>

                <p className="text-xl text-slate-600 mb-10 leading-relaxed italic">
                    Parabéns! Você deu o primeiro passo para escalar seu negócio com a Sunliv. Nosso consultor entrará em contato em breve.
                </p>

                <div className="grid gap-4 md:grid-cols-2 mb-10">
                    <a
                        href="https://www.instagram.com/sunlivmoda"
                        target="_blank"
                        rel="noopener"
                        className="flex items-center justify-center gap-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-4 px-6 rounded-2xl hover:scale-105 transition-transform shadow-lg shadow-pink-500/20"
                    >
                        <Instagram size={24} />
                        Siga no Instagram
                    </a>

                    <a
                        href={waLink}
                        target="_blank"
                        rel="noopener"
                        onClick={trackWhatsAppConversion}
                        className="flex items-center justify-center gap-3 bg-green-500 text-white font-bold py-4 px-6 rounded-2xl hover:scale-105 transition-transform shadow-lg shadow-green-500/20"
                    >
                        <Users size={24} />
                        Entrar no Grupo VIP
                    </a>
                </div>

                <p className="text-sm text-slate-400 italic">
                    Enquanto isso, que tal conferir as novidades no nosso Instagram?
                </p>
            </motion.div>

            <footer className="mt-12 text-center">
                <div className="text-xl font-black tracking-tighter mb-4 text-slate-300">SUN LIV</div>
                <p className="text-slate-300 text-xs italic">© 2026 Sun Liv - Todos os direitos reservados.</p>
            </footer>

            <Suspense fallback={null}>
                <WhatsAppButton
                    phoneNumber="5585994399401"
                    message="Olá! Acabei de me cadastrar no site da Sunliv e gostaria de receber o catálogo."
                    onClick={trackWhatsAppConversion}
                />
            </Suspense>
        </main>
    );
}
