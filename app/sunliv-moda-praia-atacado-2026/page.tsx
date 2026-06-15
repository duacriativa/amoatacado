import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
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
            <SunlivPage2026 />
        </div>
    );
}
