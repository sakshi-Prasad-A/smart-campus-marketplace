'use client';

import React from 'react';
import { ListingCategory } from '@/types/listing';
import { Search, Book, Cpu, Beaker, Layers, X } from 'lucide-react';

interface CategoryFilterProps {
  activeCategory: ListingCategory | 'All';
  onSelectCategory: (category: ListingCategory | 'All') => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  itemCounts: {
    All: number;
    Books: number;
    Electronics: number;
    'Lab Equipment': number;
  };
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  activeCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  itemCounts
}) => {
  const categories: Array<{ id: ListingCategory | 'All'; label: string; icon: React.ReactNode }> = [
    { id: 'All', label: 'All Items', icon: <Layers className="w-4 h-4" /> },
    { id: 'Books', label: 'Books', icon: <Book className="w-4 h-4" /> },
    { id: 'Electronics', label: 'Electronics', icon: <Cpu className="w-4 h-4" /> },
    { id: 'Lab Equipment', label: 'Lab Equipment', icon: <Beaker className="w-4 h-4" /> }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 space-y-4">
      
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 bg-slate-900/80 p-3 sm:p-4 rounded-2xl border border-slate-800 backdrop-blur-md">
        
        {/* Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            const count = itemCounts[cat.id] || 0;
            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-200 ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30 border border-indigo-500/50'
                    : 'bg-slate-950/60 text-slate-400 hover:text-white hover:bg-slate-800/60 border border-slate-800/80'
                }`}
              >
                <span className={isActive ? 'text-white' : 'text-slate-400'}>{cat.icon}</span>
                <span>{cat.label}</span>
                <span
                  className={`px-2 py-0.5 rounded-full text-[11px] font-bold ${
                    isActive
                      ? 'bg-indigo-700/80 text-indigo-100'
                      : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Search Bar */}
        <div className="relative flex-1 md:max-w-xs">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search titles, roll no, keywords..."
            className="w-full pl-10 pr-9 py-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

      </div>

    </div>
  );
};
