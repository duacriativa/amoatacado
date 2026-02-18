import { ArrowRight } from 'lucide-react';
import Image from 'next/image';

interface HeroProps {
    title: string;
    subtitle: string;
    ctaText: string;
    backgroundImage?: string;
    onCtaClick?: () => void;
}

export default function Hero({ title, subtitle, ctaText, backgroundImage, onCtaClick }: HeroProps) {
    return (
        <section className="relative flex min-h-[80vh] items-center justify-center overflow-hidden bg-gray-900 text-white">
            {/* Background Image with Overlay */}
            {backgroundImage && (
                <div className="absolute inset-0 z-0">
                    <Image
                        src={backgroundImage}
                        alt="Hero Background"
                        fill
                        priority
                        className="object-cover opacity-40"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/30" />
                </div>
            )}

            <div className="container relative z-10 mx-auto px-4 text-center">
                <h1 className="mb-6 text-4xl font-extrabold tracking-tight md:text-6xl lg:text-7xl">
                    {title}
                </h1>
                <p className="mx-auto mb-10 max-w-2xl text-lg text-gray-200 md:text-xl">
                    {subtitle}
                </p>
                <button
                    onClick={onCtaClick}
                    className="group inline-flex items-center rounded-full bg-[var(--primary)] px-8 py-4 text-lg font-bold text-white transition-all hover:scale-105 hover:bg-[var(--secondary)] focus:outline-none focus:ring-4 focus:ring-[var(--primary)]/50"
                >
                    {ctaText}
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </button>
            </div>
        </section>
    );
}
