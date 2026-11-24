import React, { useState, useMemo } from 'react';
import { Calculator, Flame, Beef, Wheat, Droplets } from 'lucide-react';

export default function BmiMacroCalculator() {
  const [gender, setGender] = useState('male');
  const [age, setAge] = useState(25);
  const [heightCm, setHeightCm] = useState(175);
  const [weightKg, setWeightKg] = useState(72);
  const [activity, setActivity] = useState(1.55); // Moderately active
  const [goal, setGoal] = useState('recomp'); // 'cut' | 'recomp' | 'bulk'

  const stats = useMemo(() => {
    const hMeters = heightCm / 100;
    const bmi = hMeters > 0 ? weightKg / (hMeters * hMeters) : 0;

    let category = 'Normal';
    let colorClass = 'text-[#ccff00]';
    if (bmi < 18.5) {
      category = 'Underweight';
      colorClass = 'text-sky-400';
    } else if (bmi >= 25 && bmi < 30) {
      category = 'Overweight';
      colorClass = 'text-amber-400';
    } else if (bmi >= 30) {
      category = 'Obese';
      colorClass = 'text-rose-400';
    }

    // Mifflin-St Jeor BMR formula
    const sOffset = gender === 'male' ? 5 : -161;
    const bmr = 10 * weightKg + 6.25 * heightCm - 5 * age + sOffset;
    const tdee = bmr * activity;

    let targetCalories = tdee;
    if (goal === 'cut') targetCalories = tdee - 400;
    if (goal === 'bulk') targetCalories = tdee + 350;

    const calories = Math.max(1200, Math.round(targetCalories));
    const proteinGrams = Math.round(weightKg * (goal === 'cut' ? 2.0 : 1.8));
    const fatGrams = Math.round((calories * 0.25) / 9);
    const remainingCals = Math.max(200, calories - (proteinGrams * 4 + fatGrams * 9));
    const carbsGrams = Math.round(remainingCals / 4);

    return {
      bmi: bmi.toFixed(1),
      category,
      colorClass,
      calories,
      proteinGrams,
      carbsGrams,
      fatGrams,
    };
  }, [gender, age, heightCm, weightKg, activity, goal]);

  return (
    <section id="calculator" className="scroll-mt-24 py-20 px-6 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[#ccff00] text-xs font-semibold tracking-widest uppercase mb-4">
          <Calculator className="w-3.5 h-3.5" /> Smart Nutrition Tool
        </div>
        <h2 className="text-3xl md:text-4xl font-black">
          BMI & <span className="text-[#ccff00]">MACRO CALCULATOR</span>
        </h2>
        <p className="text-zinc-400 mt-2 max-w-xl mx-auto text-sm">
          Apne stats aur fitness goal ke hisaab se daily calories aur protein/carbs/fats ka target check karein.
        </p>
      </div>

      <div className="grid lg:grid-cols-12 gap-8 items-start">
        {/* Left: Input Controls */}
        <div className="lg:col-span-7 p-6 md:p-8 rounded-3xl bg-white/[0.03] border border-white/10 space-y-6">
          {/* Gender & Goal */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-2">
                Gender
              </label>
              <div className="grid grid-cols-2 gap-2 bg-black/50 p-1 rounded-xl border border-white/10">
                {['male', 'female'].map((g) => (
                  <button
                    key={g}
                    type="button"
                    onClick={() => setGender(g)}
                    className={`py-2 rounded-lg text-sm font-bold capitalize transition cursor-pointer ${
                      gender === g ? 'bg-[#ccff00] text-black' : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-2">
                Fitness Goal
              </label>
              <div className="grid grid-cols-3 gap-1.5 bg-black/50 p-1 rounded-xl border border-white/10">
                {[
                  { id: 'cut', label: 'Fat Loss' },
                  { id: 'recomp', label: 'Maintain' },
                  { id: 'bulk', label: 'Muscle' },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setGoal(item.id)}
                    className={`py-2 rounded-lg text-xs font-bold transition cursor-pointer ${
                      goal === item.id ? 'bg-[#ccff00] text-black' : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Sliders: Height, Weight, Age */}
          <div className="grid sm:grid-cols-3 gap-5">
            <div className="p-4 rounded-2xl bg-black/40 border border-white/10">
              <div className="flex justify-between text-xs text-zinc-400 mb-2">
                <span>Height</span>
                <span className="text-white font-bold">{heightCm} cm</span>
              </div>
              <input
                type="range"
                min="140"
                max="215"
                value={heightCm}
                onChange={(e) => setHeightCm(Number(e.target.value))}
                className="w-full accent-[#ccff00] cursor-pointer"
              />
            </div>

            <div className="p-4 rounded-2xl bg-black/40 border border-white/10">
              <div className="flex justify-between text-xs text-zinc-400 mb-2">
                <span>Weight</span>
                <span className="text-white font-bold">{weightKg} kg</span>
              </div>
              <input
                type="range"
                min="35"
                max="150"
                value={weightKg}
                onChange={(e) => setWeightKg(Number(e.target.value))}
                className="w-full accent-[#ccff00] cursor-pointer"
              />
            </div>

            <div className="p-4 rounded-2xl bg-black/40 border border-white/10">
              <div className="flex justify-between text-xs text-zinc-400 mb-2">
                <span>Age</span>
                <span className="text-white font-bold">{age} yrs</span>
              </div>
              <input
                type="range"
                min="14"
                max="75"
                value={age}
                onChange={(e) => setAge(Number(e.target.value))}
                className="w-full accent-[#ccff00] cursor-pointer"
              />
            </div>
          </div>

          {/* Activity Level */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-2">
              Workout Activity Level
            </label>
            <select
              value={activity}
              onChange={(e) => setActivity(Number(e.target.value))}
              className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/15 text-sm text-white focus:border-[#ccff00] outline-none"
            >
              <option value={1.2}>Sedentary (Desk job, little/no exercise)</option>
              <option value={1.375}>Lightly Active (1–3 workouts/week)</option>
              <option value={1.55}>Moderately Active (3–5 intense workouts/week)</option>
              <option value={1.725}>Very Active (6–7 hard training days/week)</option>
            </select>
          </div>
        </div>

        {/* Right: Results Card */}
        <div className="lg:col-span-5 p-6 md:p-8 rounded-3xl bg-zinc-900/90 border border-[#ccff00]/40 space-y-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-5">
            <div>
              <p className="text-xs uppercase tracking-wider text-zinc-400">Your BMI Score</p>
              <div className="flex items-baseline gap-3 mt-1">
                <span className="text-4xl font-black">{stats.bmi}</span>
                <span className={`text-sm font-bold ${stats.colorClass}`}>{stats.category}</span>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xs uppercase tracking-wider text-zinc-400">Daily Target</p>
              <div className="flex items-center justify-end gap-1.5 mt-1 text-[#ccff00]">
                <Flame className="w-5 h-5" />
                <span className="text-2xl font-black">{stats.calories.toLocaleString()}</span>
                <span className="text-xs text-zinc-400">kcal</span>
              </div>
            </div>
          </div>

          {/* Macros Breakdown */}
          <div className="grid grid-cols-3 gap-3">
            <div className="p-4 rounded-2xl bg-black/50 border border-white/10 text-center">
              <Beef className="w-5 h-5 text-[#ccff00] mx-auto mb-1.5" />
              <div className="text-xl font-black">{stats.proteinGrams}g</div>
              <div className="text-[11px] uppercase tracking-wider text-zinc-400">Protein</div>
            </div>
            <div className="p-4 rounded-2xl bg-black/50 border border-white/10 text-center">
              <Wheat className="w-5 h-5 text-amber-400 mx-auto mb-1.5" />
              <div className="text-xl font-black">{stats.carbsGrams}g</div>
              <div className="text-[11px] uppercase tracking-wider text-zinc-400">Carbs</div>
            </div>
            <div className="p-4 rounded-2xl bg-black/50 border border-white/10 text-center">
              <Droplets className="w-5 h-5 text-sky-400 mx-auto mb-1.5" />
              <div className="text-xl font-black">{stats.fatGrams}g</div>
              <div className="text-[11px] uppercase tracking-wider text-zinc-400">Fats</div>
            </div>
          </div>

          <p className="text-xs text-zinc-500 leading-relaxed">
            *Yeh estimates Mifflin-St Jeor formula par based hain. Best results ke liye daily paani aur progressive training maintain rakhein.
          </p>
        </div>
      </div>
    </section>
  );
}