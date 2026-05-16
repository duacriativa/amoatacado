'use client';

import { useState, Suspense } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Instagram, MapPin, Truck, CheckCircle2 } from 'lucide-react';
import SocialProofNotification from '@/components/SocialProofNotification';
import Script from 'next/script';

const ACCENT = '#1a2747';

/* ─── Lookbook images from kyrefhjeans.com.br ────────────────────────────── */
const LOOKBOOK_IMAGES = [
  '/kyrefh/lookbook/1.png',
  '/kyrefh/lookbook/2.png',
  '/kyrefh/lookbook/3.png',
  '/kyrefh/lookbook/4.png',
  '/kyrefh/lookbook/5.png',
  '/kyrefh/lookbook/6.png',
];

const SHORTS_VIDEOS = [
  '3caDvEBTs04',
  'xIq64pU2Klo',
  'kEA-EP7BTdU',
  '3XZ3wL5UfS0',
  'xUWCTNa5d0U',
];
const HERO_VIDEO = SHORTS_VIDEOS[1];

/* ─── Data ────────────────────────────────────────────────────────────────── */
const MARQUEE_ITEMS = [
  'Fabricação Própria', '★', 'A partir de R$ 50', '★', 'Pronta Entrega',
  '★', 'Tamanhos 36 ao 60', '★', 'Novidade Semanal', '★', 'Exclusivo Atacado', '★',
];

const NUMBERS = [
  { value: '+1.200', label: 'lojistas comprando da Kyrefh hoje, em 26 estados' },
  { value: '29K', label: 'seguidores acompanhando os lançamentos toda semana' },
  { value: 'R$ 50', label: 'preço de partida — o melhor atacado de Fortaleza' },
  { value: '24h', label: 'do pedido fechado ao despacho pra sua loja' },
];

const STEPS = [
  {
    num: '01',
    title: 'Você preenche',
    desc: 'Formulário rápido. 60 segundos pra contar quem você é, onde fica e o seu volume.',
  },
  {
    num: '02',
    title: 'A gente entra em contato',
    desc: 'Em até 30 min, um consultor chama no WhatsApp com a tabela completa e o catálogo da semana.',
  },
  {
    num: '03',
    title: 'Você fecha',
    desc: 'Pix com desconto. Pedido confirmado hoje, despacho no próximo dia útil.',
  },
];

const PRODUCTS = [
  {
    title: 'Bermudas',
    items: ['Alfaiataria', 'Jeans Premium', 'Mauricinho', 'Cargo e Casual'],
  },
  {
    title: 'Calças',
    items: ['Alfaiataria', 'Jeans e Jogger', 'Tech', 'Esporte Fino'],
  },
  {
    title: 'Camisas',
    items: ['T-Shirt Básica', 'Oversized', 'Gola Polo', 'Tecnológica'],
  },
];

const TESTIMONIALS = [
  {
    quote: 'Comprei pra testar, em 3 dias minhas peças tinham girado. Hoje compro toda semana — virou rotina aqui na loja.',
    name: 'Maria Helena',
    store: 'Espaço M · Crato/CE',
  },
  {
    quote: 'Atendimento direto, foto chega, preço chega, despacha no mesmo dia. A qualidade do jeans é absurda pro preço.',
    name: 'Junior Sá',
    store: 'Brisa Jeans · Caruaru/PE',
  },
  {
    quote: 'Larguei dois fornecedores pra concentrar na Kyrefh. Cliente sente a diferença no acabamento e volta sempre.',
    name: 'Camila Rocha',
    store: 'Estilo Próprio · Goiânia/GO',
  },
];

const FAQS = [
  ['Qual o pedido mínimo?', 'Não trabalhamos com mínimo travado. Você pode fechar um pedido pequeno pra testar e voltar quando quiser.'],
  ['Vocês vendem pro consumidor final?', 'Não. Somos exclusivamente atacado — você precisa ter loja física, online ou ser revendedor.'],
  ['Como funciona o frete?', 'Despachamos por transportadora ou Correios pra todo o Brasil. Frete pago no destino ou na fatura.'],
  ['Tem prazo de produção ou pré-venda?', 'Não. Tudo no catálogo é pronta entrega. Pedido fechado hoje, despachado no próximo dia útil.'],
  ['Quais formas de pagamento?', 'Trabalhamos somente com Pix. Pagou, confirmou — e a gente despacha no próximo dia útil.'],
  ['E se vier peça com defeito?', 'Garantia total. Defeito de fabricação a gente troca ou estorna, sem questionamento.'],
];

/* ─── Form ────────────────────────────────────────────────────────────────── */
const formSchema = z.object({
  name: z.string().min(2, 'Nome é obrigatório'),
  phone: z.string().min(10, 'WhatsApp inválido'),
  cidade: z.string().min(2, 'Cidade é obrigatória'),
  uf: z.string().min(2, 'UF é obrigatória'),
  businessType: z.string().min(1, 'Selecione o tipo de negócio'),
  volume: z.string().min(1, 'Selecione o volume'),
  source: z.string().optional(),
});
type FormData = z.infer<typeof formSchema>;

