import type { Metadata } from 'next';
import { Playfair_Display } from 'next/font/google';
import EloahPage from './EloahPage';

const playfair = Playfair_Display({
    subsets: ['latin'],
    weight: ['400', '500', '600', '700'],
    variable: '--font-display-el',
    display: 'swap',
});

export const metadata: Metadata = {
    title: 'Eloah Atacado · Moda Plus Size e Slim que Vende Sozinha',
    description: 'Revenda Eloah: moda feminina plus size e slim direto da fábrica em Fortaleza. Peças com elegância e autoestima. Receba o catálogo no WhatsApp.',
    openGraph: {
        title: 'Eloah Atacado · Moda Plus Size e Slim que Vende Sozinha',
        description: 'Fábrica em Fortaleza. Moda feminina plus size e slim com acabamento diferenciado. Catálogo no WhatsApp.',
    },
};

export default function Page() {
    return (
        <div className={playfair.variable}>
            <EloahPage />
        </div>
    );
}
