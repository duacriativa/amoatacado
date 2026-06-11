'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';

const CSS = `
  .paneo-wrap *, .paneo-wrap *::before, .paneo-wrap *::after { box-sizing: border-box; margin: 0; padding: 0; }
  .paneo-wrap {
    font-family: 'Jost', sans-serif; background: #F5F0EA; color: #2C2118;
    font-weight: 300; -webkit-font-smoothing: antialiased;
  }

  /* NAV */
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
  .p-nav-hamburger { display: none; background: none; border: none; cursor: pointer; flex-direction: column; gap: 5px; padding: 4px; }
  .p-nav-hamburger span { display: block; width: 22px; height: 1.5px; background: #1C1410; transition: all 0.3s; }
  .p-mobile-menu { display: none; position: fixed; top: 64px; left: 0; right: 0; background: rgba(245,240,234,0.98); backdrop-filter: blur(10px); border-bottom: 1px solid #D4C8BC; z-index: 99; padding: 1.5rem 2rem; flex-direction: column; gap: 1.5rem; }
  .p-mobile-menu.open { display: flex; }
  .p-mobile-menu a { font-size: 0.7rem; font-weight: 400; letter-spacing: 0.22em; text-transform: uppercase; text-decoration: none; color: #2C2118; }
  .p-mobile-menu .p-nav-cta { align-self: flex-start; }

  /* HERO */
  .p-hero { height: 100vh; position: relative; overflow: hidden; display: flex; align-items: flex-end; padding: 5rem 4rem; }
  .p-hero-bg { position: absolute; inset: 0; background-image: url('https://dcdn-us.mitiendanube.com/stores/006/453/112/products/foto-05-06-2026-09-52-55-2-8664be9e91868c459a17810177776839-1024-1024.webp'); background-size: cover; background-position: center 15%; }
  .p-hero-overlay { position: absolute; inset: 0; background: linear-gradient(to top, rgba(18,10,6,0.82) 0%, rgba(18,10,6,0.15) 55%, transparent 100%); }
  .p-hero-content { position: relative; z-index: 2; color: white; max-width: 640px; }
  .p-label { font-size: 0.58rem; font-weight: 400; letter-spacing: 0.32em; text-transform: uppercase; opacity: 0.75; margin-bottom: 1rem; display: block; }
  .p-hero-title { font-family: 'Cormorant Garamond', serif; font-size: clamp(4.5rem,9vw,7.5rem); font-weight: 300; line-height: 0.95; margin-bottom: 1.75rem; }
  .p-hero-title em { font-style: italic; font-weight: 300; }
  .p-hero-desc { font-size: 0.88rem; font-weight: 300; line-height: 1.75; opacity: 0.88; max-width: 460px; margin-bottom: 2.5rem; }
  .p-hero-desc strong { font-weight: 500; }
  .p-hero-btns { display: flex; align-items: center; gap: 2rem; flex-wrap: wrap; }
  .p-btn-primary { display: inline-block; font-size: 0.6rem; font-weight: 500; letter-spacing: 0.22em; text-transform: uppercase; text-decoration: none; padding: 1rem 2.5rem; background: white; color: #1C1410; border: 1px solid white; cursor: pointer; transition: all 0.22s; }
  .p-btn-primary:hover { background: transparent; color: white; }
  .p-btn-ghost { font-size: 0.6rem; font-weight: 400; letter-spacing: 0.2em; text-transform: uppercase; color: rgba(255,255,255,0.8); text-decoration: none; cursor: pointer; background: none; border: none; }

  /* PRODUCT */
  .p-product { display: grid; grid-template-columns: 1fr 1fr; min-height: 90vh; }
  .p-gallery { overflow: hidden; }
  .p-gallery-main { width: 100%; height: 52vh; object-fit: cover; display: block; cursor: zoom-in; transition: opacity 0.2s; }
  .p-gallery-main:hover { opacity: 0.92; }
  .p-gallery-row { display: grid; grid-template-columns: 1fr 1fr; gap: 2px; }
  .p-gallery-row img { width: 100%; height: 24vh; object-fit: cover; display: block; cursor: zoom-in; transition: opacity 0.2s; }
  .p-gallery-row img:hover { opacity: 0.88; }
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

  /* LIGHTBOX */
  .p-lightbox { position: fixed; inset: 0; z-index: 999; background: rgba(0,0,0,0.94); display: flex; align-items: center; justify-content: center; cursor: pointer; animation: fadeIn 0.2s ease; }
  @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
  .p-lightbox img { max-width: 90vw; max-height: 88vh; object-fit: contain; cursor: default; box-shadow: 0 20px 60px rgba(0,0,0,0.5); }
  .p-lightbox-close { position: fixed; top: 1.5rem; right: 2rem; background: none; border: none; color: white; font-size: 2.5rem; font-weight: 200; cursor: pointer; opacity: 0.6; line-height: 1; transition: opacity 0.2s; z-index: 1000; }
  .p-lightbox-close:hover { opacity: 1; }

  /* SOCIAL */
  .p-social { position: relative; padding: 8rem 4rem; overflow: hidden; min-height: 55vh; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; }
  .p-social-bg { position: absolute; inset: 0; background-image: url('https://dcdn-us.mitiendanube.com/stores/006/453/112/products/foto-05-06-2026-09-52-55-1-9601c83a44656eb54117810177783115-1024-1024.webp'); background-size: cover; background-position: center; }
  .p-social-overlay { position: absolute; inset: 0; background: rgba(18,10,6,0.8); }
  .p-social-content { position: relative; z-index: 2; color: white; }
  .p-social-heading { font-family: 'Cormorant Garamond', serif; font-size: clamp(2.5rem,5vw,4rem); font-weight: 300; line-height: 1.2; margin-bottom: 4rem; }
  .p-social-heading em { font-style: italic; }
  .p-stats-row { display: flex; gap: 6rem; justify-content: center; flex-wrap: wrap; }
  .p-stat-num { font-family: 'Cormorant Garamond', serif; font-size: 3.5rem; font-weight: 300; line-height: 1; margin-bottom: 0.5rem; }
  .p-stat-lbl { font-size: 0.58rem; font-weight: 400; letter-spacing: 0.22em; text-transform: uppercase; opacity: 0.55; }

  /* PRICING */
  .p-pricing { padding: 8rem 4rem; text-align: center; background: #F5F0EA; }
  .p-section-heading { font-family: 'Cormorant Garamond', serif; font-size: clamp(2rem,4vw,3.2rem); font-weight: 400; margin-bottom: 3.5rem; }
  .p-pricing-grid { display: grid; grid-template-columns: repeat(4,1fr); border: 1px solid #D4C8BC; max-width: 880px; margin: 0 auto; }
  .p-pricing-card { padding: 2.5rem 1.5rem; background: #FDFAF7; border-right: 1px solid #D4C8BC; transition: background 0.2s,color 0.2s; }
  .p-pricing-card:last-child { border-right: none; }
  .p-pricing-card.active { background: #7D3018; color: white; }
  .p-pricing-range { font-size: 0.58rem; letter-spacing: 0.18em; text-transform: uppercase; opacity: 0.65; margin-bottom: 1rem; }
  .p-pricing-price { font-family: 'Cormorant Garamond', serif; font-size: 2rem; font-weight: 400; margin-bottom: 0.5rem; }
  .p-pricing-disc { font-size: 0.7rem; font-weight: 300; opacity: 0.6; }

  /* ORDER */
  .p-order { padding: 8rem 4rem; background: #EDE6DC; }
  .p-order-hdr { text-align: center; margin-bottom: 4rem; }
  .p-order-card { display: grid; grid-template-columns: 1fr 400px; max-width: 1060px; margin: 0 auto; background: white; border: 1px solid #D4C8BC; }
  .p-order-form { padding: 3rem; }
  .p-order-sec { margin-bottom: 2.5rem; }
  .p-order-lbl { font-size: 0.58rem; font-weight: 500; letter-spacing: 0.22em; text-transform: uppercase; color: #7A6B60; margin-bottom: 1rem; display: flex; align-items: center; gap: 0.6rem; flex-wrap: wrap; }
  .p-accent { color: #7D3018; }

  /* Qty */
  .p-qty-row { display: flex; align-items: center; gap: 1.5rem; flex-wrap: wrap; }
  .p-qty-counter { display: flex; align-items: center; border: 1px solid #D4C8BC; }
  .p-qty-btn { width: 42px; height: 42px; border: none; background: none; cursor: pointer; font-size: 1.1rem; font-family: 'Jost',sans-serif; color: #2C2118; display: flex; align-items: center; justify-content: center; transition: background 0.15s; }
  .p-qty-btn:hover:not(:disabled) { background: #F5F0EA; }
  .p-qty-btn:disabled { opacity: 0.3; cursor: not-allowed; }
  .p-qty-num { font-family: 'Cormorant Garamond',serif; font-size: 2.2rem; font-weight: 400; width: 64px; text-align: center; line-height: 1; padding: 0 0.25rem; }
  .p-qty-presets { display: flex; gap: 0.4rem; flex-wrap: nowrap; }
  .p-qty-preset { width: 40px; height: 40px; border: 1px solid #D4C8BC; background: white; font-family: 'Jost',sans-serif; font-size: 0.75rem; font-weight: 400; cursor: pointer; transition: all 0.15s; }
  .p-qty-preset.active { background: #1C1410; color: white; border-color: #1C1410; }

  /* Grade Matrix */
  .p-grade-wrap { overflow-x: auto; -webkit-overflow-scrolling: touch; }
  .p-grade-table { width: 100%; border-collapse: collapse; min-width: 380px; }
  .p-grade-table th { font-size: 0.6rem; font-weight: 500; letter-spacing: 0.15em; text-transform: uppercase; color: #7A6B60; padding: 0.6rem 0.5rem; text-align: center; border-bottom: 1px solid #D4C8BC; }
  .p-grade-table th.size-col { text-align: left; color: #2C2118; }
  .p-grade-table .th-color { display: flex; align-items: center; gap: 0.4rem; justify-content: center; }
  .p-grade-table td { padding: 0.5rem; border: 1px solid #EEEBE6; text-align: center; }
  .p-grade-table td.size-lbl { font-size: 0.7rem; font-weight: 500; letter-spacing: 0.1em; color: #2C2118; text-align: left; padding-left: 0; border: none; border-bottom: 1px solid #EEEBE6; }
  .p-grade-table tr:last-child td { border-bottom: none; }
  .p-grade-table .total-row td { border-top: 2px solid #D4C8BC; font-size: 0.75rem; font-weight: 500; color: #2C2118; padding-top: 0.75rem; border-bottom: none; }
  .p-grade-table .total-row td.size-lbl { font-size: 0.58rem; letter-spacing: 0.15em; text-transform: uppercase; color: #7A6B60; }
  .p-cell-ctr { display: flex; align-items: center; justify-content: center; gap: 0.4rem; }
  .p-cell-btn { width: 22px; height: 22px; border: 1px solid #D4C8BC; background: white; cursor: pointer; font-size: 0.9rem; font-family: 'Jost',sans-serif; display: flex; align-items: center; justify-content: center; transition: background 0.12s; flex-shrink: 0; }
  .p-cell-btn:hover:not(:disabled) { background: #F5F0EA; }
  .p-cell-btn:disabled { opacity: 0.25; cursor: not-allowed; }
  .p-cell-num { font-family: 'Cormorant Garamond',serif; font-size: 1.35rem; font-weight: 400; width: 28px; text-align: center; line-height: 1; }
  .p-col-dot { width: 11px; height: 11px; border-radius: 50%; flex-shrink: 0; }
  .p-total-badge { display: inline-flex; align-items: center; justify-content: center; min-width: 28px; height: 22px; background: #1C1410; color: white; font-size: 0.65rem; font-weight: 400; padding: 0 0.4rem; }
  .p-total-badge.partial { background: #7D3018; }

  /* Summary */
  .p-summary { background: #1C1410; color: white; padding: 3rem; display: flex; flex-direction: column; }
  .p-sum-title { font-size: 0.58rem; letter-spacing: 0.3em; text-transform: uppercase; opacity: 0.4; margin-bottom: 2rem; }
  .p-sum-rows { flex: 1; display: flex; flex-direction: column; gap: 0.85rem; }
  .p-sum-row { display: flex; justify-content: space-between; align-items: baseline; gap: 1rem; }
  .p-sum-key { font-size: 0.73rem; font-weight: 300; opacity: 0.55; flex-shrink: 0; }
  .p-sum-val { font-size: 0.82rem; font-weight: 400; text-align: right; }
  .p-sum-colors { display: flex; flex-direction: column; gap: 0.4rem; margin-top: 0.25rem; }
  .p-sum-color-row { display: flex; align-items: center; gap: 0.5rem; font-size: 0.72rem; font-weight: 300; opacity: 0.7; }
  .p-sum-color-dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }
  .p-sum-divider { height: 1px; background: rgba(255,255,255,0.12); margin: 1.5rem 0; }
  .p-sum-total-lbl { font-size: 0.58rem; letter-spacing: 0.22em; text-transform: uppercase; opacity: 0.45; margin-bottom: 0.4rem; }
  .p-sum-total { font-family: 'Cormorant Garamond',serif; font-size: 3rem; font-weight: 400; line-height: 1; margin-bottom: 1.75rem; }
  .p-sum-warn { font-size: 0.7rem; font-weight: 300; opacity: 0.5; line-height: 1.55; margin-bottom: 1.25rem; }
  .p-sum-warn.error { color: #FF9B7A; opacity: 1; }
  .p-btn-checkout { display: block; width: 100%; padding: 1.1rem; background: white; color: #1C1410; border: none; font-family: 'Jost',sans-serif; font-size: 0.6rem; font-weight: 500; letter-spacing: 0.22em; text-transform: uppercase; cursor: pointer; transition: background 0.2s; text-align: center; }
  .p-btn-checkout:hover:not(:disabled) { background: #F5F0EA; }
  .p-btn-checkout:disabled { opacity: 0.35; cursor: not-allowed; }
  .p-payment-note { font-size: 0.52rem; letter-spacing: 0.18em; text-transform: uppercase; opacity: 0.35; text-align: center; margin-top: 1rem; }

  /* ABOUT */
  .p-about { padding: 8rem 4rem; text-align: center; background: #F5F0EA; border-top: 1px solid #D4C8BC; }
  .p-about-heading { font-family: 'Cormorant Garamond',serif; font-size: clamp(2.5rem,5vw,4rem); font-weight: 400; margin-bottom: 1.5rem; }
  .p-about-heading em { font-style: italic; }
  .p-about-text { font-size: 0.84rem; line-height: 1.95; color: #7A6B60; max-width: 540px; margin: 0 auto; }

  /* FOOTER */
  .p-footer { padding: 1.75rem 4rem; display: flex; align-items: center; justify-content: space-between; border-top: 1px solid #D4C8BC; background: #F5F0EA; }
  .p-footer-logo { font-family: 'Cormorant Garamond',serif; font-size: 1rem; font-weight: 500; letter-spacing: 0.2em; }
  .p-footer-info { font-size: 0.62rem; font-weight: 300; letter-spacing: 0.1em; color: #7A6B60; }


  /* GRADE MOBILE vs DESKTOP */
  .p-grade-desktop { display: block; }
  .p-grade-mobile  { display: none; }

  .p-color-tabs { display: flex; gap: 0; border: 1px solid #D4C8BC; margin-bottom: 1rem; }
  .p-color-tab {
    flex: 1; padding: 0.65rem 0.5rem; border: none; background: white; cursor: pointer;
    font-family: 'Jost',sans-serif; font-size: 0.62rem; font-weight: 400; letter-spacing: 0.1em;
    text-transform: uppercase; display: flex; align-items: center; justify-content: center;
    gap: 0.4rem; border-right: 1px solid #D4C8BC; transition: background 0.15s; position: relative;
  }
  .p-color-tab:last-child { border-right: none; }
  .p-color-tab.active { background: #1C1410; color: white; }
  .p-color-tab.active .p-col-dot { border-color: rgba(255,255,255,0.3) !important; }
  .p-tab-badge {
    position: absolute; top: 4px; right: 4px;
    background: #7D3018; color: white; font-size: 0.5rem; font-weight: 500;
    width: 14px; height: 14px; border-radius: 50%; display: flex; align-items: center; justify-content: center;
  }
  .p-size-rows { display: flex; flex-direction: column; gap: 0; border: 1px solid #D4C8BC; }
  .p-size-row {
    display: flex; align-items: center; justify-content: space-between;
    padding: 0.85rem 1rem; border-bottom: 1px solid #EEEBE6;
  }
  .p-size-row:last-child { border-bottom: none; }
  .p-size-row-lbl { font-size: 0.75rem; font-weight: 500; letter-spacing: 0.1em; color: #2C2118; }
  .p-size-row-ctr { display: flex; align-items: center; gap: 1rem; }

  @media (max-width: 768px) {
    .p-grade-desktop { display: none; }
    .p-grade-mobile  { display: block; }
    .p-qty-row { flex-wrap: wrap; gap: 0.75rem; }
    .p-qty-presets { gap: 0.4rem; flex-wrap: nowrap; }
    .p-qty-preset  { width: 34px; height: 34px; font-size: 0.68rem; }
    .p-qty-num     { width: 48px; font-size: 1.6rem; }
    .p-qty-btn     { width: 34px; height: 34px; }
  }


  /* VIDEO + GUIA DE TAMANHOS */
  .p-video-section { padding: 8rem 4rem; background: #FDFAF7; }
  .p-video-grid { display: grid; grid-template-columns: 380px 1fr; gap: 5rem; max-width: 1100px; margin: 0 auto; align-items: start; }
  .p-video-col {}

  .p-sizeguide-col { padding-top: 2rem; }
  .p-size-table { width: 100%; border-collapse: collapse; margin-bottom: 2.5rem; }
  .p-size-table th { font-size: 0.58rem; font-weight: 500; letter-spacing: 0.2em; text-transform: uppercase; color: #7A6B60; padding: 0.75rem 1rem; text-align: left; border-bottom: 2px solid #D4C8BC; }
  .p-size-table td { font-size: 0.84rem; font-weight: 300; padding: 1rem; border-bottom: 1px solid #EEEBE6; }
  .p-size-table td:first-child { font-weight: 500; letter-spacing: 0.1em; font-size: 0.9rem; }
  .p-size-table tr:last-child td { border-bottom: none; }
  .p-price-highlight { background: #F5F0EA; padding: 1.5rem; border: 1px solid #D4C8BC; }
  .p-price-highlight-row { display: flex; align-items: center; gap: 1rem; margin-bottom: 0.75rem; }
  .p-price-highlight-label { font-size: 0.6rem; font-weight: 500; letter-spacing: 0.2em; text-transform: uppercase; color: #7A6B60; width: 5rem; }
  .p-price-highlight-value { font-family: 'Cormorant Garamond', serif; font-size: 1.8rem; font-weight: 400; }
  .p-price-crossed { text-decoration: line-through; color: #7A6B60; font-size: 1.4rem; }
  .p-price-main { color: #1C1410; }
  .p-price-highlight-badge { background: #7D3018; color: white; font-size: 0.6rem; font-weight: 500; letter-spacing: 0.1em; padding: 0.25rem 0.6rem; }
  .p-price-highlight-note { font-size: 0.72rem; font-weight: 300; color: #7A6B60; margin-top: 0.25rem; }

  @media (max-width: 768px) {
    .p-video-section { padding: 5rem 1.5rem; }
    .p-video-grid { grid-template-columns: 1fr; gap: 3rem; }
    .p-video-wrap { max-width: 240px; margin: 0 auto; }
    .p-sizeguide-col { padding-top: 0; }
  }


  /* VIDEO PLAYER CAROUSEL */
  .p-short-player { display: flex; flex-direction: column; align-items: center; }
  .p-short-frame { position: relative; width: 100%; aspect-ratio: 9/16; overflow: hidden; border: 1px solid #D4C8BC; background: #0d0906; }
  .p-short-frame iframe { position: absolute; inset: 0; width: 100%; height: 100%; border: none; }
  .p-short-controls { display: flex; align-items: center; gap: 1.5rem; margin-top: 1.25rem; }
  .p-short-nav { background: none; border: 1px solid #D4C8BC; width: 40px; height: 40px; cursor: pointer; font-size: 1rem; color: #2C2118; display: flex; align-items: center; justify-content: center; transition: all 0.15s; font-family: 'Jost', sans-serif; }
  .p-short-nav:hover { background: #1C1410; color: white; border-color: #1C1410; }
  .p-short-nav:disabled { opacity: 0.3; cursor: not-allowed; }
  .p-short-dots { display: flex; gap: 0.5rem; align-items: center; }
  .p-short-dot { width: 8px; height: 8px; border-radius: 50%; border: none; background: #D4C8BC; cursor: pointer; padding: 0; transition: background 0.2s; }
  .p-short-dot.active { background: #1C1410; }

  /* FAQ */
  .p-faq { padding: 8rem 4rem; background: #F5F0EA; border-top: 1px solid #D4C8BC; }
  .p-faq-inner { display: grid; grid-template-columns: 340px 1fr; gap: 6rem; max-width: 1060px; margin: 0 auto; }
  .p-faq-heading { font-family: 'Cormorant Garamond', serif; font-size: clamp(2.5rem,4vw,3.5rem); font-weight: 400; line-height: 1.1; margin-bottom: 1.25rem; }
  .p-faq-heading em { font-style: italic; }
  .p-faq-sub { font-size: 0.82rem; line-height: 1.8; color: #7A6B60; max-width: 280px; }
  .p-faq-item { border-bottom: 1px solid #D4C8BC; padding: 1.35rem 0; cursor: pointer; user-select: none; }
  .p-faq-q { display: flex; justify-content: space-between; align-items: center; gap: 1rem; }
  .p-faq-q span:first-child { font-size: 0.9rem; font-weight: 400; line-height: 1.5; }
  .p-faq-icon { font-size: 1.4rem; font-weight: 300; color: #7A6B60; flex-shrink: 0; transition: transform 0.2s; }
  .p-faq-item.open .p-faq-icon { color: #7D3018; }
  .p-faq-a { font-size: 0.82rem; font-weight: 300; line-height: 1.8; color: #7A6B60; margin-top: 0.85rem; max-width: 540px; }

  @media (max-width: 768px) {
    .p-shorts-row { gap: 0.5rem; }
    .p-faq { padding: 5rem 1.5rem; }
    .p-faq-inner { grid-template-columns: 1fr; gap: 2.5rem; }
    .p-faq-sub { max-width: 100%; }
    .p-gallery-main { height: 60vw; min-height: 260px; }
    .p-gallery-row img { height: 32vw; min-height: 130px; }
  }


  /* COMPACT PICKER + CART */
  .p-order-compact { display: grid; grid-template-columns: 480px 1fr; gap: 2rem; max-width: 1000px; margin: 0 auto; }
  .p-picker-card { background: white; border: 1px solid #D4C8BC; display: flex; gap: 0; overflow: hidden; }
  .p-picker-img-wrap { width: 200px; flex-shrink: 0; }
  .p-picker-img-wrap img { width: 100%; height: 100%; object-fit: cover; display: block; }
  .p-picker-form { padding: 2rem; flex: 1; display: flex; flex-direction: column; gap: 0; }
  .p-picker-name { font-family: 'Cormorant Garamond', serif; font-size: 1.5rem; font-weight: 400; margin-bottom: 0.3rem; }
  .p-picker-price { font-size: 0.9rem; font-weight: 400; margin-bottom: 1.5rem; }
  .p-picker-price span { font-size: 0.7rem; font-weight: 300; color: #7A6B60; }
  .p-picker-section { margin-bottom: 1.25rem; }
  .p-picker-label { font-size: 0.62rem; font-weight: 400; letter-spacing: 0.15em; text-transform: uppercase; color: #7A6B60; margin-bottom: 0.6rem; }
  .p-picker-label strong { color: #2C2118; font-weight: 500; }
  .p-swatch-row { display: flex; gap: 0.5rem; }
  .p-swatch { width: 30px; height: 30px; border-radius: 50%; border: 2px solid transparent; cursor: pointer; transition: all 0.15s; }
  .p-swatch.selected { border-color: #1C1410; box-shadow: 0 0 0 2px white, 0 0 0 4px #1C1410; }
  .p-size-btn-row { display: flex; gap: 0.5rem; }
  .p-size-btn { width: 44px; height: 44px; border: 1px solid #D4C8BC; background: white; font-family: 'Jost', sans-serif; font-size: 0.8rem; font-weight: 400; cursor: pointer; transition: all 0.15s; }
  .p-size-btn.selected { background: #1C1410; color: white; border-color: #1C1410; }
  .p-size-btn:hover:not(.selected) { border-color: #2C2118; }
  .p-picker-qty { display: flex; align-items: center; border: 1px solid #D4C8BC; width: fit-content; }
  .p-picker-qty-btn { width: 36px; height: 36px; border: none; background: none; cursor: pointer; font-size: 1.1rem; font-family: 'Jost', sans-serif; display: flex; align-items: center; justify-content: center; transition: background 0.15s; color: #2C2118; }
  .p-picker-qty-btn:hover { background: #F5F0EA; }
  .p-picker-qty-num { font-family: 'Cormorant Garamond', serif; font-size: 1.6rem; font-weight: 400; width: 48px; text-align: center; line-height: 1; }
  .p-btn-add { margin-top: 1.5rem; padding: 0.9rem 1.5rem; background: #1C1410; color: white; border: none; font-family: 'Jost', sans-serif; font-size: 0.65rem; font-weight: 500; letter-spacing: 0.2em; text-transform: uppercase; cursor: pointer; transition: background 0.2s; width: 100%; }
  .p-btn-add:hover { background: #7D3018; }

  .p-cart-panel { background: #1C1410; color: white; padding: 2.5rem; display: flex; flex-direction: column; }
  .p-cart-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; }
  .p-cart-count { font-size: 0.8rem; font-weight: 500; }
  .p-cart-empty { font-size: 0.78rem; font-weight: 300; opacity: 0.45; padding: 1.5rem 0; }
  .p-cart-items { display: flex; flex-direction: column; gap: 0.75rem; flex: 1; }
  .p-cart-item { display: flex; align-items: center; gap: 0.75rem; padding: 0.75rem 0; border-bottom: 1px solid rgba(255,255,255,0.1); }
  .p-cart-item-dot { width: 10px; height: 10px; border-radius: 50%; flex-shrink: 0; }
  .p-cart-item-info { flex: 1; display: flex; flex-direction: column; gap: 0.15rem; }
  .p-cart-item-name { font-size: 0.8rem; font-weight: 400; }
  .p-cart-item-qty { font-size: 0.68rem; font-weight: 300; opacity: 0.55; }
  .p-cart-item-price { font-size: 0.82rem; font-weight: 400; flex-shrink: 0; }
  .p-cart-item-remove { background: none; border: none; color: rgba(255,255,255,0.4); font-size: 1.1rem; cursor: pointer; padding: 0 0.25rem; line-height: 1; transition: color 0.15s; }
  .p-cart-item-remove:hover { color: white; }
  .p-cart-total-row { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 1.5rem; font-size: 0.6rem; font-weight: 400; letter-spacing: 0.2em; text-transform: uppercase; opacity: 0.5; }

  @media (max-width: 768px) {
    .p-order-compact { grid-template-columns: 1fr; gap: 1.5rem; }
    .p-picker-img-wrap { width: 140px; }
    .p-picker-form { padding: 1.5rem; }
    .p-cart-panel { padding: 2rem 1.5rem; }
  }

  /* MOBILE LAYOUT */
  @media (max-width: 768px) {
    .p-nav { padding: 0 1.25rem; }
    .p-nav-links, .p-nav-cta { display: none; }
    .p-nav-hamburger { display: flex; }

    .p-hero { padding: 3rem 1.5rem 4rem; }
    .p-hero-title { font-size: clamp(3.5rem,14vw,5rem); }

    .p-product { grid-template-columns: 1fr; }
    .p-gallery-main { height: 60vw; min-height: 260px; }
    .p-gallery-row img { height: 32vw; min-height: 140px; }
    .p-product-info { padding: 3rem 1.5rem; }

    .p-social { padding: 5rem 1.5rem; }
    .p-stats-row { gap: 2.5rem; }

    .p-pricing { padding: 5rem 1.5rem; }
    .p-pricing-grid { grid-template-columns: repeat(2,1fr); }
    .p-pricing-card { border-bottom: 1px solid #D4C8BC; }

    .p-order { padding: 5rem 1.5rem; }
    .p-order-card { grid-template-columns: 1fr; }
    .p-order-form { padding: 2rem 1.5rem; }
    .p-summary { padding: 2.5rem 1.5rem; }
    .p-sum-total { font-size: 2.5rem; }

    .p-about { padding: 5rem 1.5rem; }
    .p-footer { padding: 1.5rem; flex-direction: column; gap: 0.5rem; text-align: center; }

    .p-lightbox img { max-width: 95vw; max-height: 80vh; }
    .p-lightbox-close { top: 1rem; right: 1rem; font-size: 2rem; }
  }
`;

