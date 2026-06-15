import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import Script from 'next/script';
import SunlivPage2026 from './SunlivPage2026';

const poppins = Poppins({
    subsets: ['latin'],
    weight: ['300', '400', '500', '600', '700'],
    variable: '--font-display-sl',
    display: 'swap',
});

export const metadata: Metadata = {
    title: 'Sunliv Atacado · Moda Praia que Vende Sozinha',
    description: 'Revenda Sunliv: moda praia feminina direto da fábrica em Fortaleza. Margem 100%+, pedido mínimo de 10 peças, envio rápido. Receba o catálogo no WhatsApp.',
    openGraph: {
        title: 'Sunliv Atacado · Moda Praia que Vende Sozinha',
        description: 'Fábrica em Fortaleza. Margem 100%+, pedido mínimo 10 peças. Catálogo no WhatsApp.',
    },
};

export default function Page() {
    return (
        <div className={poppins.variable}>
            <Script id="fb-pixel-sunliv-2026" strategy="afterInteractive">{`
                !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
                fbq('init','1342296943580479');fbq('track','PageView');
            `}</Script>
            <noscript><img height="1" width="1" style={{display:'none'}} src="https://www.facebook.com/tr?id=1342296943580479&ev=PageView&noscript=1" alt="" /></noscript>
            <SunlivPage2026 />
        </div>
    );
}
