import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Fornecedor e Fabricante de Moda Infantil no Atacado | Jardim Rosa',
    description: 'Compre moda infantil no atacado direto da fábrica. A Jardim Rosa é fabricante de conjuntos e vestidos 100% algodão com estampas exclusivas. Alta margem de lucro!',
    keywords: 'fornecedor de moda infantil, fabricante de moda infantil, moda infantil no atacado, roupas infantis para revenda, moda infantil algodão, atacado de roupas de criança',
    openGraph: {
        title: 'Jardim Rosa - Atacado de Moda Infantil',
        description: 'Revenda peças exclusivas 100% algodão direto da fábrica. Alta margem de lucro e qualidade premium.',
        type: 'website',
        locale: 'pt_BR',
        url: 'https://amoatacado.com.br/jardimrosa',
    },
};

export default function JardimRosaLayout({ children }: { children: React.ReactNode }) {
    const schemaData = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "Jardim Rosa",
        "url": "https://amoatacado.com.br/jardimrosa",
        "logo": "https://amoatacado.com.br/jardimrosa/hero.jpg",
        "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+55-71-9400-3232",
            "contactType": "customer service",
            "areaServed": "BR",
            "availableLanguage": "Portuguese"
        },
        "description": "Fabricante e fornecedor de moda infantil no atacado. Peças premium 100% algodão."
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
            />
            {children}
        </>
    );
}
