'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Suspense } from 'react';
import { motion } from 'framer-motion';
import LeadForm from '@/components/LeadForm';
import TeamMember from '@/components/TeamMember';
import { ArrowRight, CheckCircle2, TrendingUp, Users, Target, ShieldCheck } from 'lucide-react';

export default function Home() {
  const methodFeatures = [
    {
      title: 'Tráfego Qualificado',
      description: 'Chega de curiosos. Atraímos lojistas reais com CNPJ ativo e intenção de compra.',
      icon: <Target className="w-8 h-8 text-blue-400" />
    },
    {
      title: 'Conversão Otimizada',
      description: 'Landing pages e funis de vendas testados para transformar visitantes em pedidos.',
      icon: <TrendingUp className="w-8 h-8 text-green-400" />
    },
    {
      title: 'Comercial Alinhado',
      description: 'Integração direta com seu WhatsApp para seu time não perder o timing da venda.',
      icon: <Users className="w-8 h-8 text-purple-400" />
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <main className="min-h-screen bg-white font-sans text-gray-900 overflow-x-hidden">
      {/* Navbar */}
      <nav className="absolute top-0 left-0 w-full z-50 p-6">
        <div className="container mx-auto flex justify-between items-center">
          <span className="text-2xl font-black text-white drop-shadow-md tracking-tighter">AMO ATACADO</span>
          <Link
            href="#contact"
            className="hidden md:inline-flex px-6 py-2 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-full text-sm font-bold hover:bg-white hover:text-blue-900 transition-all"
          >
            Área do Cliente
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center bg-gray-900 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero-bg.jpg"
            alt="Background Aurora"
            fill
            className="object-cover opacity-80"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/80 to-transparent" />
        </div>

        <div className="container mx-auto px-4 relative z-10 flex flex-col md:flex-row items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="md:w-1/2 text-white mb-10 md:mb-0 pt-20 md:pt-0"
          >
            <div className="inline-block px-4 py-1 mb-4 rounded-full bg-blue-500/20 border border-blue-500/30 backdrop-blur-sm">
              <span className="text-[10px] md:text-xs font-bold tracking-widest uppercase text-blue-300">
                ESPECIALISTAS EM MODA ATACADISTA
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-black leading-tight mb-4 md:mb-6 tracking-tight">
              Transforme sua Marca em uma <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Máquina de Vendas.</span>
            </h1>
            <p className="text-base md:text-lg lg:text-xl text-gray-300 mb-6 md:mb-8 max-w-lg leading-relaxed">
              A estratégia validada para indústrias e confecções que desejam escalar o faturamento através do digital.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
              <Link
                href="#contact"
                className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 md:py-4 md:px-8 text-sm md:text-base rounded-full transition-all hover:scale-105 shadow-xl shadow-blue-600/30"
              >
                Solicitar Análise Gratuita
                <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5" />
              </Link>
              <a
                href="#method"
                className="inline-flex items-center justify-center px-6 py-3 md:py-4 md:px-8 text-sm md:text-base rounded-full text-white border border-white/20 hover:bg-white/10 transition-all font-semibold"
              >
                Como funciona
              </a>
            </div>

            <div className="mt-8 md:mt-12 flex items-center gap-3 md:gap-4 text-xs md:text-sm text-gray-400">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-gray-700 border-2 border-gray-900 flex items-center justify-center text-[10px] md:text-xs">
                    <ShieldCheck className="w-3 h-3 md:w-4 md:h-4 text-green-400" />
                  </div>
                ))}
              </div>
              <p>Junte-se a mais de 50 marcas aceleradas</p>
            </div>
          </motion.div>

          {/* Hero Image (Models) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="md:w-1/2 relative h-[50vh] md:h-[70vh] w-full"
          >
            {/* Round Background */}
            <div className="absolute inset-0 flex items-center justify-center z-0">
              <div className="relative w-[280px] h-[280px] md:w-[450px] lg:w-[550px] animate-pulse-slow">
                <Image
                  src="/images/hero-round-bg.png"
                  alt="Background Circle"
                  fill
                  className="object-contain"
                />
              </div>
            </div>

            <Image
              src="/images/hero-models.png"
              alt="Modelos Fashion"
              fill
              className="object-contain object-bottom drop-shadow-2xl relative z-10"
              priority
            />

            {/* Floating Badge 1: New Client */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: [0, -10, 0] }}
              transition={{
                opacity: { delay: 0.5, duration: 0.5 },
                y: {
                  times: [0, 0.5, 1],
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1
                }
              }}
              className="absolute top-[15%] left-[5%] md:left-[-5%] lg:left-[-8%] bg-white/90 backdrop-blur-md p-3 rounded-2xl shadow-xl border border-white/50 flex items-center gap-3 max-w-[180px] md:max-w-[220px] z-20"
            >
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                <CheckCircle2 className="w-5 h-5 md:w-6 md:h-6 text-green-600" />
              </div>
              <div>
                <p className="font-bold text-gray-900 text-xs md:text-sm leading-tight">+ 1 Cliente Qualificado</p>
                <p className="text-[10px] md:text-xs text-gray-500">Acabou de entrar lead</p>
              </div>
            </motion.div>

            {/* Floating Badge 2: Sales */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: [0, -15, 0] }}
              transition={{
                opacity: { delay: 0.8, duration: 0.5 },
                y: {
                  times: [0, 0.5, 1],
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1.5
                }
              }}
              className="absolute bottom-[20%] right-[5%] md:right-[10%] bg-white/90 backdrop-blur-md p-3 rounded-2xl shadow-xl border border-white/50 flex items-center gap-3 max-w-[180px] md:max-w-[220px] z-20"
            >
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                <TrendingUp className="w-5 h-5 md:w-6 md:h-6 text-blue-600" />
              </div>
              <div>
                <p className="font-bold text-gray-900 text-xs md:text-sm leading-tight">Venda Atacado</p>
                <p className="text-[10px] md:text-xs text-green-600 font-bold">+ R$ 5.600,00</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Intro / Problem Section */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-50 via-white to-white opacity-50" />
        <div className="container mx-auto px-4 text-center max-w-4xl relative z-10">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold mb-8 text-gray-900 tracking-tight"
          >
            Você produz moda de qualidade, mas <span className="text-blue-600">sofre para encontrar lojistas?</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-600 leading-relaxed"
          >
            O mercado mudou. Depender de representantes antigos, feiras caras ou "boca a boca" não é mais suficiente.
            Nós implementamos um ecossistema digital que coloca sua marca na frente de quem compra de verdade.
          </motion.p>
        </div>
      </section>

      {/* Methodology Section */}
      <section id="method" className="py-24 bg-gray-900 text-white relative">
        <div className="container mx-auto px-4">
          <div className="mb-20 text-center">
            <span className="text-blue-400 font-bold uppercase tracking-wider text-sm">NOSSO MÉTODO</span>
            <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6">
              O Ecossistema de Vendas
            </h2>
            <p className="max-w-2xl mx-auto text-gray-400 text-lg">
              Não fazemos apenas "posts". Criamos uma estrutura de aquisição previsível para o seu negócio.
            </p>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid gap-8 md:grid-cols-3"
          >
            {methodFeatures.map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-gray-800/50 backdrop-blur-sm p-10 rounded-3xl border border-gray-700 hover:border-blue-500/50 transition-colors group"
              >
                <div className="mb-6 p-4 bg-gray-900 rounded-2xl w-fit group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4 text-white">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Case Study Section */}
      <section className="py-24 bg-blue-50/50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:w-1/2"
            >
              <span className="text-blue-600 font-bold uppercase tracking-wider text-sm bg-blue-100 px-3 py-1 rounded-full">CASE DE SUCESSO</span>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-6 mb-8">
                Como a Marry Blue <span className="text-blue-600">triplicou</span> o faturamento em 6 meses.
              </h2>
              <div className="space-y-6 text-gray-700 text-lg">
                <p>
                  A marca tinha um produto incrível mas dependia de ações pontuais. Implementamos nossa estrutura de tráfego + comercial e o resultado foi explosivo.
                </p>
                <ul className="space-y-4 font-medium mt-8">
                  {[
                    "Reposicionamento de marca completo",
                    "Criação de time comercial ativo",
                    "ROI de 15x sobre o investimento"
                  ].map((item, i) => (
                    <li key={i} className="flex items-center p-4 bg-white rounded-xl shadow-sm border border-gray-100">
                      <CheckCircle2 className="w-6 h-6 text-green-500 mr-4 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="lg:w-1/2 relative h-[600px] w-full rounded-3xl overflow-hidden shadow-2xl border-8 border-white group"
            >
              <Image
                src="/images/clients/marry-blue-1.png"
                alt="Case Marry Blue"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute bottom-0 left-0 w-full p-8 bg-gradient-to-t from-black/80 to-transparent text-white">
                <p className="font-bold text-xl">@usemarryblue</p>
                <p className="text-sm opacity-80">Moda Feminina Atacado</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <span className="text-blue-600 font-bold uppercase tracking-wider text-sm">OS ESPECIALISTAS</span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-4">
              Quem vai escalar sua marca
            </h2>
          </div>

          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12">
            <TeamMember
              name="Daniel Guedes"
              role="Estrategista de Tráfego"
              imageSrc="/images/daniel.png"
            />
            <TeamMember
              name="Ana Paula"
              role="Diretora de Operações"
              imageSrc="/images/ana-paula.png"
            />
          </div>
          <p className="text-center mt-12 text-gray-500 max-w-2xl mx-auto">
            Combinamos experiência em moda com domínio técnico de ferramentas de performance para entregar o que importa: <strong>Vendas.</strong>
          </p>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="contact" className="py-24 bg-gray-900 text-white relative overflow-hidden">
        {/* Decorative Circles */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-600/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="text-4xl md:text-6xl font-black mb-8 leading-tight">
                Pronto para o próximo nível?
              </h2>
              <p className="text-xl text-gray-300 mb-12 leading-relaxed">
                Preencha o formulário para receber um <strong>diagnóstico gratuito</strong> do seu momento atual e descobrir o potencial de crescimento da sua marca.
              </p>

              <div className="flex flex-col gap-6">
                <div className="p-6 bg-gray-800/50 border border-gray-700 rounded-2xl backdrop-blur-sm">
                  <h4 className="font-bold text-lg mb-2 text-blue-400">🔥 Aceleração Imediata</h4>
                  <p className="text-gray-400 text-sm">
                    Identificamos gargalos e oportunidades de venda logo na primeira semana.
                  </p>
                </div>
                <div className="p-6 bg-gray-800/50 border border-gray-700 rounded-2xl backdrop-blur-sm">
                  <h4 className="font-bold text-lg mb-2 text-purple-400">💎 Design & Branding</h4>
                  <p className="text-gray-400 text-sm mb-2">
                    Parceria exclusiva com <strong>Dua Criativa</strong> para elevar o visual da sua marca.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white text-gray-900 p-10 rounded-3xl shadow-2xl relative">
              <div className="absolute -top-6 -right-6 bg-green-500 text-white px-6 py-2 rounded-full font-bold shadow-lg transform rotate-3">
                Vagas Limitadas
              </div>
              <h3 className="text-2xl font-bold mb-2">Solicite sua Análise</h3>
              <p className="text-gray-500 mb-8 text-sm">Nossa equipe entrará em contato em até 24h.</p>
              <Suspense fallback={<div className="p-10 text-center animate-pulse bg-gray-100 rounded-xl">Carregando formulário...</div>}>
                <LeadForm />
              </Suspense>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-16 border-t border-gray-800">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-8 text-center md:text-left">
          <div>
            <span className="text-2xl font-black text-white tracking-tighter">AMO ATACADO</span>
            <p className="text-gray-500 text-sm mt-2 max-w-xs">
              Transformando a indústria da moda através do digital.
            </p>
          </div>
          <div className="flex flex-col md:flex-row gap-8 text-gray-400 text-sm">
            <Link href="#" className="hover:text-white transition-colors">Termos de Uso</Link>
            <Link href="#" className="hover:text-white transition-colors">Política de Privacidade</Link>
            <Link href="https://instagram.com" className="hover:text-white transition-colors">Instagram</Link>
          </div>
        </div>
        <div className="container mx-auto px-4 mt-8 pt-8 border-t border-gray-900 text-center text-gray-600 text-xs">
          © {new Date().getFullYear()} Amo Atacado. Todos os direitos reservados.
        </div>
      </footer>
    </main>
  );
}
