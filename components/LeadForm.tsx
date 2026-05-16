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
    instagramHandle: z.string().optional(),
    modelType: z.string().optional(),
    brandMoment: z.string().optional(),
    orderVolume: z.string().optional(),
    mainFocus: z.string().optional(),
    startDate: z.string().optional(),
    businessType: z.string().optional(),
    monthlyRevenue: z.string().optional(),
    mainChallenge: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

export default function LeadForm({ clientSlug }: { clientSlug?: string }) {
    const searchParams = useSearchParams();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);

    const isLibertyJeans = clientSlug === 'liberty-jeans';
    const isAmoAtacado = clientSlug === 'amo-atacado';
    const isSunliv = clientSlug === 'sunliv' || clientSlug === 'sunliv-moda-praia-atacado';
    const isKyrefh = clientSlug === 'kyrefh';

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

            // Track Google Ads Conversion for Sunliv
            if (isSunliv) {
                if (typeof window !== 'undefined' && (window as any).gtag) { // eslint-disable-line @typescript-eslint/no-explicit-any
                    (window as any).gtag('event', 'conversion', { // eslint-disable-line @typescript-eslint/no-explicit-any
                        'send_to': 'AW-401775500/49tfCOGnnYAcEIy3yr8B'
                    });
                }

                // Redirect to Thank You page for Sunliv
                window.location.href = '/sunliv-moda-praia-atacado/obrigado';
                return;
            }

            if (isKyrefh) {
                // Redirect to VIP Group
                window.location.href = 'https://chat.whatsapp.com/DJxPtkp2XJkBIrxwpT0R6o?mode=gi_t';
                return;
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
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 rounded-lg bg-white p-6 shadow-md border border-slate-100">
            {isLibertyJeans && (
                <div className="mb-6 text-center">
                    <h3 className="text-xl font-bold text-slate-900 leading-tight">
                        Solicite uma análise gratuita do seu projeto de jeans
                    </h3>
                </div>
            )}

            <div className="grid md:grid-cols-2 gap-4">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                        Nome *
                    </label>
                    <input
                        {...register('name')}
                        id="name"
                        type="text"
                        placeholder="Seu nome completo"
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
                        placeholder="seu@email.com"
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                    {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
                <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                        Telefone (WhatsApp) *
                    </label>
                    <input
                        {...register('phone')}
                        id="phone"
                        type="tel"
                        placeholder="(00) 00000-0000"
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                    {errors.phone && <p className="mt-1 text-xs text-red-500">{errors.phone.message}</p>}
                </div>

                <div>
                    <label htmlFor="companyName" className="block text-sm font-medium text-gray-700">
                        {isAmoAtacado ? 'Nome da sua Marca' : 'Nome da Loja / Marca'}
                    </label>
                    <input
                        {...register('companyName')}
                        id="companyName"
                        type="text"
                        placeholder="Opcional"
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                </div>
            </div>

            <div>
                <label htmlFor="instagramHandle" className="block text-sm font-medium text-gray-700">
                    @ do Instagram da loja <span className="text-gray-400 font-normal">(se tiver)</span>
                </label>
                <div className="mt-1 flex rounded-md shadow-sm">
                    <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">@</span>
                    <input
                        {...register('instagramHandle')}
                        id="instagramHandle"
                        type="text"
                        placeholder="sualojanoinsta"
                        className="block w-full rounded-none rounded-r-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                </div>
            </div>

            {(isSunliv || isKyrefh) && (
                <>
                    <hr className="my-2 border-slate-100" />
                    <div className="grid md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Você já revende moda?
                            </label>
                            <select
                                {...register('businessType')}
                                className={`block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:outline-none focus:ring-1 text-sm ${isKyrefh ? 'focus:border-slate-900 focus:ring-slate-900' : 'focus:border-amber-400 focus:ring-amber-400'}`}
                            >
                                <option value="">Selecione...</option>
                                <option value="Sim, já revendo">Sim, já revendo</option>
                                <option value="Não, quero começar">Não, quero começar</option>
                                <option value="Tenho loja física">Tenho loja física</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Como pretende vender?
                            </label>
                            <select
                                {...register('mainFocus')}
                                className={`block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:outline-none focus:ring-1 text-sm ${isKyrefh ? 'focus:border-slate-900 focus:ring-slate-900' : 'focus:border-amber-400 focus:ring-amber-400'}`}
                            >
                                <option value="">Selecione...</option>
                                <option value="WhatsApp / Instagram">WhatsApp / Instagram</option>
                                <option value="Loja física">Loja física</option>
                                <option value="Marketplace">Marketplace (Shopee, ML...)</option>
                                <option value="Vários canais">Vários canais</option>
                            </select>
                        </div>
                    </div>
                </>
            )}

            {isAmoAtacado && (
                <>
                    <hr className="my-4 border-slate-100" />
                    <div className="grid md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Tipo de Negócio:
                            </label>
                            <select
                                {...register('businessType')}
                                className="block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
                            >
                                <option value="">Selecione...</option>
                                <option value="Confecção / Indústria">Confecção / Indústria</option>
                                <option value="Lojista Atacado">Lojista Atacado</option>
                                <option value="Lojista Varejo">Lojista Varejo</option>
                                <option value="Ainda não tenho negócio">Ainda não tenho negócio</option>
                                <option value="Outros">Outros</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Faturamento Mensal Médio:
                            </label>
                            <select
                                {...register('monthlyRevenue')}
                                className="block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
                            >
                                <option value="">Selecione...</option>
                                <option value="Iniciante (R$ 0 a R$ 10k)">Iniciante (Até R$ 10k)</option>
                                <option value="R$ 10k a R$ 50k">R$ 10k a R$ 50k</option>
                                <option value="R$ 50k a R$ 100k">R$ 50k a R$ 100k</option>
                                <option value="Acima de R$ 100k">Acima de R$ 100k</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Qual seu principal desafio hoje?
                        </label>
                        <select
                            {...register('mainChallenge')}
                            className="block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
                        >
                            <option value="">Selecione...</option>
                            <option value="Escalar Vendas">Escalar Vendas</option>
                            <option value="Branding / Reposicionamento">Branding / Reposicionamento</option>
                            <option value="Tráfego Qualificado">Tráfego Qualificado</option>
                            <option value="Estruturação Comercial">Estruturação Comercial</option>
                        </select>
                    </div>
                </>
            )}

            {isLibertyJeans && (
                <>
                    <hr className="my-4 border-slate-100" />

                    <div className="grid md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Qual modelo você busca?
                            </label>
                            <select
                                {...register('modelType')}
                                className="block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
                            >
                                <option value="">Selecione...</option>
                                <option value="White Label">White Label</option>
                                <option value="Private Label">Private Label</option>
                                <option value="Ainda não sei">Ainda não sei</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Momento da sua marca:
                            </label>
                            <select
                                {...register('brandMoment')}
                                className="block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
                            >
                                <option value="">Selecione...</option>
                                <option value="Estou começando agora">Estou começando agora</option>
                                <option value="Já vendo, mas quero estruturar melhor">Já vendo, mas quero estruturar</option>
                                <option value="Já vendo bem e quero escalar">Já vendo bem e quero escalar</option>
                            </select>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Volume médio por pedido (por modelo):
                            </label>
                            <select
                                {...register('orderVolume')}
                                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
                            >
                                <option value="">Selecione...</option>
                                <option value="Até 50 peças">Até 50 peças</option>
                                <option value="50 a 100 peças">50 a 100 peças</option>
                                <option value="100 a 300 peças">100 a 300 peças</option>
                                <option value="+300 peças">+300 peças</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Seu foco principal é:
                            </label>
                            <select
                                {...register('mainFocus')}
                                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
                            >
                                <option value="">Selecione...</option>
                                <option value="Atacado">Atacado</option>
                                <option value="Varejo">Varejo</option>
                                <option value="Ambos">Ambos</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Quando você pretende iniciar a produção?
                        </label>
                        <select
                            {...register('startDate')}
                            className="block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
                        >
                            <option value="">Selecione...</option>
                            <option value="Imediato">Imediato</option>
                            <option value="Até 30 dias">Até 30 dias</option>
                            <option value="30 a 60 dias">30 a 60 dias</option>
                            <option value="Pesquisando">Pesquisando</option>
                        </select>
                    </div>
                </>
            )}

            {submitError && <p className="text-sm text-red-500">{submitError}</p>}

            <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full rounded-md px-4 py-3 text-white font-bold transition-all shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 ${
                    isLibertyJeans ? 'bg-blue-600 hover:bg-blue-700'
                    : isAmoAtacado ? 'bg-blue-600 hover:bg-blue-700'
                    : 'bg-slate-900 hover:bg-slate-800'
                }`}
            >
                {isSubmitting ? 'Enviando...'
                    : isLibertyJeans ? 'Enviar Solicitação'
                    : isAmoAtacado ? 'Quero minha página'
                    : 'Quero revender'}
            </button>

            {isLibertyJeans && (
                <p className="text-[10px] text-center text-slate-400 mt-2">
                    * Seus dados estão seguros e serão usados apenas para análise do seu projeto.
                </p>
            )}
        </form>
    );
}
