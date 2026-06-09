'use client';

import { useState, useEffect } from 'react';

const CSS = `
  .paneo-wrap *, .paneo-wrap *::before, .paneo-wrap *::after { box-sizing: border-box; margin: 0; padding: 0; }
  .paneo-wrap {
    font-family: 'Jost', sans-serif; background: #F5F0EA; color: #2C2118;
    font-weight: 300; -webkit-font-smoothing: antialiased;
  }
  .p-nav {
    position: fixed; top: 0; left: 0; right: 0; z-index: 100;
    display: flex; align-items: center; justify-content: space-between;
    padding: 0 4rem; height: 64px; background: rgba(245,240,234,0.96);
    backdrop-filter: blur(10px); border-bottom: 1px solid #D4C8BC; transition: box-shadow 0.3s;
  }
  .p-nav.scrolled { box-shadow: 0 2px 20px rgba(0,0,0,0.06); }
  .p-nav-logo { font-family: 'Cormorant Garamond', serif; font-size: 1.2rem; font-weight: 500; letter-spacing: 0.2em; text-decoration: none; color: #1C1410; }
  .p-nav-links { display: flex; gap: 3rem; list-style: none; }
  .p-nav-links a { font-size: 0.6rem; font-weight: 400; letter-spacing: 0.22em; text-transform: uppercase; text-decoration: none; color: #2C2118; transition: color 0.2s; }
  .p-nav-links a:hover { color: #7D3018; }
  .p-nav-cta { font-size: 0.6rem; font-weight: 500; letter-spacing: 0.2em; text-transform: uppercase; text-decoration: none; color: #1C1410; border: 1px solid #1C1410; padding: 0.55rem 1.4rem; transition: all 0.2s; }
  .p-nav-cta:hover { background: #1C1410; color: #F5F0EA; }
  .p-hero { height: 100vh; position: relative; overflow: hidden; display: flex; align-items: flex-end; padding: 5rem 4rem; }
  .p-hero-bg { position: absolute; inset: 0; background-image: url('https://dcdn-us.mitiendanube.com/stores/006/453/112/products/foto-05-06-2026-09-52-55-40-f6da68d9f61586dfb117810183712604-1024-1024.webp'); background-size: cover; background-position: center 15%; }
  .p-hero-overlay { position: absolute; inset: 0; background: linear-gradient(to top, rgba(18,10,6,0.82) 0%, rgba(18,10,6,0.15) 55%, transparent 100%); }
  .p-hero-content { position: relative; z-index: 2; color: white; max-width: 640px; }
  .p-label { font-size: 0.58rem; font-weight: 400; letter-spacing: 0.32em; text-transform: uppercase; opacity: 0.75; margin-bottom: 1rem; display: block; }
  .p-hero-title { font-family: 'Cormorant Garamond', serif; font-size: clamp(4.5rem,9vw,7.5rem); font-weight: 300; line-height: 0.95; margin-bottom: 1.75rem; }
  .p-hero-title em { font-style: italic; font-weight: 300; }
  .p-hero-desc { font-size: 0.88rem; font-weight: 300; line-height: 1.75; opacity: 0.88; max-width: 460px; margin-bottom: 2.5rem; }
  .p-hero-desc strong { font-weight: 500; }
  .p-hero-btns { display: flex; align-items: center; gap: 2rem; }
  .p-btn-primary { display: inline-block; font-size: 0.6rem; font-weight: 500; letter-spacing: 0.22em; text-transform: uppercase; text-decoration: none; padding: 1rem 2.5rem; background: white; color: #1C1410; border: 1px solid white; cursor: pointer; transition: all 0.22s; }
  .p-btn-primary:hover { background: transparent; color: white; }
  .p-btn-ghost { font-size: 0.6rem; font-weight: 400; letter-spacing: 0.2em; text-transform: uppercase; color: rgba(255,255,255,0.8); text-decoration: none; cursor: pointer; background: none; border: none; }
  .p-product { display: grid; grid-template-columns: 1fr 1fr; min-height: 90vh; }
  .p-gallery { overflow: hidden; }
  .p-gallery-main { width: 100%; height: 65vh; object-fit: cover; display: block; }
  .p-gallery-row { display: grid; grid-template-columns: 1fr 1fr; gap: 2px; }
  .p-gallery-row img { width: 100%; height: 28vh; object-fit: cover; display: block; }
  .p-product-info { padding: 6rem 5.5rem; background: #FDFAF7; display: flex; flex-direction: column; justify-content: center; }
  .p-section-label { font-size: 0.58rem; font-weight: 400; letter-spacing: 0.3em; text-transform: uppercase; color: #7A6B60; margin-bottom: 1.5rem; display: block; }
  .p-product-heading { font-family: 'Cormorant Garamond', serif; font-size: clamp(2.4rem,3.5vw,3.2rem); font-weight: 400; line-height: 1.12; margin-bottom: 1.5rem; }
  .p-product-heading em { font-style: italic; font-weight: 300; }
  .p-product-desc { font-size: 0.84rem; line-height: 1.85; color: #7A6B60; margin-bottom: 2.5rem; max-width: 400px; }
  .p-specs-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem 2.5rem; border-top: 1px solid #D4C8BC; border-bottom: 1px solid #D4C8BC; padding: 2rem 0; margin-bottom: 2.5rem; }
  .p-spec-label { font-size: 0.58rem; font-weight: 400; letter-spacing: 0.2em; text-transform: uppercase; color: #7A6B60; margin-bottom: 0.35rem; }
  .p-spec-val { font-size: 0.84rem; font-weight: 400; }
  .p-price-tag { font-family: 'Cormorant Garamond', serif; font-size: 2.8rem; font-weight: 400; line-height: 1; margin-bottom: 0.5rem; }
  .p-price-meta { font-family: 'Jost', sans-serif; font-size: 0.85rem; font-weight: 300; color: #7A6B60; }
  .p-price-note { font-size: 0.75rem; color: #7A6B60; margin-top: 0.4rem; }
  .p-social { position: relative; padding: 8rem 4rem; overflow: hidden; min-height: 55vh; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; }
  .p-social-bg { position: absolute; inset: 0; background-image: url('https://dcdn-us.mitiendanube.com/stores/006/453/112/products/foto-05-06-2026-09-52-55-32-cdb99dac3bbe43225717810183711736-1024-1024.webp'); background-size: cover; background-position: center; }
  .p-social-overlay { position: absolute; inset: 0; background: rgba(18,10,6,0.8); }
  .p-social-content { position: relative; z-index: 2; color: white; }
  .p-social-heading { font-family: 'Cormorant Garamond', serif; font-size: clamp(2.5rem,5vw,4rem); font-weight: 300; line-height: 1.2; margin-bottom: 4rem; }
  .p-social-heading em { font-style: italic; }
  .p-stats-row { display: flex; gap: 6rem; justify-content: center; }
  .p-stat-num { font-family: 'Cormorant Garamond', serif; font-size: 3.5rem; font-weight: 300; line-height: 1; margin-bottom: 0.5rem; }
  .p-stat-lbl { font-size: 0.58rem; font-weight: 400; letter-spacing: 0.22em; text-transform: uppercase; opacity: 0.55; }
  .p-pricing { padding: 8rem 4rem; text-align: center; background: #F5F0EA; }
  .p-section-heading { font-family: 'Cormorant Garamond', serif; font-size: clamp(2rem,4vw,3.2rem); font-weight: 400; margin-bottom: 3.5rem; }
  .p-pricing-grid { display: grid; grid-template-columns: repeat(4,1fr); border: 1px solid #D4C8BC; max-width: 880px; margin: 0 auto; }
  .p-pricing-card { padding: 2.5rem 1.5rem; background: #FDFAF7; border-right: 1px solid #D4C8BC; transition: background 0.2s,color 0.2s; }
  .p-pricing-card:last-child { border-right: none; }
  .p-pricing-card.active { background: #7D3018; color: white; }
  .p-pricing-range { font-size: 0.58rem; letter-spacing: 0.18em; text-transform: uppercase; opacity: 0.65; margin-bottom: 1rem; }
  .p-pricing-price { font-family: 'Cormorant Garamond', serif; font-size: 2rem; font-weight: 400; margin-bottom: 0.5rem; }
  .p-pricing-disc { font-size: 0.7rem; font-weight: 300; opacity: 0.6; }
  .p-order { padding: 8rem 4rem; background: #EDE6DC; }
  .p-order-hdr { text-align: center; margin-bottom: 4rem; }
  .p-order-card { display: grid; grid-template-columns: 1fr 400px; max-width: 1000px; margin: 0 auto; background: white; border: 1px solid #D4C8BC; }
  .p-order-form { padding: 3rem; }
  .p-order-sec { margin-bottom: 2.5rem; }
  .p-order-lbl { font-size: 0.58rem; font-weight: 500; letter-spacing: 0.22em; text-transform: uppercase; color: #7A6B60; margin-bottom: 1rem; display: flex; align-items: center; gap: 0.6rem; }
  .p-accent { color: #7D3018; }
  .p-color-btns { display: flex; gap: 0.65rem; flex-wrap: wrap; }
  .p-color-btn { display: flex; align-items: center; gap: 0.5rem; padding: 0.5rem 1rem; border: 1px solid #D4C8BC; background: white; cursor: pointer; font-family: 'Jost',sans-serif; font-size: 0.78rem; font-weight: 300; transition: all 0.15s; }
  .p-color-btn.selected { border-color: #1C1410; background: #1C1410; color: white; }
  .p-color-dot { width: 13px; height: 13px; border-radius: 50%; flex-shrink: 0; }
  .p-qty-row { display: flex; align-items: center; gap: 1.5rem; flex-wrap: wrap; }
  .p-qty-counter { display: flex; align-items: center; border: 1px solid #D4C8BC; }
  .p-qty-btn { width: 42px; height: 42px; border: none; background: none; cursor: pointer; font-size: 1.1rem; font-family: 'Jost',sans-serif; color: #2C2118; display: flex; align-items: center; justify-content: center; transition: background 0.15s; }
  .p-qty-btn:hover:not(:disabled) { background: #F5F0EA; }
  .p-qty-btn:disabled { opacity: 0.3; cursor: not-allowed; }
  .p-qty-num { font-family: 'Cormorant Garamond',serif; font-size: 2.2rem; font-weight: 400; width: 64px; text-align: center; line-height: 1; padding: 0 0.25rem; }
  .p-qty-presets { display: flex; gap: 0.5rem; }
  .p-qty-preset { width: 40px; height: 40px; border: 1px solid #D4C8BC; background: white; font-family: 'Jost',sans-serif; font-size: 0.75rem; font-weight: 400; cursor: pointer; transition: all 0.15s; }
  .p-qty-preset.active { background: #1C1410; color: white; border-color: #1C1410; }
  .p-size-grid { display: flex; gap: 1rem; }
  .p-size-item { flex: 1; border: 1px solid #D4C8BC; padding: 1rem 0.75rem; display: flex; flex-direction: column; align-items: center; gap: 0.75rem; }
  .p-size-name { font-size: 0.68rem; font-weight: 500; letter-spacing: 0.12em; color: #7A6B60; }
  .p-size-ctr { display: flex; align-items: center; gap: 0.6rem; }
  .p-size-btn { width: 26px; height: 26px; border: 1px solid #D4C8BC; background: white; cursor: pointer; font-size: 0.95rem; font-family: 'Jost',sans-serif; display: flex; align-items: center; justify-content: center; transition: background 0.12s; }
  .p-size-btn:hover:not(:disabled) { background: #F5F0EA; }
  .p-size-btn:disabled { opacity: 0.3; cursor: not-allowed; }
  .p-size-count { font-family: 'Cormorant Garamond',serif; font-size: 1.6rem; font-weight: 400; width: 28px; text-align: center; line-height: 1; }
  .p-summary { background: #1C1410; color: white; padding: 3rem; display: flex; flex-direction: column; }
  .p-sum-title { font-size: 0.58rem; letter-spacing: 0.3em; text-transform: uppercase; opacity: 0.4; margin-bottom: 2rem; }
  .p-sum-rows { flex: 1; display: flex; flex-direction: column; gap: 0.9rem; }
  .p-sum-row { display: flex; justify-content: space-between; align-items: baseline; gap: 1rem; }
  .p-sum-key { font-size: 0.73rem; font-weight: 300; opacity: 0.55; }
  .p-sum-val { font-size: 0.82rem; font-weight: 400; text-align: right; }
  .p-sum-divider { height: 1px; background: rgba(255,255,255,0.12); margin: 1.5rem 0; }
  .p-sum-total-lbl { font-size: 0.58rem; letter-spacing: 0.22em; text-transform: uppercase; opacity: 0.45; margin-bottom: 0.4rem; }
  .p-sum-total { font-family: 'Cormorant Garamond',serif; font-size: 3rem; font-weight: 400; line-height: 1; margin-bottom: 1.75rem; }
  .p-sum-warn { font-size: 0.7rem; font-weight: 300; opacity: 0.5; line-height: 1.55; margin-bottom: 1.25rem; }
  .p-sum-warn.error { color: #FF9B7A; opacity: 1; }
  .p-btn-checkout { display: block; width: 100%; padding: 1.1rem; background: white; color: #1C1410; border: none; font-family: 'Jost',sans-serif; font-size: 0.6rem; font-weight: 500; letter-spacing: 0.22em; text-transform: uppercase; cursor: pointer; transition: background 0.2s; text-align: center; }
  .p-btn-checkout:hover:not(:disabled) { background: #F5F0EA; }
  .p-btn-checkout:disabled { opacity: 0.35; cursor: not-allowed; }
  .p-payment-note { font-size: 0.52rem; letter-spacing: 0.18em; text-transform: uppercase; opacity: 0.35; text-align: center; margin-top: 1rem; }
  .p-about { padding: 8rem 4rem; text-align: center; background: #F5F0EA; border-top: 1px solid #D4C8BC; }
  .p-about-heading { font-family: 'Cormorant Garamond',serif; font-size: clamp(2.5rem,5vw,4rem); font-weight: 400; margin-bottom: 1.5rem; }
  .p-about-heading em { font-style: italic; }
  .p-about-text { font-size: 0.84rem; line-height: 1.95; color: #7A6B60; max-width: 540px; margin: 0 auto; }
  .p-footer { padding: 1.75rem 4rem; display: flex; align-items: center; justify-content: space-between; border-top: 1px solid #D4C8BC; background: #F5F0EA; }
  .p-footer-logo { font-family: 'Cormorant Garamond',serif; font-size: 1rem; font-weight: 500; letter-spacing: 0.2em; }
  .p-footer-info { font-size: 0.62rem; font-weight: 300; letter-spacing: 0.1em; color: #7A6B60; }
  @media (max-width: 860px) {
    .p-nav { padding: 0 1.5rem; } .p-nav-links { display: none; }
    .p-hero { padding: 4rem 1.5rem; } .p-hero-title { font-size: 4rem; }
    .p-product { grid-template-columns: 1fr; } .p-product-info { padding: 3.5rem 1.5rem; }
    .p-gallery-main { height: 55vw; min-height: 300px; } .p-gallery-row img { height: 30vw; }
    .p-stats-row { gap: 2.5rem; flex-wrap: wrap; justify-content: center; }
    .p-pricing { padding: 5rem 1.5rem; } .p-pricing-grid { grid-template-columns: repeat(2,1fr); }
    .p-pricing-card { border-bottom: 1px solid #D4C8BC; }
    .p-order { padding: 5rem 1.5rem; } .p-order-card { grid-template-columns: 1fr; }
    .p-order-form { padding: 2rem 1.5rem; } .p-summary { padding: 2.5rem 1.5rem; }
    .p-about { padding: 5rem 1.5rem; } .p-social { padding: 5rem 1.5rem; }
    .p-footer { padding: 1.5rem; flex-direction: column; gap: 0.5rem; text-align: center; }
  }
`;

