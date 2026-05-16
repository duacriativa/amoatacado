'use client';

import { useState, Suspense } from 'react';
import Link from 'next/link';
import { motion, type Variants } from 'framer-motion';
import LeadForm from '@/components/LeadForm';
import {
  ArrowRight,
  Check,
  Zap,
  Database,
  Globe,
  Clock,
  DollarSign,
  ChevronDown,
  MessageCircle,
  X,
  ShoppingBag,
  BarChart3,
  Smartphone,
} from 'lucide-react';

const plans: {
  name: string;
  price: string;
  setup?: string;
  description: string;
  highlight: boolean;
  badge: string | null;
  features: string[];
}[] = [
  {
    name: 'Essencial',
    price: '197',
    description: 'Sua marca no digital com página profissional e banco de dados de leads.',
    highlight: false,
    badge: null,
    features: [
      'Landing page com SEO',
      'Formulário de captura de leads',
      'Banco de dados de todos os contatos',
      'Filtros por coleção e produto',
      'Painel de gestão dos leads',
      'Suporte especializado em moda',
    ],
  },
  {
    name: 'Conectado',
    price: '397',
    setup: '900',
    description: 'Página + CRM Kommo integrado para seu time não perder nenhum lead.',
    highlight: true,
    badge: 'Mais popular',
    features: [
      'Tudo do Essencial',
      'Kommo CRM — 1 usuário incluso',
      'Pipeline de vendas automático',
      'Histórico de todas as conversas',
      'App mobile para o time',
      'Integração com WhatsApp',
    ],
  },
  {
    name: 'Automatizado',
    price: '597',
    setup: '900',
    description: 'Solução completa: recepção automática, envio de catálogo e follow-up no piloto automático.',
    highlight: false,
    badge: null,
    features: [
      'Tudo do Conectado',
      'Recepção automática de leads',
      'Envio automático de catálogo',
      'Follow-up automático',
      'Notificações para o time',
      'Onboarding dedicado',
    ],
  },
];

const faqs = [
  {
    q: 'Em quanto tempo minha página fica pronta?',
    a: 'Em até 72h após a aprovação do briefing. Você recebe o link para revisar antes de publicar.',
  },
  {
    q: 'Preciso saber de tecnologia?',
    a: 'Não. Fazemos tudo por você — desenvolvimento, hospedagem e configuração. Você só aprova o resultado.',
  },
  {
    q: 'O que está incluso na integração de R$900?',
    a: 'A integração cobre os primeiros 6 meses de licença do Kommo (1 usuário) + toda a configuração e conexão com sua página. Você não contrata o Kommo separado, não instala nada — fazemos tudo.',
  },
  {
    q: 'E se eu precisar de mais de 1 usuário no Kommo?',
    a: 'Cada usuário adicional custa +R$135/mês, contratado em ciclos semestrais (R$810 por usuário a cada 6 meses). Basta nos avisar e adicionamos sem burocracia.',
  },
  {
    q: 'Posso mudar de plano depois?',
    a: 'Sim, a qualquer momento. Upgrade ou downgrade sem burocracia.',
  },
  {
    q: 'Tem contrato de fidelidade?',
    a: 'Não. Cancela quando quiser, sem multa. Nossa relação é mensal.',
  },
  {
    q: 'Funciona para qualquer tipo de atacado?',
    a: 'Somos especializados em moda e vestuário atacado. Entendemos o seu vocabulário, o processo de venda e o catálogo do seu nicho.',
  },
];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' as const } },
};

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

