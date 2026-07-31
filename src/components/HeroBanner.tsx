'use client';

import React from 'react';
import { Sparkles, Shield, BookCheck, Cpu, Beaker } from 'lucide-react';

export const HeroBanner: React.FC = () => {
  return (
    <section className="relative overflow-hidden pt-8 pb-12 px-4 sm:px-6 lg:px-8">
      {/* Glow Orbs background effect */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-r from-indigo-600/15 via-purple-600/15 to-emerald-600/15 blur-3xl pointer-events-none rounded-full" />

      <div className="relative max-w-7xl mx-auto">
        <div className="glass-card rounded-3xl p-6 sm:p-10 border border-slate-800/80 bg-slate-900/60 shadow-2xl">
          
          <div className="max-w-3xl">
            {/* Top pill badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold gradient-badge text-indigo-300 mb-6">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              <span>Campus Buy & Sell Hub — BCA Department</span>
            </div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-4 leading-[1.15]">
              Buy & Sell Used Books, Electronics & <span className="gradient-text">Lab Equipment</span>
            </h1>

            {/* Subheading */}
            <p className="text-base sm:text-lg text-slate-300 mb-8 leading-relaxed">
              Connect directly with fellow BCA students on campus. Get affordable course materials, scientific calculators, and lab components with zero hassle.
            </p>

            {/* Feature Pills */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-950/50 border border-slate-800 text-slate-200">
                <div className="w-9 h-9 rounded-lg bg-indigo-500/10 flex items-center justify-center border border-indigo-500/20 text-indigo-400">
                  <BookCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">Course Books</h4>
                  <p className="text-[11px] text-slate-400">BCA 1st - 6th Sem</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-950/50 border border-slate-800 text-slate-200">
                <div className="w-9 h-9 rounded-lg bg-purple-500/10 flex items-center justify-center border border-purple-500/20 text-purple-400">
                  <Cpu className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">Electronics</h4>
                  <p className="text-[11px] text-slate-400">Calculators & Accessories</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-950/50 border border-slate-800 text-slate-200">
                <div className="w-9 h-9 rounded-lg bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20 text-emerald-400">
                  <Beaker className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">Lab Gear</h4>
                  <p className="text-[11px] text-slate-400">Hardware Kits & Sensors</p>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
