'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, CheckCircle2 } from 'lucide-react';

const NAMES_CITIES = [
    { name: 'Ana Silva', city: 'São Paulo' },
    { name: 'Ricardo Santos', city: 'Goiânia' },
    { name: 'Juliana Ferreira', city: 'Belo Horizonte' },
    { name: 'Marcos Oliveira', city: 'Curitiba' },
    { name: 'Carla Souza', city: 'Rio de Janeiro' },
    { name: 'Felipe Costa', city: 'Fortaleza' },
    { name: 'Beatriz Lima', city: 'Salvador' },
    { name: 'Lucas Rocha', city: 'Porto Alegre' },
    { name: 'Fernanda Alves', city: 'Recife' },
    { name: 'Gabriel Mendes', city: 'Brasília' },
];

const DEFAULT_ACTIONS = [
    'solicitou um catálogo',
    'solicitou análise de projeto',
    'solicitou orçamento atacado',
    'acabou de se cadastrar',
    'solicitou contato comercial',
    'solicitou catálogo Private Label',
    'solicitou análise de marca',
    'solicitou orçamento',
    'acabou de se cadastrar',
    'solicitou análise gratuita',
];

const times = ['agora mesmo', 'há 2 min', 'há 5 min', 'há 10 min', 'há 15 min', 'há 30 min'];

type SocialProofNotificationProps = {
    actions?: string[];
};

export default function SocialProofNotification({ actions = DEFAULT_ACTIONS }: SocialProofNotificationProps) {
    const [currentLead, setCurrentLead] = useState<{ name: string; city: string; action: string } | null>(null);
    const [currentTime, setCurrentTime] = useState('');
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const showNotification = () => {
            const randomNameCity = NAMES_CITIES[Math.floor(Math.random() * NAMES_CITIES.length)];
            const randomAction = actions[Math.floor(Math.random() * actions.length)];
            const randomTime = times[Math.floor(Math.random() * times.length)];

            setCurrentLead({ ...randomNameCity, action: randomAction });
            setCurrentTime(randomTime);
            setIsVisible(true);

            // Hide after 5 seconds
            setTimeout(() => {
                setIsVisible(false);
            }, 5000);
        };

        // Initial delay
        const initialTimeout = setTimeout(showNotification, 3000);

        // Interval
        const interval = setInterval(showNotification, 15000);

        return () => {
            clearTimeout(initialTimeout);
            clearInterval(interval);
        };
    }, [actions]);

    return (
        <AnimatePresence>
            {isVisible && currentLead && (
                <motion.div
                    initial={{ opacity: 0, x: -50, scale: 0.8 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: -50, scale: 0.8 }}
                    className="fixed bottom-24 sm:bottom-6 left-4 sm:left-6 z-[60] max-w-[280px] sm:max-w-[320px] w-full"
                >
                    <div className="bg-white/95 backdrop-blur-md rounded-xl shadow-2xl border border-white/20 p-4 flex items-center gap-4">
                        <div className="flex-shrink-0 relative">
                            <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center text-blue-600">
                                <CheckCircle2 size={24} />
                            </div>
                            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 border-2 border-white rounded-full flex items-center justify-center">
                                <span className="block w-2 h-2 bg-white rounded-full"></span>
                            </div>
                        </div>

                        <div className="flex-grow min-w-0">
                            <div className="flex justify-between items-start gap-2">
                                <p className="text-sm font-bold text-slate-900 truncate">
                                    {currentLead.name}
                                </p>
                                <span className="text-[10px] text-slate-400 whitespace-nowrap pt-0.5">
                                    {currentTime}
                                </span >
                            </div>
                            <p className="text-xs text-slate-600 leading-snug">
                                {currentLead.action}
                            </p>
                            <div className="flex items-center gap-1 mt-1">
                                <MapPin size={10} className="text-slate-400" />
                                <span className="text-[10px] text-slate-400">{currentLead.city}</span>
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
