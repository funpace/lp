import React, { useEffect, useMemo, useState } from 'react';
import { ArrowLeft, Loader2 } from 'lucide-react';

interface Props {
  onBack: () => void;
  plan: 'run' | 'pro';
}

type BillingCycle = 'trimestral' | 'semestral' | 'anual';

interface CheckoutResponse {
  checkout_url: string;
  payment_id: number;
  payment_status_url: string;
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'https://funapp-api-g4ue.onrender.com';

const PLAN_DETAILS = {
  run: { name: 'FunPace Run', monthlyCents: 11_900 },
  pro: { name: 'FunPace Pro', monthlyCents: 14_900 },
} as const;

const BILLING_CYCLE_DETAILS: Record<BillingCycle, { label: string; months: number; installments: number[] }> = {
  trimestral: { label: 'Trimestral', months: 3, installments: [1, 3] },
  semestral: { label: 'Semestral', months: 6, installments: [1, 3, 6] },
  anual: { label: 'Anual', months: 12, installments: [1, 3, 6, 12] },
};

const formatCurrency = (amountCents: number) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(amountCents / 100);
};

const installmentLabel = (count: number, amountCents: number) => {
  if (count === 1) {
    return `1x de ${formatCurrency(amountCents)} (à vista)`;
  }

  return `${count}x de ${formatCurrency(Math.round(amountCents / count))}`;
};