const COLORS = ['Preto', 'Cappuccino', 'Bronze'] as const;
const SIZES = ['P', 'M', 'G'] as const;
type ColorKey = typeof COLORS[number];
type SizeKey = typeof SIZES[number];

const COLOR_DOTS: Record<ColorKey, string> = {
  'Preto': '#1A1A1A',
  'Cappuccino': '#A87848',
  'Bronze': '#7A4A28',
};

const SHORTS = ['56tyw2g8RKU', 'sD6dHNCjHmQ', 'BAwsWY7F63U'];

const PRICE = 145;
const MIN_ORDER = 6;

interface CartItem { color: ColorKey; size: SizeKey; qty: number; }

function fmt(n: number) { return n.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }); }



const GALLERY_IMGS = [
  'https://dcdn-us.mitiendanube.com/stores/006/453/112/products/foto-05-06-2026-09-52-55-2-8664be9e91868c459a17810177776839-1024-1024.webp',
  'https://dcdn-us.mitiendanube.com/stores/006/453/112/products/foto-05-06-2026-09-52-55-10-af014716b29af26f7c17810177783852-1024-1024.webp',
  'https://dcdn-us.mitiendanube.com/stores/006/453/112/products/foto-05-06-2026-09-52-55-11-e0468894119712058117810177782892-1024-1024.webp',
  'https://dcdn-us.mitiendanube.com/stores/006/453/112/products/foto-05-06-2026-09-52-55-4-fd46358860fb94247b17810177779836-1024-1024.webp',
  'https://dcdn-us.mitiendanube.com/stores/006/453/112/products/foto-05-06-2026-09-52-55-1-9601c83a44656eb54117810177783115-1024-1024.webp',
];