const BUSINESS_TYPES = ['Loja física', 'Loja online', 'Sacoleira / revendedor', 'Em planejamento'];
const VOLUMES = ['Até 30 peças', '30 a 100 peças', '100 a 300 peças', 'Mais de 300 peças'];

function KyrefhV2Form() {
  const searchParams = useSearchParams();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(formSchema) });

  const selectedBusiness = watch('businessType');
  const selectedVolume = watch('volume');

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setSubmitError(null);
    const utms: Record<string, string> = {};
    searchParams.forEach((value, key) => {
      if (key.startsWith('utm_')) utms[key] = value;
    });
    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, ...utms, clientSlug: 'kyrefh-v2' }),
      });
      if (!res.ok) throw new Error();
      window.location.href = '/kyrefh/v2/obrigado';
    } catch {
      setSubmitError('Ocorreu um erro. Tente novamente.');
      setIsSubmitting(false);
    }
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    border: '1px solid rgba(10,10,10,0.15)',
    borderRadius: 4,
    padding: '12px 14px',
    fontFamily: 'var(--font-manrope), sans-serif',
    fontSize: 15,
    color: '#0a0a0a',
    background: '#fff',
    outline: 'none',
    boxSizing: 'border-box',
  };

  const labelStyle: React.CSSProperties = {
    display: 'block',
    fontFamily: 'var(--font-manrope), sans-serif',
    fontSize: 11,
    fontWeight: 700,
    letterSpacing: '0.12em',
    textTransform: 'uppercase',
    color: 'rgba(10,10,10,0.5)',
    marginBottom: 8,
  };

  const toggleBtnStyle = (active: boolean): React.CSSProperties => ({
    padding: '10px 14px',
    border: `1px solid ${active ? ACCENT : 'rgba(10,10,10,0.15)'}`,
    borderRadius: 4,
    background: active ? ACCENT : '#fff',
    color: active ? '#fff' : '#0a0a0a',
    fontFamily: 'var(--font-manrope), sans-serif',
    fontSize: 13,
    fontWeight: active ? 700 : 400,
    cursor: 'pointer',
    transition: 'all .15s',
    textAlign: 'left' as const,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      {/* Nome */}
      <div>
        <label style={labelStyle}>Seu Nome</label>
        <input
          {...register('name')}
          type="text"
          placeholder="Como te chamam?"
          style={inputStyle}
        />
        {errors.name && <p style={{ fontSize: 12, color: '#e00', marginTop: 4 }}>{errors.name.message}</p>}
      </div>

      {/* WhatsApp */}
      <div>
        <label style={labelStyle}>WhatsApp</label>
        <input
          {...register('phone')}
          type="tel"
          placeholder="(85) 9 9999-9999"
          style={inputStyle}
        />
        {errors.phone && <p style={{ fontSize: 12, color: '#e00', marginTop: 4 }}>{errors.phone.message}</p>}
      </div>

      {/* Cidade + UF */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 80px', gap: 10 }}>
        <div>
          <label style={labelStyle}>Cidade</label>
          <input {...register('cidade')} type="text" placeholder="Fortaleza" style={inputStyle} />
          {errors.cidade && <p style={{ fontSize: 12, color: '#e00', marginTop: 4 }}>{errors.cidade.message}</p>}
        </div>
        <div>
          <label style={labelStyle}>UF</label>
          <input {...register('uf')} type="text" placeholder="CE" maxLength={2} style={inputStyle} />
          {errors.uf && <p style={{ fontSize: 12, color: '#e00', marginTop: 4 }}>{errors.uf.message}</p>}
        </div>
      </div>

      {/* Tipo de Negócio */}
      <div>
        <label style={labelStyle}>Tipo de Negócio</label>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
          {BUSINESS_TYPES.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setValue('businessType', t, { shouldValidate: true })}
              style={toggleBtnStyle(selectedBusiness === t)}
            >
              {t}
            </button>
          ))}
        </div>
        {errors.businessType && <p style={{ fontSize: 12, color: '#e00', marginTop: 4 }}>{errors.businessType.message}</p>}
        <input type="hidden" {...register('businessType')} />
      </div>

      {/* Volume */}
      <div>
        <label style={labelStyle}>Volume Mensal Estimado</label>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
          {VOLUMES.map((v) => (
            <button
              key={v}
              type="button"
              onClick={() => setValue('volume', v, { shouldValidate: true })}
              style={toggleBtnStyle(selectedVolume === v)}
            >
              {v}
            </button>
          ))}
        </div>
        {errors.volume && <p style={{ fontSize: 12, color: '#e00', marginTop: 4 }}>{errors.volume.message}</p>}
        <input type="hidden" {...register('volume')} />
      </div>

      {/* Como Conheceu — dropdown */}
      <div>
        <label style={labelStyle}>Como Conheceu a Kyrefh?</label>
        <div style={{ position: 'relative' }}>
          <select
            {...register('source')}
            style={{
              ...inputStyle,
              appearance: 'none',
              paddingRight: 40,
              cursor: 'pointer',
              color: 'rgba(10,10,10,0.6)',
            }}
            defaultValue=""
          >
            <option value="" disabled>Selecione...</option>
            <option value="Instagram">Instagram</option>
            <option value="Google">Google</option>
            <option value="Indicação">Indicação</option>
            <option value="Anúncios">Anúncios</option>
            <option value="Outro">Outro</option>
          </select>
          <span
            style={{
              position: 'absolute',
              right: 14,
              top: '50%',
              transform: 'translateY(-50%)',
              pointerEvents: 'none',
              fontFamily: 'var(--font-manrope), sans-serif',
              fontSize: 10,
              color: 'rgba(10,10,10,0.4)',
            }}
          >
            ▼
          </span>
        </div>
      </div>

      {submitError && <p style={{ fontSize: 13, color: '#e00' }}>{submitError}</p>}

      <button
        type="submit"
        disabled={isSubmitting}
        style={{
          width: '100%',
          padding: '16px',
          background: ACCENT,
          color: '#fff',
          border: 'none',
          borderRadius: 4,
          fontFamily: 'var(--font-manrope), sans-serif',
          fontSize: 13,
          fontWeight: 700,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          cursor: isSubmitting ? 'not-allowed' : 'pointer',
          opacity: isSubmitting ? 0.7 : 1,
          transition: 'opacity .15s',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 8,
        }}
      >
        {isSubmitting ? 'Enviando...' : 'Solicitar Tabela →'}
      </button>

      <p style={{
        fontFamily: 'var(--font-manrope), sans-serif',
        fontSize: 11,
        color: 'rgba(10,10,10,0.4)',
        textAlign: 'center',
        margin: 0,
      }}>
        Resposta em até 30 min em horário comercial. Seus dados ficam só com a Kyrefh.
      </p>
    </form>
  );
}

