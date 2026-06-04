'use client';

import Script from 'next/script';
import { motion } from 'framer-motion';
import { MessageCircle, Check } from 'lucide-react';

const waMessage = "Olá! Me cadastrei no site da Sunliv e quero receber lançamentos e ofertas exclusivas no WhatsApp.";
const waLink = `https://wa.me/5585991613500?text=${encodeURIComponent(waMessage)}`;

export default function SunlivV2Obrigado() {
    return (
        <main className="min-h-screen bg-stone-950 font-sans flex flex-col items-center justify-center px-4 py-20">

            {/* Google Ads — dispara conversão de lead no page load */}
            <Script src="https://www.googletagmanager.com/gtag/js?id=AW-401775500" strategy="afterInteractive" />
            <Script id="google-ads-obrigado" strategy="afterInteractive">{`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', 'AW-401775500');
                gtag('event', 'conversion', { 'send_to': 'AW-401775500/49tfCOGnnYAcEIy3yr8B' });
            `}</Script>

            {/* Meta Pixel — dispara evento Lead */}
            <Script id="fb-pixel-obrigado" strategy="afterInteractive">{`
                !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
                fbq('init','1342296943580479');
                fbq('track','PageView');
                fbq('track','Lead');
            `}</Script>
            <noscript><img height="1" width="1" style={{display:'none'}} src="https://www.facebook.com/tr?id=1342296943580479&ev=Lead&noscript=1" alt="" /></noscript>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-lg w-full text-center"
            >
                {/* Check icon */}
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', delay: 0.1, stiffness: 200 }}
                    className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-8"
                >
                    <Check className="w-8 h-8 text-white" strokeWidth={3} />
                </motion.div>

                <p className="text-stone-400 text-xs font-bold uppercase tracking-[0.3em] mb-3">
                    Cadastro recebido
                </p>

                <h1 className="text-5xl md:text-6xl font-black text-white mb-6 leading-none tracking-tight">
                    ÚLTIMO<br />PASSO!
                </h1>

                <p className="text-stone-400 text-base leading-relaxed mb-10">
                    Envie uma mensagem para nós no WhatsApp e receba{' '}
                    <strong className="text-white">agora mesmo</strong>{' '}
                    os lançamentos e ofertas exclusivas da Sunliv.
                </p>

                {/* Message preview */}
                <div className="bg-stone-900 border border-stone-800 rounded-2xl p-5 mb-8 text-left">
                    <p className="text-stone-500 text-[10px] font-bold uppercase tracking-widest mb-3">
                        Mensagem que será enviada
                    </p>
                    <p className="text-stone-300 text-sm leading-relaxed italic">
                        &ldquo;{waMessage}&rdquo;
                    </p>
                </div>

                {/* WhatsApp CTA */}
                <a
                    href={waLink}
                    target="_blank"
                    rel="noopener"
                    className="flex items-center justify-center gap-3 bg-green-500 hover:bg-green-400 transition-colors text-white font-black text-sm uppercase tracking-widest py-5 px-8 rounded-2xl w-full shadow-lg shadow-green-900/30"
                >
                    <MessageCircle className="w-5 h-5" />
                    Enviar mensagem e receber ofertas
                </a>

                <p className="text-stone-600 text-xs mt-4">
                    A mensagem já vem preenchida — só clique em <strong className="text-stone-500">Enviar</strong> no WhatsApp.
                </p>
            </motion.div>

        </main>
    );
}