export default function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <main className="min-h-screen bg-white font-sans text-gray-900 overflow-x-hidden">

      {/* ── Navbar ── */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-5 h-16 flex items-center justify-between">
          <span className="text-xl font-black tracking-tight text-blue-700">AMO ATACADO</span>
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-500">
            <a href="#como-funciona" className="hover:text-gray-900 transition-colors">Como funciona</a>
            <a href="#planos" className="hover:text-gray-900 transition-colors">Planos</a>
            <a href="#faq" className="hover:text-gray-900 transition-colors">FAQ</a>
          </nav>
          <a
            href="#contato"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-all hover:scale-105"
          >
            Quero minha página <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </header>

      {/* ── Hero ── */}
      <section className="relative pt-20 pb-28 px-5 bg-white overflow-hidden">
        {/* subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)',
            backgroundSize: '64px 64px',
          }}
        />
        <div className="absolute -top-32 right-0 w-[600px] h-[600px] bg-blue-50 rounded-full blur-3xl opacity-60 pointer-events-none" />

        <div className="relative max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="max-w-3xl"
          >
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2 mb-6 px-3 py-1.5 bg-blue-50 border border-blue-100 rounded-full text-xs font-semibold text-blue-700 uppercase tracking-widest">
              <ShoppingBag className="w-3.5 h-3.5" />
              Especialistas em atacado de moda
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="text-5xl md:text-6xl lg:text-7xl font-black leading-[1.05] tracking-tight text-gray-900 mb-6"
            >
              Chega de perder{' '}
              <span className="text-blue-600">leads</span>{' '}
              no WhatsApp.
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="text-lg md:text-xl text-gray-500 leading-relaxed mb-10 max-w-2xl"
            >
              Crie sua página profissional com SEO, banco de dados e CRM integrado —
              sua marca no digital em dias, sem agência, sem complicação.
            </motion.p>

            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-3">
              <a
                href="#contato"
                className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-4 rounded-full transition-all hover:scale-105 shadow-lg shadow-blue-200 text-base"
              >
                Quero minha página <ArrowRight className="w-5 h-5" />
              </a>
              <a
                href="#como-funciona"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border border-gray-200 text-gray-700 hover:border-gray-400 transition-all font-semibold text-base"
              >
                Ver como funciona
              </a>
            </motion.div>
          </motion.div>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-px bg-gray-100 border border-gray-100 rounded-2xl overflow-hidden"
          >
            {[
              { value: '72h', label: 'Página no ar' },
              { value: 'R$197', label: 'A partir de' },
              { value: 'Kommo', label: 'CRM incluso' },
              { value: 'SEO', label: 'Do Google pra você' },
            ].map((stat) => (
              <div key={stat.label} className="bg-white px-8 py-6 text-center">
                <p className="text-2xl font-black text-blue-600 mb-1">{stat.value}</p>
                <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Brands bar ── */}
      <section className="py-12 bg-gray-50 border-y border-gray-100">
        <div className="max-w-6xl mx-auto px-5 text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-8">
            Já confiam na AmoAtacado
          </p>
          <div className="flex flex-wrap justify-center gap-10 items-center">
            {['Kyrefh', 'Sunliv', 'Liberty Jeans'].map((brand) => (
              <span key={brand} className="text-gray-400 font-black text-lg tracking-tight">{brand}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Problem section ── */}
      <section className="py-24 px-5 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={stagger}
            className="text-center mb-16"
          >
            <motion.p variants={fadeUp} className="text-xs font-semibold uppercase tracking-widest text-blue-600 mb-4">
              O problema
            </motion.p>
            <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-black text-gray-900 leading-tight max-w-3xl mx-auto">
              Tudo que você perde vendendo{' '}
              <span className="text-gray-400 line-through decoration-red-400">só pelo WhatsApp</span>
            </motion.h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={stagger}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {[
              { icon: <MessageCircle className="w-5 h-5" />, text: 'Cliente pede catálogo, você manda, ele some — e você esquece' },
              { icon: <Database className="w-5 h-5" />, text: 'Nenhum banco de dados de quem demonstrou interesse' },
              { icon: <X className="w-5 h-5" />, text: 'Histórico de lead perdido no celular do vendedor' },
              { icon: <Globe className="w-5 h-5" />, text: 'Seu concorrente aparece no Google, você não existe' },
              { icon: <BarChart3 className="w-5 h-5" />, text: 'Sem métricas: você não sabe de onde vêm seus melhores clientes' },
              { icon: <DollarSign className="w-5 h-5" />, text: 'Agência cobrou R$5.000, demorou 2 meses e entregou página genérica' },
            ].map((item, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="flex items-start gap-4 p-5 rounded-2xl bg-red-50 border border-red-100"
              >
                <span className="text-red-400 mt-0.5 flex-shrink-0">{item.icon}</span>
                <p className="text-gray-700 text-sm leading-relaxed font-medium">{item.text}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── How it works ── */}
      <section id="como-funciona" className="py-24 px-5 bg-gray-950 text-white overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={stagger}
            className="text-center mb-24"
          >
            <motion.p variants={fadeUp} className="text-xs font-semibold uppercase tracking-widest text-blue-400 mb-4">
              Como funciona
            </motion.p>
            <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-black text-white leading-tight">
              Veja o sistema funcionando
            </motion.h2>
            <motion.p variants={fadeUp} className="text-gray-400 mt-4 text-lg max-w-2xl mx-auto">
              Do lead à venda — sem você fazer nada manualmente.
            </motion.p>
          </motion.div>

          <div className="space-y-32">

            {/* Step 1 — Lead chega */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
              variants={stagger}
              className="grid md:grid-cols-2 gap-12 items-center"
            >
              <motion.div variants={fadeUp}>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-green-500/10 border border-green-500/20 rounded-full text-xs font-bold text-green-400 uppercase tracking-widest mb-6">
                  ⚡ Tempo real
                </span>
                <p className="text-7xl font-black text-gray-800 mb-4 leading-none">01</p>
                <h3 className="text-2xl md:text-3xl font-black text-white mb-4">Lojista pediu catálogo. CRM já sabe.</h3>
                <p className="text-gray-400 leading-relaxed">
                  Assim que o lojista preenche o formulário na sua página, o lead entra automaticamente no CRM com nome, telefone e interesse — pronto para você abordar, sem nenhum dado perdido.
                </p>
              </motion.div>

              <motion.div variants={fadeUp} className="flex justify-center">
                <div className="relative">
                  <div className="w-[272px] bg-gray-800 rounded-[40px] p-3 shadow-2xl border border-gray-700">
                    <div className="bg-gray-900 rounded-[32px] overflow-hidden h-[460px]">
                      <div className="flex justify-between items-center px-5 pt-4 pb-2">
                        <span className="text-white text-xs font-semibold">9:41</span>
                        <div className="w-4 h-2.5 border border-white/40 rounded-sm"><div className="w-3 h-1.5 bg-white/60 rounded-sm m-px" /></div>
                      </div>
                      <div className="px-4 py-2 bg-gray-800/50 flex items-center gap-3">
                        <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs font-bold">K</span>
                        </div>
                        <div>
                          <p className="text-white text-xs font-semibold">Kommo CRM</p>
                          <p className="text-gray-400 text-[10px]">Sua Marca — Funil de Vendas</p>
                        </div>
                      </div>
                      <motion.div
                        initial={{ opacity: 0, y: -16, scale: 0.95 }}
                        whileInView={{ opacity: 1, y: 0, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4, duration: 0.45, type: 'spring' }}
                        className="mx-3 mt-4 bg-blue-600 rounded-2xl p-4"
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                          <span className="text-blue-100 text-[10px] font-semibold uppercase tracking-wider">Novo Lead</span>
                        </div>
                        <p className="text-white font-bold text-sm mb-1">Ana Rodrigues</p>
                        <p className="text-blue-100 text-xs">Quer revender · Solicita catálogo</p>
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.9, duration: 0.4 }}
                        className="mx-3 mt-3 bg-gray-800 rounded-2xl p-4 border border-gray-700"
                      >
                        <p className="text-gray-500 text-[10px] uppercase tracking-wider mb-3">Detalhes do lead</p>
                        <div className="space-y-2">
                          {[
                            { label: 'Telefone', value: '(11) 99999-0000', color: 'text-white' },
                            { label: 'Interesse', value: 'Revenda', color: 'text-blue-400 font-bold' },
                            { label: 'Etapa', value: 'Novo Lead ✓', color: 'text-green-400' },
                          ].map((row) => (
                            <div key={row.label} className="flex justify-between">
                              <span className="text-gray-500 text-xs">{row.label}</span>
                              <span className={`text-xs ${row.color}`}>{row.value}</span>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    </div>
                  </div>
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 1.2, duration: 0.4 }}
                    className="absolute -right-3 top-14 bg-green-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg whitespace-nowrap"
                  >
                    ✓ Lead no CRM
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>

            {/* Step 2 — Robô atende */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
              variants={stagger}
              className="grid md:grid-cols-2 gap-12 items-center"
            >
              <motion.div variants={fadeUp} className="flex justify-center order-2 md:order-1">
                <div className="relative">
                  <div className="w-[272px] bg-gray-800 rounded-[40px] p-3 shadow-2xl border border-gray-700">
                    <div className="bg-[#0b141a] rounded-[32px] overflow-hidden h-[460px]">
                      <div className="bg-[#1f2c34] px-4 pt-8 pb-3 flex items-center gap-3">
                        <div className="w-9 h-9 bg-blue-600 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs font-black">A</span>
                        </div>
                        <div>
                          <p className="text-white text-sm font-semibold">Daniel</p>
                          <p className="text-gray-400 text-[10px]">online agora</p>
                        </div>
                      </div>
                      <div className="p-3 space-y-2">
                        {[
                          { text: 'Oi Ana! 👋 Vi que você quer conhecer nossa linha pra revender — que boa escolha! 💙', delay: 0.3, time: '14:32' },
                          { text: 'Já vou te mandar o catálogo completo com todos os modelos e condições de atacado 😊', delay: 0.9, time: '14:32' },
                          { text: 'Tem algum modelo específico que te interessa?', delay: 1.5, time: '14:33' },
                        ].map((bubble, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -16 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: bubble.delay, duration: 0.4 }}
                          >
                            <div className="bg-[#202c33] rounded-2xl rounded-tl-none px-3 py-2 max-w-[210px]">
                              <p className="text-white text-[11px] leading-relaxed">{bubble.text}</p>
                              <p className="text-gray-500 text-[9px] text-right mt-1">{bubble.time} ✓✓</p>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 2, duration: 0.4 }}
                    className="absolute -left-3 top-24 bg-blue-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg whitespace-nowrap"
                  >
                    ⚡ Respondido em 30s
                  </motion.div>
                </div>
              </motion.div>

              <motion.div variants={fadeUp} className="order-1 md:order-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full text-xs font-bold text-blue-400 uppercase tracking-widest mb-6">
                  🤖 Robô ativo
                </span>
                <p className="text-7xl font-black text-gray-800 mb-4 leading-none">02</p>
                <h3 className="text-2xl md:text-3xl font-black text-white mb-4">Primeiro contato em menos de 30 segundos.</h3>
                <p className="text-gray-400 leading-relaxed">
                  O bot responde pelo nome do lojista, apresenta a marca e já avisa que o catálogo está a caminho. Parece mensagem digitada na hora — mas é 100% automático.
                </p>
              </motion.div>
            </motion.div>

            {/* Step 3 — Catálogo */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
              variants={stagger}
              className="grid md:grid-cols-2 gap-12 items-center"
            >
              <motion.div variants={fadeUp}>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-purple-500/10 border border-purple-500/20 rounded-full text-xs font-bold text-purple-400 uppercase tracking-widest mb-6">
                  📦 Automático
                </span>
                <p className="text-7xl font-black text-gray-800 mb-4 leading-none">03</p>
                <h3 className="text-2xl md:text-3xl font-black text-white mb-4">Catálogo enviado sem ninguém apertar um botão.</h3>
                <p className="text-gray-400 leading-relaxed">
                  O link do catálogo vai no WhatsApp do lojista na hora — sem você enviar, sem esquecer, sem depender do vendedor estar online. O vendedor só entra quando o cliente está pronto.
                </p>
              </motion.div>

              <motion.div variants={fadeUp} className="flex justify-center">
                <div className="relative">
                  <div className="w-[272px] bg-gray-800 rounded-[40px] p-3 shadow-2xl border border-gray-700">
                    <div className="bg-[#0b141a] rounded-[32px] overflow-hidden h-[460px]">
                      <div className="bg-[#1f2c34] px-4 pt-8 pb-3 flex items-center gap-3">
                        <div className="w-9 h-9 bg-blue-600 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs font-black">A</span>
                        </div>
                        <div>
                          <p className="text-white text-sm font-semibold">Daniel</p>
                          <p className="text-gray-400 text-[10px]">online agora</p>
                        </div>
                      </div>
                      <div className="p-3 space-y-2">
                        <motion.div
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.2 }}
                        >
                          <div className="bg-[#202c33] rounded-2xl rounded-tl-none px-3 py-2 max-w-[180px]">
                            <p className="text-white text-[11px]">Sim! Manda o catálogo 🙏</p>
                            <p className="text-gray-500 text-[9px] text-right mt-1">14:33</p>
                          </div>
                        </motion.div>
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.7, duration: 0.4 }}
                        >
                          <div className="bg-[#202c33] rounded-2xl rounded-tl-none overflow-hidden max-w-[220px]">
                            <div className="bg-blue-900/50 px-3 py-2 border-l-2 border-blue-500">
                              <p className="text-blue-400 text-[9px] font-semibold uppercase tracking-wider mb-1">Catálogo Digital</p>
                              <p className="text-white text-[11px] font-semibold">Coleção Nova · Condições de Atacado</p>
                              <p className="text-gray-400 text-[9px]">Sua Marca — Revenda</p>
                            </div>
                            <div className="px-3 py-2">
                              <p className="text-white text-[11px] leading-relaxed">Aqui está o catálogo completo 👆 Qualquer dúvida sobre modelos ou pedido mínimo é só falar!</p>
                              <p className="text-gray-500 text-[9px] text-right mt-1">14:33 ✓✓</p>
                            </div>
                          </div>
                        </motion.div>
                      </div>
                    </div>
                  </div>
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 1.2, duration: 0.4 }}
                    className="absolute -right-3 bottom-20 bg-purple-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg whitespace-nowrap"
                  >
                    📦 Catálogo enviado
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>

            {/* Step 4 — Follow-up */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
              variants={stagger}
              className="grid md:grid-cols-2 gap-12 items-center"
            >
              <motion.div variants={fadeUp} className="flex justify-center order-2 md:order-1">
                <div className="relative">
                  <div className="w-[272px] bg-gray-800 rounded-[40px] p-3 shadow-2xl border border-gray-700">
                    <div className="bg-[#0b141a] rounded-[32px] overflow-hidden h-[460px]">
                      <div className="bg-[#1f2c34] px-4 pt-8 pb-3 flex items-center gap-3">
                        <div className="w-9 h-9 bg-blue-600 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs font-black">A</span>
                        </div>
                        <div>
                          <p className="text-white text-sm font-semibold">Daniel</p>
                          <p className="text-gray-400 text-[10px]">online agora</p>
                        </div>
                      </div>
                      <div className="p-3 space-y-2">
                        <motion.div
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.3 }}
                          className="text-center"
                        >
                          <span className="text-gray-500 text-[9px] bg-gray-800/50 px-3 py-1 rounded-full">24 horas depois</span>
                        </motion.div>
                        <motion.div
                          initial={{ opacity: 0, x: -16 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.8, duration: 0.4 }}
                        >
                          <div className="bg-[#202c33] rounded-2xl rounded-tl-none px-3 py-2 max-w-[210px]">
                            <p className="text-white text-[11px] leading-relaxed">Ana, vi que você recebeu o catálogo mas não voltou 😊 Ficou alguma dúvida sobre os modelos ou condições?</p>
                            <p className="text-gray-500 text-[9px] text-right mt-1">10:15 ✓✓</p>
                          </div>
                        </motion.div>
                        <motion.div
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: 1.5 }}
                          className="flex justify-end"
                        >
                          <div className="bg-[#005c4b] rounded-2xl rounded-tr-none px-3 py-2 max-w-[160px]">
                            <p className="text-white text-[11px]">Oi! Quero fechar pedido! 🛍️</p>
                            <p className="text-[#8ecea2] text-[9px] text-right mt-1">10:18 ✓✓</p>
                          </div>
                        </motion.div>
                      </div>
                    </div>
                  </div>
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 1.8, duration: 0.4 }}
                    className="absolute -left-3 bottom-20 bg-green-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg whitespace-nowrap"
                  >
                    🎉 Venda fechada!
                  </motion.div>
                </div>
              </motion.div>

              <motion.div variants={fadeUp} className="order-1 md:order-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-orange-500/10 border border-orange-500/20 rounded-full text-xs font-bold text-orange-400 uppercase tracking-widest mb-6">
                  🔁 Follow-up automático
                </span>
                <p className="text-7xl font-black text-gray-800 mb-4 leading-none">04</p>
                <h3 className="text-2xl md:text-3xl font-black text-white mb-4">Nenhum lojista esquecido. Jamais.</h3>
                <p className="text-gray-400 leading-relaxed">
                  Se o lojista recebeu o catálogo mas sumiu, o bot dispara follow-ups sequenciais automaticamente. Você recupera vendas que antes morriam no vácuo — sem esforço nenhum.
                </p>
              </motion.div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ── Plans ── */}
      <section id="planos" className="py-24 px-5 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={stagger}
            className="text-center mb-16"
          >
            <motion.p variants={fadeUp} className="text-xs font-semibold uppercase tracking-widest text-blue-600 mb-4">
              Planos
            </motion.p>
            <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-black text-gray-900 leading-tight">
              Escolha seu ponto de partida
            </motion.h2>
            <motion.p variants={fadeUp} className="text-gray-500 mt-4 text-lg">
              Essencial sem integração. Planos com CRM têm integração única de R$900.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={stagger}
            className="grid md:grid-cols-3 gap-6"
          >
            {plans.map((plan) => (
              <motion.div
                key={plan.name}
                variants={fadeUp}
                className={`relative flex flex-col rounded-3xl p-8 border transition-all ${
                  plan.highlight
                    ? 'bg-blue-600 border-blue-600 text-white shadow-2xl shadow-blue-200 scale-[1.02]'
                    : 'bg-white border-gray-200 text-gray-900 hover:border-blue-200 hover:shadow-lg'
                }`}
              >
                {plan.badge && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs font-bold px-4 py-1 rounded-full">
                    {plan.badge}
                  </span>
                )}

                <div className="mb-8">
                  <h3 className={`text-lg font-bold mb-2 ${plan.highlight ? 'text-blue-100' : 'text-gray-500'}`}>
                    {plan.name}
                  </h3>
                  <div className="flex items-end gap-1 mb-1">
                    <span className={`text-sm font-semibold ${plan.highlight ? 'text-blue-200' : 'text-gray-400'}`}>R$</span>
                    <span className="text-5xl font-black leading-none">{plan.price}</span>
                    <span className={`text-sm mb-1 ${plan.highlight ? 'text-blue-200' : 'text-gray-400'}`}>/mês</span>
                  </div>
                  {plan.setup ? (
                    <p className={`text-xs font-medium mb-4 ${plan.highlight ? 'text-blue-200' : 'text-gray-400'}`}>
                      + R${plan.setup} integração única
                    </p>
                  ) : (
                    <p className={`text-xs font-medium mb-4 ${plan.highlight ? 'text-blue-200' : 'text-gray-400'}`}>
                      sem integração
                    </p>
                  )}
                  <p className={`text-sm leading-relaxed ${plan.highlight ? 'text-blue-100' : 'text-gray-500'}`}>
                    {plan.description}
                  </p>
                </div>

                <ul className="space-y-3 mb-5 flex-1">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-sm">
                      <Check
                        className={`w-4 h-4 mt-0.5 flex-shrink-0 ${
                          plan.highlight ? 'text-blue-200' : 'text-blue-500'
                        }`}
                      />
                      <span className={plan.highlight ? 'text-white' : 'text-gray-700'}>{feature}</span>
                    </li>
                  ))}
                </ul>

                {plan.setup && (
                  <div
                    className={`mb-6 px-3 py-2.5 rounded-xl text-xs leading-snug ${
                      plan.highlight
                        ? 'bg-blue-500/40 text-blue-100'
                        : 'bg-amber-50 border border-amber-100 text-amber-700'
                    }`}
                  >
                    <span className="font-semibold">Kommo: 1 usuário incluso.</span>{' '}
                    Usuário adicional:{' '}
                    <span className={plan.highlight ? 'text-blue-100 font-semibold' : 'text-amber-700 font-semibold'}>
                      +R$135/mês
                    </span>{' '}
                    <span className={plan.highlight ? 'text-blue-200' : 'text-amber-500'}>
                      (ciclo semestral)
                    </span>
                  </div>
                )}

                <a
                  href="#contato"
                  className={`w-full flex items-center justify-center gap-2 py-3.5 rounded-full font-bold text-sm transition-all hover:scale-105 ${
                    plan.highlight
                      ? 'bg-white text-blue-600 hover:bg-blue-50'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  Começar agora <ArrowRight className="w-4 h-4" />
                </a>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Differentials ── */}
      <section className="py-24 px-5 bg-gray-50 border-y border-gray-100">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={stagger}
            className="text-center mb-16"
          >
            <motion.p variants={fadeUp} className="text-xs font-semibold uppercase tracking-widest text-blue-600 mb-4">
              Por que a AmoAtacado
            </motion.p>
            <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-black text-gray-900 leading-tight">
              Não somos uma agência genérica.
            </motion.h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={stagger}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {[
              {
                icon: <ShoppingBag className="w-6 h-6 text-blue-600" />,
                title: 'Especialistas em atacado de moda',
                description:
                  'Entendemos seu catálogo, seu processo de venda e o vocabulário do seu nicho. Não explicamos o básico.',
              },
              {
                icon: <Zap className="w-6 h-6 text-blue-600" />,
                title: 'Kommo já integrado',
                description:
                  'Somos parceiros Kommo. Você não precisa contratar, configurar nem entender de tecnologia — entregamos tudo pronto e integrado.',
              },
              {
                icon: <Clock className="w-6 h-6 text-blue-600" />,
                title: 'Página no ar em 72h',
                description:
                  'Enquanto agência leva meses, você já começa a captar leads nesta semana.',
              },
              {
                icon: <DollarSign className="w-6 h-6 text-blue-600" />,
                title: 'Fração do custo de agência',
                description:
                  'Agências cobram R$5.000 só de setup. Aqui você começa por R$197/mês, e planos com CRM têm integração única de R$900 — já inclui 6 meses de Kommo.',
              },
            ].map((item) => (
              <motion.div
                key={item.title}
                variants={fadeUp}
                className="bg-white rounded-2xl p-7 border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="p-2.5 bg-blue-50 rounded-xl w-fit mb-5">{item.icon}</div>
                <h3 className="font-bold text-gray-900 mb-2 text-base">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section id="faq" className="py-24 px-5 bg-white">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={stagger}
            className="text-center mb-14"
          >
            <motion.p variants={fadeUp} className="text-xs font-semibold uppercase tracking-widest text-blue-600 mb-4">
              Dúvidas frequentes
            </motion.p>
            <motion.h2 variants={fadeUp} className="text-4xl font-black text-gray-900">
              FAQ
            </motion.h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={stagger}
            className="divide-y divide-gray-100 border border-gray-100 rounded-2xl overflow-hidden"
          >
            {faqs.map((faq, i) => (
              <motion.div key={i} variants={fadeUp}>
                <button
                  className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left hover:bg-gray-50 transition-colors"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span className="font-semibold text-gray-900 text-sm leading-snug">{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-gray-400 flex-shrink-0 transition-transform duration-200 ${
                      openFaq === i ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-5 text-sm text-gray-500 leading-relaxed bg-gray-50">
                    {faq.a}
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Contact form ── */}
      <section id="contato" className="py-24 px-5 bg-gray-950 text-white relative overflow-hidden">
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-40 -left-40 w-[400px] h-[400px] bg-blue-800/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-6xl mx-auto relative grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={stagger}
          >
            <motion.p variants={fadeUp} className="text-xs font-semibold uppercase tracking-widest text-blue-400 mb-4">
              Vamos começar
            </motion.p>
            <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-black leading-tight mb-6">
              Pronto para sair do WhatsApp e escalar?
            </motion.h2>
            <motion.p variants={fadeUp} className="text-gray-400 text-lg leading-relaxed mb-10">
              Preencha o formulário e nossa equipe entra em contato em até 1 hora para entender o seu negócio e apresentar a solução certa.
            </motion.p>

            <motion.div variants={fadeUp} className="space-y-4">
              {[
                { icon: <Clock className="w-5 h-5 text-blue-400" />, text: 'Resposta em até 1 minuto' },
                { icon: <Smartphone className="w-5 h-5 text-blue-400" />, text: 'Página no ar em até 72h' },
                { icon: <DollarSign className="w-5 h-5 text-blue-400" />, text: 'Essencial sem integração. CRM com integração única.' },
              ].map((item) => (
                <div key={item.text} className="flex items-center gap-3 text-sm text-gray-300">
                  {item.icon}
                  <span>{item.text}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6 }}
            className="bg-white text-gray-900 rounded-3xl p-8 shadow-2xl"
          >
            <h3 className="text-xl font-bold mb-1">Solicite sua página agora</h3>
            <p className="text-gray-500 text-sm mb-8">Nossa equipe entra em contato em até 1 minuto.</p>
            <Suspense fallback={<div className="p-10 text-center animate-pulse bg-gray-100 rounded-xl text-gray-400 text-sm">Carregando...</div>}>
              <LeadForm clientSlug="amo-atacado" />
            </Suspense>
          </motion.div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="bg-black text-white py-12 border-t border-gray-900">
        <div className="max-w-6xl mx-auto px-5 flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
          <div>
            <span className="text-xl font-black tracking-tight text-white">AMO ATACADO</span>
            <p className="text-gray-600 text-xs mt-1">Atacado de moda no digital.</p>
          </div>
          <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-500">
            <Link href="#" className="hover:text-white transition-colors">Termos de Uso</Link>
            <Link href="#" className="hover:text-white transition-colors">Privacidade</Link>
            <a href="https://instagram.com" className="hover:text-white transition-colors">Instagram</a>
          </div>
          <p className="text-gray-700 text-xs">© {new Date().getFullYear()} Amo Atacado</p>
        </div>
      </footer>
    </main>
  );
}