/* ─── Marquee ─────────────────────────────────────────────────────────────── */
function Marquee() {
  const items = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS, ...MARQUEE_ITEMS];
  return (
    <section
      style={{ background: ACCENT, overflow: 'hidden' }}
      className="py-5"
    >
      <style>{`@keyframes kfh-marquee{0%{transform:translateX(0)}100%{transform:translateX(-33.333%)}}`}</style>
      <div style={{ display: 'flex', whiteSpace: 'nowrap', gap: 48, animation: 'kfh-marquee 30s linear infinite', width: 'max-content' }}>
        {items.map((t, i) => (
          <span key={i} style={{ fontFamily: 'var(--font-bebas), sans-serif', fontSize: 15, letterSpacing: '0.18em', textTransform: 'uppercase', color: t === '★' ? 'rgba(255,255,255,0.35)' : '#fff' }}>
            {t}
          </span>
        ))}
      </div>
    </section>
  );
}

/* ─── FAQ Item ────────────────────────────────────────────────────────────── */
function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderBottom: '1px solid rgba(10,10,10,0.12)' }}>
      <button onClick={() => setOpen(!open)} className="w-full flex justify-between items-center py-7 text-left gap-6" style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}>
        <span style={{ fontFamily: 'var(--font-manrope), sans-serif', fontSize: 17, fontWeight: 600, color: '#0a0a0a', lineHeight: 1.3 }}>{q}</span>
        <span style={{ fontFamily: 'var(--font-bebas), sans-serif', fontSize: 28, color: ACCENT, transition: 'transform .25s', transform: open ? 'rotate(45deg)' : 'rotate(0)', flexShrink: 0, lineHeight: 1 }}>+</span>
      </button>
      {open && (
        <div style={{ fontFamily: 'var(--font-manrope), sans-serif', fontSize: 15, lineHeight: 1.65, color: 'rgba(10,10,10,0.65)', paddingBottom: 28 }}>{a}</div>
      )}
    </div>
  );
}

