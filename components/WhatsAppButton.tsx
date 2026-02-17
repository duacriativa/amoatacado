'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { MessageCircle } from 'lucide-react';

interface WhatsAppButtonProps {
    phoneNumber: string;
    message: string;
}

export default function WhatsAppButton({ phoneNumber, message }: WhatsAppButtonProps) {
    const searchParams = useSearchParams();
    const [href, setHref] = useState('#');

    useEffect(() => {
        // Basic cleaning of phone number
        const cleanPhone = phoneNumber.replace(/\D/g, '');

        // Construct base URL
        const baseUrl = `https://wa.me/${cleanPhone}`;

        // Add message
        const params = new URLSearchParams();
        params.set('text', message);

        // Add UTMs if they exist
        searchParams.forEach((value, key) => {
            if (key.startsWith('utm_')) {
                params.set(key, value);
            }
        });

        setHref(`${baseUrl}?${params.toString()}`);
    }, [phoneNumber, message, searchParams]);

    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-white shadow-lg transition-transform hover:scale-110 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2"
            aria-label="Contact on WhatsApp"
        >
            <MessageCircle size={28} />
        </a>
    );
}
