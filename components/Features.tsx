import { CheckCircle2 } from 'lucide-react';

interface Feature {
    title: string;
    description: string;
    icon?: string;
}

interface FeaturesProps {
    benefits: Feature[];
}

export default function Features({ benefits }: FeaturesProps) {
    return (
        <section className="py-20 bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="mb-16 text-center">
                    <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">
                        Por que escolher nossa marca?
                    </h2>
                    <p className="mt-4 text-lg text-gray-600">
                        Confira os benefícios exclusivos para revendedores.
                    </p>
                </div>

                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {benefits.map((benefit, index) => (
                        <div
                            key={index}
                            className="rounded-2xl bg-white p-8 shadow-sm transition-shadow hover:shadow-md"
                        >
                            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-[var(--primary)]/10 text-[var(--primary)]">
                                <CheckCircle2 size={24} />
                            </div>
                            <h3 className="mb-3 text-xl font-bold text-gray-900">
                                {benefit.title}
                            </h3>
                            <p className="text-gray-600">
                                {benefit.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
