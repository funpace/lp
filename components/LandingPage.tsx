import React, { useState, useEffect, useRef } from 'react';
import { Zap, Trophy, Shield, ArrowRight, Activity, Cpu, Users, Star, Crown, Check, Play, Sparkles, Smartphone, Watch, ChevronDown, Loader2, BarChart3, Target, Map, Globe, Lock, TrendingUp, Hexagon } from 'lucide-react';
import MethodologyView from './MethodologyView';
import ManifestoView from './ManifestoView';
import CollectiveView from './CollectiveView';
import PerformanceView from './PerformanceView';
import CurrencyView from './CurrencyView';
import PartnershipView from './PartnershipView';

import { Menu, X } from 'lucide-react';

interface Props {
  onJoin: () => void;
  onLogin: () => void;
  onCheckout: () => void;
  theme: 'dark' | 'light';
}

type ViewState =  'manifesto' | 'collective' | 'performance' | 'currency' | 'partnership';

const LandingPage: React.FC<Props> = ({ onJoin, onLogin, onCheckout }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [showNav, setShowNav] = useState(true);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [showMethodology, setShowMethodology] = useState(false);

  const [currentView, setCurrentView] = useState<ViewState>('landing');

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const HERO_VIDEOS = [
    "https://videos.pexels.com/video-files/3763989/3763989-uhd_2560_1440_25fps.mp4",
    "https://videos.pexels.com/video-files/5319759/5319759-uhd_2560_1440_25fps.mp4",
    "https://videos.pexels.com/video-files/6388394/6388394-uhd_2560_1440_25fps.mp4"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentVideoIndex((prev) => (prev + 1) % HERO_VIDEOS.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setShowNav(false);
      } else {
        setShowNav(true);
      }
      setIsScrolled(currentScrollY > 50);
      setLastScrollY(currentScrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const scrollPosition = useRef(0);

  if (showMethodology) {
    return <MethodologyView onBack={() => {
      setShowMethodology(false);
      window.scrollTo(0, scrollPosition.current);
    }} onApply={onJoin} />;
  }

    if (currentView === 'manifesto') {
    return <ManifestoView onBack={() => setCurrentView('landing')} />;
  }
  if (currentView === 'collective') {
    return <CollectiveView onBack={() => setCurrentView('landing')} />;
  }
  if (currentView === 'performance') {
    return <PerformanceView onBack={() => setCurrentView('landing')} />;
  }
  if (currentView === 'currency') {
    return <CurrencyView onBack={() => setCurrentView('landing')} />;
  }
  if (currentView === 'partnership') {
    return <PartnershipView onBack={() => setCurrentView('landing')} />;
  }

  return (
    <div className="min-h-screen bg-off-black text-white selection:bg-neon-volt selection:text-black font-sans overflow-x-hidden">
      
      {/* Sticky Header */}
      {/* <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ease-in-out transform  ${isScrolled ? 'bg-off-black/95 backdrop-blur-md border-b border-white/10 shadow-md' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-6 sm:px-0 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2 group cursor-pointer">
            <img src="/lp/logo.png" alt="FUNPACE" className="w-full h-6 object-contain" />
          </div>
          <div className="hidden md:flex items-center gap-8"></div>
          <div className="flex items-center gap-6">
            <button onClick={() => setCurrentView('manifesto')} className="text-xs font-mono uppercase tracking-widest text-neutral-400 hover:text-white transition-colors">Manifesto</button>
            <button onClick={() => setCurrentView('collective')} className="text-xs font-mono uppercase tracking-widest text-neutral-400 hover:text-white transition-colors">Coletivo</button>
            <button onClick={() => setCurrentView('currency')} className="text-xs font-mono uppercase tracking-widest text-neutral-400 hover:text-white transition-colors">Moeda</button>
            <button onClick={() => setCurrentView('performance')} className="text-xs font-mono uppercase tracking-widest text-neutral-400 hover:text-white transition-colors">Performance</button>
            <button onClick={() => setCurrentView('partnership')} className="text-xs font-mono uppercase tracking-widest text-neutral-400 hover:text-white transition-colors">Parcerias</button>
            <button className="text-xs font-mono uppercase tracking-widest text-neutral-400 hover:text-white transition-colors">Login</button>
          </div>
        </div>
      </nav> */}

      <nav
  className={`fixed top-0 w-full z-50 transition-all duration-500 ease-in-out
  ${isScrolled
    ? 'bg-off-black/95 backdrop-blur-md border-b border-white/10 shadow-md'
    : 'bg-transparent'
  }`}
>
  <div className="max-w-7xl mx-auto px-6 sm:px-0 py-4 flex justify-between items-center">

    {/* Logo */}
    <div className="flex items-center gap-2 cursor-pointer">
      <img src="/logo-tm.png" alt="FUNPACE" className="h-3 object-contain" />
    </div>

    {/* Desktop Nav */}
    <div className="hidden md:flex items-center gap-6">
      {/* <button onClick={() => setCurrentView('manifesto')} className="text-xs font-mono uppercase tracking-widest text-neutral-400 hover:text-white transition-colors">Manifesto</button>
      <button onClick={() => setCurrentView('collective')} className="text-xs font-mono uppercase tracking-widest text-neutral-400 hover:text-white transition-colors">Coletivo</button>
      <button onClick={() => setCurrentView('currency')} className="text-xs font-mono uppercase tracking-widest text-neutral-400 hover:text-white transition-colors">Moeda</button>
      <button onClick={() => setCurrentView('performance')} className="text-xs font-mono uppercase tracking-widest text-neutral-400 hover:text-white transition-colors">Performance</button>
      <button onClick={() => setCurrentView('partnership')} className="text-xs font-mono uppercase tracking-widest text-neutral-400 hover:text-white transition-colors">Parcerias</button>
      <a href="#teste" className="text-xs font-mono uppercase tracking-widest text-neutral-400 hover:text-white transition-colors">Teste</a> */}
      <button className="text-xs font-mono uppercase tracking-widest text-neutral-400 hover:text-white transition-colors">Login</button>
    </div>

    {/* Hamburger Mobile */}
    <button
      className="md:hidden text-white"
      onClick={() => setMobileMenuOpen(true)}
    >
      <Menu className="w-6 h-6" />
    </button>

  </div>
</nav>

{/* MOBILE SIDEBAR */}
<div
  className={`fixed inset-0 z-[60] transition-all duration-500 ${
    mobileMenuOpen ? 'pointer-events-auto' : 'pointer-events-none'
  }`}
>
  {/* BACKDROP */}
  <div
    onClick={() => setMobileMenuOpen(false)}
    className={`absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity duration-500 ${
      mobileMenuOpen ? 'opacity-100' : 'opacity-0'
    }`}
  />

  {/* PANEL */}
  <div
    className={`absolute right-0 top-0 h-full w-[85%] max-w-sm bg-off-black border-l border-white/10
    transform transition-transform duration-500 ease-out
    ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}
    flex flex-col`}
  >

    {/* HEADER */}
    <div className="flex justify-between items-center p-6 border-b border-white/10">
      <img src="/logo.png" className="h-6" />
      <button onClick={() => setMobileMenuOpen(false)}>
        <X className="w-6 h-6" />
      </button>
    </div>

    {/* LINKS */}
    <div className="flex flex-col gap-6 p-8 font-mono uppercase tracking-widest text-sm">

      {[
        ['Manifesto', 'manifesto'],
        ['Coletivo', 'collective'],
        ['Moeda', 'currency'],
        ['Performance', 'performance'],
        ['Parcerias', 'partnership'],
      ].map(([label, view]) => (
        <button
          key={view}
          onClick={() => {
            setCurrentView(view as ViewState);
            setMobileMenuOpen(false);
          }}
          className="text-left text-neutral-400 hover:text-white transition-colors"
        >
          {label}
        </button>
      ))}

      <a
        href="#teste"
        onClick={() => setMobileMenuOpen(false)}
        className="text-left text-neutral-400 hover:text-white transition-colors"
      >
        Teste
      </a>

      <div className="border-t border-white/10 pt-6">
        <button className="text-left text-neutral-400 hover:text-white">
          Login
        </button>
      </div>
    </div>

    {/* FOOTER FX */}
    <div className="mt-auto p-6 text-[10px] font-mono text-neutral-600 uppercase tracking-widest">
      FUNPACE SYSTEM ACCESS
    </div>

  </div>
</div>

<section id="manifesto" className="relative h-screen flex flex-col justify-center px-6 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <video key="video" autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover grayscale contrast-125 scale-105">
            <source src="/video.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 backdrop-blur-sm bg-black/20" />
          <div className="absolute inset-0 bg-gradient-to-b from-off-black/60 via-transparent to-off-black" />
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
        </div>
        <div className="max-w-7xl mx-auto w-full relative z-10">
          <div className="flex flex-col gap-[clamp(0.5rem,1.5vh,1.5rem)]"> 
            <h1 className="text-[clamp(1.5rem,min(7vh,8vw),5rem)] font-display leading-[0.95] tracking-tighter uppercase text-white mix-blend-difference">
              Mais Que <br/>
              <span className="text-transparent stroke-text">Movimento.</span> <br/>
              Um Sistema <br/>
              Operacional <br/>
              Humano.
            </h1>
            <p className="text-[clamp(0.8rem,1.3vh,1.125rem)] font-mono text-neutral-400 max-w-xl leading-relaxed border-l-2 border-neon-volt pl-6">
              Unindo a força da comunidade, a dopamina do jogo e a precisão do treino. Bem-vindo ao FUNPACE.
            </p>
            <div className="max-w-7xl mx-auto w-full relative z-10 pt-[clamp(0.5rem,2vh,5rem)] flex justify-center">
              <button onClick={onCheckout} className="group relative px-5 py-3 md:px-8 md:py-4 bg-white text-black overflow-hidden rounded-sm w-fit">
                <div className="absolute inset-0 w-full h-full bg-neon-volt translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                <span className="relative flex items-center gap-3 md:gap-4 text-xs md:text-sm font-bold uppercase tracking-[0.2em] group-hover:text-black transition-colors">
                  [ JUNTE-SE AO CLUBE ] <ArrowRight className="w-4 h-4" />
                </span>
                
              </button>
            </div>
          </div>
        </div>
        <div className="absolute bottom-10 left-6 md:left-auto md:right-10 flex flex-col items-start md:items-end gap-2 z-10">
          <span className="text-[10px] font-mono uppercase text-neutral-500 tracking-widest">Role para Iniciar</span>
          <div className="h-16 w-[1px] bg-white/20 overflow-hidden">
            <div className="h-full w-full bg-neon-volt -translate-y-full animate-[drop_2s_infinite]" />
          </div>
        </div>
      </section>

      {/* II. The Social Pillar (The Collective) */}
      <section id="collective" className="py-10 px-6 border-t border-white/5 bg-off-black relative">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-10">
              <h2 className="text-4xl md:text-6xl font-display uppercase tracking-tighter leading-none">
                <span className="text-neutral-700">NINGUÉM</span> SOLTA A<br/>
                <span className="text-neutral-700">MÃO</span> DE NINGUÉM.
              </h2>
              <p className="text-xl text-neutral-400 font-light leading-relaxed max-w-md">
                Onde a performance individual encontra a energia do grupo. Conecte-se com corredores que elevam o seu padrão.
              </p>
              
              <div className="p-6 border border-white/10 bg-white/5 backdrop-blur-sm rounded-sm max-w-md group hover:border-neon-volt hover:shadow-[0_0_20px_rgba(204,255,0,0.15)] transition-all duration-300">
                <p className="font-mono text-sm text-neon-volt mb-2">// NETWORK STATUS</p>
                <p className="text-2xl font-display uppercase italic">"O FunPace não é um grupo, é a sua nova rede de suporte."</p>
              </div>

              <div className="flex gap-4 pt-4">
                 <div className="flex -space-x-4">
                      <div className="w-12 h-12 rounded-full border-2 border-off-black bg-neutral-800 overflow-hidden grayscale hover:grayscale-0 transition-all duration-300 z-0 hover:z-10 hover:scale-110 cursor-pointer">
                        <img src="/img/founders/03.png" className="w-full h-full object-cover" />
                      </div>
                      <div className="w-12 h-12 rounded-full border-2 border-off-black bg-neutral-800 overflow-hidden grayscale hover:grayscale-0 transition-all duration-300 z-0 hover:z-10 hover:scale-110 cursor-pointer">
                        <img src="/img/founders/02.png" className="w-full h-full object-cover" />
                      </div>
                      <div className="w-12 h-12 rounded-full border-2 border-off-black bg-neutral-800 overflow-hidden grayscale hover:grayscale-0 transition-all duration-300 z-0 hover:z-10 hover:scale-110 cursor-pointer">
                        <img src="/img/founders/01.png" className="w-full h-full object-cover" />
                      </div>
                 </div>
                 <div className="flex flex-col justify-center">
                    <span className="text-lg font-display leading-none text-white">1k+</span>
                    <span className="text-[10px] font-mono uppercase text-neutral-500 tracking-widest">Active Runners</span>
                 </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 relative">
              <div className="absolute -inset-4 bg-neon-volt/5 blur-3xl rounded-full opacity-20 pointer-events-none" />
              {["/img/01.jpeg","/img/02.jpeg","/img/03.png","/img/04.jpeg"].map((src, i) => (
                <div key={i} className="aspect-[3/4] bg-neutral-900 relative group overflow-hidden rounded-sm cursor-pointer">
                  <img src={src} className="w-full h-full object-cover grayscale contrast-125 group-hover:scale-110 transition-transform duration-700" alt="Community member" />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-300" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* III. Gamification (The Currency of Effort) */}
      <section id="currency" className="py-10 px-6 bg-neutral-950 border-t border-white/5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-cobalt-blue/20 via-transparent to-transparent pointer-events-none" />
        
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-20">
            <div className="flex-1 relative order-2 md:order-1">
              <div className="relative z-10 bg-black/80 border border-white/10 p-8 rounded-lg backdrop-blur-xl shadow-2xl max-w-md mx-auto transform hover:scale-[1.02] hover:border-cobalt-blue hover:shadow-[0_0_30px_rgba(0,85,255,0.2)] transition-all duration-300 group">
                <div className="absolute -inset-[1px] bg-gradient-to-b from-white/20 to-transparent rounded-lg opacity-20 group-hover:opacity-50 transition-opacity" />
                <div className="flex justify-between items-center mb-8 border-b border-white/10 pb-4">
                   <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-neon-volt rounded-full animate-pulse" />
                      <span className="text-[10px] font-mono uppercase text-neutral-400 tracking-widest">Live Balance</span>
                   </div>
                   <span className="text-[10px] font-mono text-neutral-600">ID: 8821-X</span>
                </div>
                <div className="text-center py-10 space-y-2">
                   <span className="text-[10px] font-mono uppercase text-cobalt-blue tracking-[0.3em] block mb-2">MOEDAS</span>
                   <div className="text-7xl font-display text-white tracking-tighter tabular-nums">12,450</div>
                   <span className="text-sm font-bold uppercase text-neutral-500 tracking-widest">Funits</span>
                </div>
                <div className="grid grid-cols-2 gap-4 mt-8">
                   <div className="bg-white/5 p-4 rounded border border-white/5">
                      <p className="text-[9px] font-mono text-neutral-500 uppercase mb-1">GANHO SEMANAL</p>
                      <p className="text-xl font-display text-neon-volt">+850</p>
                   </div>
                   <div className="bg-white/5 p-4 rounded border border-white/5">
                      <p className="text-[9px] font-mono text-neutral-500 uppercase mb-1">RANKING</p>
                      <p className="text-xl font-display text-white">#42 NACIONAL</p>
                   </div>
                </div>
              </div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] border border-white/5 rounded-full animate-[spin_20s_linear_infinite] pointer-events-none" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] border border-dashed border-white/5 rounded-full animate-[spin_15s_linear_infinite_reverse] pointer-events-none" />
            </div>

            <div className="flex-1 space-y-10 order-1 md:order-2">
              <div className="inline-block px-3 py-1 bg-cobalt-blue/10 border border-cobalt-blue/30 rounded text-[10px] font-mono uppercase text-cobalt-blue tracking-widest mb-4">
                Gamification Engine
              </div>
              <h2 className="text-4xl md:text-6xl font-display uppercase tracking-tighter leading-none text-white">
                Transforme <br/>
                Suor em <span className="text-cobalt-blue">Ativo.</span>
              </h2>
              <p className="text-xl text-neutral-400 font-light leading-relaxed">
                Cada KM é minerado. Cada treino é recompensado. Ganhe Funits, desbloqueie acessos exclusivos e suba no ranking.
              </p>
              <div className="pl-6 border-l border-cobalt-blue">
                <p className="font-mono text-sm text-neutral-300 italic">
                  "Gamificamos a disciplina para que a motivação nunca seja o problema."
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6">
                 {['ACESSO A MARCAS', 'DROPS EXCLUSIVOS', 'EVENTOS PRO', 'COLETIVO DE CORREDORES'].map((item, i) => (
                   <div key={i} className="flex items-center gap-3 text-sm font-bold uppercase tracking-wide text-neutral-300">
                      <Check className="w-4 h-4 text-cobalt-blue" /> {item}
                   </div>
                 ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* IV. Performance (The Science of Progress) */}
      <section id="performance" className="py-10 px-6 border-t border-white/5 bg-off-black">
        <div className="max-w-7xl mx-auto space-y-20">
          <div className="flex flex-col md:flex-row justify-between items-end gap-10">
             <div className="space-y-6 max-w-2xl">
                <h2 className="text-4xl md:text-6xl font-display uppercase tracking-tighter leading-none">
                  Precisão <span className="text-neutral-700">Técnica.</span>
                </h2>
                <p className="text-xl text-neutral-400 font-light leading-relaxed">
                  Do iniciante ao avançado, o foco é a sua evolução como um super atletas.
                </p>
             </div>
             <button 
               onClick={() => {
                 scrollPosition.current = window.scrollY;
                 setShowMethodology(true);
               }} 
               className="px-8 py-4 border border-white/20 text-white font-bold text-xs uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-all"
             >
               Ver Metodologia
             </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/10 border border-white/10">
             {[
              { title: 'PERFORMANCE', icon: Activity, desc: 'Biometria avançada em tempo real.' },
              { title: 'COMMUNITY', icon: Users, desc: 'O treino muda conforme sua resposta.' },
              { title: 'GAMIFICATION', icon: Trophy, desc: 'Compare-se com a elite mundial.' }
             ].map((feature, i) => (
               <div key={i} className="group p-10 bg-off-black hover:bg-neutral-900 hover:border-neon-volt hover:shadow-[inset_0_0_20px_rgba(204,255,0,0.05)] transition-all duration-300 relative overflow-hidden border border-transparent">
                  <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                     <ArrowRight className="w-5 h-5 text-neon-volt -rotate-45" />
                  </div>
                  <feature.icon className="w-8 h-8 text-neutral-500 mb-6 group-hover:text-white transition-colors" />
                  <h3 className="text-2xl font-display uppercase tracking-tight mb-2 text-white">{feature.title}</h3>
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-neon-volt transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* V. Membership Loop / Social Proof */}
      <section className="py-10 px-6 bg-white text-black text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10" />
        <div className="max-w-4xl mx-auto relative z-10 space-y-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-black/5 rounded-full border border-black/10">
             <Lock className="w-3 h-3" />
             <span className="text-[10px] font-mono uppercase tracking-widest font-bold">Members Only Access</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-display uppercase tracking-tighter leading-[0.8]">
            Entre no <br/>
            Ecossistema.
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 py-8 border-y border-black/10">
             {[
               { value: '+500', label: 'Corredores Ativos' },
               { value: '1.2M', label: 'KM Percorridos' },
               { value: '100k', label: 'Funits Gerados' }
             ].map((stat, i) => (
               <div key={i} className="space-y-1">
                  <p className="text-4xl font-display tracking-tighter">{stat.value}</p>
                  <p className="text-[10px] font-mono uppercase tracking-widest text-neutral-500">{stat.label}</p>
               </div>
             ))}
          </div>

          <button
            onClick={onCheckout}
            className="bg-black text-white px-12 py-5 rounded-sm font-bold text-sm uppercase tracking-[0.2em] hover:bg-neon-volt hover:text-black transition-all duration-300 shadow-2xl"
          >
            Solicitar Acesso Antecipado
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-6 bg-off-black border-t border-white/10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="flex items-center gap-3 group">
            <img src="/logo.png" alt="FUNPACE" className="w-full h-6 object-contain" />
          </div>
          <div className="flex gap-8">
             <a href="https://www.instagram.com/fun__pace" className="text-[10px] font-mono uppercase tracking-widest text-neutral-500 hover:text-white transition-colors">Instagram</a>
             <a href="https://strava.app.link/WwZeiDG660b" className="text-[10px] font-mono uppercase tracking-widest text-neutral-500 hover:text-white transition-colors">Strava</a>
          </div>
          <div className="text-right">
             <p className="text-[10px] font-mono text-neutral-600 uppercase tracking-widest">© 2024 High-Performance Ecosystem.</p>
             <p className="text-[10px] font-mono text-neutral-700 uppercase tracking-widest mt-1">FUNPACE ALL RIGHTS RESEVERD.</p>
          </div>
        </div>
      </footer>
      
      <style>{`
        .stroke-text {
          -webkit-text-stroke: 1px white;
        }
        @keyframes drop {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
      `}</style>
    </div>
  );
};

export default LandingPage;
