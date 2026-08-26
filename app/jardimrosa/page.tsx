'use client';

import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { motion, AnimatePresence } from 'framer-motion';
import SocialProofNotification from '@/components/SocialProofNotification';

const WHATSAPP_NUMBER = '557194003232';
const CHAT_WIDGET_MESSAGE = 'Oi! Gostaria de revender Jardim Rosa, pode me ajudar?';
const CHAT_WIDGET_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(CHAT_WIDGET_MESSAGE)}`;

const SOCIAL_PROOF_ACTIONS = [
    'quer revender Jardim Rosa',
    'solicitou o catálogo de moda infantil',
    'acabou de fechar um pedido no atacado',
    'pediu informações sobre revenda',
    'solicitou o catálogo completo',
    'entrou em contato pelo WhatsApp',
];

function WhatsAppIcon({ size = 26 }: { size?: number }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
    );
}

function WhatsAppChatWidget() {
    const [visible, setVisible] = useState(false);
    const [dismissed, setDismissed] = useState(false);

    useEffect(() => {
        function onScroll() {
            if (window.scrollY > window.innerHeight * 0.85) setVisible(true);
        }
        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll();
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    if (!visible) return null;

    return (
        <div style={{ position: 'fixed', bottom: 20, right: 20, zIndex: 1000, display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 12 }}>
            <AnimatePresence>
                {!dismissed && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.92 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.92 }}
                        transition={{ duration: 0.35 }}
                        style={{
                            position: 'relative',
                            maxWidth: 270,
                            background: '#fff',
                            borderRadius: 14,
                            padding: '16px 18px',
                            boxShadow: '0 12px 36px rgba(0,0,0,0.2)',
                            fontFamily: "'Outfit', sans-serif",
                        }}
                    >
                        <button
                            onClick={() => setDismissed(true)}
                            aria-label="Fechar"
                            style={{ position: 'absolute', top: 8, right: 8, background: 'none', border: 'none', color: 'rgba(45,45,45,0.35)', cursor: 'pointer', padding: 4, fontSize: 16, lineHeight: 1 }}
                        >
                            ×
                        </button>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                            <div style={{ width: 30, height: 30, borderRadius: '50%', background: '#FF69B4', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 12, fontWeight: 700, flexShrink: 0 }}>JR</div>
                            <span style={{ fontSize: 13, fontWeight: 700, color: '#2D2D2D' }}>Equipe Jardim Rosa</span>
                        </div>
                        <p style={{ fontSize: 13, lineHeight: 1.5, color: 'rgba(45,45,45,0.7)', margin: '0 0 12px' }}>
                            Olá! 👋 Quer revender Jardim Rosa? É só clicar aqui embaixo que eu já te atendo agora no WhatsApp.
                        </p>
                        <a
                            href={CHAT_WIDGET_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: 8,
                                padding: '10px 14px',
                                background: '#25D366',
                                color: '#fff',
                                textDecoration: 'none',
                                borderRadius: 8,
                                fontSize: 13,
                                fontWeight: 700,
                            }}
                        >
                            <WhatsAppIcon size={16} />
                            Iniciar atendimento
                        </a>
                    </motion.div>
                )}
            </AnimatePresence>
            <motion.a
                href={CHAT_WIDGET_URL}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                aria-label="Falar no WhatsApp"
                style={{
                    width: 58,
                    height: 58,
                    borderRadius: '50%',
                    background: '#25D366',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 8px 24px rgba(37,211,102,0.45)',
                    color: '#fff',
                    textDecoration: 'none',
                    flexShrink: 0,
                }}
            >
                <WhatsAppIcon />
            </motion.a>
        </div>
    );
}

export default function JardimRosaPage() {
    useEffect(() => {
        // Load Phosphor Icons
        const script = document.createElement('script');
        script.src = 'https://unpkg.com/@phosphor-icons/web';
        document.body.appendChild(script);

        // Load Google Fonts
        const link = document.createElement('link');
        link.href = 'https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;700;800&display=swap';
        link.rel = 'stylesheet';
        document.head.appendChild(link);

        // FAQ Accordion Logic
        const faqItems = document.querySelectorAll('.faq-item');
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            if(question) {
                question.addEventListener('click', () => {
                    const activeItem = document.querySelector('.faq-item.active');
                    if (activeItem && activeItem !== item) {
                        activeItem.classList.remove('active');
                    }
                    item.classList.toggle('active');
                });
            }
        });

        // Scroll reveal logic
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };
        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    (entry.target as HTMLElement).style.opacity = '1';
                    (entry.target as HTMLElement).style.transform = 'translateY(0)';
                    obs.unobserve(entry.target);
                }
            });
        }, observerOptions);

        const animateElements = document.querySelectorAll('section > .container');
        animateElements.forEach(el => {
            (el as HTMLElement).style.opacity = '0';
            (el as HTMLElement).style.transform = 'translateY(20px)';
            (el as HTMLElement).style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
            observer.observe(el);
        });
    }, []);

    return (
        <div className="jardim-rosa-wrapper">
            <style dangerouslySetInnerHTML={{ __html: `
                .jardim-rosa-wrapper {
                    --primary: #FF69B4;
                    --primary-hover: #e55a9f;
                    --secondary: #FFA500;
                    --accent: #FFD700;
                    --green: #4CAF50;
                    --bg-light: #FAF9F6;
                    --text-dark: #2D2D2D;
                    --text-light: #666666;
                    --white: #FFFFFF;
                    --radius: 16px;
                    --shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
                    --shadow-hover: 0 15px 40px rgba(255, 105, 180, 0.2);
                    font-family: 'Outfit', sans-serif;
                    color: var(--text-dark);
                    background-color: var(--bg-light);
                    line-height: 1.6;
                    overflow-x: hidden;
                    text-align: left;
                }
                .jardim-rosa-wrapper * {
                    box-sizing: border-box;
                }
                .jardim-rosa-wrapper h1, .jardim-rosa-wrapper h2, .jardim-rosa-wrapper h3, .jardim-rosa-wrapper h4 {
                    font-weight: 700;
                    line-height: 1.2;
                    margin: 0;
                }
                .jardim-rosa-wrapper p {
                    margin: 0;
                }
                .jardim-rosa-wrapper ul {
                    list-style: none;
                    margin: 0;
                    padding: 0;
                }
                .jardim-rosa-wrapper a {
                    text-decoration: none;
                    color: inherit;
                }
                .jardim-rosa-wrapper .container {
                    max-width: 1200px;
                    margin: 0 auto;
                    padding: 0 24px;
                }
                .jardim-rosa-wrapper .text-highlight {
                    color: var(--primary);
                    position: relative;
                    display: inline-block;
                }
                .jardim-rosa-wrapper .text-highlight::after {
                    content: '';
                    position: absolute;
                    bottom: 2px;
                    left: 0;
                    width: 100%;
                    height: 8px;
                    background-color: var(--accent);
                    z-index: -1;
                    opacity: 0.5;
                    border-radius: 4px;
                }
                .jardim-rosa-wrapper .text-center { text-align: center; }
                .jardim-rosa-wrapper .w-100 { width: 100%; }
                
                .jardim-rosa-wrapper .btn {
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    gap: 8px;
                    padding: 12px 24px;
                    border-radius: 50px;
                    font-weight: 600;
                    font-size: 1rem;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    border: none;
                }
                .jardim-rosa-wrapper .btn-primary {
                    background-color: var(--primary);
                    color: var(--white);
                    box-shadow: 0 4px 15px rgba(255, 105, 180, 0.3);
                }
                .jardim-rosa-wrapper .btn-primary:hover {
                    background-color: var(--primary-hover);
                    transform: translateY(-2px);
                    box-shadow: var(--shadow-hover);
                }
                .jardim-rosa-wrapper .btn-large {
                    padding: 16px 32px;
                    font-size: 1.125rem;
                }
                .jardim-rosa-wrapper .btn-outline {
                    background: transparent;
                    border: 2px solid var(--primary);
                    color: var(--primary);
                }
                .jardim-rosa-wrapper .btn-outline:hover {
                    background: var(--primary);
                    color: var(--white);
                }
                .jardim-rosa-wrapper .glow {
                    animation: pulse 2s infinite;
                }
                @keyframes pulse {
                    0% { box-shadow: 0 0 0 0 rgba(255, 105, 180, 0.4); }
                    70% { box-shadow: 0 0 0 15px rgba(255, 105, 180, 0); }
                    100% { box-shadow: 0 0 0 0 rgba(255, 105, 180, 0); }
                }
                
                .jardim-rosa-wrapper .navbar {
                    padding: 20px 0;
                    position: fixed;
                    top: 0;
                    width: 100%;
                    background: rgba(250, 249, 246, 0.9);
                    backdrop-filter: blur(10px);
                    z-index: 100;
                    border-bottom: 1px solid rgba(0,0,0,0.05);
                }
                .jardim-rosa-wrapper .nav-content {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }
                .jardim-rosa-wrapper .logo-text {
                    font-size: 1.5rem;
                    font-weight: 800;
                    color: var(--primary);
                    letter-spacing: -0.5px;
                }
                
                .jardim-rosa-wrapper .hero {
                    padding: 140px 0 80px;
                    min-height: 100vh;
                    display: flex;
                    align-items: center;
                    position: relative;
                    overflow: hidden;
                }
                .jardim-rosa-wrapper .hero::before {
                    content: '';
                    position: absolute;
                    top: -100px;
                    right: -100px;
                    width: 400px;
                    height: 400px;
                    background: var(--accent);
                    filter: blur(150px);
                    opacity: 0.2;
                    border-radius: 50%;
                    z-index: -1;
                }
                .jardim-rosa-wrapper .hero-container {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 60px;
                    align-items: center;
                }
                .jardim-rosa-wrapper .badge {
                    display: inline-block;
                    padding: 6px 16px;
                    background: rgba(255, 105, 180, 0.1);
                    color: var(--primary);
                    border-radius: 50px;
                    font-size: 0.875rem;
                    font-weight: 600;
                    margin-bottom: 24px;
                }
                .jardim-rosa-wrapper .hero h1 {
                    font-size: 3.5rem;
                    margin-bottom: 24px;
                    letter-spacing: -1px;
                }
                .jardim-rosa-wrapper .hero p {
                    font-size: 1.125rem;
                    color: var(--text-light);
                    margin-bottom: 32px;
                    max-width: 90%;
                }
                .jardim-rosa-wrapper .hero-trust {
                    display: flex;
                    gap: 24px;
                    margin-top: 32px;
                }
                .jardim-rosa-wrapper .trust-item {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    font-size: 0.875rem;
                    color: var(--text-light);
                    font-weight: 600;
                }
                .jardim-rosa-wrapper .trust-item i {
                    color: var(--green);
                    font-size: 1.25rem;
                }
                .jardim-rosa-wrapper .hero-image-wrapper {
                    position: relative;
                }
                .jardim-rosa-wrapper .hero-image {
                    width: 100%;
                    border-radius: var(--radius);
                    box-shadow: var(--shadow);
                    display: block;
                    object-fit: cover;
                    aspect-ratio: 4/5;
                }
                .jardim-rosa-wrapper .floating-card {
                    position: absolute;
                    background: var(--white);
                    padding: 16px 24px;
                    border-radius: var(--radius);
                    box-shadow: var(--shadow);
                    display: flex;
                    flex-direction: column;
                    gap: 4px;
                    animation: float 4s ease-in-out infinite;
                }
                .jardim-rosa-wrapper .card-1 {
                    bottom: -20px;
                    left: -20px;
                }
                .jardim-rosa-wrapper .stars {
                    color: var(--accent);
                    display: flex;
                    gap: 4px;
                }
                .jardim-rosa-wrapper .floating-card span {
                    font-weight: 700;
                    font-size: 0.875rem;
                }
                @keyframes float {
                    0% { transform: translateY(0px); }
                    50% { transform: translateY(-10px); }
                    100% { transform: translateY(0px); }
                }
                
                .jardim-rosa-wrapper .cotton-benefit {
                    padding: 80px 0;
                    background: var(--white);
                }
                .jardim-rosa-wrapper .cotton-container {
                    display: grid;
                    grid-template-columns: 3fr 2fr;
                    gap: 60px;
                    align-items: center;
                }
                .jardim-rosa-wrapper .cotton-text h2 {
                    font-size: 2.5rem;
                    margin-bottom: 24px;
                }
                .jardim-rosa-wrapper .cotton-text > p {
                    color: var(--text-light);
                    margin-bottom: 40px;
                    font-size: 1.125rem;
                }
                .jardim-rosa-wrapper .benefit-list {
                    display: flex;
                    flex-direction: column;
                    gap: 32px;
                }
                .jardim-rosa-wrapper .benefit-list li {
                    display: flex;
                    gap: 20px;
                }
                .jardim-rosa-wrapper .icon-box {
                    width: 60px;
                    height: 60px;
                    background: rgba(255, 105, 180, 0.1);
                    color: var(--primary);
                    border-radius: 16px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 2rem;
                    flex-shrink: 0;
                }
                .jardim-rosa-wrapper .benefit-list h3 {
                    margin-bottom: 8px;
                    font-size: 1.25rem;
                }
                .jardim-rosa-wrapper .benefit-list p {
                    color: var(--text-light);
                }
                .jardim-rosa-wrapper .stat-card {
                    background: var(--accent);
                    padding: 40px;
                    border-radius: var(--radius);
                    text-align: center;
                    color: var(--text-dark);
                }
                .jardim-rosa-wrapper .stat-icon {
                    font-size: 3rem;
                    margin-bottom: 16px;
                }
                
                .jardim-rosa-wrapper .features {
                    padding: 100px 0;
                }
                .jardim-rosa-wrapper .features .subtitle {
                    color: var(--text-light);
                    margin-top: 16px;
                    margin-bottom: 60px;
                    font-size: 1.125rem;
                }
                .jardim-rosa-wrapper .grid-features {
                    display: grid;
                    grid-template-columns: repeat(4, 1fr);
                    gap: 24px;
                }
                .jardim-rosa-wrapper .feature-card {
                    background: var(--white);
                    padding: 32px 24px;
                    border-radius: var(--radius);
                    box-shadow: var(--shadow);
                    text-align: center;
                    transition: transform 0.3s ease;
                }
                .jardim-rosa-wrapper .feature-card:hover {
                    transform: translateY(-10px);
                }
                .jardim-rosa-wrapper .feature-icon {
                    width: 70px;
                    height: 70px;
                    margin: 0 auto 24px;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 2rem;
                    color: var(--white);
                }
                .jardim-rosa-wrapper .bg-pink { background: var(--primary); }
                .jardim-rosa-wrapper .bg-yellow { background: var(--accent); color: var(--text-dark); }
                .jardim-rosa-wrapper .bg-green { background: var(--green); }
                .jardim-rosa-wrapper .bg-orange { background: var(--secondary); }
                .jardim-rosa-wrapper .feature-card h3 {
                    margin-bottom: 12px;
                    font-size: 1.25rem;
                }
                .jardim-rosa-wrapper .feature-card p {
                    color: var(--text-light);
                    font-size: 0.9rem;
                }
                
                .jardim-rosa-wrapper .products {
                    padding: 80px 0;
                    background: var(--white);
                }
                .jardim-rosa-wrapper .products-header {
                    text-align: center;
                    margin-bottom: 60px;
                }
                .jardim-rosa-wrapper .product-showcase {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 60px;
                    align-items: center;
                    background: var(--bg-light);
                    border-radius: var(--radius);
                    overflow: hidden;
                }
                .jardim-rosa-wrapper .product-img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    aspect-ratio: 1/1;
                }
                .jardim-rosa-wrapper .product-info {
                    padding: 40px;
                }
                .jardim-rosa-wrapper .product-info h3 {
                    font-size: 2rem;
                    margin-bottom: 16px;
                }
                .jardim-rosa-wrapper .price-range {
                    font-size: 1.25rem;
                    color: var(--text-light);
                    margin-bottom: 24px;
                }
                .jardim-rosa-wrapper .price-range strong {
                    color: var(--primary);
                    font-size: 1.5rem;
                }
                .jardim-rosa-wrapper .sizes {
                    margin-bottom: 24px;
                }
                .jardim-rosa-wrapper .size-tags {
                    display: flex;
                    gap: 8px;
                    margin-top: 8px;
                }
                .jardim-rosa-wrapper .tag {
                    width: 36px;
                    height: 36px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border: 1px solid #ddd;
                    border-radius: 8px;
                    font-weight: 600;
                    color: var(--text-light);
                }
                .jardim-rosa-wrapper .product-features {
                    margin-bottom: 32px;
                }
                .jardim-rosa-wrapper .product-features li {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    margin-bottom: 12px;
                    font-weight: 600;
                }
                .jardim-rosa-wrapper .product-features i {
                    color: var(--green);
                    font-size: 1.25rem;
                }
                
                .jardim-rosa-wrapper .wholesale-rules {
                    padding: 80px 0;
                }
                .jardim-rosa-wrapper .rules-card {
                    background: linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%);
                    border-radius: 24px;
                    padding: 60px;
                    color: var(--white);
                    text-align: center;
                    box-shadow: 0 20px 40px rgba(255, 105, 180, 0.3);
                }
                .jardim-rosa-wrapper .rules-card h2 {
                    font-size: 2.5rem;
                    margin-bottom: 16px;
                }
                .jardim-rosa-wrapper .rules-grid {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 24px;
                    margin: 40px 0;
                }
                .jardim-rosa-wrapper .rule-item {
                    background: rgba(255, 255, 255, 0.1);
                    backdrop-filter: blur(10px);
                    border: 1px solid rgba(255, 255, 255, 0.2);
                    padding: 24px;
                    border-radius: 16px;
                }
                .jardim-rosa-wrapper .rule-icon {
                    font-size: 2.5rem;
                    margin-bottom: 16px;
                }
                .jardim-rosa-wrapper .rule-text h4 {
                    font-size: 1.25rem;
                    margin-bottom: 8px;
                }
                .jardim-rosa-wrapper .cta-center .btn {
                    background: var(--white);
                    color: var(--primary);
                }
                
                .jardim-rosa-wrapper .faq {
                    padding: 100px 0;
                    background: var(--white);
                }
                .jardim-rosa-wrapper .faq-container {
                    display: grid;
                    grid-template-columns: 1fr 2fr;
                    gap: 60px;
                }
                .jardim-rosa-wrapper .faq-text h2 {
                    font-size: 2.5rem;
                    margin-bottom: 16px;
                }
                .jardim-rosa-wrapper .faq-item {
                    border-bottom: 1px solid #eee;
                }
                .jardim-rosa-wrapper .faq-question {
                    width: 100%;
                    text-align: left;
                    padding: 24px 0;
                    background: none;
                    border: none;
                    font-size: 1.125rem;
                    font-weight: 600;
                    color: var(--text-dark);
                    cursor: pointer;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    font-family: inherit;
                }
                .jardim-rosa-wrapper .faq-answer {
                    max-height: 0;
                    overflow: hidden;
                    transition: max-height 0.3s ease;
                }
                .jardim-rosa-wrapper .faq-answer p {
                    padding-bottom: 24px;
                    color: var(--text-light);
                }
                .jardim-rosa-wrapper .faq-item.active .faq-answer {
                    max-height: 200px;
                }
                .jardim-rosa-wrapper .faq-item.active .faq-question i {
                    transform: rotate(180deg);
                }
                
                .jardim-rosa-wrapper .footer {
                    background: var(--text-dark);
                    color: var(--white);
                    padding: 60px 0 20px;
                }
                .jardim-rosa-wrapper .footer-content {
                    display: grid;
                    grid-template-columns: 2fr 1fr;
                    gap: 40px;
                    margin-bottom: 40px;
                }
                .jardim-rosa-wrapper .footer-brand .logo-text {
                    color: var(--white);
                }
                .jardim-rosa-wrapper .footer-brand p {
                    color: #999;
                    margin: 16px 0;
                    max-width: 300px;
                }
                .jardim-rosa-wrapper .social-links {
                    display: flex;
                    gap: 16px;
                }
                .jardim-rosa-wrapper .social-links a {
                    width: 40px;
                    height: 40px;
                    background: rgba(255,255,255,0.1);
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 1.25rem;
                    transition: background 0.3s;
                }
                .jardim-rosa-wrapper .social-links a:hover {
                    background: var(--primary);
                }
                .jardim-rosa-wrapper .footer-contact h4 {
                    margin-bottom: 16px;
                }
                .jardim-rosa-wrapper .footer-contact p {
                    color: #999;
                    margin-bottom: 8px;
                    display: flex;
                    align-items: center;
                    gap: 8px;
                }
                .jardim-rosa-wrapper .footer-bottom {
                    text-align: center;
                    padding-top: 20px;
                    border-top: 1px solid rgba(255,255,255,0.1);
                    color: #666;
                    font-size: 0.875rem;
                }
                
                @media (max-width: 992px) {
                    .jardim-rosa-wrapper .hero-container, .jardim-rosa-wrapper .cotton-container, .jardim-rosa-wrapper .faq-container {
                        grid-template-columns: 1fr;
                    }
                    .jardim-rosa-wrapper .grid-features {
                        grid-template-columns: repeat(2, 1fr);
                    }
                    .jardim-rosa-wrapper .rules-grid {
                        grid-template-columns: 1fr;
                    }
                    .jardim-rosa-wrapper .hero h1 {
                        font-size: 2.8rem;
                    }
                }
                @media (max-width: 768px) {
                    .jardim-rosa-wrapper .product-showcase {
                        grid-template-columns: 1fr;
                    }
                    .jardim-rosa-wrapper .product-info {
                        padding: 24px;
                    }
                    .jardim-rosa-wrapper .hero {
                        padding-top: 120px;
                        text-align: center;
                    }
                    .jardim-rosa-wrapper .hero-trust {
                        justify-content: center;
                    }
                    .jardim-rosa-wrapper .grid-features {
                        grid-template-columns: 1fr;
                    }
                    .jardim-rosa-wrapper .footer-content {
                        grid-template-columns: 1fr;
                    }
                }
            `}} />
            
            <header className="navbar">
                <div className="container nav-content">
                    <div className="logo">
                        <span className="logo-text">Jardim Rosa</span>
                    </div>
                    <a href="https://wa.me/557194003232?text=Ol%C3%A1%2C%20quero%20revender%20Jardim%20Rosa%21" target="_blank" rel="noreferrer" className="btn btn-outline">
                        <i className="ph ph-whatsapp-logo"></i> Atendimento
                    </a>
                </div>
            </header>

            <section className="hero">
                <div className="container hero-container">
                    <div className="hero-content">
                        <span className="badge">Fabricante de Moda Infantil no Atacado</span>
                        <h1>Seu fornecedor de Moda Infantil <span className="text-highlight">100% Algodão</span>.</h1>
                        <p>Lucre muito mais revendendo roupas infantis premium. Peças seguras, confortáveis e com estampas que encantam mães e crianças.</p>
                        
                        <div className="hero-cta-group">
                            <a href="https://wa.me/557194003232?text=Ol%C3%A1%2C%20quero%20revender%20Jardim%20Rosa%21" target="_blank" rel="noreferrer" className="btn btn-primary btn-large">
                                Quero Revender Agora
                                <i className="ph ph-arrow-right"></i>
                            </a>
                        </div>
                        
                        <div className="hero-trust">
                            <div className="trust-item"><i className="ph ph-check-circle"></i> Não exige CNPJ</div>
                            <div className="trust-item"><i className="ph ph-check-circle"></i> Envio p/ todo Brasil</div>
                        </div>
                    </div>
                    <div className="hero-image-wrapper">
                        <img src="/jardimrosa/hero.jpg" alt="Roupas Infantis Jardim Rosa" className="hero-image" />
                        <div className="floating-card card-1">
                            <div className="stars">
                                <i className="ph-fill ph-star"></i><i className="ph-fill ph-star"></i><i className="ph-fill ph-star"></i><i className="ph-fill ph-star"></i><i className="ph-fill ph-star"></i>
                            </div>
                            <span>Alta Margem de Lucro</span>
                        </div>
                    </div>
                </div>
            </section>

            <section className="cotton-benefit">
                <div className="container cotton-container">
                    <div className="cotton-text">
                        <h2>Por que o <span className="text-highlight">100% Algodão</span> faz tanta diferença?</h2>
                        <p>Muitas mães enfrentam problemas com roupas que causam alergias ou não deixam a pele da criança respirar. O verdadeiro diferencial de vender Jardim Rosa é entregar saúde e conforto.</p>
                        <ul className="benefit-list">
                            <li>
                                <div className="icon-box"><i className="ph ph-wind"></i></div>
                                <div>
                                    <h3>Tecido Respirável</h3>
                                    <p>Ideal para a pele delicada das crianças, especialmente no clima brasileiro.</p>
                                </div>
                            </li>
                            <li>
                                <div className="icon-box"><i className="ph ph-shield-check"></i></div>
                                <div>
                                    <h3>Hipoalergênico</h3>
                                    <p>Evita irritações e proporciona um toque macio incomparável.</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div className="cotton-stats">
                        <div className="stat-card">
                            <i className="ph ph-sparkle stat-icon"></i>
                            <h3>Venda Fácil</h3>
                            <p>Quem conhece o toque do algodão, não troca por sintéticos. Seus clientes vão voltar a comprar.</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="features">
                <div className="container text-center">
                    <h2>Vantagens de ser um <span className="text-highlight">Lojista Jardim Rosa</span></h2>
                    <p className="subtitle">Tudo o que você precisa para escalar suas vendas de moda infantil.</p>
                    
                    <div className="grid-features">
                        <div className="feature-card">
                            <div className="feature-icon bg-pink"><i className="ph ph-factory"></i></div>
                            <h3>Fabricação Própria</h3>
                            <p>Nossa fábrica garante qualidade, prazo e reposição de coleções.</p>
                        </div>
                        <div className="feature-card">
                            <div className="feature-icon bg-yellow"><i className="ph ph-palette"></i></div>
                            <h3>Estampas Exclusivas</h3>
                            <p>Você não encontrará nossas estampas na concorrência. Exclusividade pura.</p>
                        </div>
                        <div className="feature-card">
                            <div className="feature-icon bg-green"><i className="ph ph-trend-up"></i></div>
                            <h3>Alta Lucratividade</h3>
                            <p>Compre no atacado com preços excelentes e tenha uma margem de lucro saudável.</p>
                        </div>
                        <div className="feature-card">
                            <div className="feature-icon bg-orange"><i className="ph ph-truck"></i></div>
                            <h3>Logística Descomplicada</h3>
                            <p>Enviamos via PAC ou Sedex para sua loja, com agilidade e segurança.</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="products">
                <div className="container">
                    <div className="products-header">
                        <h2>Nossos <span className="text-highlight">Campeões de Venda</span></h2>
                        <p>Os conjuntos e vestidos que são a isca perfeita para atrair clientes para sua loja.</p>
                    </div>
                    
                    <div className="product-showcase">
                        <div className="product-image-container">
                            <img src="/jardimrosa/bestseller.jpg" alt="Vestidos Jardim Rosa" className="product-img" />
                        </div>
                        <div className="product-info">
                            <h3>Conjuntos e Vestidos Premium</h3>
                            <p className="price-range">Atacado a partir de <strong>R$ 79,90</strong> a <strong>R$ 84,90</strong></p>
                            <div className="sizes">
                                <span>Tamanhos:</span>
                                <div className="size-tags">
                                    <span className="tag">2</span>
                                    <span className="tag">4</span>
                                    <span className="tag">6</span>
                                    <span className="tag">8</span>
                                    <span className="tag">10</span>
                                    <span className="tag">12</span>
                                </div>
                            </div>
                            <ul className="product-features">
                                <li><i className="ph-fill ph-check-circle"></i> Design autoral</li>
                                <li><i className="ph-fill ph-check-circle"></i> Acabamento impecável</li>
                                <li><i className="ph-fill ph-check-circle"></i> Rápido giro de estoque</li>
                            </ul>
                            <a href="https://wa.me/557194003232?text=Ol%C3%A1%2C%20quero%20revender%20os%20conjuntos%20Jardim%20Rosa%21" target="_blank" rel="noreferrer" className="btn btn-primary w-100">
                                Ver Catálogo Completo
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            <section className="wholesale-rules">
                <div className="container">
                    <div className="rules-card">
                        <h2>Como comprar no Atacado?</h2>
                        <p>É rápido, prático e pensado para o seu negócio.</p>
                        
                        <div className="rules-grid">
                            <div className="rule-item">
                                <div className="rule-icon"><i className="ph ph-shopping-bag"></i></div>
                                <div className="rule-text">
                                    <h4>Pedido Mínimo</h4>
                                    <p>Apenas 12 peças</p>
                                </div>
                            </div>
                            <div className="rule-item">
                                <div className="rule-icon"><i className="ph ph-identification-card"></i></div>
                                <div className="rule-text">
                                    <h4>CNPJ</h4>
                                    <p>Não é obrigatório</p>
                                </div>
                            </div>
                            <div className="rule-item">
                                <div className="rule-icon"><i className="ph ph-credit-card"></i></div>
                                <div className="rule-text">
                                    <h4>Pagamento</h4>
                                    <p>Pix e Cartão de Crédito</p>
                                </div>
                            </div>
                        </div>
                        
                        <div className="cta-center">
                            <a href="https://wa.me/557194003232?text=Ol%C3%A1%2C%20quero%20fazer%20meu%20pedido%20no%20atacado%21" target="_blank" rel="noreferrer" className="btn btn-primary btn-large glow">
                                Falar com Consultor Agora
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            <section className="faq">
                <div className="container faq-container">
                    <div className="faq-text">
                        <h2>Dúvidas <br/><span className="text-highlight">Frequentes</span></h2>
                        <p>Tudo o que você precisa saber antes de fazer seu primeiro pedido e espalhar a Jardim Rosa pelo Brasil.</p>
                    </div>
                    
                    <div className="faq-list">
                        <div className="faq-item">
                            <button className="faq-question">Quais são as formas de envio? <i className="ph ph-caret-down"></i></button>
                            <div className="faq-answer">
                                <p>Enviamos para todo o Brasil através dos Correios (PAC ou Sedex), garantindo que suas peças cheguem com segurança até você.</p>
                            </div>
                        </div>
                        <div className="faq-item">
                            <button className="faq-question">Preciso ter CNPJ para comprar? <i className="ph ph-caret-down"></i></button>
                            <div className="faq-answer">
                                <p>Não! Você pode comprar no atacado utilizando apenas o seu CPF. Queremos facilitar o seu início nas vendas.</p>
                            </div>
                        </div>
                        <div className="faq-item">
                            <button className="faq-question">Como funciona a escolha dos tamanhos? <i className="ph ph-caret-down"></i></button>
                            <div className="faq-answer">
                                <p>Nossa grade atende do tamanho 2 ao 12 anos. O pedido mínimo é de 12 peças no total, que você pode mesclar conforme a disponibilidade do estoque.</p>
                            </div>
                        </div>
                        <div className="faq-item">
                            <button className="faq-question">Qual a média de faturamento que posso alcançar? <i className="ph ph-caret-down"></i></button>
                            <div className="faq-answer">
                                <p>Depende do seu esforço de vendas, mas nossas peças têm excelente aceitação (de cada 50 pessoas, pelo menos 3 compram no primeiro contato). Com peças exclusivas, sua margem de lucro permite um ótimo retorno financeiro.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <footer className="footer">
                <div className="container footer-content">
                    <div className="footer-brand">
                        <span className="logo-text">Jardim Rosa</span>
                        <p>Espalhando cor, conforto e exclusividade por todo o Brasil.</p>
                        <div className="social-links">
                            <a href="https://www.instagram.com/jardimrosaloja/" target="_blank" rel="noreferrer"><i className="ph-fill ph-instagram-logo"></i></a>
                            <a href="https://chat.whatsapp.com/IOJ9bmHSOxlIQubB4cn3zi?s=cl&p=i&mlu=4" target="_blank" rel="noreferrer"><i className="ph-fill ph-whatsapp-logo"></i></a>
                        </div>
                    </div>
                    <div className="footer-contact">
                        <h4>Fale Conosco</h4>
                        <p><i className="ph ph-whatsapp-logo"></i> (71) 9400-3232</p>
                        <p><i className="ph ph-clock"></i> Atendimento em horário comercial</p>
                    </div>
                </div>
                <div className="footer-bottom">
                    <p>&copy; 2026 Jardim Rosa - Moda Infantil. Todos os direitos reservados.</p>
                </div>
            </footer>

            <SocialProofNotification actions={SOCIAL_PROOF_ACTIONS} />
            <WhatsAppChatWidget />
        </div>
    );
}
