'use client';

import { useState, Suspense } from 'react';
import { motion } from 'framer-motion';
import { Instagram, MapPin, Truck, Phone } from 'lucide-react';
import LeadForm from '@/components/LeadForm';
import WhatsAppButton from '@/components/WhatsAppButton';
import SocialProofNotification from '@/components/SocialProofNotification';
import Script from 'next/script';

const ACCENT = '#1a2747';
const WA_LINK =
  'https://wa.me/5585988839020?text=Ol%C3%A1%2C%20quero%20receber%20o%20cat%C3%A1logo%20e%20as%20condi%C3%A7%C3%B5es%20de%20atacado%20da%20Kyrefh%20Jeans.';

/* ─── Instagram posts ─────────────────────────────────────────────────────── */
// Add @kyrefh post shortcodes here to populate the lookbook grid
const INSTAGRAM_POSTS = [
  'DYGN9NWR8Cy',
  'DXlktfyR5zX',
  'DX7_Sp5xFmK',
  'DYE_xbJRH6i',
  'DX1lsalRqQQ',
  'DXXkUvuRu7h',
];

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
    desc: 'Pix com desconto, cartão em até 6x. Pedido confirmado hoje, despacho no próximo dia útil.',
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
  ['Quais formas de pagamento?', 'Pix com desconto, cartão em até 6x e faturado a 30 dias pra lojistas com histórico conosco.'],
  ['E se vier peça com defeito?', 'Garantia total. Defeito de fabricação a gente troca ou estorna, sem questionamento.'],
];

/* ─── Sub-components ──────────────────────────────────────────────────────── */

function InstagramEmbed({ postId, featured = false }: { postId: string; featured?: boolean }) {
  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        paddingBottom: featured ? '125%' : '100%',
        background: '#0a0a0a',
        overflow: 'hidden',
      }}
    >
      <iframe
        src={`https://www.instagram.com/p/${postId}/embed/captioned`}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          border: 'none',
          background: '#0a0a0a',
        }}
        scrolling="no"
        allowTransparency
        allow="encrypted-media"
        title={`Kyrefh Instagram post ${postId}`}
      />
    </div>
  );
}

function Marquee() {
  const items = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS, ...MARQUEE_ITEMS];
  return (
    <section
      style={{ background: ACCENT, overflow: 'hidden', borderTop: '1px solid rgba(255,255,255,0.08)', borderBottom: '1px solid rgba(255,255,255,0.08)' }}
      className="py-5"
    >
      <style>{`@keyframes kfh-marquee{0%{transform:translateX(0)}100%{transform:translateX(-33.333%)}}`}</style>
      <div
        style={{
          display: 'flex',
          whiteSpace: 'nowrap',
          gap: 48,
          animation: 'kfh-marquee 30s linear infinite',
          width: 'max-content',
        }}
      >
        {items.map((t, i) => (
          <span
            key={i}
            style={{
              fontFamily: 'var(--font-bebas), sans-serif',
              fontSize: 15,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: t === '★' ? 'rgba(255,255,255,0.35)' : '#fff',
            }}
          >
            {t}
          </span>
        ))}
      </div>
    </section>
  );
}

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderBottom: '1px solid rgba(10,10,10,0.12)' }}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex justify-between items-center py-7 text-left gap-6 hover:opacity-75 transition-opacity"
        style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}
      >
        <span
          style={{
            fontFamily: 'var(--font-manrope), sans-serif',
            fontSize: 17,
            fontWeight: 600,
            color: '#0a0a0a',
            lineHeight: 1.3,
          }}
        >
          {q}
        </span>
        <span
          style={{
            fontFamily: 'var(--font-bebas), sans-serif',
            fontSize: 28,
            color: ACCENT,
            transition: 'transform .25s',
            transform: open ? 'rotate(45deg)' : 'rotate(0)',
            flexShrink: 0,
            lineHeight: 1,
          }}
        >
          +
        </span>
      </button>
      {open && (
        <div
          style={{
            fontFamily: 'var(--font-manrope), sans-serif',
            fontSize: 15,
            lineHeight: 1.65,
            color: 'rgba(10,10,10,0.65)',
            paddingBottom: 28,
          }}
        >
          {a}
        </div>
      )}
    </div>
  );
}