/* ─── Page ────────────────────────────────────────────────────────────────── */
export default function KyrefhV2Page() {
  return (
    <main style={{ fontFamily: 'var(--font-manrope), sans-serif', color: '#0a0a0a' }} className="min-h-screen">
      <Script id="fb-pixel-kyrefh-v2" strategy="afterInteractive">
        {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');`}
      </Script>

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section style={{ position: 'relative', minHeight: '100vh', background: '#050505', color: '#f5efe6', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        {/* Background: denim texture (always visible) + video on top */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 0, overflow: 'hidden', background: '#0a1220' }}>
          {/* Denim twill texture — mobile only (video autoplays on desktop) */}
          <motion.div
            className="md:hidden"
            animate={{ x: [0, -14, 8, -6, 0], y: [0, 8, -10, 6, 0], scale: [1.08, 1.12, 1.09, 1.13, 1.08] }}
            transition={{ duration: 28, ease: 'easeInOut', repeat: Infinity }}
            style={{
              position: 'absolute',
              inset: '-15%',
              backgroundImage: [
                /* warp threads — strong diagonal */
                'repeating-linear-gradient(132deg, transparent 0px, transparent 2px, rgba(255,255,255,0.028) 2px, rgba(255,255,255,0.028) 3px, transparent 3px, transparent 9px)',
                /* weft threads — cross diagonal */
                'repeating-linear-gradient(42deg, transparent 0px, transparent 3px, rgba(0,0,0,0.07) 3px, rgba(0,0,0,0.07) 4px, transparent 4px, transparent 10px)',
                /* subtle indigo depth */
                'radial-gradient(ellipse at 30% 60%, rgba(30,48,90,0.6) 0%, transparent 65%)',
                'radial-gradient(ellipse at 75% 20%, rgba(15,25,55,0.5) 0%, transparent 55%)',
              ].join(','),
            }}
          />
          {/* YouTube video — desktop only */}
          <iframe
            className="hidden md:block"
            src={`https://www.youtube.com/embed/${HERO_VIDEO}?autoplay=1&mute=1&loop=1&playlist=${HERO_VIDEO}&controls=0&rel=0&playsinline=1&modestbranding=1&showinfo=0`}
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              height: 'max(100vh, calc(100vw * 1.7778))',
              width: 'calc(max(100vh, calc(100vw * 1.7778)) * 0.5625)',
              transform: 'translate(-50%, -50%)',
              border: 'none',
              pointerEvents: 'none',
            }}
            allow="autoplay; encrypted-media"
          />
        </div>
        {/* Dark editorial overlays */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 1, background: 'linear-gradient(180deg,rgba(5,5,5,0.7) 0%,rgba(5,5,5,0.35) 30%,rgba(5,5,5,0.6) 65%,rgba(5,5,5,0.95) 100%)' }} />
        <div style={{ position: 'absolute', inset: 0, zIndex: 1, backgroundImage: 'repeating-radial-gradient(circle at 30% 40%,rgba(255,255,255,0.012) 0 1px,transparent 1px 3px),repeating-linear-gradient(45deg,rgba(0,0,0,0.05) 0 1px,transparent 1px 2px)', mixBlendMode: 'overlay', pointerEvents: 'none' }} />

        {/* Top bar */}
        <div style={{ position: 'relative', zIndex: 2, padding: '28px 48px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} className="px-6 sm:px-12">
          <span style={{ fontFamily: 'var(--font-bebas), sans-serif', fontSize: 26, letterSpacing: '0.12em', color: '#f5efe6' }}>KYREFH</span>
          <span style={{ fontFamily: 'var(--font-manrope), sans-serif', fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(245,239,230,0.45)' }}>
            Edição 2026 · Atacado
          </span>
        </div>

        {/* Hero content — full width, bottom-anchored */}
        <div style={{ position: 'relative', zIndex: 2, flex: 1, display: 'flex', alignItems: 'flex-end' }} className="px-6 sm:px-12 pb-20">
          <div className="w-full max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-end">
            {/* Left: big headline */}
            <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9 }}>
              <h1 style={{ fontFamily: 'var(--font-bebas), sans-serif', fontSize: 'clamp(80px, 13vw, 180px)', fontWeight: 400, lineHeight: 0.88, letterSpacing: '-0.01em', color: '#f5efe6', margin: 0, textShadow: '0 4px 40px rgba(0,0,0,0.5)' }}>
                Atacado<br />
                <span style={{ color: '#f5efe6' }}>direto</span><br />
                da fábrica.
              </h1>
            </motion.div>

            {/* Right: subtext + CTA */}
            <motion.div initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.2 }}>
              <p style={{ fontFamily: 'var(--font-manrope), sans-serif', fontSize: 17, lineHeight: 1.65, color: 'rgba(245,239,230,0.75)', margin: '0 0 32px', maxWidth: 440 }}>
                Uma fábrica em Fortaleza vestindo +1.200 lojistas em 26 estados.
                Jeans, sarja e blusas masculinas a partir de R$ 50, com novidade toda semana.
              </p>
              <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                <a href="#capturar" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '14px 28px', background: '#f5efe6', color: '#0a0a0a', fontFamily: 'var(--font-manrope), sans-serif', fontSize: 13, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', textDecoration: 'none', borderRadius: 4 }}>
                  Seja revendedor(a)
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── SHORTS ───────────────────────────────────────────────────────── */}
      <section style={{ padding: '80px 0 100px', background: '#050505', color: '#f5efe6', overflow: 'hidden' }}>
        <div className="px-6 sm:px-12 max-w-7xl mx-auto mb-12">
          <p style={{ fontFamily: 'var(--font-manrope), sans-serif', fontSize: 11, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(245,239,230,0.4)', marginBottom: 12 }}>Na prática</p>
          <h2 style={{ fontFamily: 'var(--font-bebas), sans-serif', fontSize: 'clamp(56px, 8vw, 100px)', fontWeight: 400, lineHeight: 0.92, letterSpacing: '-0.01em', color: '#f5efe6', margin: 0 }}>
            Veja a coleção<br />em movimento.
          </h2>
        </div>
        <div
          style={{
            display: 'flex',
            gap: 12,
            paddingLeft: 'max(24px, calc((100vw - 1280px) / 2 + 48px))',
            paddingRight: 24,
            overflowX: 'auto',
            scrollSnapType: 'x mandatory',
            WebkitOverflowScrolling: 'touch',
            scrollbarWidth: 'none',
          }}
        >
          {SHORTS_VIDEOS.map((id, i) => (
            <motion.div
              key={id}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              style={{
                flex: '0 0 260px',
                aspectRatio: '9 / 16',
                borderRadius: 8,
                overflow: 'hidden',
                scrollSnapAlign: 'start',
                background: '#111',
                position: 'relative',
              }}
            >
              <iframe
                src={`https://www.youtube.com/embed/${id}?rel=0&modestbranding=1`}
                style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 'none' }}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── MARQUEE ──────────────────────────────────────────────────────── */}
      <Marquee />

      {/* ── NÚMEROS ─────────────────────────────────────────────────────── */}
      <section style={{ padding: '120px 0', background: '#0a0a0a', color: '#f5efe6' }}>
        <div className="px-6 sm:px-12 max-w-7xl mx-auto">
          <p style={{ fontFamily: 'var(--font-manrope), sans-serif', fontSize: 11, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(245,239,230,0.4)', marginBottom: 56 }}>Em números</p>
          <div className="grid grid-cols-1 sm:grid-cols-2">
            {NUMBERS.map(({ value, label }, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.1 }} style={{ padding: '56px 0', borderTop: '1px solid rgba(245,239,230,0.1)', borderBottom: i >= 2 ? '1px solid rgba(245,239,230,0.1)' : 'none', borderRight: i % 2 === 0 ? '1px solid rgba(245,239,230,0.1)' : 'none', paddingRight: i % 2 === 0 ? 48 : 0, paddingLeft: i % 2 === 1 ? 48 : 0, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, alignItems: 'baseline' }}>
                <div style={{ fontFamily: 'var(--font-bebas), sans-serif', fontSize: 'clamp(72px, 10vw, 120px)', fontWeight: 400, letterSpacing: '-0.02em', lineHeight: 0.9, color: '#f5efe6' }}>{value}</div>
                <div style={{ fontFamily: 'var(--font-manrope), sans-serif', fontSize: 15, lineHeight: 1.55, color: 'rgba(245,239,230,0.55)' }}>{label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MANIFESTO ────────────────────────────────────────────────────── */}
      <section style={{ padding: '120px 0', background: '#f5efe6' }}>
        <div className="px-6 sm:px-12 max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
            <div className="lg:sticky lg:top-24">
              <p style={{ fontFamily: 'var(--font-manrope), sans-serif', fontSize: 11, letterSpacing: '0.22em', textTransform: 'uppercase', color: ACCENT, marginBottom: 16 }}>Manifesto</p>
              <p style={{ fontFamily: 'var(--font-manrope), sans-serif', fontSize: 18, lineHeight: 1.5, color: 'rgba(10,10,10,0.5)', fontWeight: 500 }}>Da fábrica à sua vitrine,<br />sem atravessador.</p>
            </div>
            <div>
              <p style={{ fontFamily: 'var(--font-manrope), sans-serif', fontSize: 'clamp(22px, 3vw, 30px)', lineHeight: 1.4, fontWeight: 600, color: '#0a0a0a', margin: '0 0 28px' }}>
                A gente acredita que <em style={{ fontStyle: 'italic', color: ACCENT }}>vender bem</em> começa antes da venda. Começa no tecido escolhido, no corte preciso, na costura que aguenta a lavagem, no preço justo que deixa margem pro lojista respirar.
              </p>
              <p style={{ fontFamily: 'var(--font-manrope), sans-serif', fontSize: 17, lineHeight: 1.7, color: 'rgba(10,10,10,0.65)', margin: '0 0 20px' }}>
                Fabricamos jeans, sarja e blusas masculinas pra lojistas que querem girar estoque rápido sem abrir mão da qualidade. Pronta entrega, pedido mínimo baixo, novidade toda semana.
              </p>
              <p style={{ fontFamily: 'var(--font-manrope), sans-serif', fontSize: 17, lineHeight: 1.7, color: 'rgba(10,10,10,0.65)', margin: 0 }}>
                <strong style={{ color: '#0a0a0a' }}>+ de 1.200 lojistas atendidos.</strong> E queremos ser a sua casa também.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── LOOKBOOK ─────────────────────────────────────────────────────── */}
      <section style={{ padding: '120px 0', background: '#fff' }}>
        <div className="px-6 sm:px-12 max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
            <div>
              <p style={{ fontFamily: 'var(--font-manrope), sans-serif', fontSize: 11, letterSpacing: '0.22em', textTransform: 'uppercase', color: ACCENT, marginBottom: 12 }}>Lookbook</p>
              <h2 style={{ fontFamily: 'var(--font-bebas), sans-serif', fontSize: 'clamp(56px, 8vw, 100px)', fontWeight: 400, lineHeight: 0.92, letterSpacing: '-0.01em', color: '#0a0a0a', margin: 0 }}>
                O que veste<br />o nosso lojista.
              </h2>
            </div>
            <a href="https://www.instagram.com/kyrefh" target="_blank" rel="noopener noreferrer"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '12px 20px', border: `1px solid ${ACCENT}`, borderRadius: 4, fontFamily: 'var(--font-manrope), sans-serif', fontSize: 13, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: ACCENT, textDecoration: 'none', whiteSpace: 'nowrap' }}>
              <Instagram size={14} />@kyrefh
            </a>
          </div>

          {/* Magazine grid */}
          <div className="grid grid-cols-12 gap-3">
            {/* Featured large */}
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}
              className="col-span-12 md:col-span-7"
              style={{ position: 'relative', paddingBottom: '60%', overflow: 'hidden', borderRadius: 4, background: '#111' }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={LOOKBOOK_IMAGES[0]} alt="Kyrefh Jeans — produto destaque" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
            </motion.div>

            {/* Side column */}
            <div className="col-span-12 md:col-span-5 flex flex-col gap-3">
              {[1, 2].map((idx) => (
                <motion.div key={idx} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: idx * 0.1 }}
                  style={{ position: 'relative', paddingBottom: '50%', flex: 1, overflow: 'hidden', borderRadius: 4, background: '#111' }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={LOOKBOOK_IMAGES[idx]} alt={`Kyrefh Jeans — look ${idx}`} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', filter: idx === 2 ? 'brightness(0.85)' : 'none' }} />
                </motion.div>
              ))}
            </div>

            {/* Bottom row */}
            {[3, 4, 5].map((idx) => (
              <motion.div key={idx} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: (idx - 3) * 0.1 }}
                className="col-span-12 sm:col-span-4"
                style={{ position: 'relative', paddingBottom: '100%', overflow: 'hidden', borderRadius: 4, background: '#111' }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={LOOKBOOK_IMAGES[idx]} alt={`Kyrefh Jeans — look ${idx}`} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
              </motion.div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <a href="https://www.instagram.com/kyrefh" target="_blank" rel="noopener noreferrer"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontFamily: 'var(--font-manrope), sans-serif', fontSize: 14, fontWeight: 600, color: 'rgba(10,10,10,0.45)', textDecoration: 'none', letterSpacing: '0.05em' }}>
              <Instagram size={16} />Ver mais no @kyrefh
            </a>
          </div>
        </div>
      </section>

      {/* ── MIX DE PRODUTOS ──────────────────────────────────────────────── */}
      <section id="produtos" style={{ padding: '120px 0', background: '#0a0a0a', color: '#f5efe6', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at bottom left, rgba(26,39,71,0.4) 0%, transparent 60%)', pointerEvents: 'none' }} />
        <div className="px-6 sm:px-12 max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <p style={{ fontFamily: 'var(--font-manrope), sans-serif', fontSize: 11, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(245,239,230,0.4)', marginBottom: 16 }}>Coleção</p>
            <h2 style={{ fontFamily: 'var(--font-bebas), sans-serif', fontSize: 'clamp(52px, 8vw, 96px)', fontWeight: 400, lineHeight: 0.92, color: '#f5efe6', margin: '0 0 16px' }}>Nosso mix de produtos.</h2>
            <p style={{ fontFamily: 'var(--font-manrope), sans-serif', fontSize: 16, color: 'rgba(245,239,230,0.5)', margin: 0 }}>Tudo que o homem moderno precisa, com a qualidade que sua loja exige.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {PRODUCTS.map(({ title, items }, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.12 }}
                style={{ background: 'rgba(245,239,230,0.04)', border: '1px solid rgba(245,239,230,0.1)', borderRadius: 4, padding: '40px 32px', transition: 'border-color .2s' }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = `${ACCENT}80`; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(245,239,230,0.1)'; }}>
                <h3 style={{ fontFamily: 'var(--font-bebas), sans-serif', fontSize: 48, fontWeight: 400, color: '#f5efe6', margin: '0 0 28px', lineHeight: 1 }}>{title}</h3>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 16 }}>
                  {items.map((item, j) => (
                    <li key={j} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <CheckCircle2 size={18} color={ACCENT === '#1a2747' ? '#6b8cda' : '#f5efe6'} style={{ flexShrink: 0 }} />
                      <span style={{ fontFamily: 'var(--font-manrope), sans-serif', fontSize: 15, color: 'rgba(245,239,230,0.8)' }}>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
          <div className="mt-14 text-center">
            <a href="#capturar"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '16px 40px', background: '#f5efe6', color: '#0a0a0a', fontFamily: 'var(--font-manrope), sans-serif', fontSize: 13, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', textDecoration: 'none', borderRadius: 4 }}>
              Solicitar catálogo completo
            </a>
          </div>
        </div>
      </section>

      {/* ── COMO FUNCIONA ─────────────────────────────────────────────────── */}
      <section style={{ padding: '120px 0', background: '#f5efe6', borderTop: '1px solid rgba(10,10,10,0.06)' }}>
        <div className="px-6 sm:px-12 max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-start mb-16">
            <div className="lg:sticky lg:top-24">
              <p style={{ fontFamily: 'var(--font-manrope), sans-serif', fontSize: 11, letterSpacing: '0.22em', textTransform: 'uppercase', color: ACCENT, marginBottom: 16 }}>Como funciona</p>
              <p style={{ fontFamily: 'var(--font-manrope), sans-serif', fontSize: 17, lineHeight: 1.5, color: 'rgba(10,10,10,0.5)', fontWeight: 500 }}>Três passos. Zero burocracia.</p>
            </div>
            <h2 style={{ fontFamily: 'var(--font-bebas), sans-serif', fontSize: 'clamp(56px, 7vw, 100px)', fontWeight: 400, lineHeight: 0.95, letterSpacing: '-0.01em', color: '#0a0a0a', margin: 0 }}>
              Do toque no botão à <em style={{ fontStyle: 'italic', color: ACCENT }}>caixa pronta</em>.
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3" style={{ borderTop: '1px solid rgba(10,10,10,0.12)' }}>
            {STEPS.map(({ num, title, desc }, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.12 }}
                style={{ padding: '40px 32px 40px 0', borderRight: i < 2 ? '1px solid rgba(10,10,10,0.12)' : 'none', paddingLeft: i > 0 ? 32 : 0 }}>
                <div style={{ fontFamily: 'var(--font-bebas), sans-serif', fontSize: 96, fontWeight: 400, letterSpacing: '-0.02em', lineHeight: 0.9, color: ACCENT, marginBottom: 20 }}>{num}</div>
                <h3 style={{ fontFamily: 'var(--font-manrope), sans-serif', fontSize: 20, fontWeight: 700, margin: '0 0 12px', color: '#0a0a0a', lineHeight: 1.2 }}>{title}</h3>
                <p style={{ fontFamily: 'var(--font-manrope), sans-serif', fontSize: 15, lineHeight: 1.6, color: 'rgba(10,10,10,0.6)', margin: 0 }}>{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── DEPOIMENTOS ──────────────────────────────────────────────────── */}
      <section style={{ padding: '120px 0', background: '#fff' }}>
        <div className="px-6 sm:px-12 max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-start mb-14">
            <div className="lg:sticky lg:top-24">
              <p style={{ fontFamily: 'var(--font-manrope), sans-serif', fontSize: 11, letterSpacing: '0.22em', textTransform: 'uppercase', color: ACCENT, marginBottom: 16 }}>Depoimentos</p>
              <p style={{ fontFamily: 'var(--font-manrope), sans-serif', fontSize: 17, lineHeight: 1.5, color: 'rgba(10,10,10,0.5)', fontWeight: 500 }}>Quem compra, fica.</p>
            </div>
            <h2 style={{ fontFamily: 'var(--font-bebas), sans-serif', fontSize: 'clamp(56px, 7vw, 100px)', fontWeight: 400, lineHeight: 0.95, letterSpacing: '-0.01em', color: '#0a0a0a', margin: 0 }}>+1.200 lojistas confiam.</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {TESTIMONIALS.map(({ quote, name, store }, i) => (
              <motion.article key={i} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.12 }}
                style={{ border: '1px solid rgba(10,10,10,0.1)', borderRadius: 4, padding: '32px 28px', background: '#fff', display: 'flex', flexDirection: 'column' }}>
                <div style={{ fontFamily: 'var(--font-bebas), sans-serif', fontSize: 64, lineHeight: 0.6, color: ACCENT, marginBottom: 8, opacity: 0.4 }}>&ldquo;</div>
                <p style={{ fontFamily: 'var(--font-manrope), sans-serif', fontSize: 16, lineHeight: 1.6, color: '#0a0a0a', margin: '0 0 28px', flex: 1 }}>{quote}</p>
                <div style={{ borderTop: '1px solid rgba(10,10,10,0.1)', paddingTop: 18 }}>
                  <div style={{ fontFamily: 'var(--font-manrope), sans-serif', fontSize: 14, fontWeight: 700, color: '#0a0a0a' }}>{name}</div>
                  <div style={{ fontFamily: 'var(--font-manrope), sans-serif', fontSize: 12, color: 'rgba(10,10,10,0.45)', marginTop: 4, letterSpacing: '0.03em' }}>{store}</div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────────────── */}
      <section style={{ padding: '120px 0', background: '#f5efe6' }}>
        <div className="px-6 sm:px-12 max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-start">
            <div className="lg:sticky lg:top-24">
              <p style={{ fontFamily: 'var(--font-manrope), sans-serif', fontSize: 11, letterSpacing: '0.22em', textTransform: 'uppercase', color: ACCENT, marginBottom: 16 }}>Dúvidas</p>
              <h2 style={{ fontFamily: 'var(--font-bebas), sans-serif', fontSize: 'clamp(52px, 6vw, 80px)', fontWeight: 400, lineHeight: 0.98, letterSpacing: '-0.01em', color: '#0a0a0a', margin: '0 0 16px' }}>Antes de você perguntar.</h2>
              <p style={{ fontFamily: 'var(--font-manrope), sans-serif', fontSize: 15, lineHeight: 1.65, color: 'rgba(10,10,10,0.55)', margin: 0 }}>
                O que mais nos perguntam, respondido direto. Se ficou alguma dúvida, o consultor responde no WhatsApp.
              </p>
            </div>
            <div>{FAQS.map(([q, a], i) => <FAQItem key={i} q={q} a={a} />)}</div>
          </div>
        </div>
      </section>

      {/* ── FORM / CTA ───────────────────────────────────────────────────── */}
      <section id="capturar" style={{ padding: '120px 0', background: '#0a0a0a', color: '#f5efe6', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', bottom: '-20%', left: '-10%', width: '50vw', height: '50vw', background: `radial-gradient(circle, ${ACCENT}20 0%, transparent 65%)`, pointerEvents: 'none' }} />
        <div className="px-6 sm:px-12 max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left */}
            <div>
              <h2 style={{ fontFamily: 'var(--font-bebas), sans-serif', fontSize: 'clamp(72px, 10vw, 130px)', fontWeight: 400, lineHeight: 0.9, letterSpacing: '-0.02em', color: '#f5efe6', margin: '0 0 28px' }}>
                Receba o catálogo.
              </h2>
              <p style={{ fontFamily: 'var(--font-manrope), sans-serif', fontSize: 17, lineHeight: 1.6, color: 'rgba(245,239,230,0.6)', margin: '0 0 36px', maxWidth: 440 }}>
                Em até 30 minutos, um consultor te chama no WhatsApp com a tabela completa e as fotos da coleção semanal.
              </p>
              <div className="flex flex-col gap-4 mb-8">
                {[{ Icon: MapPin, text: 'Rua José Avelino, 256 · Centro · Fortaleza/CE' }, { Icon: Truck, text: 'Envios diários para todo o Brasil' }].map(({ Icon, text }, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'rgba(245,239,230,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <Icon size={18} color="#6b8cda" />
                    </div>
                    <p style={{ fontFamily: 'var(--font-manrope), sans-serif', fontSize: 15, color: 'rgba(245,239,230,0.65)', margin: 0 }}>{text}</p>
                  </div>
                ))}
              </div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 12, padding: '12px 18px', border: '1px solid rgba(245,239,230,0.12)', borderRadius: 999, fontFamily: 'var(--font-manrope), sans-serif', fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(245,239,230,0.5)' }}>
                <span style={{ display: 'inline-block', width: 7, height: 7, borderRadius: '50%', background: '#1f8a5b', flexShrink: 0 }} />
                Equipe online · resposta em até 30 min
              </div>
            </div>

            {/* Right: form */}
            <div style={{ background: '#f5efe6', borderRadius: 6, padding: '40px', boxShadow: '0 24px 80px rgba(0,0,0,0.3)' }}>
              <p style={{ fontFamily: 'var(--font-manrope), sans-serif', fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: ACCENT, marginBottom: 4 }}>Formulário de atacado</p>
              <h3 style={{ fontFamily: 'var(--font-bebas), sans-serif', fontSize: 36, fontWeight: 400, letterSpacing: '0.01em', color: '#0a0a0a', margin: '8px 0 24px' }}>Receba o catálogo em 60 segundos.</h3>
              <Suspense fallback={<div style={{ padding: 40, textAlign: 'center', color: 'rgba(10,10,10,0.4)' }}>Carregando...</div>}>
                <KyrefhV2Form />
              </Suspense>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────────────────────────────── */}
      <footer style={{ padding: '64px 0 40px', background: '#050505', color: '#f5efe6' }}>
        <div className="px-6 sm:px-12 max-w-7xl mx-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-14">
            <div>
              <div style={{ fontFamily: 'var(--font-bebas), sans-serif', fontSize: 32, letterSpacing: '0.1em', color: '#f5efe6', marginBottom: 14 }}>KYREFH</div>
              <p style={{ fontFamily: 'var(--font-manrope), sans-serif', fontSize: 13, lineHeight: 1.65, color: 'rgba(245,239,230,0.4)', margin: 0 }}>Atacado de jeans masculino direto da fábrica em Fortaleza/CE desde 2018. Exclusivo para lojistas e revendedores.</p>
            </div>
            {[
              { label: 'Visite', content: 'Rua José Avelino, 256\nCentro · Fortaleza/CE\nCEP 60060-360' },
              { label: 'Siga', content: '@kyrefh · Instagram\n29K seguidores' },
              { label: 'Atendimento', content: 'Seg–Sex 8h–18h\nSáb 8h–12h\nWhatsApp comercial' },
            ].map(({ label, content }) => (
              <div key={label}>
                <p style={{ fontFamily: 'var(--font-manrope), sans-serif', fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(245,239,230,0.3)', marginBottom: 14 }}>{label}</p>
                <p style={{ fontFamily: 'var(--font-manrope), sans-serif', fontSize: 14, lineHeight: 1.8, color: 'rgba(245,239,230,0.65)', margin: 0, whiteSpace: 'pre-line' }}>{content}</p>
              </div>
            ))}
          </div>
          <div style={{ borderTop: '1px solid rgba(245,239,230,0.08)', paddingTop: 24, display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 }}>
            {['© 2026 Kyrefh — Atacado de jeans masculino', 'Fortaleza · CE · Brasil'].map((t) => (
              <span key={t} style={{ fontFamily: 'var(--font-manrope), sans-serif', fontSize: 12, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(245,239,230,0.25)' }}>{t}</span>
            ))}
          </div>
        </div>
      </footer>

      <Suspense fallback={null}>
        <SocialProofNotification />
      </Suspense>
    </main>
  );
}
