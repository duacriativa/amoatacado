interface CTAProps {
    title: string;
    subtitle: string;
    buttonText: string;
    onCtaClick?: () => void;
}

export default function CTA({ title, subtitle, buttonText, onCtaClick }: CTAProps) {
    return (
        <section className="bg-[var(--primary)] py-20 text-white">
            <div className="container mx-auto px-4 text-center">
                <h2 className="mb-6 text-3xl font-bold md:text-4xl">
                    {title}
                </h2>
                <p className="mx-auto mb-10 max-w-2xl text-xl opacity-90">
                    {subtitle}
                </p>
                <button
                    onClick={onCtaClick}
                    className="rounded-full bg-white px-8 py-4 text-lg font-bold text-[var(--primary)] transition-transform hover:scale-105 hover:bg-gray-100"
                >
                    {buttonText}
                </button>
            </div>
        </section>
    );
}
