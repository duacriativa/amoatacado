import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import { getClientBySlug } from '@/lib/clients';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import CTA from '@/components/CTA';
import LeadForm from '@/components/LeadForm';
import WhatsAppButton from '@/components/WhatsAppButton';
import { Metadata } from 'next';

interface PageProps {
    params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;
    const client = await getClientBySlug(slug);

    if (!client) {
        return {
            title: 'Cliente não encontrado',
        };
    }

    return {
        title: client.seo.title,
        description: client.seo.description,
    };
}

export default async function ClientPage({ params }: PageProps) {
    const { slug } = await params;
    const client = await getClientBySlug(slug);

    if (!client) {
        notFound();
    }

    // Styles for the theme
    const themeStyles = {
        '--primary': client.theme.primaryColor,
        '--secondary': client.theme.secondaryColor,
    } as React.CSSProperties;

    return (
        <div style={themeStyles} className="min-h-screen bg-white">
            {/* Hero Section */}
            <Hero
                title={client.content.hero.title}
                subtitle={client.content.hero.subtitle}
                ctaText={client.content.hero.ctaText}
                backgroundImage={client.content.hero.backgroundImage}
            />

            {/* Features/Benefits Section */}
            <Features benefits={client.content.benefits} />

            {/* Lead Form Section */}
            <section id="lead-form" className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900">
                            Fale Conosco
                        </h2>
                        <p className="mt-4 text-lg text-gray-600">
                            Preencha o formulário abaixo para iniciarmos o atendimento.
                        </p>
                    </div>
                    <div className="max-w-xl mx-auto">
                        <Suspense fallback={<div>Carregando...</div>}>
                            <LeadForm clientSlug={slug} />
                        </Suspense>
                    </div>
                </div>
            </section>

            {/* Steps Section (Optional based on implementation plan, but present in config) */}
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">Como funciona</h2>
                    <div className="grid gap-8 md:grid-cols-3">
                        {client.content.steps.map((step, index) => (
                            <div key={index} className="text-center p-6 bg-white rounded-lg shadow-sm">
                                <div className="w-12 h-12 bg-[var(--primary)] text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                                    {index + 1}
                                </div>
                                <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                                <p className="text-gray-600">{step.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <CTA
                title={client.content.cta.title}
                subtitle={client.content.cta.subtitle}
                buttonText={client.content.cta.buttonText}
            />

            {/* WhatsApp Floating Button */}
            <Suspense fallback={null}>
                <WhatsAppButton
                    phoneNumber={client.content.whatsapp.phoneNumber}
                    message={client.content.whatsapp.message}
                />
            </Suspense>

            {/* Footer */}
            <footer className="bg-gray-900 text-white py-8 text-center">
                <p>© {new Date().getFullYear()} {client.name}. Todos os direitos reservados.</p>
                <p className="text-sm text-gray-500 mt-2">Powered by Amo Atacado</p>
            </footer>
        </div>
    );
}