/* ─── Page ────────────────────────────────────────────────────────────────── */

export default function KyrefhV2Page() {
  return (
    <main
      style={{ fontFamily: 'var(--font-manrope), sans-serif', color: '#0a0a0a' }}
      className="min-h-screen"
    >
      <Script id="fb-pixel-kyrefh-v2" strategy="afterInteractive">
        {`
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
        `}
      </Script>

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section
        style={{
          position: 'relative',
          minHeight: '100vh',
          background: '#050505',
          color: '#f5efe6',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Grain overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage:
              'repeating-radial-gradient(circle at 30% 40%,rgba(255,255,255,0.015) 0 1px,transparent 1px 3px),' +
              'repeating-linear-gradient(45deg,rgba(0,0,0,0.06) 0 1px,transparent 1px 2px)',
            mixBlendMode: 'overlay',
            pointerEvents: 'none',
            zIndex: 1,
          }}
        />

        {/* Glow blob */}
        <div
          style={{
            position: 'absolute',
            top: '-10%',
            right: '-5%',
            width: '40vw',
            height: '40vw',
            background: `radial-gradient(circle, ${ACCENT}30 0%, transparent 70%)`,
            pointerEvents: 'none',
            zIndex: 1,
          }}
        />

        {/* Top bar */}
        <div
          style={{ position: 'relative', zIndex: 2, padding: '28px 48px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
          className="px-6 sm:px-12"
        >
          <span
            style={{
              fontFamily: 'var(--font-bebas), sans-serif',
              fontSize: 26,
              letterSpacing: '0.12em',
              color: '#f5efe6',
            }}
          >
            KYREFH
          </span>
          <span
            style={{
              fontFamily: 'var(--font-manrope), sans-serif',
              fontSize: 11,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'rgba(245,239,230,0.5)',
            }}
          >
            Coleção 2025 · Atacado
          </span>
        </div>

        {/* Hero body */}
        <div
          style={{ position: 'relative', zIndex: 2, flex: 1, display: 'flex', alignItems: 'center' }}
          className="px-6 sm:px-12 pb-16 pt-4"
        >
          <div className="w-full grid lg:grid-cols-2 gap-16 items-center max-w-7xl mx-auto">
            {/* Left: copy */}
            <motion.div
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <p
                style={{
                  fontFamily: 'var(--font-manrope), sans-serif',
                  fontSize: 11,
                  letterSpacing: '0.22em',
                  textTransform: 'uppercase',
                  color: 'rgba(245,239,230,0.55)',
                  marginBottom: 28,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                }}
              >
                <span style={{ display: 'inline-block', width: 32, height: 1, background: 'currentColor' }} />
                Capa · Atacado direto da fábrica
              </p>

              <h1
                style={{
                  fontFamily: 'var(--font-bebas), sans-serif',
                  fontSize: 'clamp(80px, 12vw, 160px)',
                  fontWeight: 400,
                  lineHeight: 0.88,
                  letterSpacing: '-0.01em',
                  color: '#f5efe6',
                  margin: '0 0 32px',
                  textShadow: '0 2px 40px rgba(0,0,0,0.5)',
                }}
              >
                Atacado<br />
                <span style={{ color: ACCENT }}>direto</span><br />
                da fábrica.
              </h1>

              <p
                style={{
                  fontFamily: 'var(--font-manrope), sans-serif',
                  fontSize: 17,
                  lineHeight: 1.6,
                  color: 'rgba(245,239,230,0.75)',
                  margin: '0 0 40px',
                  maxWidth: 460,
                }}
              >
                Uma fábrica em Fortaleza vestindo +1.200 lojistas em 26 estados.
                Jeans, sarja e blusas masculinas a partir de R$ 50, com novidade toda semana.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href={WA_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 10,
                    padding: '15px 28px',
                    background: '#f5efe6',
                    color: '#0a0a0a',
                    fontFamily: 'var(--font-manrope), sans-serif',
                    fontSize: 13,
                    fontWeight: 700,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    textDecoration: 'none',
                    borderRadius: 4,
                    transition: 'transform .15s, opacity .15s',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.88')}
                  onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
                >
                  <Phone size={15} />
                  Falar com a Thalya
                </a>
                <a
                  href="#capturar"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 10,
                    padding: '15px 28px',
                    background: 'transparent',
                    color: '#f5efe6',
                    border: '1px solid rgba(245,239,230,0.25)',
                    fontFamily: 'var(--font-manrope), sans-serif',
                    fontSize: 13,
                    fontWeight: 700,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    textDecoration: 'none',
                    borderRadius: 4,
                    transition: 'border-color .15s',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'rgba(245,239,230,0.6)')}
                  onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'rgba(245,239,230,0.25)')}
                >
                  Receber tabela ↓
                </a>
              </div>
            </motion.div>

            {/* Right: Instagram featured post */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9, delay: 0.2 }}
              className="flex justify-center"
            >
              <div
                style={{
                  width: '100%',
                  maxWidth: 340,
                  borderRadius: 4,
                  overflow: 'hidden',
                  border: '1px solid rgba(245,239,230,0.1)',
                  boxShadow: '0 32px 80px rgba(0,0,0,0.6)',
                }}
              >
                <InstagramEmbed postId={INSTAGRAM_POSTS[0]} featured />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── MARQUEE ──────────────────────────────────────────────────────── */}
      <Marquee />

      {/* ── NÚMEROS ─────────────────────────────────────────────────────── */}
      <section style={{ padding: '120px 0', background: '#0a0a0a', color: '#f5efe6' }}>
        <div className="px-6 sm:px-12 max-w-7xl mx-auto">
          <p
            style={{
              fontFamily: 'var(--font-manrope), sans-serif',
              fontSize: 11,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: 'rgba(245,239,230,0.4)',
              marginBottom: 56,
            }}
          >
            Em números
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2">
            {NUMBERS.map(({ value, label }, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                style={{
                  padding: '56px 0',
                  borderTop: '1px solid rgba(245,239,230,0.1)',
                  borderBottom: i >= 2 ? '1px solid rgba(245,239,230,0.1)' : 'none',
                  borderRight: i % 2 === 0 ? '1px solid rgba(245,239,230,0.1)' : 'none',
                  paddingRight: i % 2 === 0 ? 48 : 0,
                  paddingLeft: i % 2 === 1 ? 48 : 0,
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: 24,
                  alignItems: 'baseline',
                }}
              >
                <div
                  style={{
                    fontFamily: 'var(--font-bebas), sans-serif',
                    fontSize: 'clamp(72px, 10vw, 120px)',
                    fontWeight: 400,
                    letterSpacing: '-0.02em',
                    lineHeight: 0.9,
                    color: '#f5efe6',
                  }}
                >
                  {value}
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-manrope), sans-serif',
                    fontSize: 15,
                    lineHeight: 1.55,
                    color: 'rgba(245,239,230,0.55)',
                  }}
                >
                  {label}
                </div>
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
              <p
                style={{
                  fontFamily: 'var(--font-manrope), sans-serif',
                  fontSize: 11,
                  letterSpacing: '0.22em',
                  textTransform: 'uppercase',
                  color: ACCENT,
                  marginBottom: 16,
                }}
              >
                Manifesto
              </p>
              <p
                style={{
                  fontFamily: 'var(--font-manrope), sans-serif',
                  fontSize: 18,
                  lineHeight: 1.5,
                  color: 'rgba(10,10,10,0.5)',
                  fontWeight: 500,
                }}
              >
                Da fábrica à sua vitrine,<br />sem atravessador.
              </p>
            </div>
            <div>
              <p
                style={{
                  fontFamily: 'var(--font-manrope), sans-serif',
                  fontSize: 'clamp(22px, 3vw, 30px)',
                  lineHeight: 1.4,
                  fontWeight: 600,
                  color: '#0a0a0a',
                  margin: '0 0 28px',
                }}
              >
                A gente acredita que{' '}
                <em style={{ fontStyle: 'italic', color: ACCENT }}>vender bem</em> começa antes
                da venda. Começa no tecido escolhido, no corte preciso, na costura que aguenta
                a lavagem, no preço justo que deixa margem pro lojista respirar.
              </p>
              <p
                style={{
                  fontFamily: 'var(--font-manrope), sans-serif',
                  fontSize: 17,
                  lineHeight: 1.7,
                  color: 'rgba(10,10,10,0.65)',
                  margin: '0 0 20px',
                }}
              >
                Desde Fortaleza, fabricamos jeans, sarja e blusas masculinas pra lojistas que
                querem girar estoque rápido sem abrir mão da qualidade. Pronta entrega, pedido
                mínimo baixo, novidade toda semana.
              </p>
              <p
                style={{
                  fontFamily: 'var(--font-manrope), sans-serif',
                  fontSize: 17,
                  lineHeight: 1.7,
                  color: 'rgba(10,10,10,0.65)',
                  margin: 0,
                }}
              >
                Hoje somos a casa de{' '}
                <strong style={{ color: '#0a0a0a' }}>+1.200 lojistas em 26 estados</strong>.
                E queremos ser a sua também.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── INSTAGRAM LOOKBOOK ───────────────────────────────────────────── */}
      <section style={{ padding: '120px 0', background: '#fff' }}>
        <div className="px-6 sm:px-12 max-w-7xl mx-auto">
          {/* Section header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
            <div>
              <p
                style={{
                  fontFamily: 'var(--font-manrope), sans-serif',
                  fontSize: 11,
                  letterSpacing: '0.22em',
                  textTransform: 'uppercase',
                  color: ACCENT,
                  marginBottom: 12,
                }}
              >
                Lookbook
              </p>
              <h2
                style={{
                  fontFamily: 'var(--font-bebas), sans-serif',
                  fontSize: 'clamp(56px, 8vw, 100px)',
                  fontWeight: 400,
                  lineHeight: 0.92,
                  letterSpacing: '-0.01em',
                  color: '#0a0a0a',
                  margin: 0,
                }}
              >
                O que veste<br />o nosso lojista.
              </h2>
            </div>
            <a
              href="https://www.instagram.com/kyrefh"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                padding: '12px 20px',
                border: `1px solid ${ACCENT}`,
                borderRadius: 4,
                fontFamily: 'var(--font-manrope), sans-serif',
                fontSize: 13,
                fontWeight: 700,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: ACCENT,
                textDecoration: 'none',
                whiteSpace: 'nowrap',
                transition: 'background .15s, color .15s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = ACCENT;
                e.currentTarget.style.color = '#fff';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.color = ACCENT;
              }}
            >
              <Instagram size={14} />
              @kyrefh
            </a>
          </div>

          {/* Magazine asymmetric grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(12, 1fr)',
              gap: 12,
            }}
          >
            {/* Featured large — post 0 */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              style={{ gridColumn: 'span 7' }}
              className="col-span-12 md:col-span-7"
            >
              <div style={{ border: '1px solid rgba(10,10,10,0.08)', overflow: 'hidden', borderRadius: 4 }}>
                <InstagramEmbed postId={INSTAGRAM_POSTS[0]} featured />
              </div>
            </motion.div>

            {/* Side column — posts 1 & 2 */}
            <div style={{ gridColumn: 'span 5', display: 'flex', flexDirection: 'column', gap: 12 }} className="col-span-12 md:col-span-5">
              {[INSTAGRAM_POSTS[1], INSTAGRAM_POSTS[2]].map((id, i) => (
                <motion.div
                  key={id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: (i + 1) * 0.1 }}
                  style={{ border: '1px solid rgba(10,10,10,0.08)', overflow: 'hidden', borderRadius: 4, flex: 1 }}
                >
                  <InstagramEmbed postId={id} />
                </motion.div>
              ))}
            </div>

            {/* Bottom row — posts 3, 4, 5 */}
            {[INSTAGRAM_POSTS[3], INSTAGRAM_POSTS[4], INSTAGRAM_POSTS[5]].map((id, i) => (
              <motion.div
                key={id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.12 }}
                style={{ gridColumn: 'span 4', border: '1px solid rgba(10,10,10,0.08)', overflow: 'hidden', borderRadius: 4 }}
                className="col-span-12 sm:col-span-4"
              >
                <InstagramEmbed postId={id} />
              </motion.div>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="mt-10 text-center">
            <a
              href="https://www.instagram.com/kyrefh"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                fontFamily: 'var(--font-manrope), sans-serif',
                fontSize: 14,
                fontWeight: 600,
                color: 'rgba(10,10,10,0.5)',
                textDecoration: 'none',
                letterSpacing: '0.05em',
              }}
            >
              <Instagram size={16} />
              Ver mais no @kyrefh
            </a>
          </div>
        </div>
      </section>

      {/* ── COMO FUNCIONA ─────────────────────────────────────────────────── */}
      <section style={{ padding: '120px 0', background: '#f5efe6', borderTop: '1px solid rgba(10,10,10,0.06)' }}>
        <div className="px-6 sm:px-12 max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-start mb-16">
            <div className="lg:sticky lg:top-24">
              <p
                style={{
                  fontFamily: 'var(--font-manrope), sans-serif',
                  fontSize: 11,
                  letterSpacing: '0.22em',
                  textTransform: 'uppercase',
                  color: ACCENT,
                  marginBottom: 16,
                }}
              >
                Como funciona
              </p>
              <p
                style={{
                  fontFamily: 'var(--font-manrope), sans-serif',
                  fontSize: 17,
                  lineHeight: 1.5,
                  color: 'rgba(10,10,10,0.5)',
                  fontWeight: 500,
                }}
              >
                Três passos. Zero burocracia.
              </p>
            </div>
            <h2
              style={{
                fontFamily: 'var(--font-bebas), sans-serif',
                fontSize: 'clamp(56px, 7vw, 100px)',
                fontWeight: 400,
                lineHeight: 0.95,
                letterSpacing: '-0.01em',
                color: '#0a0a0a',
                margin: 0,
              }}
            >
              Do toque no botão à{' '}
              <em style={{ fontStyle: 'italic', color: ACCENT }}>caixa pronta</em>.
            </h2>
          </div>

          <div
            className="grid grid-cols-1 md:grid-cols-3"
            style={{ borderTop: '1px solid rgba(10,10,10,0.12)' }}
          >
            {STEPS.map(({ num, title, desc }, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.12 }}
                style={{
                  padding: '40px 32px 40px 0',
                  borderRight: i < 2 ? '1px solid rgba(10,10,10,0.12)' : 'none',
                  paddingLeft: i > 0 ? 32 : 0,
                }}
              >
                <div
                  style={{
                    fontFamily: 'var(--font-bebas), sans-serif',
                    fontSize: 96,
                    fontWeight: 400,
                    letterSpacing: '-0.02em',
                    lineHeight: 0.9,
                    color: ACCENT,
                    marginBottom: 20,
                  }}
                >
                  {num}
                </div>
                <h3
                  style={{
                    fontFamily: 'var(--font-manrope), sans-serif',
                    fontSize: 20,
                    fontWeight: 700,
                    margin: '0 0 12px',
                    color: '#0a0a0a',
                    lineHeight: 1.2,
                  }}
                >
                  {title}
                </h3>
                <p
                  style={{
                    fontFamily: 'var(--font-manrope), sans-serif',
                    fontSize: 15,
                    lineHeight: 1.6,
                    color: 'rgba(10,10,10,0.6)',
                    margin: 0,
                  }}
                >
                  {desc}
                </p>
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
              <p
                style={{
                  fontFamily: 'var(--font-manrope), sans-serif',
                  fontSize: 11,
                  letterSpacing: '0.22em',
                  textTransform: 'uppercase',
                  color: ACCENT,
                  marginBottom: 16,
                }}
              >
                Depoimentos
              </p>
              <p
                style={{
                  fontFamily: 'var(--font-manrope), sans-serif',
                  fontSize: 17,
                  lineHeight: 1.5,
                  color: 'rgba(10,10,10,0.5)',
                  fontWeight: 500,
                }}
              >
                Quem compra, fica.
              </p>
            </div>
            <h2
              style={{
                fontFamily: 'var(--font-bebas), sans-serif',
                fontSize: 'clamp(56px, 7vw, 100px)',
                fontWeight: 400,
                lineHeight: 0.95,
                letterSpacing: '-0.01em',
                color: '#0a0a0a',
                margin: 0,
              }}
            >
              +1.200 lojistas confiam.
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {TESTIMONIALS.map(({ quote, name, store }, i) => (
              <motion.article
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.12 }}
                style={{
                  border: '1px solid rgba(10,10,10,0.1)',
                  borderRadius: 4,
                  padding: '32px 28px',
                  background: '#fff',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <div
                  style={{
                    fontFamily: 'var(--font-bebas), sans-serif',
                    fontSize: 64,
                    lineHeight: 0.6,
                    color: ACCENT,
                    marginBottom: 8,
                    opacity: 0.4,
                  }}
                >
                  &ldquo;
                </div>
                <p
                  style={{
                    fontFamily: 'var(--font-manrope), sans-serif',
                    fontSize: 16,
                    lineHeight: 1.6,
                    color: '#0a0a0a',
                    margin: '0 0 28px',
                    flex: 1,
                  }}
                >
                  {quote}
                </p>
                <div style={{ borderTop: '1px solid rgba(10,10,10,0.1)', paddingTop: 18 }}>
                  <div
                    style={{
                      fontFamily: 'var(--font-manrope), sans-serif',
                      fontSize: 14,
                      fontWeight: 700,
                      color: '#0a0a0a',
                    }}
                  >
                    {name}
                  </div>
                  <div
                    style={{
                      fontFamily: 'var(--font-manrope), sans-serif',
                      fontSize: 12,
                      color: 'rgba(10,10,10,0.45)',
                      marginTop: 4,
                      letterSpacing: '0.03em',
                    }}
                  >
                    {store}
                  </div>
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
              <p
                style={{
                  fontFamily: 'var(--font-manrope), sans-serif',
                  fontSize: 11,
                  letterSpacing: '0.22em',
                  textTransform: 'uppercase',
                  color: ACCENT,
                  marginBottom: 16,
                }}
              >
                Dúvidas
              </p>
              <h2
                style={{
                  fontFamily: 'var(--font-bebas), sans-serif',
                  fontSize: 'clamp(52px, 6vw, 80px)',
                  fontWeight: 400,
                  lineHeight: 0.98,
                  letterSpacing: '-0.01em',
                  color: '#0a0a0a',
                  margin: '0 0 16px',
                }}
              >
                Antes de você perguntar.
              </h2>
              <p
                style={{
                  fontFamily: 'var(--font-manrope), sans-serif',
                  fontSize: 15,
                  lineHeight: 1.65,
                  color: 'rgba(10,10,10,0.55)',
                  margin: 0,
                }}
              >
                O que mais nos perguntam, respondido direto. Se ficou alguma dúvida,
                o consultor responde no WhatsApp.
              </p>
            </div>
            <div>
              {FAQS.map(([q, a], i) => (
                <FAQItem key={i} q={q} a={a} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FORM / CTA ───────────────────────────────────────────────────── */}
      <section id="capturar" style={{ padding: '120px 0', background: '#0a0a0a', color: '#f5efe6', position: 'relative', overflow: 'hidden' }}>
        {/* Glow */}
        <div
          style={{
            position: 'absolute',
            bottom: '-20%',
            left: '-10%',
            width: '50vw',
            height: '50vw',
            background: `radial-gradient(circle, ${ACCENT}25 0%, transparent 65%)`,
            pointerEvents: 'none',
          }}
        />

        <div className="px-6 sm:px-12 max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left */}
            <div>
              <p
                style={{
                  fontFamily: 'var(--font-manrope), sans-serif',
                  fontSize: 11,
                  letterSpacing: '0.22em',
                  textTransform: 'uppercase',
                  color: 'rgba(245,239,230,0.45)',
                  marginBottom: 24,
                }}
              >
                Próxima edição
              </p>
              <h2
                style={{
                  fontFamily: 'var(--font-bebas), sans-serif',
                  fontSize: 'clamp(72px, 10vw, 130px)',
                  fontWeight: 400,
                  lineHeight: 0.9,
                  letterSpacing: '-0.02em',
                  color: '#f5efe6',
                  margin: '0 0 28px',
                }}
              >
                Receba a{' '}
                <em style={{ fontStyle: 'italic', color: ACCENT }}>tabela</em>.
              </h2>
              <p
                style={{
                  fontFamily: 'var(--font-manrope), sans-serif',
                  fontSize: 17,
                  lineHeight: 1.6,
                  color: 'rgba(245,239,230,0.6)',
                  margin: '0 0 36px',
                  maxWidth: 440,
                }}
              >
                Em até 30 minutos, um consultor te chama no WhatsApp com a tabela
                completa e as fotos da coleção semanal.
              </p>

              <div className="flex flex-col gap-4 mb-8">
                <div className="flex items-center gap-4">
                  <div
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: '50%',
                      background: 'rgba(245,239,230,0.06)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      color: ACCENT === '#1a2747' ? '#6b8cda' : '#f5efe6',
                    }}
                  >
                    <MapPin size={18} />
                  </div>
                  <p style={{ fontFamily: 'var(--font-manrope), sans-serif', fontSize: 15, color: 'rgba(245,239,230,0.7)', margin: 0 }}>
                    Rua José Avelino, 256 · Centro · Fortaleza/CE
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <div
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: '50%',
                      background: 'rgba(245,239,230,0.06)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      color: ACCENT === '#1a2747' ? '#6b8cda' : '#f5efe6',
                    }}
                  >
                    <Truck size={18} />
                  </div>
                  <p style={{ fontFamily: 'var(--font-manrope), sans-serif', fontSize: 15, color: 'rgba(245,239,230,0.7)', margin: 0 }}>
                    Envios diários para todo o Brasil
                  </p>
                </div>
              </div>

              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 12,
                  padding: '12px 18px',
                  border: '1px solid rgba(245,239,230,0.12)',
                  borderRadius: 999,
                  fontFamily: 'var(--font-manrope), sans-serif',
                  fontSize: 12,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: 'rgba(245,239,230,0.55)',
                }}
              >
                <span
                  style={{
                    display: 'inline-block',
                    width: 7,
                    height: 7,
                    borderRadius: '50%',
                    background: '#1f8a5b',
                    flexShrink: 0,
                  }}
                />
                Equipe online · resposta em até 30 min
              </div>
            </div>

            {/* Right: form */}
            <div
              style={{
                background: '#fff',
                borderRadius: 6,
                padding: '40px',
                boxShadow: '0 24px 80px rgba(0,0,0,0.3)',
                border: '1px solid rgba(245,239,230,0.06)',
              }}
            >
              <p
                style={{
                  fontFamily: 'var(--font-manrope), sans-serif',
                  fontSize: 11,
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  color: ACCENT,
                  marginBottom: 4,
                }}
              >
                Formulário de atacado
              </p>
              <h3
                style={{
                  fontFamily: 'var(--font-bebas), sans-serif',
                  fontSize: 36,
                  fontWeight: 400,
                  letterSpacing: '0.01em',
                  color: '#0a0a0a',
                  margin: '8px 0 24px',
                }}
              >
                Seu acesso em 60s.
              </h3>
              <Suspense
                fallback={
                  <div className="p-10 text-center animate-pulse bg-zinc-100 rounded-xl text-zinc-400">
                    Carregando...
                  </div>
                }
              >
                <LeadForm clientSlug="kyrefh" />
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
              <div
                style={{
                  fontFamily: 'var(--font-bebas), sans-serif',
                  fontSize: 32,
                  letterSpacing: '0.1em',
                  color: '#f5efe6',
                  marginBottom: 14,
                }}
              >
                KYREFH
              </div>
              <p
                style={{
                  fontFamily: 'var(--font-manrope), sans-serif',
                  fontSize: 13,
                  lineHeight: 1.65,
                  color: 'rgba(245,239,230,0.45)',
                  margin: 0,
                }}
              >
                Atacado de jeans masculino direto da fábrica em Fortaleza/CE desde 2018.
                Exclusivo para lojistas e revendedores.
              </p>
            </div>
            <div>
              <p
                style={{
                  fontFamily: 'var(--font-manrope), sans-serif',
                  fontSize: 10,
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: 'rgba(245,239,230,0.35)',
                  marginBottom: 14,
                }}
              >
                Visite
              </p>
              <p
                style={{
                  fontFamily: 'var(--font-manrope), sans-serif',
                  fontSize: 14,
                  lineHeight: 1.8,
                  color: 'rgba(245,239,230,0.75)',
                  margin: 0,
                }}
              >
                Rua José Avelino, 256<br />
                Centro · Fortaleza/CE<br />
                CEP 60060-360
              </p>
            </div>
            <div>
              <p
                style={{
                  fontFamily: 'var(--font-manrope), sans-serif',
                  fontSize: 10,
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: 'rgba(245,239,230,0.35)',
                  marginBottom: 14,
                }}
              >
                Siga
              </p>
              <a
                href="https://www.instagram.com/kyrefh"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  fontFamily: 'var(--font-manrope), sans-serif',
                  fontSize: 14,
                  color: 'rgba(245,239,230,0.75)',
                  textDecoration: 'none',
                }}
              >
                <Instagram size={14} />
                @kyrefh · 29K seguidores
              </a>
            </div>
            <div>
              <p
                style={{
                  fontFamily: 'var(--font-manrope), sans-serif',
                  fontSize: 10,
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: 'rgba(245,239,230,0.35)',
                  marginBottom: 14,
                }}
              >
                Atendimento
              </p>
              <p
                style={{
                  fontFamily: 'var(--font-manrope), sans-serif',
                  fontSize: 14,
                  lineHeight: 1.8,
                  color: 'rgba(245,239,230,0.75)',
                  margin: 0,
                }}
              >
                Seg–Sex 8h–18h<br />
                Sáb 8h–12h<br />
                WhatsApp comercial
              </p>
            </div>
          </div>

          <div
            style={{
              borderTop: '1px solid rgba(245,239,230,0.08)',
              paddingTop: 24,
              display: 'flex',
              flexDirection: 'column',
              gap: 8,
            }}
            className="sm:flex-row sm:justify-between sm:items-center"
          >
            <span
              style={{
                fontFamily: 'var(--font-manrope), sans-serif',
                fontSize: 12,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'rgba(245,239,230,0.3)',
              }}
            >
              © 2025 Kyrefh — Atacado de jeans masculino
            </span>
            <span
              style={{
                fontFamily: 'var(--font-manrope), sans-serif',
                fontSize: 12,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'rgba(245,239,230,0.3)',
              }}
            >
              Fortaleza · CE · Brasil
            </span>
          </div>
        </div>
      </footer>

      <Suspense fallback={null}>
        <WhatsAppButton
          phoneNumber="5585988839020"
          message="Olá, quero receber o catálogo e as condições de atacado da Kyrefh Jeans."
        />
      </Suspense>

      <Suspense fallback={null}>
        <SocialProofNotification />
      </Suspense>
    </main>
  );
}
