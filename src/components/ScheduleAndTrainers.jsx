import React, { useState } from 'react';
import { Calendar, Clock, Award, Sparkles } from 'lucide-react';

const SCHEDULE_BY_DAY = {
  Mon: [
    { time: '06:30 AM', title: 'Upper Body Power & Hypertrophy', coach: 'Arjun Mehta', level: 'All Levels', spot: 'Turf & Rack A' },
    { time: '08:00 AM', title: 'Metcon HIIT & Conditioning', coach: 'Riya Kapoor', level: 'Intermediate', spot: 'Main Arena' },
    { time: '06:00 PM', title: 'Strength Foundations', coach: 'Kabir Verma', level: 'Beginner', spot: 'Free Weights' },
    { time: '07:30 PM', title: 'Athletic Core & Mobility', coach: 'Ananya Nair', level: 'All Levels', spot: 'Recovery Zone' },
  ],
  Tue: [
    { time: '07:00 AM', title: 'Olympic Lifting & Kettlebell Flow', coach: 'Kabir Verma', level: 'Intermediate', spot: 'Platform Zone' },
    { time: '05:30 PM', title: 'Glutes, Legs & Posterior Chain', coach: 'Riya Kapoor', level: 'All Levels', spot: 'Rack Zone' },
    { time: '07:00 PM', title: 'Burn & Shred Circuit', coach: 'Arjun Mehta', level: 'Advanced', spot: 'Main Arena' },
  ],
  Wed: [
    { time: '06:30 AM', title: 'Dynamic Mobility & Stretch', coach: 'Ananya Nair', level: 'All Levels', spot: 'Recovery Zone' },
    { time: '08:00 AM', title: 'Push / Pull Volume Block', coach: 'Arjun Mehta', level: 'Intermediate', spot: 'Turf & Rack A' },
    { time: '06:30 PM', title: 'Boxing & Footwork Conditioning', coach: 'Kabir Verma', level: 'All Levels', spot: 'Combat Ring' },
  ],
  Thu: [
    { time: '07:00 AM', title: 'Engine Builder (Row & Sled)', coach: 'Riya Kapoor', level: 'Intermediate', spot: 'Turf Lane' },
    { time: '05:30 PM', title: 'Chest, Shoulders & Triceps Lab', coach: 'Arjun Mehta', level: 'All Levels', spot: 'Free Weights' },
    { time: '07:15 PM', title: 'Evening Recovery & Breathwork', coach: 'Ananya Nair', level: 'All Levels', spot: 'Recovery Zone' },
  ],
  Fri: [
    { time: '06:30 AM', title: 'Full-Body Barbell Blast', coach: 'Kabir Verma', level: 'Intermediate', spot: 'Platform Zone' },
    { time: '06:00 PM', title: 'Friday Night Team Sweat', coach: 'Riya Kapoor', level: 'All Levels', spot: 'Main Arena' },
    { time: '07:30 PM', title: 'Grip, Core & Conditioning', coach: 'Arjun Mehta', level: 'All Levels', spot: 'Turf & Rack A' },
  ],
  Sat: [
    { time: '07:30 AM', title: 'Saturday Endurance Challenge', coach: 'Kabir Verma', level: 'All Levels', spot: 'Main Arena' },
    { time: '09:00 AM', title: 'Mobility & Posture Reset', coach: 'Ananya Nair', level: 'All Levels', spot: 'Recovery Zone' },
    { time: '10:30 AM', title: 'Open Gym & Form Check Clinic', coach: 'Arjun Mehta', level: 'All Levels', spot: 'Free Weights' },
  ],
};

const TRAINERS = [
  {
    name: 'Arjun Mehta',
    role: 'Head of Strength & Hypertrophy',
    exp: '8+ Yrs Exp',
    specialty: 'CSCS Certified • Muscle Gain & Recomp',
    badge: 'LEAD COACH',
  },
  {
    name: 'Riya Kapoor',
    role: 'HIIT & Athletic Conditioning Coach',
    exp: '6+ Yrs Exp',
    specialty: 'Functional Fitness • Fat Loss & Stamina',
    badge: 'CONDITIONING',
  },
  {
    name: 'Ananya Nair',
    role: 'Mobility & Sports Recovery Specialist',
    exp: '5+ Yrs Exp',
    specialty: 'Joint Health • Posture & Flexibility',
    badge: 'RECOVERY',
  },
];

