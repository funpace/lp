import React from 'react';
import { ArrowLeft, Users, Zap } from 'lucide-react';

interface Props {
  onBack: () => void;
}

const CollectiveView: React.FC<Props> = ({ onBack }) => {
  return (
    <div className="min-h-screen bg-off-black text-white font-sans selection:bg-neon-volt selection:text-black animate-in fade-in duration-500">
      <nav className="fixed top-0 w-full z-50 bg-off-black/90 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-neutral-400 hover:text-white transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Voltar
          </button>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-neon-volt rounded-full animate-pulse" />
            <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-500">Protocolo Coletivo // v2.4</span>
          </div>
        </div>
      </nav>

      <main className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-20">
          <div className="space-y-8">
            <div className="inline-block px-3 py-1 border border-cobalt-blue/30 bg-cobalt-blue/5 rounded text-[10px] font-mono uppercase text-cobalt-blue tracking-widest">
              [ O COLETIVO ]
            </div>
            
            <h1 className="text-5xl md:text-8xl font-display uppercase tracking-tighter leading-none">
              Nunca Corra <br/>
              <span className="text-transparent stroke-text">Sozinho.</span>
            </h1>
            
            <p className="text-lg text-neutral-400 font-light leading-relaxed border-l-2 border-cobalt-blue pl-6">
              O indivíduo é rápido. O coletivo é imparável. 
              Usamos a força da física social para criar um momentum que puxa todos para frente.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 relative">
            <div className="absolute -inset-4 bg-cobalt-blue/5 blur-3xl rounded-full opacity-20 pointer-events-none" />
            {[
              "/img/01.jpeg",
              "/img/02.jpeg",
              "/img/03.png",
              "/img/04.jpeg"
            ].map((src, i) => (
              <div key={i} className="aspect-[3/4] bg-neutral-900 relative group overflow-hidden rounded-sm cursor-pointer">
                <img 
                  src={src} 
                  className="w-full h-full object-cover grayscale contrast-125 group-hover:scale-110 transition-transform duration-700"
                  alt="Community member"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-300" />
                {/* <div className="absolute bottom-0 left-0 w-full p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-gradient-to-t from-black/90 to-transparent">
                  <p className="text-[10px] font-mono text-cobalt-blue uppercase tracking-widest">Esquadrão #{i}01</p>
                  <p className="text-sm font-bold uppercase text-white">Divisão de Elite</p>
                </div> */}
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { title: "Sincronia de Esquadrão", desc: "Compartilhamento de localização em tempo real e pareamento de ritmo." },
            { title: "Rankings Globais", desc: "Compita não apenas localmente, mas contra o mundo." },
            { title: "Rede de Suporte", desc: "Feedback instantâneo e encorajamento dos seus pares." }
          ].map((item, i) => (
            <div key={i} className="bg-white/5 border border-white/10 p-8 rounded-sm hover:border-cobalt-blue transition-colors duration-300 group">
              <div className="flex justify-between items-start mb-8">
                <div className="p-3 bg-cobalt-blue/10 rounded-sm">
                  <Users className="w-6 h-6 text-cobalt-blue" />
                </div>
                <span className="text-[9px] font-mono uppercase tracking-widest text-neutral-500 group-hover:text-cobalt-blue transition-colors">
                  [ RECURSO ]
                </span>
              </div>
              <h3 className="text-xl font-display uppercase tracking-tight mb-4">{item.title}</h3>
              <p className="text-sm text-neutral-400 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </main>
      <style>{`
        .stroke-text {
          -webkit-text-stroke: 1px white;
        }
      `}</style>
    </div>
  );
};

export default CollectiveView;