const tiers = [
  { min: 6,  max: 11,   price: 160.00 },
  { min: 12, max: 23,   price: 147.20 },
  { min: 24, max: 47,   price: 136.00 },
  { min: 48, max: 9999, price: 124.80 },
];

function getTier(q: number) { return tiers.find(t => q >= t.min && q <= t.max) || tiers[0]; }
function fmt(n: number) { return 'R$ ' + n.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); }

export default function PaneoBrasilPage() {
  const [qty, setQtyState] = useState(6);
  const [color, setColor] = useState('Coffee');
  const [sizes, setSizes] = useState({ P: 0, M: 0, G: 0 });
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const tier = getTier(qty);
  const total = qty * tier.price;
  const sizeSum = sizes.P + sizes.M + sizes.G;
  const ready = sizeSum === qty;
  const remaining = qty - sizeSum;

  function changeQty(delta: number) {
    const next = qty + delta;
    if (next < 6) return;
    setQtyState(next);
    if (sizes.P + sizes.M + sizes.G > next) setSizes({ P: 0, M: 0, G: 0 });
  }

  function setQtyPreset(val: number) { setQtyState(val); setSizes({ P: 0, M: 0, G: 0 }); }

  function changeSize(s: 'P' | 'M' | 'G', delta: number) {
    if (delta > 0 && sizeSum >= qty) return;
    if (delta < 0 && sizes[s] <= 0) return;
    setSizes(prev => ({ ...prev, [s]: prev[s] + delta }));
  }

  function goCheckout() {
    const totalStr = total.toLocaleString('pt-BR', { minimumFractionDigits: 2 });
    const msg = encodeURIComponent(
      `Olá! Pedido atacado Saída Veneza\n\n*Cor:* ${color}\n*Quantidade:* ${qty} peças\n*Grade:* P:${sizes.P} M:${sizes.M} G:${sizes.G}\n*Total:* R$${totalStr}\n\nComo finalizo o pagamento?`
    );
    window.open(`https://wa.me/558592189455?text=${msg}`, '_blank');
  }

  const gradeStr = sizeSum === 0 ? '—' : `P: ${sizes.P} · M: ${sizes.M} · G: ${sizes.G}`;
  const tierLabels = ['6–11 Peças', '12–23 Peças', '24–47 Peças', '48+ Peças'];
  const tierDiscs = ['preço base', '−8% por peça', '−15% por peça', '−22% por peça'];

  return (
    <div className="paneo-wrap">
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400;1,500&family=Jost:wght@300;400;500;600&display=swap" rel="stylesheet" />
      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      <nav className={`p-nav${scrolled ? ' scrolled' : ''}`}>
        <a href="/paneo" className="p-nav-logo">PANEÔ</a>
        <ul className="p-nav-links">
          <li><a href="#produto">Produto</a></li>
          <li><a href="#atacado">Atacado</a></li>
          <li><a href="#tabela">Tabela</a></li>
          <li><a href="#pedido">Pedido</a></li>
          <li><a href="#sobre">Sobre</a></li>
        </ul>
        <a href="#pedido" className="p-nav-cta">Comprar</a>
      </nav>

      <section className="p-hero">
        <div className="p-hero-bg" />
        <div className="p-hero-overlay" />
        <div className="p-hero-content">
          <span className="p-label">Resort 26 · Edição Atacado</span>
          <h1 className="p-hero-title">Saída <em>Veneza</em></h1>
          <p className="p-hero-desc">Top tomara-que-caia drapeado e saia longa com fenda. Para o look pós-sol sofisticado da sua cliente. Atacado a partir de 6 peças, <strong>R$160 a unidade.</strong></p>
          <div className="p-hero-btns">
            <a href="#pedido" className="p-btn-primary">Montar Pedido</a>
            <a href="#produto" className="p-btn-ghost">Ver Detalhes ↓</a>
          </div>
        </div>
      </section>

      <section id="produto" className="p-product">
        <div className="p-gallery">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="p-gallery-main" src="https://dcdn-us.mitiendanube.com/stores/006/453/112/products/foto-05-06-2026-09-52-55-39-bf0e4a911fe02f43b817810183709180-1024-1024.webp" alt="Saída Veneza" />
          <div className="p-gallery-row">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="https://dcdn-us.mitiendanube.com/stores/006/453/112/products/foto-05-06-2026-09-52-55-38-34d7869b0e483f801517810183708909-1024-1024.webp" alt="Look completo" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="https://dcdn-us.mitiendanube.com/stores/006/453/112/products/foto-05-06-2026-09-52-55-37-6a387d2f988ef65a0417810183713588-1024-1024.webp" alt="Tecido" />
          </div>
        </div>
        <div className="p-product-info">
          <span className="p-section-label">Coleção Veneza · 2026</span>
          <h2 className="p-product-heading">Drapeado que <em>vira desejo.</em></h2>
          <p className="p-product-desc">Top tomara-que-caia com franzido central e saia longa transpassada com fenda lateral. Tecido fluido em jersey de viscose, modelagem que veste do P ao G — uma peça pós-praia que sua cliente vai querer usar no jantar.</p>
          <div className="p-specs-grid">
            <div><p className="p-spec-label">Composição</p><p className="p-spec-val">Jersey de viscose acetinado</p></div>
            <div><p className="p-spec-label">Modelagem</p><p className="p-spec-val">Top bandeau + saia fenda</p></div>
            <div><p className="p-spec-label">Tamanhos</p><p className="p-spec-val">P · M · G</p></div>
            <div><p className="p-spec-label">Cores</p><p className="p-spec-val">Coffee · Cappuccino · Off-White</p></div>
          </div>
          <span className="p-section-label" style={{ marginBottom: '0.6rem' }}>Preço unitário no atacado</span>
          <p className="p-price-tag">R$ 160,00 <span className="p-price-meta">/ peça · MOQ 6</span></p>
          <p className="p-price-note">Descontos progressivos a partir de 12 peças.</p>
        </div>
      </section>

      <section id="atacado" className="p-social">
        <div className="p-social-bg" />
        <div className="p-social-overlay" />
        <div className="p-social-content">
          <span className="p-label" style={{ color: 'rgba(255,255,255,0.5)', marginBottom: '1.5rem' }}>Feito para lojistas</span>
          <h2 className="p-social-heading">Uma curadoria que vende <em>sozinha.</em></h2>
          <div className="p-stats-row">
            <div><p className="p-stat-num">+300</p><p className="p-stat-lbl">Lojistas atendidas</p></div>
            <div><p className="p-stat-num">94%</p><p className="p-stat-lbl">Sell-through médio</p></div>
            <div><p className="p-stat-num">21d</p><p className="p-stat-lbl">Produção e envio</p></div>
          </div>
        </div>
      </section>

      <section id="tabela" className="p-pricing">
        <span className="p-section-label" style={{ display: 'block', marginBottom: '1rem' }}>Tabela de atacado</span>
        <h2 className="p-section-heading">Quanto mais leva, melhor o preço.</h2>
        <div className="p-pricing-grid">
          {tiers.map((t, i) => (
            <div key={i} className={`p-pricing-card${qty >= t.min && qty <= t.max ? ' active' : ''}`}>
              <p className="p-pricing-range">{tierLabels[i]}</p>
              <p className="p-pricing-price">{fmt(t.price)}</p>
              <p className="p-pricing-disc">{tierDiscs[i]}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="pedido" className="p-order">
        <div className="p-order-hdr">
          <span className="p-section-label" style={{ display: 'block', marginBottom: '1rem' }}>Monte seu pedido</span>
          <h2 className="p-section-heading">Pronto para receber.</h2>
        </div>
        <div className="p-order-card">
          <div className="p-order-form">
            <div className="p-order-sec">
              <p className="p-order-lbl">Cor</p>
              <div className="p-color-btns">
                {[{ name: 'Coffee', bg: '#3A2010' }, { name: 'Cappuccino', bg: '#A87848' }, { name: 'Off-White', bg: '#E8E0D2', border: true }].map(c => (
                  <button key={c.name} className={`p-color-btn${color === c.name ? ' selected' : ''}`} onClick={() => setColor(c.name)}>
                    <span className="p-color-dot" style={{ background: c.bg, border: c.border ? '1px solid #bbb' : undefined }} />
                    {c.name}
                  </button>
                ))}
              </div>
            </div>
            <div className="p-order-sec">
              <p className="p-order-lbl">Quantidade total · <span className="p-accent">Mínimo 6</span></p>
              <div className="p-qty-row">
                <div className="p-qty-counter">
                  <button className="p-qty-btn" onClick={() => changeQty(-1)} disabled={qty <= 6}>−</button>
                  <span className="p-qty-num">{qty}</span>
                  <button className="p-qty-btn" onClick={() => changeQty(1)}>+</button>
                </div>
                <div className="p-qty-presets">
                  {[6, 12, 24, 48].map(v => (
                    <button key={v} className={`p-qty-preset${qty === v ? ' active' : ''}`} onClick={() => setQtyPreset(v)}>{v}</button>
                  ))}
                </div>
              </div>
            </div>
            <div className="p-order-sec">
              <p className="p-order-lbl">Grade de tamanhos · <span className="p-accent">{sizeSum}/{qty}</span></p>
              <div className="p-size-grid">
                {(['P', 'M', 'G'] as const).map(s => (
                  <div key={s} className="p-size-item">
                    <span className="p-size-name">{s}</span>
                    <div className="p-size-ctr">
                      <button className="p-size-btn" onClick={() => changeSize(s, -1)} disabled={sizes[s] <= 0}>−</button>
                      <span className="p-size-count">{sizes[s]}</span>
                      <button className="p-size-btn" onClick={() => changeSize(s, 1)} disabled={sizeSum >= qty}>+</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="p-summary">
            <p className="p-sum-title">Resumo</p>
            <div className="p-sum-rows">
              <div className="p-sum-row"><span className="p-sum-key">Produto</span><span className="p-sum-val">Saída Veneza</span></div>
              <div className="p-sum-row"><span className="p-sum-key">Cor</span><span className="p-sum-val">{color}</span></div>
              <div className="p-sum-row"><span className="p-sum-key">Quantidade</span><span className="p-sum-val">{qty} peça{qty !== 1 ? 's' : ''}</span></div>
              <div className="p-sum-row"><span className="p-sum-key">Preço unitário</span><span className="p-sum-val">{fmt(tier.price)}</span></div>
              <div className="p-sum-row"><span className="p-sum-key">Grade</span><span className="p-sum-val">{gradeStr}</span></div>
            </div>
            <div className="p-sum-divider" />
            <p className="p-sum-total-lbl">Total</p>
            <p className="p-sum-total">{fmt(total)}</p>
            <p className={`p-sum-warn${!ready ? ' error' : ''}`}>
              {ready ? 'Frete calculado no checkout.' : `Distribua mais ${remaining} peça${remaining !== 1 ? 's' : ''} entre os tamanhos.`}
            </p>
            <button className="p-btn-checkout" onClick={goCheckout} disabled={!ready}>
              Ir para o Checkout →
            </button>
            <p className="p-payment-note">Pagamento via PIX · Cartão de Crédito</p>
          </div>
        </div>
      </section>

      <section id="sobre" className="p-about">
        <span className="p-section-label" style={{ display: 'block', marginBottom: '1rem' }}>Paneô Brasil</span>
        <h2 className="p-about-heading">Vestir é um <em>ritual.</em></h2>
        <p className="p-about-text">Nascida no litoral nordestino, a Paneô traduz o calor brasileiro em peças de resort wear desejadas no mundo todo. Cada vestido é uma celebração da pele, da brisa e do sol que insiste em ficar.</p>
      </section>

      <footer className="p-footer">
        <span className="p-footer-logo">PANEÔ</span>
        <span className="p-footer-info">© 2026 Paneô Brasil · atacado@paneo.com.br</span>
      </footer>
    </div>
  );
}