function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`p-faq-item${open ? ' open' : ''}`} onClick={() => setOpen(o => !o)}>
      <div className="p-faq-q">
        <span>{question}</span>
        <span className="p-faq-icon">{open ? '−' : '+'}</span>
      </div>
      {open && <p className="p-faq-a">{answer}</p>}
    </div>
  );
}

export default function PaneoBrasilPage() {
  const [selColor, setSelColor] = useState<ColorKey>('Preto');
  const [selSize, setSelSize] = useState<SizeKey>('M');
  const [selQty, setSelQty] = useState(1);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [lightbox, setLightbox] = useState<string | null>(null);
  const [activeVideo, setActiveVideo] = useState(0);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);


  const closeLightbox = useCallback(() => setLightbox(null), []);
  useEffect(() => {
    const fn = (e: KeyboardEvent) => { if (e.key === 'Escape') closeLightbox(); };
    window.addEventListener('keydown', fn);
    return () => window.removeEventListener('keydown', fn);
  }, [closeLightbox]);

  // Prevent body scroll when lightbox open
  useEffect(() => {
    document.body.style.overflow = lightbox ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [lightbox]);

  const cartTotal = cartItems.reduce((s, i) => s + i.qty, 0);
  const cartValue = cartTotal * PRICE;
  const ready = cartTotal >= MIN_ORDER;
  const remaining = Math.max(0, MIN_ORDER - cartTotal);

  function addToCart() {
    if (selQty < 1) return;
    setCartItems(prev => {
      const existing = prev.findIndex(i => i.color === selColor && i.size === selSize);
      if (existing >= 0) {
        const next = [...prev];
        next[existing] = { ...next[existing], qty: next[existing].qty + selQty };
        return next;
      }
      return [...prev, { color: selColor, size: selSize, qty: selQty }];
    });
    setSelQty(1);
  }

  function removeFromCart(idx: number) {
    setCartItems(prev => prev.filter((_, i) => i !== idx));
  }

  function goCheckout() {
    const totalStr = cartValue.toLocaleString('pt-BR', { minimumFractionDigits: 2 });
    const lines = cartItems.map(i => `${i.color} · ${i.size} · ${i.qty} peça${i.qty !== 1 ? 's' : ''}`);
    const msg = encodeURIComponent(
      `Olá! Pedido atacado Vestido Creta 🛍️\n\n${lines.join('\n')}\n\n*Total:* ${cartTotal} peças · R$${totalStr}\n\nComo finalizo o pagamento?`
    );
    window.open(`https://wa.me/558592189455?text=${msg}`, '_blank');
  }



  return (
    <div className="paneo-wrap">
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400;1,500&family=Jost:wght@300;400;500;600&display=swap" rel="stylesheet" />
      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      {/* LIGHTBOX */}
      {lightbox && (
        <div className="p-lightbox" onClick={closeLightbox}>
          <button className="p-lightbox-close" onClick={closeLightbox}>×</button>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={lightbox} alt="Saída Veneza" onClick={e => e.stopPropagation()} />
        </div>
      )}

      {/* NAV */}
      <nav className={`p-nav${scrolled ? ' scrolled' : ''}`}>
        <Link href="/paneo" className="p-nav-logo">PANEÔ</Link>
        <ul className="p-nav-links">
          <li><a href="#produto">Produto</a></li>
          <li><a href="#atacado">Atacado</a></li>
          <li><a href="#tabela">Tabela</a></li>
          <li><a href="#pedido">Pedido</a></li>
          <li><a href="#sobre">Sobre</a></li>
        </ul>
        <a href="#pedido" className="p-nav-cta">Comprar</a>
        <button className="p-nav-hamburger" onClick={() => setMenuOpen(o => !o)} aria-label="Menu">
          <span /><span /><span />
        </button>
      </nav>

      {/* MOBILE MENU */}
      <div className={`p-mobile-menu${menuOpen ? ' open' : ''}`} onClick={() => setMenuOpen(false)}>
        <a href="#produto">Produto</a>
        <a href="#atacado">Atacado</a>
        <a href="#tabela">Tabela</a>
        <a href="#pedido">Pedido</a>
        <a href="#sobre">Sobre</a>
        <a href="#pedido" className="p-nav-cta">Comprar</a>
      </div>

      {/* HERO */}
      <section className="p-hero">
        {/* Mobile: product photo */}
        <div className="p-hero-bg p-hero-bg-mobile" />
        {/* Desktop: YouTube autoplay video */}
        <div className="p-hero-video-wrap">
          <iframe
            src="https://www.youtube.com/embed/56tyw2g8RKU?autoplay=1&mute=1&loop=1&playlist=56tyw2g8RKU&controls=0&rel=0&playsinline=1&modestbranding=1&showinfo=0&start=0"
            allow="autoplay; encrypted-media"
            allowFullScreen={false}
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
          />
        </div>
        <div className="p-hero-overlay" />
        <div className="p-hero-content">
          <span className="p-label">Resort 26 · Edição Atacado</span>
          <h1 className="p-hero-title">Vestido <em>Creta</em></h1>
          <p className="p-hero-desc">O best seller da Paneô. Fenda lateral, detalhe em nó e tecido de alta qualidade. Atacado a partir de 6 peças, <strong>R$145 a unidade.</strong></p>
          <div className="p-hero-btns">
            <a href="#pedido" className="p-btn-primary">Montar Pedido</a>
            <a href="#produto" className="p-btn-ghost">Ver Detalhes ↓</a>
          </div>
        </div>
      </section>

      {/* PRODUTO */}
      <section id="produto" className="p-product">
        <div className="p-gallery">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="p-gallery-main" src={GALLERY_IMGS[0]} alt="Vestido Creta" onClick={() => setLightbox(GALLERY_IMGS[0])} />
          <div className="p-gallery-row">
            {[1,2,3,4].map(i => (
              // eslint-disable-next-line @next/next/no-img-element
              <img key={i} src={GALLERY_IMGS[i]} alt={`Vestido Creta ${i+1}`} onClick={() => setLightbox(GALLERY_IMGS[i])} />
            ))}
          </div>
        </div>
        <div className="p-product-info">
          <span className="p-section-label">Best Seller · Coleção 2026</span>
          <h2 className="p-product-heading">O vestido que <em>todo closet pede.</em></h2>
          <p className="p-product-desc">O Vestido Creta é o nosso best seller que une elegância e modernidade com perfeição. Confeccionado em tecido de alta qualidade, destaca-se pela sofisticada fenda lateral e pelo detalhe em nó que valoriza a silhueta feminina. Ideal para ocasiões especiais, garante um visual marcante e cheio de charme.</p>
          <div className="p-specs-grid">
            <div><p className="p-spec-label">Composição</p><p className="p-spec-val">Tecido de alta qualidade</p></div>
            <div><p className="p-spec-label">Modelagem</p><p className="p-spec-val">Vestido com fenda + nó</p></div>
            <div><p className="p-spec-label">Tamanhos</p><p className="p-spec-val">P · M · G</p></div>
            <div><p className="p-spec-label">Cores</p><p className="p-spec-val">Preto · Cappuccino · Bronze</p></div>
          </div>
          <span className="p-section-label" style={{ marginBottom: '0.6rem' }}>Preço unitário no atacado</span>
          <p className="p-price-tag">R$ 145,00 <span className="p-price-meta">/ peça · MOQ 6</span></p>
          <p className="p-price-note">Varejo R$290,00 — margem de 100% para sua loja.</p>
        </div>
      </section>

      {/* SOCIAL */}
      <section id="atacado" className="p-social">
        <div className="p-social-bg" /><div className="p-social-overlay" />
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

      {/* VIDEO + GUIA DE TAMANHOS */}
      <section id="tabela" className="p-video-section">
        <div className="p-video-grid">
          <div className="p-video-col">
            <span className="p-section-label" style={{ marginBottom: '1rem', display: 'block' }}>Produto em movimento</span>
            <div className="p-short-player">
              <div className="p-short-frame">
                <iframe
                  key={activeVideo}
                  src={`https://www.youtube.com/embed/${SHORTS[activeVideo]}?rel=0&modestbranding=1&playsinline=1`}
                  title={`Vestido Creta - Look ${activeVideo + 1}`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <div className="p-short-controls">
                <button
                  className="p-short-nav"
                  onClick={() => setActiveVideo(v => (v - 1 + SHORTS.length) % SHORTS.length)}
                  disabled={SHORTS.length <= 1}
                >←</button>
                <div className="p-short-dots">
                  {SHORTS.map((_, i) => (
                    <button key={i} className={`p-short-dot${activeVideo === i ? ' active' : ''}`} onClick={() => setActiveVideo(i)} />
                  ))}
                </div>
                <button
                  className="p-short-nav"
                  onClick={() => setActiveVideo(v => (v + 1) % SHORTS.length)}
                  disabled={SHORTS.length <= 1}
                >→</button>
              </div>
            </div>
          </div>
          <div className="p-sizeguide-col">
            <span className="p-section-label" style={{ marginBottom: '1rem', display: 'block' }}>Guia de tamanhos</span>
            <h2 className="p-section-heading" style={{ fontSize: 'clamp(1.8rem,3vw,2.8rem)', marginBottom: '2rem' }}>
              O fit perfeito para <em style={{ fontStyle: 'italic' }}>cada corpo.</em>
            </h2>
            <table className="p-size-table">
              <thead>
                <tr>
                  <th>Tamanho</th>
                  <th>Numeração</th>
                  <th>Perfil</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>P</td><td>36–38</td><td>Manequim 36 a 38</td></tr>
                <tr><td>M</td><td>40–42</td><td>Manequim 40 a 42</td></tr>
                <tr><td>G</td><td>44–46</td><td>Manequim 44 a 46</td></tr>
              </tbody>
            </table>
            <div className="p-price-highlight">
              <div className="p-price-highlight-row">
                <span className="p-price-highlight-label">Varejo</span>
                <span className="p-price-highlight-value p-price-crossed">R$ 290,00</span>
              </div>
              <div className="p-price-highlight-row">
                <span className="p-price-highlight-label">Atacado</span>
                <span className="p-price-highlight-value p-price-main">R$ 145,00</span>
                <span className="p-price-highlight-badge">-50%</span>
              </div>
              <p className="p-price-highlight-note">Pedido mínimo 6 peças · margem de 100%</p>
            </div>
          </div>
        </div>
      </section>

      {/* PEDIDO */}
      <section id="pedido" className="p-order">
        <div className="p-order-hdr">
          <span className="p-section-label" style={{ display: 'block', marginBottom: '1rem' }}>Monte seu pedido</span>
          <h2 className="p-section-heading">Pronto para receber.</h2>
        </div>

        <div className="p-order-compact">
          {/* LEFT: product picker */}
          <div className="p-picker-card">
            <div className="p-picker-img-wrap">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={GALLERY_IMGS[0]} alt="Vestido Creta" />
            </div>
            <div className="p-picker-form">
              <h3 className="p-picker-name">Vestido Creta</h3>
              <p className="p-picker-price">R$ 145,00 <span>/ peça atacado</span></p>

              {/* Cor */}
              <div className="p-picker-section">
                <p className="p-picker-label">Cor: <strong>{selColor}</strong></p>
                <div className="p-swatch-row">
                  {COLORS.map(c => (
                    <button
                      key={c}
                      className={`p-swatch${selColor === c ? ' selected' : ''}`}
                      style={{ background: COLOR_DOTS[c] }}
                      onClick={() => setSelColor(c)}
                      title={c}
                    />
                  ))}
                </div>
              </div>

              {/* Tamanho */}
              <div className="p-picker-section">
                <p className="p-picker-label">Tamanho: <strong>{selSize}</strong></p>
                <div className="p-size-btn-row">
                  {SIZES.map(s => (
                    <button key={s} className={`p-size-btn${selSize === s ? ' selected' : ''}`} onClick={() => setSelSize(s)}>{s}</button>
                  ))}
                </div>
              </div>

              {/* Quantidade */}
              <div className="p-picker-section">
                <p className="p-picker-label">Quantidade</p>
                <div className="p-picker-qty">
                  <button className="p-picker-qty-btn" onClick={() => setSelQty(q => Math.max(1, q - 1))}>−</button>
                  <span className="p-picker-qty-num">{selQty}</span>
                  <button className="p-picker-qty-btn" onClick={() => setSelQty(q => q + 1)}>+</button>
                </div>
              </div>

              <button className="p-btn-add" onClick={addToCart}>
                + Adicionar ao Pedido
              </button>
            </div>
          </div>

          {/* RIGHT: cart summary */}
          <div className="p-cart-panel">
            <div className="p-cart-header">
              <span className="p-sum-title">Pedido atual</span>
              <span className="p-cart-count" style={{ color: ready ? '#2C7A3A' : '#7D3018' }}>
                {cartTotal} peça{cartTotal !== 1 ? 's' : ''}
              </span>
            </div>

            {cartItems.length === 0 ? (
              <p className="p-cart-empty">Nenhuma peça adicionada ainda.</p>
            ) : (
              <div className="p-cart-items">
                {cartItems.map((item, i) => (
                  <div key={i} className="p-cart-item">
                    <span className="p-cart-item-dot" style={{ background: COLOR_DOTS[item.color] }} />
                    <div className="p-cart-item-info">
                      <span className="p-cart-item-name">{item.color} · {item.size}</span>
                      <span className="p-cart-item-qty">{item.qty} peça{item.qty !== 1 ? 's' : ''}</span>
                    </div>
                    <span className="p-cart-item-price">{(item.qty * PRICE).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
                    <button className="p-cart-item-remove" onClick={() => removeFromCart(i)}>×</button>
                  </div>
                ))}
              </div>
            )}

            <div className="p-sum-divider" />

            <div className="p-cart-total-row">
              <span>Total</span>
              <span className="p-sum-total" style={{ fontSize: '2rem', marginBottom: 0 }}>
                {cartValue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
              </span>
            </div>

            <p className={`p-sum-warn${!ready ? ' error' : ''}`}>
              {ready
                ? 'Frete calculado no checkout.'
                : `Adicione mais ${remaining} peça${remaining !== 1 ? 's' : ''} para atingir o mínimo de ${MIN_ORDER}.`}
            </p>

            <button className="p-btn-checkout" onClick={goCheckout} disabled={!ready}>
              Ir para o Checkout →
            </button>
            <p className="p-payment-note">Pagamento via PIX · Cartão de Crédito</p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="p-faq">
        <div className="p-faq-inner">
          <div className="p-faq-left">
            <span className="p-section-label" style={{ display: 'block', marginBottom: '1rem' }}>Dúvidas</span>
            <h2 className="p-faq-heading">Antes de você<br /><em>perguntar.</em></h2>
            <p className="p-faq-sub">O que mais nos perguntam, respondido direto. Se ficou alguma dúvida, é só chamar no WhatsApp.</p>
          </div>
          <div className="p-faq-right">
            {[
              { q: 'Qual o pedido mínimo?', a: '6 peças do Vestido Creta. Você pode distribuir livremente entre as cores Preto, Cappuccino e Bronze e os tamanhos P, M e G.' },
              { q: 'Posso misturar cores e tamanhos?', a: 'Sim. A grade é totalmente livre — você monta a combinação que fizer mais sentido para a sua loja.' },
              { q: 'Como funciona o pagamento?', a: 'PIX à vista ou cartão de crédito. O pagamento é feito diretamente pelo checkout seguro, sem necessidade de boleto ou transferência manual.' },
              { q: 'Qual o prazo de entrega?', a: 'Até 21 dias úteis após a confirmação do pedido. Trabalhamos com produção sob demanda para garantir a qualidade.' },
              { q: 'Vocês vendem para consumidor final?', a: 'Não. Esta página é exclusiva para lojistas. Para compra no varejo, acesse paneobrasil.com.br.' },
              { q: 'E se vier peça com defeito?', a: 'Troca garantida. Qualquer peça com defeito de fabricação é substituída sem custo adicional. Basta entrar em contato pelo WhatsApp.' },
            ].map((item, i) => (
              <FaqItem key={i} question={item.q} answer={item.a} />
            ))}
          </div>
        </div>
      </section>

      {/* SOBRE */}
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
