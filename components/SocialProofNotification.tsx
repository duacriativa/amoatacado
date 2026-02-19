'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, CheckCircle2 } from 'lucide-react';

const leads = [
    { name: 'Ana Silva', city: 'São Paulo', action: 'solicitou um catálogo' },
    { name: 'Ricardo Santos', city: 'Goiânia', action: 'solicitou análise de projeto' },
    { name: 'Juliana Ferreira', city: 'Belo Horizonte', action: 'solicitou orçamento atacado' },
    { name: 'Marcos Oliveira', city: 'Curitiba', action: 'acabou de se cadastrar' },
    { name: 'Carla Souza', city: 'Rio de Janeiro', action: 'solicitou contato comercial' },
    { name: 'Felipe Costa', city: 'Fortaleza', action: 'solicitou catálogo Private Label' },
    { name: 'Beatriz Lima', city: 'Salvador', action: 'solicitou análise de marca' },
    { name: 'Lucas Rocha', city: 'Porto Alegre', action: 'solicitou orçamento' },
    { name: 'Fernanda Alves', city: 'Recife', action: 'acabou de se cadastrar' },
    { name: 'Gabriel Mendes', city: 'Brasília', action: 'solicitou análise gratuita' },
];

const times = ['agora mesmo', 'há 2 min', 'há 5 min', 'há 10 min', 'há 15 min', 'há 30 min'];

export default function SocialProofNotification() {
    const [currentLead, setCurrentLead] = useState<typeof leads[0] | null>(null);
    const [currentTime, setCurrentTime] = useState('');
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const showNotification = () => {
            const randomLead = leads[Math.floor(Math.random() * leads.length)];
            const randomTime = times[Math.floor(Math.random() * times.length)];

            setCurrentLead(randomLead);
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
    }, []);

    return (
        <AnimatePresence>
            {isVisible && currentLead && (
                <motion.div
                    initial={{ opacity: 0, x: -50, scale: 0.8 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: -50, scale: 0.8 }}
                    className="fixed bottom-6 left-6 z-[60] max-w-[320px] w-full"
                >
                    <div className="bg-white rounded-xl shadow-2xl border border-slate-100 p-4 flex items-center gap-4">
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