const DAYS = Object.keys(SCHEDULE_BY_DAY);

export default function ScheduleAndTrainers({ onBookClass }) {
  const [activeDay, setActiveDay] = useState('Mon');
  const classes = SCHEDULE_BY_DAY[activeDay] || [];

  return (
    <section id="schedule" className="scroll-mt-24 py-20 px-6 max-w-7xl mx-auto space-y-20">
      {/* Weekly Schedule */}
      <div>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[#ccff00] text-xs font-semibold tracking-widest uppercase mb-3">
              <Calendar className="w-3.5 h-3.5" /> Weekly Timetable
            </div>
            <h2 className="text-3xl md:text-4xl font-black">
              CLASS <span className="text-[#ccff00]">SCHEDULE</span>
            </h2>
            <p className="text-zinc-400 text-sm mt-2">
              Din select karein aur apna preferred session slot book karein.
            </p>
          </div>

          {/* Day Pills */}
          <div className="flex flex-wrap gap-2 bg-white/[0.03] p-1.5 rounded-2xl border border-white/10">
            {DAYS.map((day) => (
              <button
                key={day}
                type="button"
                onClick={() => setActiveDay(day)}
                className={`px-4 py-2 rounded-xl text-xs font-extrabold tracking-wider transition cursor-pointer ${
                  activeDay === day
                    ? 'bg-[#ccff00] text-black'
                    : 'text-zinc-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {day.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {/* Classes Grid */}
        <div className="grid md:grid-cols-2 gap-4">
          {classes.map((item, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-[#ccff00]/50 transition flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="space-y-1.5">
                <div className="flex items-center gap-3 text-xs font-bold">
                  <span className="inline-flex items-center gap-1 text-[#ccff00]">
                    <Clock className="w-3.5 h-3.5" /> {item.time}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-white/10 text-zinc-200">
                    {item.level}
                  </span>
                  <span className="text-zinc-500">• {item.spot}</span>
                </div>
                <h3 className="text-lg font-bold text-white">{item.title}</h3>
                <p className="text-xs text-zinc-400">Coach: {item.coach}</p>
              </div>

              <button
                type="button"
                onClick={() => onBookClass?.(`${item.title} (${activeDay} ${item.time})`)}
                className="px-5 py-2.5 rounded-full bg-white/10 hover:bg-[#ccff00] hover:text-black text-white text-xs font-extrabold tracking-wider transition shrink-0 cursor-pointer"
              >
                BOOK SLOT
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Trainers */}
      <div id="trainers" className="scroll-mt-24">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[#ccff00] text-xs font-semibold tracking-widest uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5" /> Certified Coaching Team
          </div>
          <h2 className="text-3xl md:text-4xl font-black">
            MEET THE <span className="text-[#ccff00]">TRAINERS</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {TRAINERS.map((trainer, idx) => (
            <div
              key={idx}
              className="p-7 rounded-3xl bg-zinc-900/70 border border-white/10 hover:border-[#ccff00]/40 transition flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-5">
                  <span className="text-[11px] font-extrabold tracking-widest px-3 py-1 rounded-full bg-[#ccff00]/15 text-[#ccff00]">
                    {trainer.badge}
                  </span>
                  <span className="inline-flex items-center gap-1 text-xs text-zinc-400">
                    <Award className="w-3.5 h-3.5 text-[#ccff00]" /> {trainer.exp}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white">{trainer.name}</h3>
                <p className="text-sm text-[#ccff00]/90 font-medium mt-1">{trainer.role}</p>
                <p className="text-xs text-zinc-400 mt-3 leading-relaxed">{trainer.specialty}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}