import type { Metadata } from 'next';
import { Bebas_Neue, Manrope } from 'next/font/google';

const bebasNeue = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-bebas',
  display: 'swap',
});

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Kyrefh Jeans Atacado — Direto da Fábrica',
  description:
    'Atacado de jeans masculino premium direto da fábrica em Fortaleza. +1.200 lojistas em 26 estados. Pronta entrega, pedido mínimo acessível.',
};

export default function KyrefhV2Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${bebasNeue.variable} ${manrope.variable}`}>
      {children}
    </div>
  );
}
