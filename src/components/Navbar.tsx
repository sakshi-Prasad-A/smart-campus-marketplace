'use client';

import React from 'react';
import Link from 'next/link';
import { ShoppingBag, PlusCircle, Sparkles, BookOpen, ShieldCheck } from 'lucide-react';

interface NavbarProps {
  onSellClick?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onSellClick }) => {
  return (
    <header className="sticky top-0 z-40 w-full glass-nav transition-all duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-emerald-500 p-0.5 flex items-center justify-center shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform duration-300">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <ShoppingBag className="w-5 h-5 text-indigo-400 group-hover:text-emerald-400 transition-colors" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-xl tracking-tight text-white group-hover:text-indigo-300 transition-colors">
                Smart Campus
              </span>
              <span className="text-xs px-2 py-0.5 rounded-full font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                BCA
              </span>
            </div>
            <p className="text-xs text-slate-400 hidden sm:block">Buy & Sell Student Gear</p>
          </div>
        </Link>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-1 bg-slate-900/60 p-1 rounded-xl border border-slate-800 text-xs font-medium text-slate-300">
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600/20 text-indigo-300 border border-indigo-500/30">
              <BookOpen className="w-3.5 h-3.5" />
              Verified BCA Listings
            </span>
          </div>

          <Link
            href="/sell"
            onClick={(e) => {
              if (onSellClick) {
                e.preventDefault();
                onSellClick();
              }
            }}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-sm font-semibold shadow-lg shadow-indigo-600/30 hover:shadow-indigo-600/50 transition-all duration-200 hover:-translate-y-0.5"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Sell Item</span>
          </Link>
        </div>

      </div>
    </header>
  );
};