const CheckoutPage: React.FC<Props> = ({ onBack, plan }) => {
  const [step, setStep] = useState<1 | 2>(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [billingCycle, setBillingCycle] = useState<BillingCycle>('trimestral');
  const [installments, setInstallments] = useState(1);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const [zipCode, setZipCode] = useState('');
  const [street, setStreet] = useState('');
  const [number, setNumber] = useState('');
  const [neighborhood, setNeighborhood] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [complement, setComplement] = useState('');

  const cycleDetails = BILLING_CYCLE_DETAILS[billingCycle];
  const totalAmountCents = useMemo(
    () => PLAN_DETAILS[plan].monthlyCents * cycleDetails.months,
    [plan, cycleDetails.months],
  );
  const installmentAmountCents = useMemo(
    () => Math.round(totalAmountCents / installments),
    [totalAmountCents, installments],
  );

  useEffect(() => {
    if (!cycleDetails.installments.includes(installments)) {
      setInstallments(cycleDetails.installments[0]);
    }
  }, [cycleDetails.installments, installments]);

  const validateStepOne = () => {
    if (!name.trim() || !email.trim() || !phone.trim()) {
      return 'Preencha todos os campos de dados pessoais.';
    }

    return '';
  };

  const validateStepTwo = () => {
    if (
      !zipCode.trim() ||
      !street.trim() ||
      !number.trim() ||
      !neighborhood.trim() ||
      !city.trim() ||
      !state.trim()
    ) {
      return 'Preencha todos os campos de endereço.';
    }

    return '';
  };

  const goToAddressStep = (event: React.FormEvent) => {
    event.preventDefault();
    setError('');
    const validationError = validateStepOne();
    if (validationError) {
      setError(validationError);
      return;
    }
    setStep(2);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError('');
    const stepOneError = validateStepOne();
    if (stepOneError) {
      setStep(1);
      setError(stepOneError);
      return;
    }
    const stepTwoError = validateStepTwo();
    if (stepTwoError) {
      setError(stepTwoError);
      return;
    }
    setIsLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/checkouts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          plan,
          billing_cycle: billingCycle,
          installments,
          customer: {
            name: name.trim(),
            email: email.trim(),
            phone: phone.trim(),
          },
          address: {
            zip_code: zipCode.trim(),
            street: street.trim(),
            number: number.trim(),
            neighborhood: neighborhood.trim(),
            city: city.trim(),
            state: state.trim(),
            complement: complement.trim(),
          },
        }),
      });

      if (!response.ok) {
        let apiError = 'Falha ao criar checkout.';
        try {
          const payload = await response.json();
          apiError = payload.error || payload.message || apiError;
        } catch {
          // ignore JSON parsing errors and use default message
        }
        throw new Error(`${apiError} (HTTP ${response.status})`);
      }

      const data = (await response.json()) as CheckoutResponse;
      if (!data.checkout_url) {
        throw new Error('Checkout URL não retornada pela API.');
      }

      window.location.href = data.checkout_url;
    } catch (submitError) {
      const message = submitError instanceof Error ? submitError.message : 'Erro inesperado.';
      setError(message);
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-off-black text-white px-6 py-10">
      <div className="max-w-2xl mx-auto">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-neutral-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar
        </button>

        <section className="mt-8 border border-white/10 bg-white/5 p-8 md:p-10 rounded-sm">
          <p className="text-[10px] font-mono uppercase tracking-widest text-neon-volt mb-4">Checkout</p>
          <h1 className="text-3xl md:text-4xl font-display uppercase tracking-tight">Finalizar Pagamento</h1>
          <p className="text-neutral-400 mt-3">
            Primeiro seus dados pessoais, depois endereço. Em seguida você vai para o checkout seguro da InfinitePay.
          </p>
          <div className="mt-4 inline-flex items-center gap-3 border border-neon-volt/40 bg-neon-volt/10 px-4 py-2">
            <span className="text-[10px] font-mono uppercase tracking-widest text-neon-volt">Plano</span>
            <span className="text-sm font-bold">{PLAN_DETAILS[plan].name}</span>
            <span className="text-xs text-neutral-300">Mensal {formatCurrency(PLAN_DETAILS[plan].monthlyCents)}</span>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-2 text-[10px] font-mono uppercase tracking-widest">
            <div className={`p-3 border ${step === 1 ? 'border-neon-volt text-neon-volt' : 'border-white/20 text-neutral-500'}`}>
              1. Dados Pessoais
            </div>
            <div className={`p-3 border ${step === 2 ? 'border-neon-volt text-neon-volt' : 'border-white/20 text-neutral-500'}`}>
              2. Endereço
            </div>
          </div>

          {step === 1 ? (
            <form onSubmit={goToAddressStep} className="mt-8 space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="billingCycle" className="block text-[10px] font-mono uppercase tracking-widest text-neutral-400 mb-2">
                    Plano de pagamento
                  </label>
                  <select
                    id="billingCycle"
                    value={billingCycle}
                    onChange={(event) => setBillingCycle(event.target.value as BillingCycle)}
                    className="w-full bg-black/30 border border-white/20 px-4 py-3 outline-none focus:border-neon-volt transition-colors"
                  >
                    {Object.entries(BILLING_CYCLE_DETAILS).map(([key, value]) => (
                      <option key={key} value={key}>
                        {value.label} ({value.months} meses)
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="installments" className="block text-[10px] font-mono uppercase tracking-widest text-neutral-400 mb-2">
                    Parcelamento cartão
                  </label>
                  <select
                    id="installments"
                    value={installments}
                    onChange={(event) => setInstallments(Number(event.target.value))}
                    className="w-full bg-black/30 border border-white/20 px-4 py-3 outline-none focus:border-neon-volt transition-colors"
                  >
                    {cycleDetails.installments.map((option) => (
                      <option key={option} value={option}>
                        {installmentLabel(option, totalAmountCents)}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="border border-white/20 bg-black/30 p-4 text-xs text-neutral-300 space-y-1">
                <p className="font-mono uppercase tracking-widest text-neutral-400">Resumo do Pagamento</p>
                <p>
                  {cycleDetails.label}: {formatCurrency(totalAmountCents)}
                </p>
                <p>
                  Parcelamento: {installments}x de {formatCurrency(installmentAmountCents)}
                </p>
              </div>

              <div>
                <label htmlFor="name" className="block text-[10px] font-mono uppercase tracking-widest text-neutral-400 mb-2">
                  Nome completo
                </label>
                <input
                  id="name"
                  type="text"
                  required
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  className="w-full bg-black/30 border border-white/20 px-4 py-3 outline-none focus:border-neon-volt transition-colors"
                  placeholder="Seu nome"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-[10px] font-mono uppercase tracking-widest text-neutral-400 mb-2">
                  E-mail
                </label>
                <input
                  id="email"
                  type="text"
                  required
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className="w-full bg-black/30 border border-white/20 px-4 py-3 outline-none focus:border-neon-volt transition-colors"
                  placeholder="voce@email.com"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-[10px] font-mono uppercase tracking-widest text-neutral-400 mb-2">
                  Telefone
                </label>
                <input
                  id="phone"
                  type="tel"
                  required
                  value={phone}
                  onChange={(event) => setPhone(event.target.value)}
                  className="w-full bg-black/30 border border-white/20 px-4 py-3 outline-none focus:border-neon-volt transition-colors"
                  placeholder="11 99999-9999"
                />
              </div>

              {error && <p className="text-red-400 text-sm">{error}</p>}

              <button
                type="submit"
                className="w-full bg-neon-volt text-black py-4 font-bold text-sm uppercase tracking-[0.2em] hover:bg-white transition-colors"
              >
                Continuar para Endereço
              </button>
            </form>
          ) : (
            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              <div>
                <label htmlFor="zipCode" className="block text-[10px] font-mono uppercase tracking-widest text-neutral-400 mb-2">
                  CEP
                </label>
                <input
                  id="zipCode"
                  type="text"
                  required
                  value={zipCode}
                  onChange={(event) => setZipCode(event.target.value)}
                  className="w-full bg-black/30 border border-white/20 px-4 py-3 outline-none focus:border-neon-volt transition-colors"
                  placeholder="00000-000"
                />
              </div>

              <div>
                <label htmlFor="street" className="block text-[10px] font-mono uppercase tracking-widest text-neutral-400 mb-2">
                  Rua
                </label>
                <input
                  id="street"
                  type="text"
                  required
                  value={street}
                  onChange={(event) => setStreet(event.target.value)}
                  className="w-full bg-black/30 border border-white/20 px-4 py-3 outline-none focus:border-neon-volt transition-colors"
                  placeholder="Rua Exemplo"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="number" className="block text-[10px] font-mono uppercase tracking-widest text-neutral-400 mb-2">
                    Número
                  </label>
                  <input
                    id="number"
                    type="text"
                    required
                    value={number}
                    onChange={(event) => setNumber(event.target.value)}
                    className="w-full bg-black/30 border border-white/20 px-4 py-3 outline-none focus:border-neon-volt transition-colors"
                    placeholder="123"
                  />
                </div>
                <div>
                  <label htmlFor="complement" className="block text-[10px] font-mono uppercase tracking-widest text-neutral-400 mb-2">
                    Complemento
                  </label>
                  <input
                    id="complement"
                    type="text"
                    value={complement}
                    onChange={(event) => setComplement(event.target.value)}
                    className="w-full bg-black/30 border border-white/20 px-4 py-3 outline-none focus:border-neon-volt transition-colors"
                    placeholder="Apto, bloco, referência"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="neighborhood" className="block text-[10px] font-mono uppercase tracking-widest text-neutral-400 mb-2">
                  Bairro
                </label>
                <input
                  id="neighborhood"
                  type="text"
                  required
                  value={neighborhood}
                  onChange={(event) => setNeighborhood(event.target.value)}
                  className="w-full bg-black/30 border border-white/20 px-4 py-3 outline-none focus:border-neon-volt transition-colors"
                  placeholder="Seu bairro"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="city" className="block text-[10px] font-mono uppercase tracking-widest text-neutral-400 mb-2">
                    Cidade
                  </label>
                  <input
                    id="city"
                    type="text"
                    required
                    value={city}
                    onChange={(event) => setCity(event.target.value)}
                    className="w-full bg-black/30 border border-white/20 px-4 py-3 outline-none focus:border-neon-volt transition-colors"
                    placeholder="Sua cidade"
                  />
                </div>
                <div>
                  <label htmlFor="state" className="block text-[10px] font-mono uppercase tracking-widest text-neutral-400 mb-2">
                    Estado (UF)
                  </label>
                  <input
                    id="state"
                    type="text"
                    required
                    value={state}
                    onChange={(event) => setState(event.target.value.toUpperCase())}
                    className="w-full bg-black/30 border border-white/20 px-4 py-3 outline-none focus:border-neon-volt transition-colors"
                    placeholder="SP"
                  />
                </div>
              </div>

              {error && <p className="text-red-400 text-sm">{error}</p>}

              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="w-1/3 border border-white/20 text-white py-4 font-bold text-xs uppercase tracking-[0.2em] hover:border-white transition-colors"
                >
                  Voltar
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-2/3 bg-neon-volt text-black py-4 font-bold text-sm uppercase tracking-[0.2em] hover:bg-white transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Gerando Checkout
                    </>
                  ) : (
                    'Ir para Pagamento'
                  )}
                </button>
              </div>
            </form>
          )}
        </section>
      </div>
    </main>
  );
};

export default CheckoutPage;
