import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import Script from 'next/script';
import RothesPage from './RothesPage';

const poppins = Poppins({
    subsets: ['latin'],
    weight: ['300', '400', '500', '600', '700'],
    variable: '--font-display-rt',
    display: 'swap',
});

export const metadata: Metadata = {
    title: 'Rothes Atacado · Moda Praia Artesanal que Vende Sozinha',
    description: 'Revenda Rothes: biquínis de macramê e crochê direto da fábrica em Fortaleza. Peças únicas com alta margem. Receba o catálogo no WhatsApp.',
    openGraph: {
        title: 'Rothes Atacado · Moda Praia Artesanal que Vende Sozinha',
        description: 'Fábrica em Fortaleza. Biquínis de macramê e crochê exclusivos. Catálogo no WhatsApp.',
    },
};

export default function Page() {
    return (
        <div className={poppins.variable}>
            <Script id="fb-pixel-rothes" strategy="afterInteractive">{`
                !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
                fbq('init','1359611532734868');fbq('track','PageView');
            `}</Script>
            <noscript><img height="1" width="1" style={{display:'none'}} src="https://www.facebook.com/tr?id=1359611532734868&ev=PageView&noscript=1" alt="" /></noscript>
            <RothesPage />
        </div>
    );
}
