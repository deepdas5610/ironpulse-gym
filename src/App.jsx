import React, { useState } from 'react';
import { Dumbbell, Flame, Clock, ShieldCheck, ArrowRight, Check, X } from 'lucide-react';
import Dumbbell3D from './components/Dumbbell3D';
import BmiMacroCalculator from './components/BmiMacroCalculator';
import ScheduleAndTrainers from './components/ScheduleAndTrainers';

export default function App() {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [submitted, setSubmitted] = useState(false);
   const WHATSAPP_NUMBER = '917089851668';
  const [leadForm, setLeadForm] = useState({
    name: '',
    phone: '',
    goal: 'Muscle Gain / Strength',
  });

  const plans = [
    {
      name: 'STARTER',
      price: '₹1,499',
      period: '/month',
      features: ['Full Gym Access (6 AM - 10 PM)', 'Basic Cardio & Weights', 'Locker Room Access', '1 Fitness Assessment'],
      highlight: false,
    },
    {
      name: 'PRO ATHLETE',
      price: '₹2,999',
      period: '/month',
      features: ['24/7 Unlimited Access', 'Personal Trainer (4 Sessions)', 'Custom Diet & Macro Plan', 'Steam & Sauna Access'],
      highlight: true,
    },
    {
      name: 'ELITE',
      price: '₹4,999',
      period: '/month',
      features: ['Dedicated Personal Coach', 'Weekly Body Composition Scan', 'All Group HIIT & CrossFit Classes', 'Priority Guest Passes'],
      highlight: false,
    },
  ];

  const handleJoin = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setSelectedPlan(null);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white selection:bg-[#ccff00] selection:text-black">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 bg-[#0a0a0a]/80 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2 text-2xl font-black tracking-wider">
            <Dumbbell className="text-[#ccff00] w-8 h-8" />
            <span>IRON<span className="text-[#ccff00]">PULSE</span></span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-400">
            <a href="#programs" className="hover:text-[#ccff00] transition">PROGRAMS</a>
            <a href="#pricing" className="hover:text-[#ccff00] transition">MEMBERSHIP</a>
            <a href="#calculator" className="hover:text-[#ccff00] transition">CALCULATOR</a>
          </div>
          <button
            onClick={() => setSelectedPlan('PRO ATHLETE')}
            className="bg-[#ccff00] text-black font-bold px-6 py-2.5 rounded-full text-sm hover:bg-[#b8e600] transition transform hover:scale-105 cursor-pointer"
          >
            JOIN NOW
          </button>
        </div>
      </nav>

      {/* Hero Section with 3D Object */}
      <section className="pt-28 pb-16 px-6 max-w-7xl mx-auto grid md:grid-cols-2 items-center gap-10">
        <div className="space-y-6">
          <div className="inline-block px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[#ccff00] text-xs font-semibold tracking-widest uppercase">
            Next-Gen Fitness Club
          </div>
          <h1 className="text-5xl md:text-7xl font-black leading-tight tracking-tight">
            UNLEASH YOUR <span className="text-[#ccff00]">POTENTIAL.</span>
          </h1>
          <p className="text-zinc-400 text-lg max-w-md leading-relaxed">
            High-performance training, Olympic-grade equipment, and expert coaching built to transform your physique.
          </p>
          <div className="flex flex-wrap gap-4 pt-2">
            <a
              href="#pricing"
              className="bg-[#ccff00] text-black font-bold px-8 py-4 rounded-full flex items-center gap-2 hover:bg-[#b8e600] transition"
            >
              START TRAINING <ArrowRight className="w-5 h-5" />
            </a>
            <a
              href="#programs"
              className="border border-white/20 px-8 py-4 rounded-full font-semibold hover:bg-white/5 transition"
            >
              EXPLORE PROGRAMS
            </a>
          </div>
          <p className="text-xs text-zinc-500 pt-2">💡 Tip: Drag the 3D dumbbell with your mouse to rotate it!</p>
        </div>

        {/* 3D Canvas */}
        <div className="relative">
          <div className="absolute inset-0 bg-[#ccff00]/10 blur-[100px] rounded-full pointer-events-none" />
          <Dumbbell3D />
        </div>
      </section>

      {/* Features / Programs */}
      <section id="programs" className="py-20 px-6 max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-black mb-12 text-center">
          ENGINEERED FOR <span className="text-[#ccff00]">RESULTS</span>
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { icon: Flame, title: 'HYPERTROPHY & STRENGTH', desc: 'Calibrated plates, power racks, and biomechanically accurate machines for maximum muscle growth.' },
            { icon: Clock, title: 'HIIT & CONDITIONING', desc: 'High-intensity turf zones with sleds, battle ropes, and assault bikes to torch fat fast.' },
            { icon: ShieldCheck, title: '1-ON-1 COACHING', desc: 'Certified trainers tracking your progressive overload, form, and nutrition every week.' },
          ].map((item, idx) => (
            <div key={idx} className="p-8 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-[#ccff00]/50 transition">
              <item.icon className="w-10 h-10 text-[#ccff00] mb-5" />
              <h3 className="text-xl font-bold mb-3">{item.title}</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Membership Pricing */}
      <section id="pricing" className="py-20 px-6 max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-black mb-4 text-center">
          MEMBERSHIP <span className="text-[#ccff00]">PLANS</span>
        </h2>
        <p className="text-zinc-400 text-center mb-12">Zero hidden fees. Cancel or upgrade anytime.</p>

        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, idx) => (
            <div
              key={idx}
              className={`p-8 rounded-3xl border flex flex-col justify-between transition ${
                plan.highlight
                  ? 'bg-zinc-900/90 border-[#ccff00] shadow-[0_0_40px_rgba(204,255,0,0.12)]'
                  : 'bg-white/[0.02] border-white/10'
              }`}
            >
              <div>
                {plan.highlight && (
                  <span className="bg-[#ccff00] text-black text-xs font-extrabold px-3 py-1 rounded-full uppercase">
                    Most Popular
                  </span>
                )}
                <h3 className="text-xl font-bold mt-4">{plan.name}</h3>
                <div className="my-6">
                  <span className="text-4xl font-black">{plan.price}</span>
                  <span className="text-zinc-400 text-sm">{plan.period}</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feat, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm text-zinc-300">
                      <Check className="w-4 h-4 text-[#ccff00] shrink-0" />
                      {feat}
                    </li>
                  ))}
                </ul>
              </div>
              <button
                onClick={() => setSelectedPlan(plan.name)}
                className={`w-full py-3.5 rounded-full font-bold text-sm transition cursor-pointer ${
                  plan.highlight
                    ? 'bg-[#ccff00] text-black hover:bg-[#b8e600]'
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                CHOOSE {plan.name}
              </button>
            </div>
          ))}
        </div>
      </section>
     <BmiMacroCalculator />
<ScheduleAndTrainers onBookClass={(sessionLabel) => setSelectedPlan(sessionLabel)} />

      {/* Footer */}
      <footer className="border-t border-white/10 py-8 text-center text-zinc-500 text-sm">
        © {new Date().getFullYear()} IRONPULSE FITNESS. Built with React & Three.js.
      </footer>

      {/* Registration Modal */}
      {selectedPlan && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-zinc-900 border border-white/15 rounded-2xl max-w-md w-full p-6 relative">
            <button
              type="button"
              onClick={() => {
                setSelectedPlan(null);
                setSubmitted(false);
              }}
              className="absolute top-4 right-4 text-zinc-400 hover:text-white cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {!submitted ? (
              <>
                <p className="text-xs font-bold tracking-widest uppercase text-[#ccff00]">
                  IRONPULSE LEAD INQUIRY
                </p>
                <h3 className="text-2xl font-black mt-1">
                  {selectedPlan}
                </h3>
                <p className="text-xs text-zinc-400 mt-1">
                  Apni details bhar kar instant WhatsApp par slot ya membership confirm karein.
                </p>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setSubmitted(true);
                  }}
                  className="mt-5 space-y-4"
                >
                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      value={leadForm.name}
                      onChange={(e) => setLeadForm({ ...leadForm, name: e.target.value })}
                      placeholder="Apna naam likhein"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/15 text-sm text-white focus:outline-none focus:border-[#ccff00]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 mb-1">
                      Phone / WhatsApp Number
                    </label>
                    <input
                      type="tel"
                      required
                      value={leadForm.phone}
                      onChange={(e) => setLeadForm({ ...leadForm, phone: e.target.value })}
                      placeholder="10-digit mobile number"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/15 text-sm text-white focus:outline-none focus:border-[#ccff00]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 mb-1">
                      Primary Goal
                    </label>
                    <select
                      value={leadForm.goal}
                      onChange={(e) => setLeadForm({ ...leadForm, goal: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/15 text-sm text-white focus:outline-none focus:border-[#ccff00]"
                    >
                      <option value="Muscle Gain / Strength">Muscle Gain / Strength</option>
                      <option value="Fat Loss & Conditioning">Fat Loss & Conditioning</option>
                      <option value="General Fitness & Mobility">General Fitness & Mobility</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-full bg-[#ccff00] text-black font-extrabold text-sm hover:bg-[#b8e600] transition cursor-pointer"
                  >
                    CONTINUE TO WHATSAPP
                  </button>
                </form>
              </>
            ) : (
              <div className="text-center py-4 space-y-4">
                <div className="w-12 h-12 rounded-full bg-[#ccff00]/15 text-[#ccff00] flex items-center justify-center mx-auto">
                  <Check className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-black">Inquiry Ready!</h3>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  <span className="text-white font-semibold">{leadForm.name}</span> ({leadForm.phone}) —{' '}
                  <span className="text-[#ccff00]">{selectedPlan}</span> ({leadForm.goal})
                </p>

                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                    `Hi IronPulse! Main ${selectedPlan} ke liye inquiry karna chahta/chahti hoon.\nName: ${leadForm.name}\nPhone: ${leadForm.phone}\nGoal: ${leadForm.goal}`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-full py-3 rounded-full bg-[#ccff00] text-black font-extrabold text-sm hover:bg-[#b8e600] transition"
                >
                  SEND ON WHATSAPP
                </a>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}