'use client';

import React from 'react';
import { ShieldCheck, MapPin, Heart, BookOpen } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-20 border-t border-slate-800/80 bg-slate-950/80 backdrop-blur-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          
          {/* Col 1 */}
          <div>
            <h3 className="font-bold text-white text-base mb-2">Smart Campus Marketplace</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Designed specifically for BCA students to exchange course textbooks, scientific calculators, and hardware lab kits on campus safely and affordably.
            </p>
          </div>

          {/* Col 2 */}
          <div>
            <h4 className="font-bold text-slate-200 text-sm mb-3 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              Campus Trade Guidelines
            </h4>
            <ul className="text-xs text-slate-400 space-y-2">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                Meet in open campus zones (Library, Canteen, Block A).
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                Verify student Roll Number before completing trade.
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                Test electronic calculators and lab kits prior to exchange.
              </li>
            </ul>
          </div>

          {/* Col 3 */}
          <div>
            <h4 className="font-bold text-slate-200 text-sm mb-3 flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-purple-400" />
              BCA Department Categories
            </h4>
            <div className="flex flex-wrap gap-2">
              <span className="px-2.5 py-1 rounded-md text-xs bg-slate-900 border border-slate-800 text-slate-300">
                Textbooks (Sem 1-6)
              </span>
              <span className="px-2.5 py-1 rounded-md text-xs bg-slate-900 border border-slate-800 text-slate-300">
                ClassWiz Calculators
              </span>
              <span className="px-2.5 py-1 rounded-md text-xs bg-slate-900 border border-slate-800 text-slate-300">
                8085 / Logic Kits
              </span>
              <span className="px-2.5 py-1 rounded-md text-xs bg-slate-900 border border-slate-800 text-slate-300">
                Arduino & Sensors
              </span>
            </div>
          </div>

        </div>

        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} Smart Campus Marketplace — Phase 1 Prototype</p>
          <div className="flex items-center gap-2 text-slate-400">
            <span>Built for BCA Campus Students</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
