import React from 'react';
import { CheckCircle2, Home, Trophy } from 'lucide-react';

interface Props {
  onGoToHome: () => void;
  onGoToPlans: () => void;
}

const CheckoutSuccessPage: React.FC<Props> = ({ onGoToHome, onGoToPlans }) => {
  return (
    <main className="min-h-screen bg-off-black text-white px-6 py-10 flex items-center">
      <section className="max-w-2xl mx-auto w-full border border-white/10 bg-white/5 p-8 md:p-10 rounded-sm">
        <div className="inline-flex items-center gap-2 border border-neon-volt/40 bg-neon-volt/10 px-4 py-2">
          <CheckCircle2 className="w-4 h-4 text-neon-volt" />
          <span className="text-[10px] font-mono uppercase tracking-widest text-neon-volt">Pagamento confirmado</span>
        </div>

        <h1 className="mt-6 text-3xl md:text-4xl font-display uppercase tracking-tight">
          Assinatura ativada com sucesso
        </h1>
        <p className="text-neutral-300 mt-4">
          Seu pagamento foi processado. 
        </p>

        <div className="mt-8 flex flex-col md:flex-row gap-4">
          <button
            onClick={onGoToPlans}
            className="w-full md:w-auto inline-flex items-center justify-center gap-2 bg-neon-volt text-black px-6 py-4 font-bold text-sm uppercase tracking-[0.2em] hover:bg-white transition-colors"
          >
            <Trophy className="w-4 h-4" />
            Ver Planos
          </button>
          <button
            onClick={onGoToHome}
            className="w-full md:w-auto inline-flex items-center justify-center gap-2 border border-white/20 text-white px-6 py-4 font-bold text-sm uppercase tracking-[0.2em] hover:border-white transition-colors"
          >
            <Home className="w-4 h-4" />
            Voltar para Home
          </button>
        </div>
      </section>
    </main>
  );
};

export default CheckoutSuccessPage;
