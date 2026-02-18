'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';

const schema = z.object({
    name: z.string().min(2, 'Nome é obrigatório'),
    email: z.string().email('Email inválido'),
    phone: z.string().min(10, 'Telefone inválido'),
    companyName: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

export default function LeadForm({ clientSlug }: { clientSlug?: string }) {
    const searchParams = useSearchParams();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<FormData>({
        resolver: zodResolver(schema),
    });

    const onSubmit = async (data: FormData) => {
        setIsSubmitting(true);
        setSubmitError(null);

        const utms: Record<string, string> = {};
        searchParams.forEach((value, key) => {
            if (key.startsWith('utm_')) {
                utms[key] = value;
            }
        });

        try {
            const response = await fetch('/api/lead', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...data,
                    ...utms,
                    clientSlug,
                    source: 'website',
                }),
            });

            if (!response.ok) {
                throw new Error('Erro ao enviar formulário');
            }

            setSubmitSuccess(true);
            reset();
        } catch {
            setSubmitError('Ocorreu um erro. Tente novamente.');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (submitSuccess) {
        return (
            <div className="rounded-lg bg-green-50 p-6 text-center text-green-800">
                <h3 className="mb-2 text-xl font-bold">Obrigado!</h3>
                <p>Recebemos seus dados e entraremos em contato em breve.</p>
                <button
                    onClick={() => setSubmitSuccess(false)}
                    className="mt-4 underline"
                >
                    Enviar outro
                </button>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 rounded-lg bg-white p-6 shadow-md">
            <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Nome *
                </label>
                <input
                    {...register('name')}
                    id="name"
                    type="text"
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
                {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>}
            </div>

            <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email *
                </label>
                <input
                    {...register('email')}
                    id="email"
                    type="email"
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
                {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
            </div>

            <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                    Telefone (WhatsApp) *
                </label>
                <input
                    {...register('phone')}
                    id="phone"
                    type="tel"
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
                {errors.phone && <p className="mt-1 text-xs text-red-500">{errors.phone.message}</p>}
            </div>

            <div>
                <label htmlFor="companyName" className="block text-sm font-medium text-gray-700">
                    Nome da Loja (Opcional)
                </label>
                <input
                    {...register('companyName')}
                    id="companyName"
                    type="text"
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
            </div>

            {submitError && <p className="text-sm text-red-500">{submitError}</p>}

            <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
            >
                {isSubmitting ? 'Enviando...' : 'Quero revender'}
            </button>
        </form>
    );
}
